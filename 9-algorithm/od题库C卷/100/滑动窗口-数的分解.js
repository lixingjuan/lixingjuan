/**
 * @题目描述
 * 给定一个正整数n，如果能够分解为m(m > 1)个连续正整数之和，请输出所有分解中，m最小的分解。
 *
 * 如果给定整数无法分解为连续正整数，则输出字符串"N"。
 *
 * @输入描述
 * 输入数据为一整数，范围为 (1,2^30]
 *
 * @输出描述
 * 比如输入为:
 * 21
 *
 * 输出:
 * 21=10+11
 */

/**
 * 考察点：
 * 1. 边界条件
 * 2. 滑动窗口的逻辑
 */

const demo = (target) => {
  let left = 1;
  let right = 1;
  let sum = left;

  const result = [];

  // !!
  while (left < target / 2) {
    if (sum < target) {
      right++;
      sum += right;
    } else if (sum > target) {
      sum -= left;
      left++;
    } else {
      result.push({ start: left, end: right });

      sum -= left;
      left++;
    }
  }

  if (!result.length) return "N";

  result.sort((a, b) => {
    const aDiff = a.end - a.start;
    const bDiff = b.end - b.start;
    return aDiff - bDiff;
  });

  const text = `${target}=${Array.from(
    { length: result[0].end - result[0].start + 1 },
    (_, index) => result[0].start + index
  ).join("+")}`;

  return text;
};

console.log(demo(21));
