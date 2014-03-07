var _base = require('./bog.domain.repositories._base.js');

var SocialMediaRepository = function (current_user) {
    // TODO:  Move navigation to database.  Add functionality for permission filtered result sets.

    var Links = function (nav_type) {
        switch (nav_type) {
            default:
                return [
                    { type: 'facebook', uri: '', icon: '' },
                    { type: 'twitter', uri: '', icon: '' },
                    { type: 'linkedin', uri: '', icon: '' },
                    { type: 'pinterest', uri: '', icon: '' }
                ];
        }
    };

    return {
        links: Links
    };
};

SocialMediaRepository.prototype = new _base();

module.exports = SocialMediaRepository;