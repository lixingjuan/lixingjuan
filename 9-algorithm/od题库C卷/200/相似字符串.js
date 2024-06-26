// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

/**
 * 考察点：
 * 1. 具有传递性的相似映射关系，使用“并查集”数据结构实现
 * */

class UnionFind {
  constructor() {
    this.parent = {};
  }

  // 确保元素存在于并查集中，不存在则添加
  ensure(element) {
    if (!(element in this.parent)) {
      this.parent[element] = element;
    }
  }

  find(element) {
    this.ensure(element); // 确保元素存在
    while (this.parent[element] !== element) {
      element = this.parent[element];
    }
    return element;
  }

  union(a, b) {
    this.ensure(a);
    this.ensure(b);
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA !== rootB) {
      this.parent[rootB] = rootA;
    }
  }

  isConnected(a, b) {
    return this.find(a) === this.find(b);
  }
}

// 使用示例
const uf = new UnionFind();

// 添加相似关系
uf.union("五", "5");
uf.union("五", "⑤");
// 后续添加的相似关系
uf.union("五", "伍");
// 再添加一组关系
uf.union("的", "de");
uf.union("的", "得");

// 检查两个元素是否相似
console.log(uf.isConnected("5", "伍")); // true
console.log(uf.isConnected("de", "得")); // true
console.log(uf.isConnected("5", "de")); // false

// 检查两个元素是否相似
console.log(uf.isConnected("5", "伍") === true);
console.log(uf.isConnected("⑤", "wu") === true);
console.log(uf.isConnected("5", "7") === false);

// // Map<char, 和他相似的，但是不包括他本身的数组>
// const sameStrMap = new Map(); // Map<key, [key1,key2]>
// // 林汉达上下五千年
// // 林汉达上下5千年
// // 五 5 ⑤ 伍 wu
// const addSameStrToMap = (sameStr) => {
//   const arr = sameStr.split(" ");

//   if (sameStr === "(***)") {
//     sameStrMap.set("*", []);
//     return;
//   }

//   // 遍历每个字符，增加他的相似数组元素
//   for (let i = 0; i < arr.length; i++) {
//     const ele = arr[i];

//     // 比如第二组arr[A,B,c], 之前已经有了A，那B,c, 都要加入到A之前的相似数组中
//     // B,c的相似数组
//     if (sameStrMap.has(ele)) {
//       const oldArr = sameStrMap.get(ele);
//       sameStrMap.set(
//         ele,
//         Array.from(new Set([...oldArr, ...arr])).filter((it) => it !== ele)
//       );

//       // 之前旧的数据。例如 [5,1]
//       oldArr.forEach((inner) => {
//         if (sameStrMap.has(inner)) {
//           sameStrMap.set(
//             inner,
//             Array.from(
//               new Set([...(sameStrMap.get(inner) || []), ...arr].filter((it) => it !== inner))
//             )
//           );
//         }
//       });
//       continue;
//     } else {
//       sameStrMap.set(ele, Array.from(new Set(arr.filter((it) => it !== ele))));
//     }

//     // TODO: 相似的传递性还没处理
//     // A 5 1
//     // A [5, 1]
//     // 5 [A, 1]
//     // 1 [A, 5]

//     // A B c
//   }
// };

// const demo = (str1, str2) => {
//   const sameResult = []; // 相似的结果
//   const diffResult = []; // 不相同的结果

//   // TODO: 其中一个字符串为空

//   // 幸福de猪的个人专辑
//   // 幸福的猪的个人专辑
//   // 得 的
//   // 得 de
//   // 两个字符串进行遍历
//   let left = 0;
//   const len = Math.max(str1.length, str2.length);
//   console.log(len);

//   while (left < len) {
//     // TODO: 如果指针已经超出某个边界
//     const a = str1[left];
//     const b = str2[left];

//     console.log({ a, b });

//     if (a === b) {
//       left++;
//       continue;
//     }

//     // 不相等的情况需要考虑，
//     // 1. 有相似字符
//     if (sameStrMap.has(str1[left])) {
//       const other = sameStrMap.get(str1[left]).find((it) => {
//         return str2[left].substring(left).indexOf(it);
//       });
//       console.log(other);
//       if (other > 0) {
//         sameResult.push(`${str1[left]} ${other}`);
//         left += other.length;
//       } else {
//         left++;
//       }
//       continue;
//     }

//     // 2. 有相似字符
//     if (sameStrMap.has(str1[left])) {
//       const other = sameStrMap.get(str1[left]).find((it) => {
//         return str1[left].substring(left).indexOf(it);
//       });
//       console.log(other);
//       if (other > 0) {
//         sameResult.push(`${str1[left]} ${other}`);
//         left += other.length;
//       } else {
//         left++;
//       }
//       continue;
//     }

//     // 3. 有*， 需要找到下一个相等的字符串，*需要匹配一段
//     if (sameStrMap.has("*")) {
//       let fastP = left;
//       // 有可能已经出边界
//       while (str1[fastP] !== str2[fastP] && fastP < Math.max(str1.length, str2.length)) {
//         fastP++;
//       }
//       // fastP指针，寻找下一个相同的字符串
//       sameResult.push(`${str1.substring(left, fastP)} ${str2.substring(left, fastP)}`);
//       left = fastP;

//       continue;
//     }

//     // 4. 完全不相同（没相似、没有*）
//     let fastP = left;
//     while (str1[fastP] !== str2[fastP] && fastP < Math.max(str1.length, str2.length)) {
//       fastP++;
//     }
//     left = fastP;
//     diffResult.push(`${str1.substring(left, fastP)} ${str2.substring(left, fastP)}`);
//   }

//   if (sameResult.length > 0) {
//     console.log("True");
//     sameResult.forEach((it) => {
//       console.log(it);
//     });
//   } else if (diffResult.length > 0) {
//     console.log("False", diffResult);
//     diffResult.forEach((it) => {
//       console.log(it);
//     });
//   }
// };

// // 幸福de猪的个人专辑
// //
// ["得 的", "得 de"].forEach((it) => addSameStrToMap(it));
// console.log(sameStrMap);

// demo("幸福de猪的个人专辑", "幸福的猪的个人专辑");
