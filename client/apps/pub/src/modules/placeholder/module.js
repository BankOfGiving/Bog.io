define(['jquery', 'underscore', 'backbone', 'text!./placeholder.html'],
    function ($, _, Backbone, module_template) {
        return Backbone.View.extend({
            resource_root: 'http://placehold.it/',
            height: 350,
            width: 350,
            initialize: function (args) {
                var self = this;
                if (args.height && args.height !== '') {
                    self.height = args.height;
                }
                if (args.width && args.width !== '') {
                    self.width = args.width;
                }

                self.render().localize();
            },
            render: function () {
                var self = this;
                self.$el.append(module_template)
                    .children('img')
                    .attr('src', self.resource_root + self.width + 'x' + self.height);
                //.attr('height', self.height)
                //.attr('width', self.width)
                return this;
            },
            localize: function () {
                var self = this;
                return this;
            }
        });
    });