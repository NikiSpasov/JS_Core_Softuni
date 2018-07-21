define([], function () {
    'use strict';

    $(document).ajaxError(function (ev, request, settings) {
        console.log(request.status);
        console.log(request.statusText);
    });
    function loadTitle() {
        $('#text').load('http://dir.bg');
    }
});
//# sourceMappingURL=ajax-load.js.map