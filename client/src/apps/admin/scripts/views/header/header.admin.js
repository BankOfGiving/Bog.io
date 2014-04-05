define([ 'jquery', 'under', 'backbone',
    'text!../../../templates/header/header.admin.html'
], function ($, _, Backbone, AdminHeaderTemplate) {
    return Backbone.View.extend({
        render: function (container) {
            container.html(AdminHeaderTemplate);
        }
    });
});