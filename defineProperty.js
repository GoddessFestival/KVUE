
// Object.defineProperty 数据劫持

const obj = {
    bar:"This is bar"
}

Object.defineProperty(obj,"bar",{
    get(){
        console.log("get 执行了")
    },
    set(newValue){
        console.log("set 执行了");
        console.log(newValue);
    }
})

obj.bar; //数据获取，触发get函数

obj.bar = "change value"; // 数据设置，触发set函数

// 数据劫持，相当于函数钩子的功能； 为数据的处理或dom操作提供了可能