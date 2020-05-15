/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-05-14 16:54:25
 * @LastEditors: cy
 * @LastEditTime: 2020-05-15 10:42:43
 */ 
/*
 * @Description: 
 * https://segmentfault.com/a/1190000016129036
 * @version: 
 * @Author: cy
 * @Date: 2020-05-14 09:56:53
 * @LastEditors: cy
 * @LastEditTime: 2020-05-14 16:39:54
 */
// let vdom = this.render();
// let el = createElement(vdom)
// function render() {
//     console.log('render')
//     return h(
//         'ul',
//         null,
//         h(
//             'li',
//             {style: 'color:red'},
//             '0'
//         ),
//         [1,2,3].map(i => h(
//             'li',
//             null,
//             i
//         ))
//     )
// }
console.log('hhh')
let state = { num: 5 }
let timer;
// 记录更改前的VDom
let preVDom;

var main = document.getElementById('main')
render(main)
function render(parent) {
    const vdom = view();
    preVDom = vdom;
    const element = createElement(vdom);
    parent.appendChild(element);
    timer = setInterval(() => {
        state.num += 1;
        tick(parent);
    }, 500);
}
function h(tag, props, ...children) {
    console.log('h', tag, props, children)
    return {
        tag,
        props: props || {},
        children: flatten(children) || []
    }
}
function flatten(arr) {
    console.log('flatten1', [].concat.apply([], arr))
    return [].concat.apply([], arr);
}

const nodePatchTypes = {
    CREATE: 'create node',
    REMOVE: 'remove node',
    REPLACE: 'replace node',
    UPDATE: 'update node'
}

const propPatchTypes = {
    REMOVE: 'remove prop',
    UPDATE: 'update prop'
}

// 创建dom元素
function createElement(vdom) {
    // 如果vdom是字符串或者数字类型，则创建文本节点
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    }
    const { tag, props, children } = vdom;
    console.log('vdom', tag, props, children)
    // 1 创建元素
    const element = document.createElement(tag);
    // 2 属性赋值
    setProps(element, props);
    // 3 创建子元素, 
    children.map(createElement).forEach(element.appendChild.bind(element));
    console.log('element', element)
    return element;
}
// 属性赋值
function setProps(element, props) {
    for (let key in props) {
        element.setAttribute(key, props[key]);
    }
}
function tick(element) {
    if (state.num > 20) {
        clearTimeout(timer);
        return;
    }
    const newVDom = view();
    // 生成差异对象
    const patchObj = diff(preVDom, newVDom);
}

// 生成差异对象， oldVDom为改变前的Vdom，newVDom是更改后的Vdom
function diff(oldVDom, newVDom) {
    debugger
    if (oldVDom == undefined) {
        return {
            type: nodePatchTypes.CREATE,
            vdom: newVDom
        }
    }
    // 当newVDom赋值为空，那么久删除node
    if (newVDom == undefined) {
        return {
            type: nodePatchTypes.REMOVE
        }
    }
    // 替换node
    if (typeof oldVDom !== typeof newVDom || ((typeof oldVDom === 'string' || typeof oldVDom === 'number') && oldVDom !== newVDom) || oldVDom.tag !== newVDom.tag) {
        return {
            type: nodePatchTypes.REPLACE,
            vdom: newVDom
        }
    }
    // 更新node
    if (oldVDom.tag) {
        // 比较props的变化
        // const propsDiff = 
    }
}
function getEven($n) {
    return $n
}
function view() {
    return (
        h(
            'div',
            null,
            'Hello World',
            h(
                'ul',
                null,
                [...Array(state.num).keys()].map( i => {
                    return h(
                        'li',
                        {id: i, class: `li-${i}`},
                        `第${i * state.num}`
                    )
                })
                
            )
        )
    );
}
// let b = []
// let a = [1,2,3,4,5];
// let push = b.push.bind(b);
// a.map(getEven).forEach( push)
// // for (let i = 0; i < a.length; i++) {
// //     push(a[i])
// // }
// console.log('偶数集合', b)


/***/ })
/******/ ]);