/**
 * @题目描述
 * RSA加密算法在网络安全世界中无处不在，它利用了极大整数因数解的困难度，数据越大，安全系数越高，给定一个32位正整数，请对进行因数分解，找出是哪两个素数的乘积。
 *
 * @输入描述
 * 一个正整数num，0<num<=2147483647
 *
 * @输出描述
 * 如果成功找到，以单个空格分割，从小到大输出两个素数，分解失败，请输出-1,-1
 *
 * @用例1
 * 输入
 * 15
 * 输出
 * 3 5
 *
 * @用例1
 * 输入
 * 27
 * 输出
 * -1 -1
 *
 **/

/**
 * 考察点：
 * 1. 如果代码判断一个数字是否是质数
 * 2. 如何拆分一个数
 */

/**
 * 素数的判断条件：一个大于1的自然数，除了1和它自身外，不能被其他自然数整除的数叫做质数
 * （当我们说一个数a可以被另一个自然数b整除，我们的意思是除法a / b的结果是一个整数，没有余数）
 * 这里判断逻辑利用了因式对称性：如果一个数字可以被另一个数整除，则这两个因子因为小于等于Math.sqrt(n),一个大于等于Math.sqrt(n)
 */

function isPrime(n) {
  if (n <= 1) return false;

  const sqrtN = Math.sqrt(n);

  for (let i = 2; i <= sqrtN; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function factorize(num) {
  const sqrtNum = Math.sqrt(num);

  for (let i = 2; i <= sqrtNum; i++) {
    if (num % i === 0) {
      let otherFactor = num / i;
      // 如果两个数字都是质数，直接返回结果
      if (isPrime(i) && isPrime(otherFactor)) {
        return `${i} ${otherFactor}`;
      }
      break;
    }
  }

  return `-1 -1`;
}

console.log(factorize(13) === "-1 -1");
console.log(factorize(14) === "2 7");
console.log(factorize(15) === "3 5");
console.log(factorize(21) === "3 7");
console.log(factorize(27) === "-1 -1");
console.log(factorize(13 * 17));
console.log(factorize(13 * 19));
console.log(factorize(4));
// 素数，应返回 "-1 -1"
console.log(factorize(2) === "-1 -1");
console.log(factorize(17) === "-1 -1");
console.log(factorize(2147483647) === "-1 -1"); // 2^31 - 1 是一个素数

// 两个相同素数的乘积
console.log(factorize(4) === "2 2");
console.log(factorize(9) === "3 3");
console.log(factorize(25) === "5 5");

// 两个不同素数的乘积
console.log(factorize(15) === "3 5");
console.log(factorize(35) === "5 7");
console.log(factorize(143) === "11 13"); // 143 = 11 * 13

// 非素数因子的乘积，不应该是正确的输入，但这里用作边界情况测试
console.log(factorize(27) === "-1 -1"); // 27 = 3 * 3 * 3，不符合只有两个素数因子的条件
console.log(factorize(100) === "-1 -1"); // 100 = 2 * 2 * 5 * 5，不符合只有两个素数因子的条件

// 特殊值
console.log(factorize(1) === "-1 -1");
console.log(factorize(0) === "-1 -1");
