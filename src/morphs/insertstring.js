import err from './err';

function insertString(original, substring, position) {
    err.isUndefined(arguments,'original',original);
    err.isUndefined(arguments,'substring',substring);
    err.isUndefined(arguments,'position',position);
    err.isNotType(arguments,'original',original,'string');
    err.isNotType(arguments,'substring',substring,'string');
    err.isNotType(arguments,'position',position,'number');
    return [original.slice(0, position), substring, original.slice(position)].join('');
}

export default insertString;