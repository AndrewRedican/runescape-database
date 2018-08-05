import React, { Component } from 'react';
import Block                from './block';
import SignInWithGoogle     from './signin_google';

class UserAccessController extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Block
                name  = 'user-access'
                style = {{
                    right  : 0,
                    width  : '200px',
                    height : '34px'
                }}
            >
                <SignInWithGoogle/>
            </Block>
        );
    }
    componentDidMount(){

    }
}

export default UserAccessController;