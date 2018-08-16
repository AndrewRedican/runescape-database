import err from './err'

function trimText(text,maxLength=162,append='...'){
    err.isNotType('text',text,'string')
    err.isNotType('maxLength',maxLength,'number')
    err.isNotType('append',append,'string')
    let
        isDifferent = false,
        inset       = '',
        offset      = ''
    for(var i = 0 i < text.length i++){
        if(!isDifferent) isDifferent = i >= maxLength
        if(!isDifferent) inset += text[i]
        else offset += text[i]
    }
    return {
        original    : text,
        threshold   : maxLength,
        isDifferent : isDifferent,
        inset       : inset,
        offset      : offset,
        result      : isDifferent ? inset + append : text
    }
}

export default trimText