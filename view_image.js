var version = "1.6.1";

if (typeof window.isElementVisible === 'undefined') {
    window.isElementVisible = isElementVisiblePolyfill;
}

// Handy function from StackOverflow: https://stackoverflow.com/a/15203639/2733526
// Used to detect if an element is visible in the viewport
function isElementVisiblePolyfill(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
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
    console.log([img.src, img]);
    if(img){
        if(isElementVisiblePolyfill(img)){
            // Open the image source in a new tab
            if(img.src.includes('data:image')){
                const contentType = img.src.substring(5, img.src.indexOf(';'));

                const byteCharacters = atob(img.src.substring(img.src.indexOf(',')+1));
                const byteArrays = [];

                for (offset = 0; offset < byteCharacters.length; offset += 1024) {
                    const slice = byteCharacters.slice(offset, offset + 1024);

                    const byteNumbers = new Array(slice.length);
                    for (i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    const byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }
                const blob = new Blob(byteArrays, {type: contentType});
                const blobUrl = URL.createObjectURL(blob);

                window.open(blobUrl, '_blank');
            }else{
                window.open(img.src);
            }

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
// var imgs = document.evaluate('//div[@data-query]//img[not(contains(@src, "data:"))]', document, null, XPathResult.ANY_TYPE, null );
var imgs = document.evaluate('//div[@data-query]//img', document, null, XPathResult.ANY_TYPE, null );

open_visible_image(imgs);