import {Element, render} from './element';
import {setAttr} from './utils';
let allPathes;
// let index = 0;

function patch(node, patches) {
    console.log(node);
    var walker = {index: 0}
    allPathes = patches;
    walk(node, walker, allPathes);
}

// function walk(node) {
//     let currentPatch = allPathes[index++];
//     let childrenNodes = node.childrenNodes;
//     childrenNodes.forEach(child => walk(child));
//     if (currentPatch) {
//         doPatch(node, currentPatch)
//     }
// }

function walk (node, walker, patches) {
    var currentPatches = patches[walker.index]
  
    var len = node.childNodes
      ? node.childNodes.length
      : 0
    for (var i = 0; i < len; i++) {
      var child = node.childNodes[i]
      walker.index++
      walk(child, walker, patches)
    }
  
    if (currentPatches) {
        doPatch(node, currentPatches)
    }
  }
function doPatch(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for(let key in patch.attrs){
                    let value = patch.attrs[key];
                    if(value){
                        setAttr(node, key, value);
                    }else {
                        node.removeAttribute(key);
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patches.newNode);
                node.parentNode.replaceChild(newNode, node);
                break;
            case 'REMOVE': 
                node.parentNode.removeChild(node);
                break;
            default: 
                break;
        }
    })
}

export default patch;