import {setAttr} from './utils';

class Element {
    constructor(type, props, children)
    {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

function createElement(type, props, children){
    return new Element(type, props, children);
}
//render将虚拟dom转化为真实dom
function render(eleObj){
    let el = document.createElement(eleObj.type);
    for(let key in eleObj.props)
    {
        //设置属性的函数
        setAttr(el, key, eleObj.props[key]);
    }
    eleObj.children.forEach(child=>{
        child = (child instanceof Element)?render(child):document.createTextNode(child);
        el.appendChild(child);
    })
    return el;
}
function renderDom(el, target)
{
    target.appendChild(el);
}
export {createElement, render, Element, renderDom};