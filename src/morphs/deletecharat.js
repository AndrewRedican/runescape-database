import err from './err';

function deleteCharAt(string, position) {
    err.isUndefined('string',string);
    err.isUndefined('position',position);
    err.isNotType('string',string,'string');
    err.isNotType('position',position,'number');
    let newString = '';
    string.split('').forEach((char,i) => { if(i!==position) newString += char; });
    return newString;
}

export default deleteCharAt;