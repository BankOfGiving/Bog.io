define([ 'postal', 'module_base', 'text!./wizard-container.html' ],
    function (postal, mod_base, container_text) {
        return mod_base.extend({
            api_root: "/api/mod/donation-form-wizard",
            template_root: "/modules/donation-form-wizard/",
            page_lock: true,
            container: null,
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(this, 'render_intro');
                self.base_initialize(el, o, function () {
                    postal.subscribe({
                        channel: "dash",
                        topic: "donation-wizard",
                        callback: function (data) {
                            var model = data.model;
                            self.render();
                        }
                    });
                });
            },
            persist_model: function (data) {
                postal.publish({
                    channel: "persistence",
                    topic: "donation-wizard",
                    data: data
                });
            },
            render_intro: function (callback) {
                var self = this;
                self.render_step('intro', function () {
                    $("#step-btn-prev").addClass('disabled').on('click', function (e) {
                        e.preventDefault();
                    });
                    $("#step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_type(function () {
                            self.update_progress(2, 7);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },
            render_type: function (callback) {
                var self = this;
                self.render_step('type', function () {
                    $("#step-btn-goods").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_details(function () {
                            self.update_progress(3, 7);
                        });
                    });
                    $("#step-btn-services").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_service_details(function () {
                            self.update_progress(3, 7);
                        });
                    });
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_intro(function () {
                            self.update_progress(1, 7);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },
            //----------------------------------------------------------------------------------------------------------
            // GOODS DONATION
            //----------------------------------------------------------------------------------------------------------
            render_goods_details: function (callback) {
                var self = this;
                self.render_step('goods-details', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_type(function () {
                            self.update_progress(4, 7);
                        });
                    });
                    $("#step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_contact(function () {
                            self.update_progress(4, 7);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },
            render_goods_contact: function (callback) {
                var self = this;
                self.render_step('goods-contact', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_type(function () {
                            self.update_progress(5, 7);
                        });
                    });
                    $("#step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_contact(function () {
                            self.update_progress(5, 7);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },
            render_goods_local_only: function (callback) {
                var self = this;
                require(['text!' + self.template_root + 'step-local-only.html'], function (layout) {
                    self.base_render(layout, window.culture, function () {
                        $("#step-btn-prev").on('click', function (e) {
                            e.preventDefault();
                            window.location.href = '#/donations/create/33401573';
                        });
                        $("#step-btn-yes").on('click', function (e) {
                            e.preventDefault();
                            window.location.href = '#/donations/create/5e9e89cb';
                        });
                        $("#step-btn-no").on('click', function (e) {
                            e.preventDefault();
                            window.location.href = '#/donations/create/7c74eba6';
                        });
                        if (callback) {
                            callback();
                        }
                    });
                });
            },
            render_goods_shipping_required: function (callback) {

            },
            render_goods_shipping_included: function (callback) {

            },
            //----------------------------------------------------------------------------------------------------------
            // SERVICES DONATION
            //----------------------------------------------------------------------------------------------------------
            render_service_details: function (callback) {
                var self = this;
                require(['text!' + self.template_root + 'step-service-details.html'], function (step) {
                    self.base_render(container, window.culture, function () {
                        $("#step-btn-prev").on('click', function (e) {
                            e.preventDefault();
                            window.location.href = '#/donations/create/1a05c520';
                        });
                        $("#step-btn-next").on('click', function (e) {
                            e.preventDefault();
                            window.location.href = '#/donations/create/33401573';
                        });
                        if (callback) {
                            callback();
                        }
                    });
                });
            },
            //----------------------------------------------------------------------------------------------------------
            // COMMON FUNCTIONS
            //----------------------------------------------------------------------------------------------------------
            update_progress: function (curr, cap) {
                var $bar = $('.progress > .progress-bar-success');
                var $bg = $('.progress > .progress-bar-info');
                var step = 100 / cap;
                var prog = step * curr;
                $bar.width(prog + '%');
                $bg.width((100 - prog) + '%');
            },
            update_key: function (step) {
                var self = this;
                var key_arr = self.key.split(".", 4);
                key_arr.push(step);
                return key_arr.join('.');
            },
            render: function () {
                var self = this;

                var wizard_container_el = $(container_text).get(0);
                self.container = $(wizard_container_el);
                self.render_intro(function () {
                    self.update_progress(1, 7);
                });
            },
            render_step: function (step_name, render_step_callback) {
                var self = this;
                var step_container = self.container.find("#step-content");
                step_container.empty();
                self.key = self.update_key(step_name); // Update module key for localization
                require(['text!' + self.template_root + 'step-' + step_name + '.html'], function (step) {
                    step_container.append(step);
                    self.base_render(self.container.html(), window.culture, render_step_callback);
                });
            }
        });
    });