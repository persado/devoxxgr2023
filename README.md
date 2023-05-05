# Persado DEVOXX 2023 GR Public Repository
This is the Persado Engineering team Draw application, used to pick a lucky winner to win an iPad, in DEVOXX 2023 Greece (May 4 to May 6, 2023). 

## Description 
We want to have a draw mechanism, that incorporates a random "pick" (someone selecting a random number) but using the provided user data (emails in this case) in a way that we cannot pre-determine the winner. Using the MD5 hashes of the emails, we generate a large "addressable space" of numbers (which we can then slice and use as material for ordering). We do not know in advance the number the user picks, which can decide which of the 10 possible big integers for _each user_, either positive or negative, is selected for the draw. We then make positive so ordering is further mixed. Sorting these numbers, the lowest one is selected as the winner. If that winner is not present or cannot be reached, we have subsequent (higher numbers) to continue using, until a winner is presented. In all cases, the results of the draw are written on the DB and can be re-displayed at any time.

## Draw API and Algorithm

A specific API should be available that, on completion of the deadline, can be used for creating a DRAW Page, and producing the results.
This API should be of the form: `/api/internal/draw?idx={number}`

The parameter idx should be used to determine the list of winners. This parameter should be randomly selected by someone in the crowd - by e.g. _asking someone to select a number between 0 and 9_

This API cannot be working before the 5th of May, 18:20 Athens time in the PROD profile. 
- If called BEFORE 5/5/2023 18:20 EET, the response should be HTTP 400 - “api not available”
- If called AFTER 5/5/2023 18:20 EET: 
  - with a number less than 0 or more than 9, the response should be HTTP 400 - “wrong parameters”
  - with a number between 0 and 9, the response should be: HTTP 200 with body as the _example_ JSON below:

```
{
   "draw_date" : "dd/MM/yyyy HH:mm:ss TT",
   "idx" : 4, 
   "win_list" : [
     { "email" : "someEmail@emailProvider.com", "draw_id": 231939 },
     ...
     { "email" : "someOtherEmail@emailProvider.com", "draw_id": 5995859 }
   ]
}
```

Each field is described below:
- draw_date - the date time timestamp of the draw. 
- idx - the number provided in the call, used for the draw result calculation.
- win_list - array of 20 objects, each object has: 
- email - the submitted email of the participant.
- draw_id - the number assigned to that participant, using the algorthm below

### Algorithm Prerequisites:

a DB table named contest_entrants with:
- field named email of type VARCHAR(80), mandatory
- field named fullname of type VARCHAR(200), non-mandatory
- field named idx of type INT to hold the index used for the calculation
- field named hash of type VARCHAR(64) to hold the MD5 of the email, as a hex string
- field named draw_id of type BIGINT (equivalent to Java Long) to hold the draw id of the users
- field named entry_ts of type TIMESTAMP to record the entry timestamp in UTC
- field named can_contact of type BOOLEAN (true = can be contacted, default = false)

This algorithm is based on the MD5 hash function. It requires a valid input email from the user; this email will also be used to contact the winner at the end of the draw. 
For every inserted person in the database, there should be a column named hash holding the HEX representation of the MD5 hash of the email entered, e.g.:

```
MD5('someEmail@emailProvider.com') = "5619395a7d321ea8fdf9c8ecac103eca"
```

Each MD5 hash is exactly 128 bit long, or 32 characters in HEX encoding. This value is immutable and can be stored directly to the DB on saving of the record. Use the MD5 Java function and the output converted to HEX, lowercase.

### Requirement: draw limits enforcement

- L1: can only receive one entry per participant email - enforcement by unique index
- L2: can only perform the draw if draw_id is empty on all columns - enforcement by PROD profile feature flag, use e.g. `SELECT count(*) from contest_entrants where draw_id is not null` and verify that it is 0.
- L3: can only perform the draw if current date is after 5/5/2023 18:20 EET - enforcement by PROD profile feature flag, date check at time of call
- L4: can only accept entries to contest if current date is LESS than  5/5/2023 18:20 EET - enforcement by PROD profile feature flag, date check at time of submission. 

### Requirement: Only to be called once

The API call can only be called once. If the draw_id is populated in the DB, on any field, the API call should stop and return immediately with content of the draw already on DB: 
- HTTP 208 - and body exactly the same as the output for the first call/draw result (reading from the DB)

### Requirement: Perform the algorithm execution using provided value for idx

The draw API call, for every MD5 stored in the database, using the provided idx parameter, should perform an operation to extract 8 hex chars from the hash, using the `idx` parameter, and saving it as a BIGINT. 
This should be _equivalent_ to the following SQL:

```sql
update contest_entrants set idx = {idx value}, draw_id = 
ABS(CAST( HEXTORAW(SUBSTRING( hash FROM {idx value} FOR 8)) AS BIGINT ) ) ; 
```

This operation will update the records with the idx parameter used for the draw, and draw_id will become the BIGINT absolute (positive) number produced from the HEX chars selected (8 chars = 4 bytes).
After the update operation is committed, the winners can be produced by ordering and limiting a `SELECT *` from that table using the draw_id as the ordering column:

```sql
SELECT email, draw_id from contest_entrants order by draw_id limit 20;
```

This output should be part of the result body of the API call.

