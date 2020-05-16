
//数据的调用方式：
// new KVue({
//     data:{
//         name:"KVUE"
//     }
// })

class KVue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data; // $data 实例属性
        this.observe(options.data);
    }
    observe(value) {
        // value为假或不是预期类型
        if (!value || typeof value != "object") {
            return;
        }
        Object.keys(value).forEach(key => {
            this.defineReactive(value, key, value[key]);
        })
    }
    defineReactive(obj, key, val) {
        // 循环遍历
        this.observe(val);
        // 数据劫持
        Object.defineProperty(obj, key, {
            get() {
                console.log("触发get函数");
                return val;
            },
            set(newValue) {
                console.log("触发set函数");
                console.log(`${key}属性值为：${newValue}`);
                val = newValue;
            }
        })
    }

}

var app = new KVue({
    data:{
        name:"KVUE",
        foo:{
            bar:"This is bar..."
        }
    }
})

// 当查询或设置属性值会触发钩子函数（get，set）
app.$data.name;
app.$data.name = "This is KVue";
app.$data.foo.bar = "This is bar property";
