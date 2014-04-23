define([ 'postal', 'module_base', 'text!./wizard-container.html' ],
    function (postal, mod_base, container_text) {
        return mod_base.extend({
            api_root: "/api/mod/donation-form-wizard",
            template_root: "/modules/donation-form-wizard/",
            page_lock: false,
            container: null,
            goods_max_steps: 8,
            initialize: function (el, o, callback) {
                var self = this;
                _.bindAll(this, 'render_intro');
                self.base_initialize(el, o, function () {
                    postal.subscribe({
                        channel: "dash",
                        topic: "donation-wizard",
                        callback: function (data) {
                            self.model = data.model;
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
                            self.update_progress(2, self.goods_max_steps);
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
                    $("a.list-group-item").off().bind('click', function (e) {
                        e.preventDefault();
                        var donation_type = e.target.getAttribute("data-value");
                        if (!donation_type) {
                            donation_type = e.target.parentElement.getAttribute("data-value");
                        }
                        if (donation_type) {
                            self.model.type = donation_type;
                            switch (donation_type) {
                                case "goods":
                                    self.render_goods_details(function () {
                                        self.update_progress(3, self.goods_max_steps);
                                    });
                                    break;
                                case "services":
                                    self.render_service_details(function () {
                                        self.update_progress(3, self.goods_max_steps);
                                    });
                                    break;
                            }
                        } else {
                            console.log("BAD TARGET");
                        }
                    });

                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_intro(function () {
                            self.update_progress(1, self.goods_max_steps);
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
                            self.update_progress(2, self.goods_max_steps);
                        });
                    });
                    $("#step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.model.title = $("#detail_short_desc").val();
                        self.model.reason = $("#detail_reason").val();
                        self.model.description = $("#detail_long_desc").val();
                        self.render_goods_condition(function () {
                            self.update_progress(4, self.goods_max_steps);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },
            render_goods_condition: function (callback) {
                var self = this;
                self.render_step('goods-condition', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_details(function () {
                            self.update_progress(4, self.goods_max_steps);
                        });
                    });
                    $("a.list-group-item").off().on('click', function (e) {
                        e.preventDefault();
                        var goods_condition = e.target.getAttribute("data-value");
                        if (!goods_condition) {
                            goods_condition = e.target.parentElement.getAttribute("data-value");
                        } else {
                            return;
                        }
                        if (goods_condition) {
                            self.model.condition = goods_condition;
                            self.render_goods_range_type(function () {
                                self.update_progress(5, self.goods_max_steps);
                            });
                        }
                    });
                    if (callback) {
                        callback();
                    }
                });
            },

            render_goods_range_type: function (callback) {
                var self = this;
                self.render_step('goods-range-type', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_condition(function () {
                            self.update_progress(4, self.goods_max_steps);
                        });
                    });
                    $("a.list-group-item").off().on('click', function (e) {
                        e.preventDefault();
                        var range_type = e.target.getAttribute("data-value");
                        if (!range_type) {
                            range_type = e.target.parentElement.getAttribute("data-value");
                        } else {
                            return;
                        }
                        if (range_type) {
                            self.model.range_type = range_type;
                            switch (range_type) {
                                case "any":
                                    self.render_goods_shipping_required(function () {
                                        self.update_progress(6, self.goods_max_steps);
                                    });
                                    break;
                                case "local":
                                    self.render_goods_local_receipt_type(function () {
                                        self.update_progress(6, self.goods_max_steps);
                                    });
                                    break;
                            }
                        }
                    });
                    if (callback) {
                        callback();
                    }
                });
            },

            render_goods_local_receipt_type: function (callback) {
                var self = this;
                self.render_step('goods-local-receipt-type', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_range_type(function () {
                            self.update_progress(5, self.goods_max_steps);
                        });
                    });
                    $("a.list-group-item").off().on('click', function (e) {
                        e.preventDefault();
                        var local_receipt_type = e.target.getAttribute("data-value");
                        self.model.local_receipt_type = local_receipt_type;
                        switch (local_receipt_type) {
                            case "pickup":
                                self.render_goods_local_pickup(function () {
                                    self.update_progress(7, self.goods_max_steps);
                                });
                                break;
                            case "delivery":
                                self.render_goods_local_delivery(function () {
                                    self.update_progress(7, self.goods_max_steps);
                                });
                                break;
                        }
                    });
                    if (callback) {
                        callback();
                    }
                });
            },

            render_goods_local_pickup: function (callback) {
                var self = this;
                self.render_step('goods-local-pickup', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_local_receipt_type(function () {
                            self.update_progress(6, self.goods_max_steps);
                        });
                    });
                    $("step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_contact(function () {
                            self.update_progress(8, self.goods_max_steps);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },
            render_goods_local_delivery: function (callback) {
                var self = this;
                self.render_step('goods-local-delivery', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_local_receipt_type(function () {
                            self.update_progress(6, self.goods_max_steps);
                        });
                    });
                    $("step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_contact(function () {
                            self.update_progress(8, self.goods_max_steps);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
            },

            render_goods_shipping_required: function (callback) {
                var self = this;
                self.render_step('goods-shipping-required', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_range_type(function () {
                            self.update_progress(5, self.goods_max_steps);
                        });
                    });
                    $("a.list-group-item").off().on('click', function (e) {
                        e.preventDefault();
                        var local_receipt_type = e.target.getAttribute("data-value");
                        self.model.local_receipt_type = local_receipt_type;
                        switch (local_receipt_type) {
                            case "yes":
                                self.render_goods_other_details(function () {
                                    self.update_progress(7, self.goods_max_steps);
                                });
                                break;
                            case "delivery":
                                self.render_goods_shipping_included(function () {
                                    self.update_progress(7, self.goods_max_steps);
                                });
                                break;
                        }
                    });
                    if (callback) {
                        callback();
                    }
                });
            },

            render_goods_other_details: function (callback) {
                var self = this;
                self.render_step('goods-other-details', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_shipping_required(function () {
                            self.update_progress(6, self.goods_max_steps);
                        });
                    });
                    $("step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_contact(function () {
                            self.update_progress(8, self.goods_max_steps);
                        });
                    });
                });
                if (callback) {
                    callback();
                }
            },

            render_goods_shipping_included: function (callback) {
                var self = this;
                self.render_step('goods-shipping-included', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_shipping_required(function () {
                            self.update_progress(6, self.goods_max_steps);
                        });
                    });
                    $("step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        self.render_goods_contact(function () {
                            self.update_progress(8, self.goods_max_steps);
                        });
                    });
                });
                if (callback) {
                    callback();
                }
            },

            render_goods_contact: function (callback) {
                var self = this;
                self.render_step('goods-contact', function () {
                    $("#step-btn-prev").off().on('click', function (e) {
                        e.preventDefault();
                        e.addClass("disabled");
                        //self.render_type(function () {
                        //    self.update_progress(5, 7);
                        //});
                    });
                    $("#step-btn-next").off().on('click', function (e) {
                        e.preventDefault();
                        var contact = {
                            "name": $("#contact_name").val(),
                            "email": $("#contact_email").val(),
                            "phone": $("#contact_phone").val(),
                            "notes": $("#contact_notes").val()
                        };
                        self.contacts = self.contacts || [];
                        self.contacts.push(contact);
                        self.render_goods_range_type(function () {
                            self.update_progress(5, 7);
                        });
                    });
                    if (callback) {
                        callback();
                    }
                });
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
                console.log(this.model);
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