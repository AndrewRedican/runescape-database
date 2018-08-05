import React, { Component }   from 'react';
import Background             from './background';
import Header                 from './header';
import Content                from './content';
import Block                  from './block';
import { testFx }             from '../actions';

class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Background>
                <Header style = {{ color : '#FBFFFE' }}>
                    <Block
                        style = {{ 
                            width      : '50%',
                            height     : '40px',
                            fontSize   : '30px',
                            padding    : '3px'
                        }}
                    >
                        RuneScape Database
                    </Block>
                    <Block
                        style = {{ 
                            width   : '50%',
                            height  : '40px',
                            padding : '3px'
                        }}
                    >

                    </Block>
                </Header>
                <Content>
                    Content Goes Here
                </Content>
            </Background>
        );
    }
}

export default App;