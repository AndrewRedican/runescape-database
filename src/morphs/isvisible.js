function getDimensions(node){
    const specs = node.getBoundingClientRect();
    return {
        bottom : specs.bottom,
        height : specs.height,
        left   : specs.left,
        right  : specs.right,
        top    : specs.top,
        width  : specs.width,
        x      : specs.x,
        y      : specs.y
    };
};

function getStyles(node){
    if (window.getComputedStyle) return document.defaultView.getComputedStyle(node,null);
    if (node.currentStyle) return node.currentStyle;
};

function getRelevantStyles(node){
    const styles = getStyles(node);
    return {
        opacity     : styles.opacity,
        display     : styles.display,
        visibility  : styles.visibility,
        overflow    : styles.overflow,
        overflowX   : styles.overflowX,
        overflowY   : styles.overflowY,
        zIndex      : styles.zIndex,
        heightStyle : styles.height,
        widthStyle  : styles.width
    };
};

function nodeTypeIntToCategory(number){
    switch(number){
        case 1  : return 'element';
        case 3  : return 'text';
        case 7  : return 'processing instruction';
        case 8  : return 'comment';
        case 9  : return 'document';
        case 10 : return 'document type';
        case 11 : return 'document fragment';
        default : return 'unknown';
    };
};

function getRelevantAttributes(node){
    return {
        id           : node.getAttribute('id'),
        offsetHeight : node.offsetHeight,
        offsetWidth  : node.offsetWidth,
        offsetTop    : node.offsetTop,
        offsetLeft   : node.offsetLeft,
        scrollTop    : node.scrollTop,
        scrollLeft   : node.scrollLeft,
        type         : nodeTypeIntToCategory(node.nodeType)
    };
};

function forEachContainingElement(node,callback){
    while(node.parentNode !== null){
        callback(node);
        node = node.parentNode;
    };
};

function getElementSpecs(node){
    let specs = [];
    forEachContainingElement(node, N => {
        specs.push({
            ...getDimensions(N),
            ...getRelevantStyles(N),
            ...getRelevantAttributes(N)
        });
    });
    return specs; 
};

function nodeInDocument(node) {
    while (node = node.parentNode) if (node == document) return true;
    return false;
};

function isVisible(node){
    if(!nodeInDocument(node)) return false;
    const specs = getElementSpecs(node);
    const initialSpec = specs[0];
    if(initialSpec.type==='document') return true;
    let result = true;
    for(var i = 0; i < specs.length; i++){
        const { opacity, display, visibility } = specs[i];
        if ('0'===opacity||'none'===display||'hidden'===visibility) return false;
    };
    for(var i = 1; i < specs.length; i++){
        const { top, bottom, left, right, offsetHeight, offsetWidth, overflow, overflowX, overflowY } = specs[i];
        if(initialSpec.bottom < top || initialSpec.top > bottom)
        if([overflow,overflowX].indexOf('visible')===-1)
        if(offsetHeight!==0) return false;
        if(initialSpec.right < left || initialSpec.left > right)
        if([overflow,overflowY].indexOf('visible')===-1)
        if(offsetWidth!==0) return false;
    };
    return result;
};


export default isVisible;