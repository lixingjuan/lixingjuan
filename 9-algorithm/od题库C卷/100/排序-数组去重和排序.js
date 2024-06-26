/**
 * @题目描述
 * 给定一个乱序的数组，删除所有的重复元素，使得每个元素只出现一次，并且按照出现的次数从高到低进行排序，
 * 相同出现次数按照第一次出现顺序进行先后排序。
 *
 * @输入描述
 * 一个数组，数组大小不超过100 数组元素值大小不超过100
 *
 * @输出描述
 * 去重排序后的数组
 */

const demo = (arr) => {
  const innerMap = arr.reduce((pre, cur, index) => {
    const count = (pre.get(cur)?.count || 0) + 1;
    const appearIndex = pre.has(cur) ? pre.has(cur).appearIndex : index;
    return pre.set(cur, { value: cur, appearIndex, count });
  }, new Map());

  return [...innerMap.values()]
    .sort((a, b) => {
      const { count: aCount, appearIndex: aAppearIndex } = a;
      const { count: bCount, appearIndex: bAppearIndex } = b;

      if (aCount === bCount) {
        return aAppearIndex - bAppearIndex;
      }
      return bCount - aCount;
    })
    .map((it) => it.value);
};

console.log(demo([1, 2, 3, 4]));
console.log(demo([1, 3, 3, 2, 4, 4, 5]));
