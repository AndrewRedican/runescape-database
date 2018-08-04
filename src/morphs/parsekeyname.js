function parseKeyName(keyName=''){
    let string = keyName, newString = '';
    if(keyName==='') return '';
    if(typeof keyName !== 'string') string = keyName.toString();
    for(var i = 0; i < string.length; i++){
        let char = string.charAt(i);
        if(i===0) char = char.toUpperCase();
        else 
            if(char==='_') char = ' ';
            else{
                let prevChar = ''; if(i!==0) prevChar = string.charAt(i - 1);
                if(char===char.toUpperCase()){
                    if(char==='D'){
                        if(prevChar!=='I') char = ' ' + char;
                    } else
                        if(prevChar==='_') char = char.toUpperCase();
                            else char = ' ' + char;
                }
                else
                    if(prevChar===' ') char = char.toUpperCase();
            }
        newString += char;
    }
    return newString;
};


export default parseKeyName;