// PubService.js - in api/services
module.exports = {

    ProcUndefined: function(value) {
        return (typeof(value)=='undefined')?'':value;
    }
};