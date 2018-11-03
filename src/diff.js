import {isString} from './utils';

function diff(oldTree, newTree){
    let patches = {};
    let index = 0;
    walk(oldTree, newTree, index, patches);
    return patches;
}
function diffAttr(oldAttrs, newAttrs){
    let patch = {};
    for(let key in oldAttrs){
        if(oldAttrs[key]!==newAttrs[key]){
            patch[key] = newAttrs[key];
        }
    }
    for(let key in newAttrs){
        if(!oldAttrs.hasOwnProperty(key)){
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}
const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
function diffChildren(oldChildren, newChildren, patches){
    oldChildren.forEach((child, idx)=>{
        walk(child, newChildren[idx], ++Index, patches);
    })
}
function walk(oldNode, newNode, index, patches){
    let currentPatch = [];
    if(!newNode){
        currentPatch.push({type: REMOVE, index});
    }else if(isString(oldNode)&&isString(newNode)){
        if(oldNode!==newNode){
            currentPatch.push({type: TEXT, text: newNode})
        }
    }else if(oldNode.type === newNode.type){
        let attrs = diffAttr(oldNode.props, newNode.props);
        // console.log(attrs)
        if(Object.keys(attrs).length>0){
            currentPatch.push({type: ATTRS, attrs})
        }
        diffChildren(oldNode.children, newNode.children, patches);
    }else {
        currentPatch.push({type: REPLACE, newNode})
    }
    if(currentPatch.length>0){
        patches[index] = currentPatch;
        //console.log(patches);
    }
}

export default diff;