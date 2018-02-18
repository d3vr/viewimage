if (typeof window.isElementVisible === 'undefined') {
    window.isElementVisible = isElementVisiblePolyfill;
}

// Handy function from StackOverflow: https://stackoverflow.com/a/15203639/2733526
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

var imgNames = document.querySelectorAll("#irc_cc>div[data-item-id]");
imgNames.forEach(function(img){
    if(isElementVisible(img)){
        var img_json = JSON.parse(document.querySelector("img[name='"+img.dataset.itemId+"']").parentNode.nextSibling.childNodes[0].nodeValue);
        window.open(img_json.ou);
    }
});

var imgDatas = document.querySelectorAll(".irc_mut");
var imgData = imgDatas.forEach(function(imgData){
    if(isElementVisible(imgData)){
		var image = new Image();
        image.src = imgData.currentSrc;

        var w = window.open("");
        w.document.write(image.outerHTML);
    }
});
