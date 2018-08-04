import err from './err';

function deleteCharAt(string, position) {
    err.isUndefined(arguments,'string',string);
    err.isUndefined(arguments,'position',position);
    err.isNotType(arguments,'string',string,'string');
    err.isNotType(arguments,'position',position,'number');
    let newString = '';
    string.split('').forEach((char,i) => { if(i!==position) newString += char; });
    return newString;
}

export default deleteCharAt;