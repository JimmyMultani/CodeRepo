/* ANALYTICS MODULE USAGE
 * data-gat -> MANDATORY (use of an empty data-gat attribute)
 * data-gat-type="external" -> OPTIONAL (only for links that refreshes the page)
 * data-gat-category="FAQ"
 * data-gat-action="Click"
 * data-gat-label="FAQ Button"

 * example:
    <a href="#" class=""
        data-gat data-gat-category="CATEGORY"
        data-gat-action="ACTION"
        data-gat-label="LABEL"
        >example link</a>
 * / USAGE */
APP.analytics = (function() { /* global ga */
    var type, url, category, action, label;

    return {
        init: function() {
            this.addListeners();
        },
        addListeners: function() {
            $(document).on('click', '[data-gat]', this.handleClick);
        },
        handleClick: function(event) {
            type		= $(this).data('gat-type');
            category	= $(this).data('gat-category');
            action		= $(this).data('gat-action');
            label		= $(this).data('gat-label');

            ga('send', 'event', category, action, label);

            console.log('send', 'event', category, action, label);

            if(type && type === 'external') {
                url = $(this).attr('href');

                setTimeout(function() { document.location = url; }, 300);
                return false;
            }
        }
    };
}());
