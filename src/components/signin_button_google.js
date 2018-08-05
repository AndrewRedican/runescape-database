import React, { Component }     from 'react';
import Block                    from './block';
import { googleAuthentication } from '../actions/firebase';

class GoogleLogin extends Component{
    constructor(props){
        super(props);
        this.state        = { focused : false };
        this.onMouseEnter = this.onMouseEnter   .bind(this);
        this.onMouseLeave = this.onMouseLeave   .bind(this);
        this.onClick      = this.onClick        .bind(this);
    }
    render(){
        const { onMouseEnter, onMouseLeave, onClick } = this;
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
        );
    }
    onMouseEnter(){
        this.setState({ focused : true });
    }
    onMouseLeave(){
        this.setState({ focused : false });
    }
    onClick(){
        googleAuthentication();
    }
}

export default GoogleLogin;