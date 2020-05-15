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

__webpack_require__(1);
module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_min_js__ = __webpack_require__(2);

new __WEBPACK_IMPORTED_MODULE_0__vue_min_js__["a" /* Vue */]({
    el: '#wrap',
    data: {
        form: '这是form的值',
        test: '<strong>我是粗体</strong>',
        value1: 1,
        value2: 2,
        value3: {
            name: 'chenyin'
        },
        inputValue: 3,
        input2Value: 2,
        test: '<h1 style="color:red">我是标题</h1>'
    },
    methods: {
        changeValue() {
            console.log(this.form);
            this.input2Value = 1;
            this.form = '值被我改变了';
        }
    }
})

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vue; });
class Vue {
    constructor(options) {
       this.$el = document.querySelector(options.el);
       let data = this.data = options.data;
        // 代理data，使其能直接this.xxx的方式访问data，正常的话需要this.data.xxx    
       Object.keys(data).forEach(key => {
           console.log('keys', key);
           this.proxyData(key);
       })
        // 事件方法    
       this.methods = options.methods;
       this.watcherTasks = {}, //需要监听的事件列表
        // 给data设置拦截器，当设置或者读取data值的时候执行处理方法    
       this.observer(data);
       this.data.form= '111';
       this.data.form;
        //    解析dom
       this.compile(this.$el);
       console.log('constructor', this.$el, data, this.methods)
    }
    proxyData(key) {
        let that = this;
        // 这里把key存入this里面，使this可以之前访问key
        Object.defineProperty(that, key, {
            configurable: false,
            enumerable: true,
            get() {
                return that.data[key];
            },
            set(newVal) {
                that.data[key] = newVal;
            }
        })
    }
    observer(data) {
        console.log('observe')
        let that = this;
        Object.keys(data).forEach(key => {
            let value = data[key];
            this.watcherTasks[key] = [];
            Object.defineProperty(data, key, {
                configurable: false,
                enumerable: true,
                get() {
                    console.log('get')
                    return value;
                },
                set(newVal) {
                    console.log('set', this.watcherTasks)
                    if (newVal !== value) {
                        value = newVal;
                        // 批量更新视图
                        that.watcherTasks[key].forEach(task => {
                            task.update();
                        })
                    }
                }
            })
            console.log('observer', value);
        })
    }
    compile(el) {
        // 获取到wrap根节点下面的所有子节点
        var nodes = el.childNodes; 
        for (let i = 0;i < nodes.length; i++) {
            const node = nodes[i];
            console.log('compile', node);
            if (node.nodeType === 3) {
                // 若是text,若text节点下的没有文字内容则结束当前循环，若text节点有文字
                // 内容则执行compileText方法
                var text = node.textContent.trim();
                if (!text) continue;
                this.compileText(node, 'textContent');
                console.log('nodeType', node)
            } else if (node.nodeType === 1) {
                /**
                 * 若nodeType==1代表当前节点是元素节点，那么可能他们是有子节点的，所以要递归
                 * 它的子节点，找到子节点的纯文本节点
                 */
                if (node.childNodes.length > 0) {
                    this.compile(node);
                }
                if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
                    // 当时input或者是textArea组件，元素中含有v-model的时候，这个v-model其实是双向绑定了data中的
                    // 某个值，当我们在输入框中修改值的时候会同步修改data中的这个值，
                    node.addEventListener('input', (() => {
                        let attrVal = node.getAttribute('v-model');
                        this.watcherTasks[attrVal].push(new Watcher(node, this, attrVal, 'value'));
                        node.removeAttribute('v-model');
                        return () => {
                            this.data[attrVal] = node.value;
                        }
                    })())
                }
                if (node.hasAttribute('v-html')) {
                    let attrVal = node.getAttribute('v-html');
                    this.watcherTasks[attrVal].push(new Watcher(node, this, attrVal, 'innerHTML'));
                    node.removeAttribute('v-html');
                }
                this.compileText(node, 'innerHTML');
                if (node.hasAttribute('@click')) {
                    let attrVal = node.getAttribute('@click');
                    node.removeAttribute('@click');
                    node.addEventListener('click', e => {
                        this.methods[attrVal] && this.methods[attrVal].bind(this)();
                    })
                }
            }
        }
        console.log('compile', nodes)
    }
    compileText(node, type) {
        console.log('{{}}', node);
        // 匹配文字中是否有{{}}双向绑定占位符
        let reg = /\{\{(.*?)\}\}/g, txt = node.textContent;
        if (reg.test(txt)) {
            // 这个replace可以循环遍历出满足reg表达式的项，matched是原始值，value是去掉
            // 正则匹配项后提取出来的值,下面这段代码的意思是把所有以双括号占位符的字段存入
            // 订阅器中为以后页面字段刷新做准备  
            node.textContent = txt.replace(reg, (matched, value) => {
                console.log('replace', matched, value);
                let tpl = this.watcherTasks[value] || [];
                tpl.push(new Watcher(node, this, value, type));
                // 这里有以"."隔开的基本就可以确定就是一个对象的形式，比如：
                // value3: { name: 'chenyin' },这个时候我们在模板中访问就是
                // {{value3.name}}, 我们如何去取值呢？首先我们要去判断模板中的
                // 值是不是obj.key的方式，我直接用value.split('.').length就可以
                // 知道，若长度为1，那么就是一个字面值，直接this.value就行。如length大于1
                // 的话那么就是对象取键值的方式，我们用v存一下临时值，在一开始的时候我们把
                // this.val这个对象赋值给v,第二次的时候这个v就是一个obj对象，第二次循环的
                // 时候v[val]会赋值给v这样就实现了对象中键的值赋值给v并赋值给textContent
                if (value.split('.').length > 1) {
                    let v = null;
                    value.split('.').forEach((val, i) => {
                        v = !v ? this[val]: v[val];
                    })
                    return v;
                } else {
                    return this[value];
                }
            })
        }
    }
}

class Watcher {
    /**
     * el是当前节点node, vm是执行上下文this,这个this就是Vue的实例，value是匹配到的值，type是节点类型
     */
    constructor(el, vm, value, type) {
        this.el = el;
        this.vm = vm;
        this.value = value;
        this.type = type;
        this.update();
        console.log('Watcher', el)
    }
    // 更新元素中文本的内容
    update() {
        // this.type这里是textContent,也就是节点中的文本内容，this.el是一个节点
        // this.el[this.type]的意思就是获取到这个节点的文本内容，this.vm.data就是
        // Vue实例中的data属性，this.value就是dom节点中以{{}}包裹的占位符，比如{{value}},
        // 这里的{{value}}具体的值是在data中的，this.vm.data[value]就是从data中取值，并把
        // 这个值赋值给相应节点
        this.el[this.type] = this.vm.data[this.value];
    }
}



/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
 * @Description: 
 * @version: 
 * @Author: cy
 * @Date: 2020-05-14 16:54:25
 * @LastEditors: cy
 * @LastEditTime: 2020-05-14 16:54:48
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
this.render(document.body);
function render(parent) {
    const vdom = view();
    const element = createElement(vdom);
    parent.appendChild(element);
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
                h(
                    'li',
                    {id: 1, class: 'li-1', style: 'color:red'},
                    1
                )
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