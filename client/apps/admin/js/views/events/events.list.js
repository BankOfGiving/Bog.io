define(['jquery', 'underscore', 'backbone', 'bog.site', 'bog.i18n'
    , 'collections/collection.events'
    , 'text!../../../tmpl/events/events.list.html'
], function ($, _, Backbone, site, i18n, EventCollection, EventTemplate) {
    return Backbone.View.extend({
        previewMap: null,
        initialize: function () {
            var self = this;

            _.bindAll(this, 'localize', 'goBack', 'goAdd', 'goDetail');

            var collection = new EventCollection();
            collection.fetch({ data: $.param({ depth: 'list'}),
                success: function (collection) {
                    self.collection = collection;
                    self.render().localize();
                }});

            return this;
        },
        render: function () {
            var self = this;

            var collection = self.collection.toJSON();

            self.$el.empty();

            var compiledView;
            if (collection.length == 0) {
                compiledView = _.template(EventTemplate, {collection: null, _: _});
            } else {
                collection = sortByKey(collection, 'title');
                compiledView = _.template(EventTemplate, {collection: collection, _: _});
            }

            self.$el.append(compiledView);

            return this;
        },
        events: {
            "click #Back-Button": "goBack",
            "click #Add-Button": "goAdd",
            'click span[data-attribute="title"]': "goDetail"
        },
        localize: function () {
            i18n.localizeView(this.$el, 'events_list');
        },
        goBack: function (ctx) {
            console.log('goBack');
            window.location = '/';
        },
        goAdd: function (ctx) {
            console.log('goAdd');
            window.location = '#/event/';
        },
        goDetail: function (ctx) {
            console.log('goDetail');
            var id = ctx.currentTarget.getAttribute('data-id');
            window.location = '#/event/' + id;
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