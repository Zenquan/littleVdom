//判断数据类型
let type = obj => Object.prototype.toString.call(obj).slice(8, -1);

let isString = list => type(list) === 'String';

let setAttr = (node, key, value) => {
  switch (key) {
    case 'value':
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value;
      } else {
        node.setAttribute(key, value);
      }
      break;
    case 'style':
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}
export {type, isString, setAttr};