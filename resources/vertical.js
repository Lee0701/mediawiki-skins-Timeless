mw.loader.using( [ 'mediawiki.util' ] ).done( function () {

    function addAdjustHeightsListeners() {
        window.addEventListener('resize', adjustHeights);
        var containers = document.querySelectorAll('#mw-content-text .mw-parser-output');
        containers.forEach(addAdjustHeightsListener);
    }

    function addAdjustHeightsListener(container) {
        container.addEventListener('change', function() {
            adjustHeight(container);
        })
    }

    function adjustHeights() {
        var scrollTop = document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        var containers = document.querySelectorAll('#mw-content-text .mw-parser-output');
        containers.forEach(adjustHeight);
        document.documentElement.scrollTop = scrollTop * (document.documentElement.scrollHeight / scrollHeight);
    }

    function adjustHeight(container) {
        var columnHeight = parseFloat(getComputedStyle(container).getPropertyValue('column-width').replace("px", ""));
        var columnGap = parseFloat(getComputedStyle(container).getPropertyValue('column-gap').replace("px", ""));
        var columnCount = Math.floor(container.scrollHeight / columnHeight);
        container.style.height = columnCount*columnHeight + (columnCount-1)*columnGap + "px";
        container.style.columnWidth = columnHeight + "px";
        container.style.columnCount = columnCount;
    }

    mw.hook('wikipage.content').add(addAdjustHeightsListeners);
    mw.hook('wikipage.content').add(adjustHeights);
} );