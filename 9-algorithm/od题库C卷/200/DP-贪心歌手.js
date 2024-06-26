/**
 * @题目描述
 * 一个歌手准备从A城去B城参加演出
 * 1.按照合同，他必须在T天内赶到
 * 2.歌手不能往回走
 * 3.每两座城市之间需要的天数都可以提前获知。
 * 4.歌手在每座城市都可以在路边卖唱赚钱。经过调研，歌手提前获知了每座城市卖唱的收入预期: 如果在一座城市第一天卖唱可以赚M，后续每天的收入会减少D(第二天赚的钱是M - D，第三天是M-2D…)如果收入减到0就不会再少了。
 * 5.歌手到达后的第二天才能开始卖唱。如果今天卖过唱，第二天才能出发
 *
 * 贪心的歌手最多可以赚多少钱?
 *
 * @输入描述
 * 第一行两个数字 T 和 N，中间用空格隔开 T 代表总天数; N 代表路上经过N座城市; 0 < T < 1000 ,0 < N < 100
 * 第二行N+1个数字，中间用空格隔开 代表每两座城市之间耗费的时间。 其总和<=T。
 * 接下来N行，每行两个数字M和D，中间用空格隔开.
 * 代表每个城市的收入预期。
 * 0< M <1000, 0 < D < 100
 *
 * @输出描述
 * 一个数字。代表歌手最多可以赚多少钱。以回车结束
 *
 * @示例1
 * 输入：
 * 10 2
 * 1 1 2
 * 120 20
 * 90 10
 *
 * 输出：
 * 540
 *
 * 说明：
 * 总共10天，路上经过2座城市。 路上共花1+1+2=4天 剩余6天最好的计划是
 * 在第一座城市待3天，在第二座城市待3天 在第一座城市赚的钱:120+100+80=300
 * 在第二座城市赚的钱:90+80+70=240
 * 一共300+240 = 540
 */

function maxEarnings(T, N, travelDays, earnings) {
  // 初始化二维DP数组，所有值设为0
  const dp = Array.from({ length: N + 1 }, () => Array(T + 1).fill(0));

  // 计算旅行所需的总天数
  const totalTravelDays = travelDays.reduce((acc, val) => acc + val, 0);

  // 可以卖唱的天数
  const canEarnDays = T - totalTravelDays;

  // 填充DP表
  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= canEarnDays; j++) {
      // 在当前城市不卖唱的情况
      dp[i][j] = dp[i - 1][j];

      // 在当前城市卖唱的情况
      for (let k = 1; k <= j; k++) {
        const [M, D] = earnings[i - 1];
        let dayEarning = M;
        let totalEarning = 0;

        for (let d = 1; d <= k; d++) {
          totalEarning += dayEarning;
          dayEarning = Math.max(dayEarning - D, 0);
        }

        dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - k] + totalEarning);
      }
    }
  }

  // 返回最大收益
  return dp[N][canEarnDays];
}

console.log(
  maxEarnings(
    10,
    2,
    [1, 1, 2],
    [
      [120, 20],
      [90, 10],
    ]
  )
);

console.log(maxEarnings(1, 1, [1], [[100, 20]])); // 应该输出 0，因为没有时间卖唱。

// 测试用例 2：只有一个城市
// 假设有足够的时间在一个城市停留并卖唱。
console.log(maxEarnings(5, 1, [2, 1], [[50, 10]])); // 应该输出最大可能的收益

/**
 * 测试用例 3：时间紧迫
假设有多个城市，但总时间刚好足够到达，没有额外时间卖唱。
 */

// 测试用例 3
const T3 = 4;
const N3 = 3;
const travelDays3 = [1, 1, 1, 1]; // 每段旅程都花费1天
const earnings3 = [
  [60, 15],
  [80, 20],
  [100, 25],
];

console.log(maxEarnings(T3, N3, travelDays3, earnings3)); // 应该输出 0，因为没有时间卖唱。

/**
 * 测试用例 4：多个城市，有选择地卖唱
假设有足够的时间在几个城市中选择最佳卖唱策略。
 */

// 测试用例 4
const T4 = 10;
const N4 = 3;
const travelDays4 = [1, 2, 1, 2]; // 总共花费6天在路上
const earnings4 = [
  [100, 20], // 第一个城市
  [200, 40], // 第二个城市，最高收益
  [50, 10], // 第三个城市
];

console.log(maxEarnings(T4, N4, travelDays4, earnings4)); // 应该输出最大收益的策略值
