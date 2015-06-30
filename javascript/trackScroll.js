// Scroll tracking
APP.trackScroll = (function() {
    var $win = $(window),
        $doc = $(document),
        $scrollTracker,

        amountScrolled,
        pageConsumption = 0,

        pageUrl	= window.location.href,

        isDev	=	pageUrl.indexOf('localhost') > -1 ||
                    pageUrl.indexOf('.local') > -1 ||
                    pageUrl.indexOf('.dev') > -1 ||
                    pageUrl.indexOf(':8080') > -1;

    return {
        init: function() {
            this.addListeners();
            this.updatePageConsumption();

            if (isDev) { this.addScrollTracker(); }
        },
        addListeners: function() {
            $win.on('scroll', this.updatePageConsumption);
            $win.on('beforeunload', this.trackPageConsumption);
        },
        addScrollTracker: function() {
            var scrollTracker =	document.createElement('div');
                scrollTracker.setAttribute('id', 'scroll-percent');

            document.body.appendChild(scrollTracker);
            $scrollTracker = $('#scroll-percent').html(pageConsumption + '%');
        },
        updatePageConsumption: CSJ.helper.debounce(function() {
            amountScrolled = Math.round( $win.scrollTop() / ($doc.height() - $win.height()) * 100 );
            pageConsumption = pageConsumption < amountScrolled ? amountScrolled : pageConsumption;

            if (isDev) { $scrollTracker.html(amountScrolled + '%'); }
        }),
        trackPageConsumption: function() {
            console.log('Unload event has fired: ' + pageConsumption + '%');
            ga('send', 'event', 'Scroll Depth', 'Scroll', pageConsumption);
        }
    };
}());
