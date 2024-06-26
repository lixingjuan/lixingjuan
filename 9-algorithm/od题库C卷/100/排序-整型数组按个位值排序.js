/**
 * @题目描述
 * 给定一个非空数组(列表)，其元素数据类型为整型
 * 请按照数组元素十进制最低位从小到大进行排序 + 进制最低位相同的元素，相对位置保持不变。
 * 当数组元素为负值时，十进制最低位等同于去除符号位后对应十进制值最低位
 *
 * @输入描述
 * 给定一个非空数组，其元素数据类型为32位有符号整数，数组长度[1,1000]
 *
 * @输出描述
 * 输出排序后的数组0
 *
 * @用例
 * 输入: 1,2,5,-21,22,11,55,-101,42,8,7,32
 * 输出: 1,-21,11,-101,2,22,42,32,5,55,7,8
 */

/**
 * 考察重点：
 * 1. 绝对值
 * 2. 获取个位数的方法：val % 10
 */

const demo = (arr) => {
  const decorated = arr.map((it, index) => ({ value: it, index }));

  return decorated
    .sort((a, b) => {
      // 对10求余，获取个位
      const aDigit = Math.abs(a.value) % 10;
      const bDigit = Math.abs(b.value) % 10;

      if (aDigit === bDigit) {
        return a.index - b.index;
      }
      return aDigit - bDigit;
    })
    .map((it) => it.value);
};

console.log(demo([1, 2, 5, -21, 22, 11, 55, -101, 42, 8, 7, 32]));
