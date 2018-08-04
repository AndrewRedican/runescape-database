import err from './err';

function convertDateMillisecondsToString(milliseconds){
    err.isNotType(arguments,'milliseconds',milliseconds,'number');
    const parts = (new Date(milliseconds)).toString().split(' ');
    return [parts[3],'|',parts[1],parts[2]].join(' ');
}

export default convertDateMillisecondsToString;