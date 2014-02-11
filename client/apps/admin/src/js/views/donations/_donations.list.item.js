define(['jquery', '../../../../../../.', 'backbone', 'views/_base/Bog.views.partial.ListModel', 'text!../../../tmpl/donations/_donations.list.item.html'],
    function ($, _, Backbone, _base, Template) {
        return _base.extend({
            template: Template
        });
    });