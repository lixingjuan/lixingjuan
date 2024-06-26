import "./style.css";
import "./style.less";
import Data from "./assets/data.xml";
import Notes from "./assets/data.csv";
import toml from "./assets/data.toml";
import yaml from "./assets/data.yaml";
import json5 from "./assets/data.json5";

document.body.innerText = "hello, I'm body";

document.body.classList.add("hello");

// 测试自定义数据文件的加载
console.log(Data);
console.log(Notes);

console.log(toml.title);
console.log(toml.owner.name);

console.log(yaml.title);
console.log(yaml.owner.name);

console.log(json5.title);
console.log(json5.owner.name);

// 测试字体文件的加载
const div = document.createElement("div");
div.classList.add("icon");
div.innerHTML = "&#xed72;";
document.body.appendChild(div);
