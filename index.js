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
        // new Watcher();
        // this.$data.name;
        // new Watcher();
        // this.$data.foo.bar;
        new Compile(options.el, this);
        if (options.created) {
            options.created.call(this);
        }
    }
    observe(value) {
        // value不存在或不是预期类型
        if (!value || typeof value != "object") {
            return;
        }
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key]);
            // 代理data中的属性到vue属性
            this.proxyData(key);
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
    proxyData(key) {
        Object.defineProperty(this, key, {
            get() {
                return this.$data[key];
            },
            set(newVal) {
                this.$data[key] = newVal;
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
    constructor(vm, key, cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;


        // 将当前watcher实例指定到Dep
        Dep.target = this;
        this.vm[this.key]; // 触发getter，添加依赖
        Dep.target = null;
    }
    // 执行数据更新
    updata() {
        console.log("数据更新了")
        this.cb.call(this.vm, this.vm[this.key]);
    }
}









// var app = new KVue({
//     data: {
//         name: "KVUE",
//         foo: {
//             bar: "This is bar..."
//         }
//     }
// })

// // 当查询或设置属性值会触发钩子函数（get，set）
// app.$data.name;
// app.$data.name = "This is KVue";
// app.$data.foo.bar = "This is bar property";


