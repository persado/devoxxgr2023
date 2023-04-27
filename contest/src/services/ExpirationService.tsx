const ExpirationService = {

    contestExpired: function() : boolean {
        const now = new Date();
        // TODO end of contest Fri 05/05/2023 17:00
        const expirationDate = new Date(2023,4,5,17,0);
        return now > expirationDate;
    }


};

export default ExpirationService;