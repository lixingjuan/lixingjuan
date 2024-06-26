/**
 * @题目描述
 * 一个整数可以由连续的自然数之和来表示。给定一个整数，计算该整数有几种连续自然数之和的表达式，且打印出每种表达式。
 *
 * @输入描述
 * 一个目标整数T (1 <=T<= 1000)
 *
 * @输出描述
 * 该整数的所有表达式和表达式的个数。如果有多种表达式，输出要求为：
 * 1.自然数个数最少的表达式优先输出
 * 2.每个表达式中按自然数递增的顺序输出，具体的格式参见样例。在每个测试数据结束时，输出一行”Result:X”，其中X是最终的表达式个数。
 *
 * @示例
 * 输入:
 * 9
 *
 * 输出:
 * 9=9
 * 9=4+5
 * 9=2+3+4
 * Result:3
 *
 * 说明:
 * 整数 9 有三种表示方法，第1个表达式只有1个自然数，最先输出，第2个表达式有2个自然数，第2次序输出，第3个表达式有3个自然数，
 * 最后输出。每个表达式中的自然数都是按递增次序输出的。
 * 数字与符号之间无空格
 *
 * @用例
 * 输入: 9
 * 输出:
 * 9=9
 * 9=4+5
 * 9=2+3+4
 * Result:3
 * 说明: 整数9可以通过三种不同的连续自然数序列来表示。
 *
 * @用例
 * 输入: 15
 * 输出:
 * 15=15
 * 15=7+8
 * 15=4+5+6
 * 15=1+2+3+4+5
 * Result:4
 * 说明: 整数15可以通过四种不同的连续自然数序列来表示。
 *
 * @用例
 * 输入: 1
 * 输出:
 * 1=1
 * Result:1
 * 说明: 整数1只有一种表示方法，即它自身。
 *
 * @用例
 * 输入: 10
 * 输出:
 * 10=10
 * 10=1+2+3+4
 * Result:2
 * 说明: 整数10可以通过两种不同的连续自然数序列来表示。
 *
 * @用例
 * 输入: 100
 * 输出:
 * 100=100
 * 100=18+19+20+21+22
 * 100=9+10+11+12+13+14+15+16
 * Result:3
 * 说明: 整数100可以通过三种不同的连续自然数序列来表示。
 */

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (line) => {
  const target = parseInt(line, 10);
  const result = [`${target}=${target}`];
  // 因为题目要求“自然数”，所以left和right应该从1开始
  let left = 1;
  let right = 1;
  let sum = 1;

  while (left <= target / 2) {
    if (sum > target) {
      sum -= left;
      left++;
    } else if (sum < target) {
      right++;
      sum += right;
    } else {
      // 找到目标值
      const str = Array.from({ length: right - left + 1 }, (_, index) => left + index);
      result.push(`${target}=${str.join("+")}`);
      sum -= left;
      left++;
    }
  }

  result.sort((a, b) => a.length - b.length);
  result.forEach((it) => console.log(it));
  console.log(`Result:${result.length}`);
  rl.close();
});
