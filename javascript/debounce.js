APP.helper = (function(){

    return {
        /*  fn: {function}, wait : {int}, immediate : {bool}
            triggers the function on the leading edge instead of the trailing
            example usage: debounce(function() {}, 250) */
        debounce: function(fn, wait, immediate) {
            var timeout; wait = wait || 250;

            return function() {
                var args = arguments;

                var later = function() {
                    timeout = null;
                    if (!immediate) { fn.apply(this, args); }
                }.bind(this);

                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) { fn.apply(this, args); }
            };
        }
    };
}());
