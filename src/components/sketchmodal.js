import React, { Component } from 'react';
import Modal                from './modal';
import err                  from '../morphs/err';
import randomString         from '../morphs/randomstring';
import isDescendant         from '../morphs/isdescendant';

class SketchModal extends Component{
    constructor(props){
        super(props);
        err.missingAnyKeys(arguments,'this.props',this.props,['onExit','modalID','containerID']);
        ['modalID','containerID'].forEach( key => { err.isNotType(arguments,'this.props.'+key,this.props[key],'string'); });
        err.isUndefined(arguments,'this.props.onExit',this.props.onExit);
        this.onExit          = this.onExit      .bind(this);
        this.onKeyDown       = this.onKeyDown   .bind(this);
        this.onClick         = this.onClick     .bind(this);
        this.mountedCssRules = [];
        this.width      = (parseInt(this.props.width)  ||800);
        this.height     = (parseInt(this.props.height) ||220);
        this.perimeter  = ((this.width + this.height) * 2) + 4;
        this.animations = {
            fade         : { '0%' : { background : 'rgba(0, 0, 0, .0)' },     '100%' : { background: 'rgba(0, 0, 0, .85)' } },
            sketch       : { '0%' : { 'stroke-dashoffset' : this.perimeter }, '100%' : { 'stroke-dashoffset' : 0 }          },
            modal_fade   : { '0%' : { 'background-color'  : 'transparent' },  '100%' : { 'background-color'  : 'white' }    },
            content_fade : { '0%' : { opacity : 0 },                          '100%' : { opacity : 1 }                      },
            slow_fade    : { 
                '0%'   : { opacity : 0    },
                '50%'  : { opacity : 0.25 },
                '100%' : { opacity : 1    }
            }
        };
        this.aSettings = {
            animationDirection      : 'normal',
            animationFillMode       : 'forwards',
            animationTimingFunction : 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        };
        const RS = randomString(10);
        this.closeID = 'modal-close-btn-' + RS;
        this.bodyID  = 'modal-body-' + RS;
    }
    render(){
        const { aSettings, width, height, perimeter, bodyID, closeID } = this;
        const { modalID, containerID } = this.props;
        return(
            <Modal
                modalID     = {modalID}
                containerID = {containerID}
            >
                <div
                    name  = 'acknowledge-confirmation-modal'
                    style = {{
                        position : 'fixed',
                        display  : 'table',
                        height   : '100%',
                        width    : '100%',
                        top      : 0,
                        left     : 0,
                        zIndex   : 1
                    }}
                >
                    <div
                        name  = 'center'
                        style = {{
                            display           : 'table-cell',
                            textAlign         : 'center',
                            verticalAlign     : 'middle',
                            animationName     : 'fade',
                            animationDuration : '0.5s',
                            animationDelay    : '0s',
                            ...aSettings,
                            ...this.props.styleCenter
                        }}
                    >
                        <div
                            name  = 'modal-body'
                            id    = {bodyID}
                            style = {{
                                display           : 'block',
                                width             : width  + 'px',
                                height            : height + 'px',
                                background        : 'white',
                                padding           : '50px',
                                display           : 'inline-block',
                                borderRadius      : '3px',
                                fontWeight        :  300,
                                position          : 'relative',
                                backgroundColor   : 'transparent',
                                animationName     : 'modal_fade',
                                animationDuration : '1s',
                                animationDelay    : '0.8s',
                                ...aSettings,
                                ...this.props.styleModalBody
                            }}
                        >
                            <span
                                id        = {closeID}
                                className = 'fa fa-close'
                                style     = {{
                                    display           : 'block',
                                    boxSizing         : 'border-box',
                                    height            : '15px',
                                    width             : '15px',
                                    margin            : '10px',
                                    position          : 'absolute',
                                    top               : '0%',
                                    right             : '0%',
                                    color             : '#F15861',
                                    cursor            : 'pointer',
                                    animationName     : 'content_fade',
                                    animationDuration : '2s',
                                    animationDelay    : '0s',
                                    ...aSettings,
                                    ...this.props.styleCloseButton
                                }}
                                onClick = {this.onExit}
                            />
                            {this.props.children}
                            <svg
                                className           = 'modal-svg'
                                width               = '100%'
                                height              = '100%'
                                preserveAspectRatio = 'none'
                                style               = {{
                                    position      : 'absolute',
                                    top           : 0,
                                    left          : 0,
                                    borderRadius  : '3px',
                                    pointerEvents : 'none'
                                }}
                            >
                                <rect 
                                    fill    = 'none'
                                    width   = '100%'
                                    height  = '100%'
                                    rx      = '3'
                                    ry      = '3'
                                    style   = {{
                                        stroke            : '#FFFFFF',
                                        strokeWidth       : '2px',
                                        strokeDasharray   : perimeter,
                                        strokeDashoffset  : perimeter,
                                        animationName     : 'sketch',
                                        animationDuration : '1s',
                                        animationDelay    : '0.3s',
                                        ...aSettings
                                    }}
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
    componentWillMount(){
        let { animations, mountedCssRules } = this;
        let
            SSS   = document.styleSheets,
            SS    = SSS[1];
        Object.keys(animations).forEach( name => {
            const animation = animations[name];
            let        rule = '@keyframes ' + name + '{';
            Object.keys(animation).forEach( step => {
                rule += step + '{';
                let properties = animation[step];
                Object.keys(properties).forEach( key => {
                    rule += key +  ':' + properties[key] + ';';
                });
                rule += '}';
            });
            rule += '}';
            const nxt = SS.cssRules.length;
            SS.insertRule(rule,nxt);
            mountedCssRules.push(nxt);
        });
    }
    componentWillUnmount(){
        let { mountedCssRules } = this;
        let
            SSS = document.styleSheets,
            SS  = SSS[1];
        mountedCssRules.forEach( index => { SS.deleteRule(SS.cssRules.length - 1); });
        mountedCssRules = [];
        window.removeEventListener('keydown', this.onKeyDown, true);
        window.removeEventListener('click', this.onClick, true);
    }
    onClick(event){
        const { bodyID, closeID } = this;
        const
            modalBody = document.getElementById(bodyID),
            child     = event.target;
        if(child.getAttribute('id')===closeID||!isDescendant(modalBody,child)) this.onExit();
    }
    onExit(){
        if('onExit' in this.props) this.props.onExit();
        else console.warn('Expected \'onExit\' event handler to be defined by parent component.');
    }
    onKeyDown(event){
        if(event.key==='Escape') this.onExit();
    }
    componentDidMount(){ 
        window.addEventListener('keydown', this.onKeyDown, true);
        window.addEventListener('click', this.onClick, true);
    }
}

export default SketchModal;