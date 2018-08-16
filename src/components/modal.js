import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import err                  from '../morphs/err'
import isVisible            from '../morphs/isvisible'

/**
 * Basic Build Block of UI
 * 
 * This component allows you to create modals by
 * rendering children into the DOM's body directly,
 * effectively moving the intended view at the top
 * of the hierarchy-tree, which will show at the top
 * of everything else given a particular zIndex style.
 * 
 * This component handles the mount,
 * unmount, and update of props for the element created in the DOM.
 * 
 */

class Modal extends Component{
    constructor(props){
        super(props)
        err.missingAnyKeys('this.props',this.props,['children','modalID','containerID'])
        ['children','modalID','containerID'].forEach( key => {
            err.isUndefined('this.props.' + key,this.props[key])
        })
        this._render        = this._render          .bind(this)
        this.setListener    = this.setListener      .bind(this)
        this.removeListener = this.removeListener   .bind(this)
        this.updatePosition = this.updatePosition   .bind(this)
        this.container      = document.getElementById(this.props.containerID)
        this.modalTarget    = document.createElement('div')
        this.positions      = { 
            original   : false,
            delta      : false,
            adjustment : { 
                top  : 0,
                left : 0
            }
        }
    }
    componentDidMount(){
        const
            viewportOffset = this.container.getBoundingClientRect(),
            topBase        = viewportOffset.top,
            leftBase       = viewportOffset.left
        this.modalTarget.setAttribute('id',this.props.modalID)
        this.modalTarget.style.zIndex   = 111
        this.modalTarget.style.position = 'absolute'
        this.modalTarget.style.top      = topBase  + 'px'
        this.modalTarget.style.left     = leftBase + 'px'
        document.body.appendChild(this.modalTarget)
        this.updatePosition()
        this._render()
        this.setListener('scroll',this.updatePosition)
        this.setListener('resize',this.updatePosition)
    }
    componentWillUpdate(){
        this._render()
    }
    _render(){
        const { adjustment, original } = this.positions
        const { top, left }  = this.modalTarget.style
        const vwDefined = original.vwportOffset ? true : false
        this.modalTarget.style.top  = (original.vwportOffset.top  + adjustment.top  + window.scrollY) + 'px'
        this.modalTarget.style.left = (original.vwportOffset.left + adjustment.left + window.scrollX) + 'px'
        ReactDOM.render(<div>{this.props.children}</div>,this.modalTarget)
    }
    componentWillUnmount(){
        ReactDOM.unmountComponentAtNode(this.modalTarget)
        document.body.removeChild(this.modalTarget)
        this.removeListener('scroll',this.updatePosition)
        this.removeListener('resize',this.updatePosition)
    }
    updatePosition(){
        err.missingAnyKeys('this',this,['container','positions'])
        err.isUndefined('this.container',this.container)
        err.isUndefined('this.positions',this.positions)
        err.missingAnyKeys('this.props.positions',this.positions,['original','delta','adjustment'])
        ['original','delta','adjustment'].forEach( keyName => {
            err.isUndefined('this.positions.' + keyName,this.positions[keyName])
        })
        const { container } = this
        if('onContainerNotVisible' in this.props)
        if(!isVisible(container))
        this.props.onContainerNotVisible()
        let
            vwportOffset = container.getBoundingClientRect(),
            scrolls      = [],
            node         = container,
            boundaries
        while (node != null) {
            scrolls.push({ 
                top  : (node.scrollTop||0),
                left : (node.scrollLeft||0)
            })
            node = node.parentNode
        }
        const specs = {
            scrolls      : scrolls,
            vwportOffset : vwportOffset
        }
        if(!this.positions.original){
            this.positions.original = specs
            this.positions.delta    = this.positions.original
        }
        else this.positions.delta   = specs
        if(this.positions.original.length!==this.positions.delta.length)
        throw '@updatePosition: Expected both \'this.positions.original\' and \'this.positions.delta\' to have the same number of container nodes'
        let offsetByScroll = { top : 0, left : 0 }
        if(this.positions.delta)
        if(this.positions.delta.scrolls)
        for(var i = 0; i < this.positions.delta.scrolls.length; i++){
            const
                _original = this.positions.original.scrolls[i],
                _delta    = this.positions.delta.scrolls[i]
            offsetByScroll.top  += (_original.top - _delta.top)
            offsetByScroll.left += (_original.left - _delta.left)
        }
        let offsetByResize = { top : 0, left : 0 }
        offsetByResize.top  = this.positions.delta.vwportOffset.top  - this.positions.original.vwportOffset.top  - offsetByScroll.top
        offsetByResize.left = this.positions.delta.vwportOffset.left - this.positions.original.vwportOffset.left - offsetByScroll.left
        this.positions.adjustment = {
            top  : offsetByScroll.top  + offsetByResize.top,
            left : offsetByScroll.left + offsetByResize.left
        }
        this._render()
    }
    setListener(actionType,callbackFunction) {
        err.isNotType('actionType',actionType,'string')
        err.isUndefined('callbackFunction',callbackFunction)
        window.addEventListener(actionType, callbackFunction, true) 
    }
    removeListener(actionType,callbackFunction) {
        err.isNotType('actionType',actionType,'string')
        err.isUndefined('callbackFunction',callbackFunction)
        window.removeEventListener(actionType, callbackFunction, true)
    }
    render(){ return <noscript /> }
}

export default Modal