define([ 'jquery', '../../../../../../.', 'backbone',
    'text!../../../tmpl/header/header.admin.html'
], function ($, _, Backbone, AdminHeaderTemplate) {
    return Backbone.View.extend({
        render: function (container) {
            container.html(AdminHeaderTemplate);
        }
    });
});