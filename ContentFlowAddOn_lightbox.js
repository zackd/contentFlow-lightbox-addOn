/*  ContentFlowAddOn_lightbox, version 3.0 
 *  (c) 2008 - 2010 Sebastian Kutsch
 *  <http://www.jacksasylum.eu/ContentFlow/>
 *
 *  This file is distributed under the terms of the MIT license.
 *  (see http://www.jacksasylum.eu/ContentFlow/LICENSE)
 */

new ContentFlowAddOn ('lightbox', {
    init: function () {
        var lightboxBaseDir = this.scriptpath+"lightbox/";
        var lightboxCSSBaseDir = lightboxBaseDir;
        var lightboxImageBaseDir = lightboxBaseDir;

        this.addScript(lightboxBaseDir+"lightbox.js");
        this.addStylesheet(lightboxCSSBaseDir+"lightbox.css");
        document.write('<script type="text/javascript">\
            var loadingImage = "'+lightboxImageBaseDir+'loading.gif";\
            var closeButton = "'+lightboxImageBaseDir+'close.gif";	\
        </script>');
    },
	
	ContentFlowConf: {
        loadingTimeout: 60000,          // milliseconds
        activeElement: 'content',       // item or content

        maxItemHeight: 0,               // 0 == auto, >0 max item height in px
        scaleFactor: 1.0,               // overall scale factor of content
        scaleFactorLandscape: 1.33,     // scale factor of landscape images ('max' := height= maxItemHeight)
        scaleFactorPortrait: 1.0,       // scale factor of portraoit and square images ('max' := width = item width)
        fixItemSize: false,             // don't scale item size to fit image, crop image if bigger than item
        relativeItemPosition: "top center", // align top/above, bottom/below, left, right, center of position coordinate

        circularFlow: true,             // should the flow wrap around at begging and end?
        verticalFlow: false,            // turn ContentFlow 90 degree counterclockwise
        visibleItems: -1,               // how man item are visible on each side (-1 := auto)
        endOpacity: 1,                  // opacity of last visible item on both sides
        startItem:  "center",           // which item should be shown on startup?
        scrollInFrom: "pre",            // from where should be scrolled in?

        flowSpeedFactor: 1.0,           // how fast should it scroll?
        flowDragFriction: 1.0,          // how hard should it be be drag the floe (0 := no dragging)
        scrollWheelSpeed: 1.0,          // how fast should the mouse wheel scroll. nagive values will revers the scroll direction (0:= deactivate mouse wheel)
        keys: {                         // key => function definition, if set to {} keys ar deactivated
            13: function () { this.conf.onclickActiveItem(this._activeItem) },
            37: function () { this.moveTo('pre') },
            38: function () { this.moveTo('visibleNext') },
            39: function () { this.moveTo('next') },
            40: function () { this.moveTo('visiblePre') }
        },

        reflectionColor: "transparent", // none, transparent, overlay or hex RGB CSS style #RRGGBB
        reflectionHeight: 0.5,          // float (relative to original image height)
        reflectionGap: 0.0,             // gap between the image and the reflection

        onclickInactiveItem: function (item) {
            this.conf.onclickActiveItem(item);
        },

        onclickActiveItem: function (item) {            
            var url, target, content;
            if (item.element['href']){
                url = item.element['href'];
                return false; // prevent default in IE
                item.preventDefault();
            }
            else if (item.element.getAttribute('href')) {
                url = item.element.getAttribute('href');
            }
            if (typeof url !== "undefined" && url !== null) {
                if (item.element.getAttribute('target')) {
                    target = item.element.getAttribute('target')
                    if (typeof target !== "undefined" && target !== null) {
                        window.open(url, target).focus();
                    }
                }
                else {
                    window.location.href = url;
                }
            }
            else {
                content = item.content;
                if (item.content['src']) {
                    if (! item.element['href']) {
                    //if (! item.element.getAttribute('href') && ! item.content.getAttribute('href')) {
                        item.content.href = content['src'];
                    }
                    if (item.caption) {
                        item.content.setAttribute ('title', item.caption.innerHTML);
                    }
                }
                else if (content.getAttribute('src')) {
                    if (! item.element.getAttribute('href')) {
                    //if (! item.element.getAttribute('href') && ! item.content.getAttribute('href')) {
                        item.content.href = content.getAttribute('src');
                    }
                    if (item.caption) {
                        item.content.setAttribute ('title', item.caption.innerHTML);
                    }
                    //showLightbox(item.content);
                }
                showLightbox(item.content);
            }
        }
    }

});
