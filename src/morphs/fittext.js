import err from './err';

function fitText(uniqueID,reduce=4){
    err.isNotType('uniqueID',uniqueID,'string');
    err.isNotType('reduce',reduce,'number');
    if(!reduce) return;
    const targetElement = document.getElementById(uniqueID);
    err.isUndefined('targetElement',targetElement);
    const
        scrollHeight = targetElement.scrollHeight,
        offsetHeight = targetElement.offsetHeight,
        difference   = scrollHeight - offsetHeight,
        fontSize     = parseFloat(targetElement.style['font-size']);
    if (difference > 0)
        if(fontSize - reduce > 0)
            targetElement.style['font-size'] = (fontSize - reduce) + 'px';
        else
            if(fontSize - difference > 0)
                targetElement.style['font-size'] = (fontSize - difference) + 'px';
};

export default fitText;