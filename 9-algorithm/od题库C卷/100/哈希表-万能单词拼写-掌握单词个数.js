/**
 * @题目描述
 * 有一个字符串数组 words 和一个字符串 chars。
 * 假如可以用 chars 中的字母拼写出 words 中的某个“单词”(字符串)，那么我们就认为你掌握了这个单词。
 * words 的字符仅由 a-z英文小写字母组成，例如“abc”
 * chars 由 a-z 英文小写字母和“?"组成。其中英文“?"表示万能字符，能够在拼写时当作任意一个英文字母。例如:“?"可以当作“a”等字母。
 * 注意: 每次拼写时，chars 中的每个字母和万能字符都只能使用一次。
 * 输出词汇表 words 中你掌握的所有单词的个数。没有掌握任何单词，则输出0。
 *
 * @输入描述
 * 第一行:输入数组 words 的个数，记作N。
 * 第二行~第N+1行:依次输入数组words的每个字符串元素第N+2行:输入字符串chars
 *
 * @输出描述
 * 输出一个整数，表示词汇表 words 中你掌握的单词个数
 *
 * @备注
 * 1≤ words.length s 100
 * 1 ≤ words[il.length, chars.length s 100
 * ·所有字符串中都仅包含小写英文字母、英文问号
 *
 * @用例1
 * 输入
 * 4
 * cat
 * bt
 * hat
 * tree
 * atach??
 * 输出
 * 3
 * 说明:可以拼写字符串"cat"、“bt"和"hat”
 *
 * @用例2
 * 输入
 * 3
 * hello
 * world
 * cloud
 * welldonehohneyr
 * 输出
 * 2
 */

const demo = (words, chars) => {
  let count = 0;

  // 函数，根据提供一个字符串，统计其中每个字符出现的次数，然后返回一个Map<char, 出现次数>
  const calcCharCountMap = (char) =>
    [...char].reduce((pre, cur) => pre.set(cur, (pre.get(cur) || 0) + 1), new Map());

  words.forEach((it) => {
    // 统计该单词中，每个字符出现的次数Map
    const innerCharCountMap = calcCharCountMap(it);
    // 我们拥有的字符串的Map(!!每次都要重新计算，因为每个循环都会直接修改这个Map)
    const targetCharCountMap = calcCharCountMap(chars);

    for (const iterator of innerCharCountMap.entries()) {
      const [char, count] = iterator;

      // 需要问号的数量
      const needQuestionMarkCount = count - (targetCharCountMap.get(char) || 0);
      // 如果需要问号（问号会一直消耗）
      if (needQuestionMarkCount > 0) {
        // 当前可用问号的数量
        const availableQuestionMarkCount = targetCharCountMap.get("?") || 0;
        // ?号的数量不够，则直接停止循环
        if (availableQuestionMarkCount < needQuestionMarkCount) {
          return;
        } else {
          targetCharCountMap.set("?", availableQuestionMarkCount - needQuestionMarkCount);
        }
      }
    }
    count++;
  });

  return count;
};

console.log(demo(["hello", "world", "cloud"], "welldonehohneyr") === 2);

console.log(demo(["cat", "bt", "hat", "tree"], "atach??") === 3);

// 测试用例 1: 确定可以构成的单词数量
console.log(demo(["cat", "bt", "hat", "tree"], "atach??") === 3);

// 测试用例 2: 不使用万能字符也可以构成的单词
console.log(demo(["apple", "orange", "pear"], "aelppgorane") === 3);

// 测试用例 3: 必须使用万能字符才能构成的单词
console.log(demo(["dog", "cat", "cow"], "acod??w") === 3);

// 测试用例 4: 万能字符不够用，无法构成所有单词
console.log(demo(["mouse", "rat", "bat"], "omu?eb") === 1);

// 测试用例 5: chars 中没有万能字符 "?"
console.log(demo(["hello", "world", "leetcode"], "welldonehoneyr") === 2);

// 测试用例 6: 单词比chars长，无法构成
console.log(demo(["impossible", "words"], "short") === 0);
