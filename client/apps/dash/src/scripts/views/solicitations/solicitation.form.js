define(['jquery', 'underscore', 'backbone', 'bootstrap', 'moment', 'modules/bog.site', 'models/model.solicitation', 'text!../../../templates/solicitations/solicitation.detail.html', 'modules/bog.maps'],
    function ($, _, Backbone, bs, moment, site, SolicitationModel, DetailTemplate, maps) {
        return Backbone.View.extend({
            siteText: {
                pageHeader: {
                    title: "My Solicitations",
                    description: "View and modify your existing Solicitations or create a news Solicitation starting with the form to the right."
                }
            },
            entityId: null,
            initialize: function (elId, entityId) {
                var self = this;
                self.el = elId;
                self.entityId = entityId;

                site.setPageHeader(self.siteText.pageHeader.title, self.siteText.pageHeader.description);
                site.setActiveNav("solicitations");

                var solicitation = new SolicitationModel({ id: self.entityId});
                solicitation.fetch({
                    success: function (solicitation) {
                        self.model = solicitation;

                        self.render();
                    }});

                return this;
            },
            render: function () {
                var self = this;

                var solicitation = self.model.toJSON();

                console.log(solicitation);

                self.$el.empty();

                _.template.formatDateTime = function (date) {
                    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
                };
                var compiledTemplate = _.template(DetailTemplate, { solicitation: solicitation, _: _ });
                self.$el.append(compiledTemplate);

                var map = maps.addMapToCanvas(document.getElementById("small-map"), solicitation.address.location[1], solicitation.address.location[0], 16);
                maps.createMarker(map, solicitation);
            },
            solicitations: {
                "click #Edit-Button": "edit",
                "click #Cancel-Button": "cancel",
                "click #Delete-Button": "delete"
            },
            cancel: function () {
                history.back();
            },
            edit: function () {
                window.location.href = "#/solicitation/edit/" + this.entityId;
            },
            delete: function () {
                window.location.href = "#/solicitation/delete/" + this.entityId;
            }
        });
    });