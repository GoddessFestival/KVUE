// reactive 为发布者
// dep - 订阅者 （当本地状态data改变时，通知dep）
// (顾客 - 订单dep - 厨师)
// watcher 实际执行的函数或行为

class Dep {
    constructor() {
        // dep 当数据改变时需要执行的列表
        this.deps = [];
    }
    addDep(watcher) {
        this.deps.push(watcher);
    }
    notify() {
        this.deps.forEach(watcher => watcher.updata())
    }
}

// Watcher maybe called action is better
class Watcher {
    constructor() {
        Dep.target = this;
    }
    // 执行数据更新
    updata() {
        console.log("数据更新了")
    }
}

// 测试
let dep1 = new Dep();
let watcher1 = new Watcher();
dep1.addDep(Dep.target); //把watcher实例放到deps里面
let watcher2 = new Watcher();
dep1.addDep(Dep.target); //把watcher实例放到deps里面
let watcher3 = new Watcher();
dep1.addDep(Dep.target); //把watcher实例放到deps里面
dep1.notify();