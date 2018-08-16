import React, { Component }     from 'react'
import Block                    from './block'
import err                      from '../morphs/err'

class GoogleLogin extends Component{
    constructor(props){
        super(props)
        err.missingKey('this.props',this.props,'onClick')
        this.state        = { focused : false }
        this.onMouseEnter = this.onMouseEnter   .bind(this)
        this.onMouseLeave = this.onMouseLeave   .bind(this)
        this.onClick      = this.onClick        .bind(this)
    }
    render(){
        const { onMouseEnter, onMouseLeave, onClick } = this
        return(
            <Block
                center = 'horizontally'
                style = {{
                    width           : '190px',
                    height          : '42px',
                    backgroundColor : '#D14836',
                    color           : '#FFFFFF',
                    borderRadius    : '2px',
                    padding         : '10px',
                    userSelect      : 'none'
                }}
                onMouseEnter = {onMouseEnter}
                onMouseLeave = {onMouseLeave}
                onClick      = {onClick}
            >
                <div
                    style = {{
                        height   : '100%',
                        width    : '100%',
                        position : 'relative',
                        cursor   : 'pointer'
                    }}
                >
                    <span>
                        <i className = 'fa fa-google'/>
                    </span>
                    <span> Login with Google</span>
                </div>
            </Block>
        )
    }
    onMouseEnter(){
        this.setState({ focused : true })
    }
    onMouseLeave(){
        this.setState({ focused : false })
    }
    onClick(){
        this.props.onClick()
    }
}

export default GoogleLogin