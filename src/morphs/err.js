import { getType, locate } from 'mitsuketa'

export function getCaller (skip = 1) {
        const stackTrace = (new Error()).stack
        var callerName = stackTrace.replace(/^Error\s+/, '')
        callerName = callerName.split("\n")[skip]
        callerName = callerName.replace(/^\s+at Object./, '').replace(/^\s+at /, '').replace(/ \(.+\)$/, '')
        return callerName
}

export function throwError (fxName = 'unknown function', paramName = 'unknown parameter', expectation = 'to be defined') {
    throw `@${fxName}(): Expected parameter '${paramName}' ${expectation}`
}

export function isUndefined (paramName = '<unknown parameter>', param) {
    if ([null, undefined].indexOf(param) > -1) throwError(getCaller(2), paramName)
}

export function isFalsy (paramName = '<unknown parameter>', param) {
    if (!param) throwError(getCaller(2), paramName)
}

export function isNoneOf (paramName = '<unknown parameter>', param, contains = []) {
    if (contains.indexOf(param) === -1) throwError(getCaller(2), paramName, 'to be any of' + JSON.stringify(contains))
}

export function isAnyOf (paramName = '<unknown parameter>', param, contains = []) {
    if (contains.indexOf(param) > -1) throwError(getCaller(2), paramName, 'not to be any of' + JSON.stringify(contains))
}

export function isNotType (paramName = '<unknown parameter>', param, type = '') {
    if (getType(param) !== type.toLowerCase()) throwError(getCaller(2), paramName, 'to be type ' + type.toLowerCase())
}

export function isAnyTypeOf (paramName = '<unknown parameter>', param, types = []) {
    types.forEach( type => {
        if (getType(param) === type) throwError(getCaller(2), paramName, 'not to be type of ' + type.toLowerCase())
    })
}

export function missingKey (paramName = '<unknown parameter>', param, keyName = '') {
    isUndefined(paramName, param)
    if (Object.keys(param).indexOf(keyName) === -1) throwError(getCaller(2), paramName, `to contain '${keyName}' key`)
}

export function missingAnyKeys (paramName = '<unknown parameter>', param, keyNames = ['']) {
    isUndefined(paramName, param)
    const keyList = Object.keys(param)
    keyNames.forEach( keyName => {
        if (keyList.indexOf(keyName) === -1) throwError(getCaller(2), paramName, `to contain '${keyName}' key`)
    })
}

export function containsUndefined (paramName = '<unknown parameter>', param) {
    [undefined, null].forEach( value => {
        const location = locate(param, value)
        if (location) throwError(getCaller(2), paramName, `not to contain '${JSON.stringify(value)}' at ${location}`)
    })
}

export function isInvalidPath (paramName = '<unknown parameter>', param) {
    isUndefined(paramName, param)
    isNotType(paramName, param, 'string')
    isAnyOf(paramName, param, ['', '/'])
    '.$[]#'.split().forEach( invalidChar => {
        if (param.indexOf(invalidChar) > -1) throwError(getCaller(2), paramName, `not to contain invalid character '${invalidChar}'`)
    })
    if (param.match(/\/{2,}/g)) throwError(getCaller(2), paramName, 'not to contain consecutive forward slash characters')
}

export function isInvalidWriteData (paramName = '<unknown parameter>', param) {
    isUndefined(paramName, param)
    containsUndefined(paramName, param)
}