define(['modules/bog.api' ],
    function (api) {
        return {
            sessionUser: null,
            authWindow: null,
            isAuthenticated: function (callback) {
                var self = this;
                $.ajax(api.uri.auth.isAuthenticated, {
                    type: "GET",
                    dataType: "json",
                    complete: function (data) {
                        if (data.status == 200) {
                            self.sessionUser = data.responseJSON.user;
                            callback(true, self.sessionUser);
                        } else {
                            callback(false, null);
                        }
                    }
                });
            },
            logout: function (callback) {
                $.ajax(api.uri.auth.logout, {
                    type: "POST",
                    dataType: "json",
                    complete: function (data) {
                        if (data.status == 200) {
                            callback(true);
                        } else {
                            callback(false);
                        }
                    }
                });
            }
//        launchAuth: function (provider) {
//            var uri = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
//            switch (provider) {
//                case "fb":
//                    uri += '/auth/fb/';
//                    break;
//                case "g+":
//                    uri += '/auth/g/';
//                    break;
//                case "tw":
//                    uri += '/auth/tw/';
//                    break;
//            }
//            self.authWindow = popupwindow(uri, "bog-oauth", 510, 510);
//            this.checkAuthComplete();
//        },
//        checkAuthComplete: function checkAuthComplete() {
//            if (self.authWindow.closed) {
//                $("#Login-Options").modal('hide');
//                window.location.reload();
//            }
//            else {
//                setTimeout(function () {
//                    checkAuthComplete();
//                }, 1000);
//            }
//        }
//    };
//
//    function popupwindow(url, title, w, h) {
//        var left = (screen.width / 2) - (w / 2);
//        var top = (screen.height / 2) - (h / 2);
//        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        };
    });