/**
 * Created by dbaxter on 12/6/13.
 */
define(['jquery', 'underscore', 'backbone', "views/_base/Bog.views.partial.ListModel"
    , 'text!../../../tmpl/donations/_donations.list.item.html'
], function($, _, Backbone , _base
            , Template
    ){ return _base.extend({

        template: Template
    });
});
