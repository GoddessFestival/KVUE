# KVUE
模仿vuejs，实现响应式功能

## Object.defineProperty(Object,key,options) 数据劫持

## reactive.js  
遍历增加数据劫持，实现本地状态的响应


# 依赖收集和数据更新 Dependency collection and data update
## dep 依赖收集  管理watcher
## watcher update数据更新


# 模板编译compile 
## vue 模板中存在很多浏览器不识别的代码
核心逻辑：获取dom，遍历dom，获取{{}}格式的变量，以及每个dom的属性，截获k-和@开头的设置响应式