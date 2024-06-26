/**
 * @题目描述
 * 给定一个数组，编写一个函数来计算它的最大N个数与最小N个数的和。你需要对数组进行去重。
 *
 * 说明:
 *
 * 数组中数字范围[0,1000]
 * 最大N个数与最小N个数不能有重叠，如有重叠，输入非法返回-1
 * 输入非法返回-1
 *
 * @输入描述
 * 第一行输入M, M标识数组大小
 *
 * 第二行输入M个数，标识数组内容
 *
 * 第三行输入N，N表示需要计算的最大、最小的N个数
 *
 * @输出描述
 * 输出最大N个数与最小N个数的和。
 *
 * @示例1
 * 输入：
 * 5
 * 95 88 83 64 100
 * 2
 *
 * 输出：
 * 342
 *
 * 说明：
 * 最大2个数[100,95],最小2个数[83,64],输出为342
 *
 * @示例2
 * 输入：
 * 5
 * 3 2 3 4 2
 * 2
 *
 * 输出：
 * -1
 *
 * 说明：
 * 最大2个数[4,3] 最小2个数[3,2], 有重叠输出为-1
 */

/** 考点：数组去重 */

const calcSum = (arr) => arr.reduce((pre, cur) => (pre += cur), 0);

const demo = (arr, count) => {
  // !! 判断重复
  const uniqueArr = [...new Set(arr)];
  if (uniqueArr.length < count * 2) {
    return -1;
  }

  // 对去重后的数组排序
  const sorted = [...uniqueArr].sort((a, b) => a - b);

  // 获取最小N个数和最大N个数
  const small = sorted.slice(0, count);
  const great = sorted.slice(-count);

  return calcSum(small) + calcSum(great);
};

console.log(demo([3, 2, 3, 4, 2], 2) === -1);
console.log(demo([95, 88, 83, 64, 100], 5) === -1);
console.log(demo([95, 88, 83, 64, 100], 2) === 342);
console.log(demo([95, 88, 83, 64, 100], 3) === -1);
