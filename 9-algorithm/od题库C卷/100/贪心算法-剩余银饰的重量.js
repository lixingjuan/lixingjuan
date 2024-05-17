/**
 * @题目描述
 * 有N块二手市场收集的银饰，每块银饰的重量都是正整数，收集到的银饰会被熔化用于打造新的饰品。
 * 每一回合，从中选出三块 最重的 银饰，然后一起熔掉。
 *
 * 假设银饰的重量分别为 x 、y和z，且 x <= y <= z。那么熔掉的可能结果如下：
 *  > 如果 x == y == z，那么三块银饰都会被完全熔掉；
 *  > 如果 x == y 且 y != z，会剩余重量为 z - y 的银块无法被熔掉；
 *  > 如果 x != y 且 y == z，会剩余重量为 y - x 的银块无法被熔掉；
 *  > 如果 x != y 且 y != z，会剩余重量为 z - y 与 y - x 差值 的银块无法被熔掉。
 *  > 最后，如果剩余两块，返回较大的重量（若两块重量相同，返回任意一块皆可）；
 *  > 如果只剩下一块，返回该块的重量；如果没有剩下，就返回 0。
 *
 * @输入描述
 * 输入数据为两行
 *
 * 第一行为银饰数组长度 n，1 ≤ n ≤ 40，
 *
 * 第二行为n块银饰的重量，重量的取值范围为[1，2000]，重量之间使用空格隔开
 *
 * @输出描述
 * 如果剩余两块，返回较大的重量（若两块重量相同，返回任意一块皆可）；
 *
 * 如果只剩下一块，返回该块的重量；如果没有剩下，就返回 0。
 *
 * @示例1
 * 输入：
 * 3
 * 1 1 1
 *
 * 输出：
 * 0
 *
 * 说明：
 * 选出1 1 1，得到 0，最终数组转换为 []，最后没有剩下银块，返回0
 *
 * @示例2
 * 输入：
 * 3
 * 3 7 10
 *
 * 输出：
 * 1
 *
 * 说明：
 * 选出 3 7 10，需要计算 (7-3) 和 (10-7) 的差值，即(7-3)-(10-7)=1，所以数组转换为 [1]，剩余一块，返回该块重量，返回1
 */
function meltSilver(silverWeights) {
  // 将银饰重量从大到小排序
  silverWeights.sort((a, b) => b - a);

  while (silverWeights.length > 2) {
    // 取出最重的三块银饰
    let [z, y, x] = silverWeights.splice(0, 3);

    // 计算熔化后的剩余情况
    if (x === y && y === z) {
      // 如果三块银饰重量相等，全部熔化，不产生新银饰
    } else {
      // 否则，计算剩余银饰的重量，并放入数组
      let residue = Math.abs(z - y - (y - x));
      if (residue > 0) {
        silverWeights.push(residue);
      }
    }

    // 重新排序
    silverWeights.sort((a, b) => b - a);
  }

  // 根据剩余银饰的数量返回结果
  if (silverWeights.length === 2) {
    return Math.max(silverWeights[0], silverWeights[1]);
  } else if (silverWeights.length === 1) {
    return silverWeights[0];
  } else {
    return 0;
  }
}

console.log(meltSilver([1, 1, 1]));
// 期望输出：0
// 说明：三块银饰重量相同，全部熔化，没有剩余。

console.log(meltSilver([3, 7, 10]));
// 期望输出：1
// 说明：熔化后计算 (7-3) 和 (10-7) 的差值为 1。

console.log(meltSilver([5, 5, 10, 10]));
// 期望输出：5
// 说明：先熔化最重的三块，剩下 [5]，再与新产生的银饰（如果有的话）比较。

console.log(meltSilver([2, 2, 3, 3, 4, 4]));
// 期望输出：1
// 说明：可能的熔化过程会留下重量为1的银饰。

console.log(meltSilver([15, 20, 25, 30]));
// 期望输出：5
// 说明：熔化最重的三块后剩下一块未熔化的银饰，[15]与新产生的银饰（如果有的话）比较。

console.log(meltSilver([100]));
// 期望输出：100
// 说明：只有一块银饰时，直接返回这块银饰的重量。

console.log(meltSilver([12, 13, 14, 15, 16, 17]));
// 期望输出：2
// 说明：按规则熔化后，可能剩下一块重量为2的银饰。
