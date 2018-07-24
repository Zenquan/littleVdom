## littleVdom

>通过造轮子来提高自己对于一些优秀开源项目的理解，比如说virtual dom，vue等。

### 组成

虚拟DOM+dom-diff算法

### 生成项目
```
npm install -g create-react-app
create-react-app littleVdom
cd littleVdom
npm start
```
TODO:

- [ ] 存在的问题（后续）

    - 平级元素之间有互换  导致重新渲染
    - 新增节点也不会更新

- [ ] 写测试代码
- [ ] 引入CommonJS、AMD、CMD
