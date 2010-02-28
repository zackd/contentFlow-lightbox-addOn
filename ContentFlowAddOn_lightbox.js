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
        onclickInactiveItem: function (item) {
            this.conf.onclickActiveItem(item);
        },

        onclickActiveItem: function (item) {            
            var url, target;
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
                    if (typeof url !== "undefined" && url !== null) {
                        window.open(url, target).focus();
                    }
                }
                else {
                    window.location.href = url;
                }
            }
            else {
                var content = item.content;
                if (content.getAttribute('src')) {
                    if (! item.element.getAttribute('href') && ! item.content.getAttribute('href')) {
                        item.content.href = content.getAttribute('src');
                    }
                    if (item.caption) {
                        item.content.setAttribute ('title', item.caption.innerHTML);
                    }
                    showLightbox(item.content);
                }
            }
        }
    }

});
