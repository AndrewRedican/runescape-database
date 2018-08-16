import err from './err'

function insertString(original, substring, position) {
    err.isUndefined('original',original)
    err.isUndefined('substring',substring)
    err.isUndefined('position',position)
    err.isNotType('original',original,'string')
    err.isNotType('substring',substring,'string')
    err.isNotType('position',position,'number')
    return [original.slice(0, position), substring, original.slice(position)].join('')
}

export default insertString