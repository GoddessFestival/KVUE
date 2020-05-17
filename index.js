/* 
* KVUE class类
* 
* KVue
*
* */
class KVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data; // $data 实例属性
        this.observe(options.data);

        // 模拟一下watcher创建
        new Watcher();
        this.$data.name;
        new Watcher();
        this.$data.foo.bar;
    }
    observe(value) {
        // value不存在或不是预期类型
        if (!value || typeof value != "object") {
            return;
        }
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key]);
        })
    }

    defineReactive(obj, key, val) {
        // 递归遍历
        this.observe(val);

        const dep = new Dep(); // dep 相对独立（有几个key就有几个dep）

        // 数据劫持
        Object.defineProperty(obj, key, {
            get() {
                // console.log("触发get函数");
                Dep.target && dep.addDep(Dep.target);
                return val;
            },
            set(newValue) {
                // console.log(`${key}属性值为：${newValue}`);
                val = newValue;
                // 触发更新
                dep.notify();
            }
        })
    }

}

// 管理watcher - 收集Watcher对象
class Dep {
    constructor() {
        // 存放若干依赖（watcher）
        this.deps = [];
    }
    addDep(watcher) {
        this.deps.push(watcher);
    }
    notify() {
        // dep -> watcher
        this.deps.forEach(dep => dep.updata())
    }
}

// 数据更新
class Watcher {
    constructor() {
        Dep.target = this;
    }
    // 执行数据更新
    updata() {
        console.log("数据更新了")
    }
}









var app = new KVue({
    data: {
        name: "KVUE",
        foo: {
            bar: "This is bar..."
        }
    }
})

// 当查询或设置属性值会触发钩子函数（get，set）
app.$data.name;
app.$data.name = "This is KVue";
app.$data.foo.bar = "This is bar property";
