define(['jquery'], function ($) {
    return {
        all: function (callback) {
            var uri = "search/all/";

            $.getJSON(uri, function (data) {
                callback(data);
            });
        },

        allByLocation: function (lat, lng, rad, callback) {
            var uri = "search/all/bylocation?lat=" + lat + "&lng=" + lng + "&rad=" + rad;

            $.getJSON(uri, function (data) {
                callback(data);
            });
        }
    };
});