import err from './err';

function FadeOffsetChildElements(uniqueID){
    err.isNotType('uniqueID',uniqueID,'string');
    var parentElement = document.getElementById(uniqueID);
    err.isUndefined('parentElement',parentElement);
    const 
        height_displayed = parseInt(parentElement.style.height),
        scrollTop        = parentElement.scrollTop,
        scrollBottom     = scrollTop + height_displayed,
        children         = parentElement.children,
        childCount       = children.length,
        getHeight        = ( element => {
            let style  = window.getComputedStyle(element);
            let height = ['height'] /**'padding-top', 'padding-bottom' */
                        .map((key) => parseInt(style.getPropertyValue(key), 10))
                        .reduce((prev, cur) => prev + cur);
            return height;
        }),
        height_total    = ( children => { 
            var height = 0;
            for (var i = 0; i < childCount; i++) { height += getHeight(children[i]); }
            return height;
        })(children),
        tolerance       = 0.5;
    for(var i = 0; i < childCount; i++) {
        const inputHeight = getHeight(children[i]);
        let top = 0, bottom = 0;
        for(var j = 0; j <= i; j++) { 
            const height = getHeight(children[i]);
            if(j <= i - 1) top += height;
            bottom += height;
        }
        let _offset = 0;
        if(scrollTop > top && scrollTop < bottom) _offset = scrollTop - top;
        if(scrollBottom > top && scrollBottom < bottom) _offset = bottom - scrollBottom;
        const 
            offset  = _offset / inputHeight / tolerance,
            opacity = 1 - offset;
        children[i].style.opacity = opacity;
    }
};

export default FadeOffsetChildElements;