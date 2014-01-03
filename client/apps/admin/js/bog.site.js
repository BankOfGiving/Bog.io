/**
 * Created by dbaxter on 12/1/13.
 */
define([ 'jquery' ], function ($) {
    return {
        transitionToSiteOverrideContainer: function () {
            // this is a special page that uses the override rather than the main layout.
            $('#site-container-override').css('visibility', 'visible');
            $('#site-container').css('visibility', 'hidden');

            // add animations!!!
            //$( "someElement" ).hide().animate({height: "20px"}, 500)
        },
        transitionToSiteDefaultContainer: function () {
            // this is a special page that uses the override rather than the main layout.
            $('#site-container-override').css('visibility', 'hidden');
            $('#site-container').css('visibility', 'visible');
        },
        setActiveNav: function (option) {

            var homeNav = $("#Navbar-Auth-Home").removeClass('active');
            var eventsNav = $("#Navbar-Auth-Events").removeClass('active');
            var donationsNav = $("#Navbar-Auth-Donations").removeClass('active');
            var solicitationsNav = $("#Navbar-Auth-Solicitations").removeClass('active');
            var profileNav = $("#Navbar-Auth-Profile").removeClass('active');

            switch (option) {
                case "events":
                    eventsNav.addClass("active");
                    break;
                case "donations":
                    donationsNav.addClass("active");
                    break;
                case "solicitations":
                    solicitationsNav.addClass("active");
                    break;
                case "home":
                    homeNav.addClass("active");
                    break;
                case "profile":
                    profileNav.addClass("active");
                    break;
            }
        },
        getRootUrl: function () {
            return window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        }
    }
});