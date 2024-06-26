// 引入你实现的 MyPromise
const MyPromise = require("./MyPromise");

// 适配器
const adapter = {
  // 测试套件会调用这个 deferred 方法
  deferred() {
    let resolve, reject;
    // 创建一个 promise，并暴露其 resolve 和 reject 方法
    const promise = new MyPromise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    // 返回一个包含 promise, resolve, reject 的对象
    return {
      promise,
      resolve,
      reject,
    };
  },
};

// 使适配器可供 promises-aplus-tests 使用
module.exports = adapter;
