/**
 * Created by dbaxter on 12/6/13.
 */
define([ 'jquery','underscore','backbone'
    , "views/_base/Bog.views.full.List"
    , "views/donations/_donations.list.items"
    , "views/donations/_donations.list.item"
    , 'text!../../../tmpl/shared/list.html'
], function($, _, Backbone
            , _base
            , ListItemsView
            , ListItemView
            , ListTemplate
    ){
    return _base.extend({
        collection: Bog.collections.Donations
        , listView: ListItemsView
        , itemView: ListItemView
        , initialize: function(){
            var self = this;

            var donations = new Bog.collections.Donations();

            donations.fetch({
                success: function (donations) {
                    self.collection = donations;
                    self.render();
                }
            });

            return this;
        },
        render: function(){
            var self = this;
            self.$el.append(ListTemplate);
            var listView = new self.listView({
                collection: self.collection,
                itemView: self.itemView,
                el: '#List-Container'
            });
            console.log(listView.render());
            self.$el.children($('table')).append(listView.render());
            return this;
        },
        events: {
            "click #List-Container .list-link": "showDetail"
        },
        showDetail: function(){
            alert("SHOW DETAIL!!");
        }

    });
});
