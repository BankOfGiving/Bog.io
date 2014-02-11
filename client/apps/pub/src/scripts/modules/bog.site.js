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
        }
    };
});