import { Vue } from './vue.min.js';
new Vue({
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