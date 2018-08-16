import err from './err'

class AtomicUpdate {
	constructor (DB, suppressChecks) {
		err.isUndefined('DB',DB)
		this.DB             = DB
		this.data           = {}
		this.suppressChecks = Boolean(suppressChecks)
	}
	remove(path){
		err.isInvalidPath('path',path)
		this.data = this.data.filter(entryPath => !entryPath.startsWith(path))
		return this
	}
	remove(path, allowRootKey){
		err.isInvalidPath('path',path)
		if (this.suppressChecks || allowRootKey || (path && path.lastIndexOf('/') > 0)) this.data[path] = null
		return this
	}
	write(path, data, allowRootKey){
		err.isInvalidPath('path',path)
		if (this.suppressChecks || allowRootKey || (path && path.lastIndexOf('/') > 0)) this.data[path] = data
		return this
	}
	commit(){
	  	return this.DB.ref().update(this.data).then(() => this.data.length)
	}
}

export default AtomicUpdate