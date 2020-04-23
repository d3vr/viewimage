var version = "1.5.1";

if (typeof window.isElementVisible === 'undefined') {
    window.isElementVisible = isElementVisiblePolyfill;
}

// Handy function from StackOverflow: https://stackoverflow.com/a/15203639/2733526
// Used to detect if an element is visible in the viewport
function isElementVisiblePolyfill(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || doc.documentElement.clientWidth,
        vHeight  = window.innerHeight || doc.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0
        || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
        el.contains(efp(rect.left,  rect.top))
        ||  el.contains(efp(rect.right, rect.top))
        ||  el.contains(efp(rect.right, rect.bottom))
        ||  el.contains(efp(rect.left,  rect.bottom))
    );
}

// Another handy function from StackOverflow: https://stackoverflow.com/a/35385518/2733526
// Used to add new HTML elements from HTML code
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

// Only select visible image
function open_visible_image(imgs){
    var img = imgs.iterateNext();
    if(img){
        if(isElementVisiblePolyfill(img)){
            // Open the image source in a new tab
            window.open(img.src);

            return true;
        }else{
            open_visible_image(imgs);
        }
    }else{
        return false;
    }
}

if(!document.querySelector("#viewimage_version")){
    document.body.appendChild(htmlToElement('<a id="viewimage_version" href="https://d3vr.github.io/viewimage/" style="position:fixed; z-index:999; top: 0; right:0;"><img src="https://d3vr.me/viewimage/version.php?v='+version+'" height="30"></a>'))
}

// Find the selected image
var imgs = document.evaluate('//div[@data-query]//img[not(contains(@src, "data:"))]', document, null, XPathResult.ANY_TYPE, null );

open_visible_image(imgs);