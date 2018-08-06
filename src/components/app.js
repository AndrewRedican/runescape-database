import React, { Component }   from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import Background             from './background';
import Header                 from './header';
import Content                from './content';
import Block                  from './block';
import UserAccess             from './useraccesscontroller';
import { initialFetch }       from '../actions';
import err                    from '../morphs/err';

class App extends Component {
    constructor(props){
        super(props);
        err.missingKey('this.props',this.props,'initialFetch');
    }
    componentWillMount(){
        this.props.initialFetch();
    }
    render(){
        return(
            <Background>
                <Header style = {{ color : '#FBFFFE' }}>
                    <Block
                        name  = 'title'
                        style = {{ 
                            width      : '50%',
                            height     : '40px',
                            fontSize   : '30px',
                            padding    : '3px',
                            left       : 0
                        }}
                    >
                        RuneScape Database
                    </Block>
                    <Block
                        name  = 'access'
                        style = {{ 
                            width   : '50%',
                            height  : '40px',
                            padding : '3px',
                            right   : 0
                        }}
                    >
                        <UserAccess/>
                    </Block>
                </Header>
                <Content>
                    Content Goes Here
                </Content>
            </Background>
        );
    }
}

function mapDispatchToProps(dispath){
    return bindActionCreators({
        initialFetch : initialFetch
    }, dispath);
}

export default connect(null,mapDispatchToProps)(App);