if (bog === null) {
    var bog = {
        i18n: {}
    };
}
bog.i18n = {
    cultures: [
        {
            code: 'en-us',
            name: 'English (US)'
        }
    ],
    views: {
        dash_landing: {
            pageHeader: {
                title: "Welcome to the BOG Dashboard",
                description: "Please login to continue."
            }
        },
        dash_home: {
            pageHeader: {
                title: "Welcome to your Dashboard",
                description: "Select an option below to continue."
            }
        },
        dash_header: {
            nav: {
                home: 'Dashboard',
                events: 'Events',
                donations: 'Donations',
                solicitations: 'Solicitations',
                profile: 'Edit Profile',
                login: '<span>Login&nbsp;<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;&nbsp;</span>',
                logout: 'Log out'
            },
            login_modal: {
                description: 'Log in to manage your content',
                facebook: 'Facebook',
                google: 'Google',
                twitter: 'Twitter'
            }
        },
        event_edit: {
            pageHeader: {
                title: "My Events",
                description: "View and modify your existing Events or create a news Event starting with the form to the right."
            },
            form: {
                sections: {
                    basic: {
                        label: 'Event Basics',
                        tooltip: ''
                    },
                    location: {
                        label: 'Location',
                        tooltip: ''
                    },
                    contact: {
                        label: 'Contact Information',
                        tooltip: ''
                    }
                },
                elements: {
                    title: {
                        label: 'Title',
                        placeholder: 'Add a descriptive title to attract readers...'
                    },
                    description: {
                        label: 'Description',
                        placeholder: 'Add the details of your event here.  Examples:  Who to contact for questions? Who would enjoy this event? What should they expect on arrival?  Get creative!!!'
                    },
                    status: {
                        label: 'Status',
                        placeholder: ''
                    },
                    tags: {
                        label: 'Tags',
                        placeholder: ''
                    },
                    type: {
                        label: 'Type',
                        placeholder: ''
                    },
                    address1: {
                        label: 'Street Address',
                        placeholder: '123 Main Street'
                    },
                    city: {
                        label: 'City',
                        placeholder: 'Metropolis'
                    },
                    state: {
                        label: 'State',
                        placeholder: 'NY'
                    },
                    postal_code: {
                        label: 'Postal Code',
                        placeholder: '11111'
                    },
                    country: {
                        label: 'Country',
                        placeholder: 'US'
                    },
                    latitude: {
                        label: 'Latitude',
                        placeholder: ''
                    },
                    longitude: {
                        label: 'Longitude',
                        placeholder: ''
                    }
                }
            },
            buttons: {
                cancel: {
                    label: "cancel",
                    tooltip: ""
                },
                add: {
                    label: "add",
                    tooltip: ""
                },
                save: {
                    label: "save",
                    tooltip: ""
                },
                delete: {
                    label: "delete",
                    tooltip: ""
                }
            }
        },
        _profile_detail_small: {
            labels: {
                fullName: 'Name'
            }
        },
        events_list: {
            pageHeader: {
                title: "My Events",
                description: "View and modify your existing Events or create a news Event starting with the form to the right."
            },
            list: {
                panel: {
                    title: 'Event'
                },
                columnheaders: {
                    title: 'Title',
                    location: 'Address'
                },
                messages: {
                    noresults: 'No results'
                }
            },

            buttons: {
                add: 'Add',
                back: 'Back'
            }
        },
        event_detail: {
            pageHeader: {
                title: "My Events",
                description: "View and modify your existing Events or create a news Event starting with the form to the right."
            },
            list: {
                columnheaders: {
                    title: 'Title',
                    location: 'Address'
                }
            }
        }
    },

    getViewText: function (viewName) {
        var self = this;
        if (!self.views[viewName]) {
            throw ('Invalid view name:  ' + viewName);
        } else {
            return self.views[viewName];
        }
        // do something with the culture
    },
    localizeView: function (container, viewName) {
        var self = this;

        if (!viewName) {
            throw ('Invalid View Name');
        }
        if (!container) {
            throw ('Invalid Container');
        }

        var viewText = self.getViewText(viewName);
        if (!viewText) {
            throw ('Invalid View');
        }

        self.setPageHeader(viewText);

        var localizableElements = container.find('[data-localize-key]');

        for (var i = 0; i < localizableElements.length; i++) {
            var element = localizableElements[i];
            var textSrc = element.getAttribute("data-localize-key");
            var textTarget = element.getAttribute("data-localize-target");
            var locText = self.valueByString(viewText, textSrc);

            switch (textTarget) {
                case 'text':
                    element.innerText = locText;
                    break;
                case 'html':
                    element.innerHTML = locText;
                    break;
                case 'form-group':
                    break;
            }
        }
    },
    setPageHeader: function (viewText) {
        if (viewText.pageHeader) {
            $("#page-title").children("h2").text(viewText.pageHeader.title);
            $("#page-description").children("h4").text(viewText.pageHeader.description);
        }
    },

    localizeFormElement: function (fieldName, textNode) {
        $("[for='" + fieldName + "']").text(textNode.label);
        $("[name='" + fieldName + "']").attr('placeholder', textNode.placeholder);
    },
    localizeFormSection: function (sectionName, textNode) {
        $("fieldset#" + sectionName + " > legend").text(textNode.label);
        //$("[name='" + fieldName + "']").attr('placeholder', textNode.placeholder);
    },
    localizeButton: function (buttonName, textNode) {
        $("[name='" + buttonName + "']").text(textNode.label);
    },
    valueByString: function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        while (a.length) {
            var n = a.shift();
            if (n in o) {
                o = o[n];
            } else {
                return;
            }
        }

        return o;
    }
};