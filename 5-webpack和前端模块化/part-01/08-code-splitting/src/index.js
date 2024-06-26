import _ from "lodash";
import asyncModule from "./async-module";

console.log("index", _.join(["another", "module", "hello", "world"]));

// 懒加载的实现, 点击才会加载对应的js文件
const button = document.createElement("button");
button.innerHTML = "点击执行加法运算";
button.addEventListener("click", () => {
  import(/* webpackChunkName: 'math', webpackPreload: true */ "./math.js").then(
    ({ add }) => {
      console.log(add(1, 3));
    }
  );
});
document.body.appendChild(button);
