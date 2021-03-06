var bog = bog || {};
bog.session = {
    isAuthenticated: function (callback) {
        $.ajax("/api/auth", {
            type: "GET",
            dataType: "json",
            complete: function (xhr) {
                if (xhr.status == 200) {
                    var response = xhr.responseJSON;
                    if (response.is_auth) {
                        callback(true, response.user);
                    } else {
                        callback(false, null);
                    }
                } else {
                    callback(false, null);
                }
            }
        });
    }
};