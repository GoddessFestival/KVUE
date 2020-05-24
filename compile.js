class Compile {
    constructor(el, vm) {
        this.$vm = vm;   // KVue 实例
        this.$el = document.querySelector(el);   // 绑定的元素

        // 编译
        if (this.$el) {
            // 转换内部内容为片段Fragment
            this.$fragment = this.node2Fragment(this.$el);
            // 执行编译
            this.compile(this.$fragment);
            // 将编译完的html结果追加至$el
            this.$el.appendChild(this.$fragment);

        }
    }
    // 将宿主元素中代码拿出来遍历，这样做比较高效
    node2Fragment(el) {
        const fragment = document.createDocumentFragment();
        // 将el中所有子元素搬家至frag中
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
    compile(node) {
        // 找到并替换
        const childNodes = node.childNodes;
        Array.from(childNodes).forEach(node => {
            // 类型判断
            if (this.isElement(node)) {
                // 元素
                console.log('编译元素' + node.nodeName)

            } else if (this.isInterpolation(node)) {
                // 文本
                // console.log('编译文本' + node.textContent)
                this.compileText(node);
            }

            // 递归子元素
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node);
            }
        })
    }
    compileText(node) {
        console.log(RegExp.$1);
        // this.textUpdater(node, this.$vm.$data[RegExp.$1])
        this.update(node, this.$vm, RegExp.$1, "text");


    }
    // 更新函数
    update(node, vm, exp, dir) {
        const updaterFn = this[dir + 'Updater'];
        // 初始化
        updaterFn && updaterFn(node, this.$vm[exp]);
        // 依赖收集
        new Watcher(vm, exp, function (value) {
            updaterFn && updaterFn(node, value)
        })
    }
    textUpdater(node, value) {
        node.textContent = value;
    }

    isElement(node) {
        return node.nodeType === 1;
    }
    // 插值文本
    isInterpolation(node) {
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
    }

}