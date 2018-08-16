import { isNotType } from '../../morphs/err'

function cloudFunctionNode ( pathName, name, description, enabled=true ) {
    isNotType('pathName',pathName,'string')
    isNotType('name',name,'string')
    isNotType('description',description,'string')
    isNotType('enabled',enabled,'boolean')
    this.path = `system/process/cloudFunctions/tasks/${pathName}`
    this.default = {
        name         : name,
        description  : description,
        enabled      : enabled,
        lastExecuted : false,
        lastModified : false,
        logs: {
            count : false,
            data  : false,
            first : false,
            last  : false,
            timeframe: {
                milliseconds: false,
                text: false
            }
        },
        control : false,
        status : {
            description : false,
            progress    : false,
            running     : false
        }
    }
}

module = module.exports = cloudFunctionNode