define(['module_base', 'twitter_fetcher'], function (mod_base, fetcher) {
    return mod_base.extend({
        api_root: "/api/mod/twitter-feed",
        template_root: "/modules/twitter-feed/",
        initialize: function (el, o, callback) {
            var self = this;
            self.base_initialize(el, o, function () {
                if (!self.manifest.options.layout) {
                    throw "Invalid layout specified.";
                }
                require(['text!' + self.template_root + self.manifest.options.layout + '.html'], function (layout) {
                    self.base_render(layout, window.culture, function () {
                        self.load_view_data();
                        if (callback) {
                            callback(self);
                        }
                    });
                });
            });
        },
        load_view_data: function () {
            twitterFetcher.fetch('377701061588316160', 'twitter-feed', 3, true, false, false, '', false, this.handleTweets, false);
        },
        handleTweets: function (tweets) {
            var x = tweets.length;
            var n = 0;
            var html = "";
            var element = document.getElementById('twitter-feed');
            while (n < x) {
                html += "<div class=\"text-muted\" style='padding:5px;margin:0;border-bottom:1px solid #666666'><span ></span>" + tweets[n] + "</div>";
                n++;
            }
            element.innerHTML = html;
        }
    });
});

