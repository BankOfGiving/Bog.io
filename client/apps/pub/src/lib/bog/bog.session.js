if (!bog) {
    var bog = {};
}
bog.session = {
    isAuthenticated: function (callback) {
        $.ajax("auth/api/isAuthenticated", {
            type: "GET",
            dataType: "json",
            complete: function (xhr) {
                if (xhr.status == 200) {
                    callback(xhr.responseJSON);
                } else {
                    callback(false);
                }
            }
        });
    },
    sessionUser: function () {

    }
};