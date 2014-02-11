define([ ], function () {
    return {
        isAuthenticated: function (callback) {
            var that = this;
            $.ajax("auth/loggedin", {
                type: "GET",
                dataType: "json",
                complete: function (xhr, textStatus) {
                    console.log('xhr:' + xhr.status);
                    if (xhr.status == 200) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }
            });
        },

        sessionUser: function () {

        }
    };
});