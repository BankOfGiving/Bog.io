define(['jquery', 'underscore', 'backbone', 'modules/bog.site', 'collections/collection.solicitations', 'text!../../../templates/solicitations/solicitations.list.html'], function ($, _, Backbone, site, SolicitationCollection, SolicitationTemplate) {
    return Backbone.View.extend({
        // TODO: move site text to i18n.
        siteText: {
            pageHeader: {
                title: "My Solicitations",
                description: "View and modify your existing Solicitations or create a news Solicitation starting with the form to the right."
            }
        },
        initialize: function () {
            var self = this;

            var solicitations = new SolicitationCollection();
            solicitations.fetch({
                success: function (solicitations) {
                    self.collection = solicitations;
                    self.render();
                }});

            return this;
        },
        render: function () {
            var self = this;

            var solicitations = self.collection.toJSON();

            self.$el.empty();

            if (solicitations.length === 0) {
                self.$el.append(_.template(SolicitationTemplate, {solicitations: null, _: _}));
            } else {
                solicitations = sortByKey(solicitations, 'title');
                self.$el.append(_.template(SolicitationTemplate, {solicitations: solicitations[0].solicitations, _: _}));
            }

            site.setPageHeader(self.siteText.pageHeader.title, self.siteText.pageHeader.description);
            site.setActiveNav("solicitations");

            $('#solicitations-button-back').click(function () {
                console.log(window.location);
                window.location = '#/';
            });

            $('.addButton').click(function () {
                window.location = '#/solicitation/add';
            });
        }
    });

    function sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
});