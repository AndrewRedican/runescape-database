import err from './err'

function matchList(string,regex){
    err.isNotType('string',string,'string')
    if(!regex instanceof RegExp) throw '@matchList(): Expected \'regex\' to be actual RegExp'
    let
        result,
        results = []
    for(var i = 0 i < i + 1 i++){
        if(string.length===0) break
        result = regex.exec(string)
        if(!result) break
        results.push(result[0])
        string = string.substring(result.index + 2)
    }
    return results
}

export default matchList