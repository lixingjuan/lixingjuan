/**
 * @题目描述
 * 提取字符串中的最长合法简单数学表达式Q，字符串长度最长的，并计算表达式的值。如果没有，则返回0。
 * 简单数学表达式只能包含以下内容
 * 0-9数字，符号 +-*
 *
 * 说明:
 * 1.所有数字，计算结果都不超过long
 * 2.如果有多个长度一样的，请返回第一个表达式的结果
 * 3.数学表达式，必须是最长的，合法的
 * 4.操作符不能连续出现，如 +--+1 是不合法的
 *
 * @输入描述
 * 字符串
 *
 * @输出描述
 * 表达式值
 *
 * 补充说明:
 * @示例1
 * 输入:
 * 1-2abcd
 * 输出:
 * 1
 * 说明:
 */

function computeExpression(expression) {
  // 分割表达式为数字和运算符
  let tokens = expression.match(/(-?\d+)|[+*]|-/g);
  if (!tokens) return 0;

  // 第一步：处理乘法v
  let nums = []; // 用于存储数字和乘法的结果
  let currentNum = 0;
  let op = "+";

  for (let token of tokens) {
    if (token === "+" || token === "-" || token === "*") {
      op = token;
    } else {
      let num = parseInt(token, 10);
      switch (op) {
        case "+":
          nums.push(currentNum);
          currentNum = num;
          break;
        case "-":
          nums.push(currentNum);
          currentNum = -num;
          break;
        case "*":
          currentNum *= num;
          break;
      }
    }
  }
  nums.push(currentNum); // 添加最后一个数字或乘法结果

  // 第二步：处理加法，此时数组中只包含加法需要的数字
  return nums.reduce((acc, val) => acc + val, 0);
}

function calculateLongestExpression(s) {
  // 正则表达式：提取合法的数学表达式

  const regex = /(-?\d+([-+*]\d+)*)/g; // !! 注意这个正则表达式

  const matchedList = s.match(regex);

  if (matchedList === null) {
    return 0;
  }

  let longestExpression = "";

  matchedList.forEach((it) => {
    if (it.length > longestExpression.length) {
      longestExpression = it;
    }
  });

  // 计算并返回表达式的值
  try {
    // 使用eval进行计算，注意：在实际应用中谨慎使用eval，可寻找替代方案
    return eval(longestExpression);
  } catch (e) {
    // 如果计算出错，比如表达式不合法，则返回0
    return 0;
  }
}

// 示例;
console.log(calculateLongestExpression("2-2a22-2bcd") === 20); // 输出: -1
// 测试用例2: 包含多种操作符;
console.log(calculateLongestExpression("abc3+2*2def") === 7); // true, 表达式 "3+2*2" 的值为 7

// 测试用例3: 包含多个合法表达式，选择最长的
console.log(calculateLongestExpression("5*3-12xyz+3*4+2") === 3); // true, 最长表达式 "5*3-12"

// 测试用例4: 包含非法表达式部分
console.log(calculateLongestExpression("++4*3--2") === 12); // true, 合法部分 "4*3" 的值为 12

// 测试用例5: 表达式以操作符开始或结束
console.log(calculateLongestExpression("-3*3+2+") === -7); // true, 合法部分 "-3*3+2" 的值为 -7

// 测试用例6: 空字符串
console.log(calculateLongestExpression("") === 0); // true, 没有合法表达式，返回 0

// 测试用例7: 只有数字
console.log(calculateLongestExpression("12345") === 12345); // true, 只有一个数字，返回该数字

// 测试用例8: 多个相同长度的表达式，返回第一个的结果
console.log(calculateLongestExpression("2+2abcd3*1") === 4); // true, 第一个最长表达式 "2+2" 的值为 4

// 测试用例9: 运算结果超过整数范围
console.log(calculateLongestExpression("999999*999999") === 999998000001); // true, 大数运算

// 测试用例10: 包含负数的表达式
console.log(calculateLongestExpression("-10+20-5") === 5); // true, 合法表达式 "-10+20-5" 的值为 5

console.log(calculateLongestExpression("-10+20--5") === 10); // true, 合法表达式 "-10+20-5" 的值为 5

const reg = /(-?\d+([-+*]\d+)*)/g;
