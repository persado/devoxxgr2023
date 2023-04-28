const ExpirationService = {

    contestExpired: function() : boolean {
        const now = new Date();
        // Contest is valid until 5/5/2023 18:20
        const expirationDate = new Date(2023,4,5,18,20);
        return now > expirationDate;
    }


};

export default ExpirationService;