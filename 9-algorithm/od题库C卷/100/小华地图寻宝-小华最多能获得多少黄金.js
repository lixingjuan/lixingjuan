/**
 * @题目描述
 * 小华按照地图去寻宝，地图上被划分成m 行和n列的方格，横纵坐标范围分别是[0,n-1]和 [0, m-1]。在横坐标和纵坐标的数位之和不大于k的方格中存在黄金(每个方格中仅存在一克金)，但横坐标和纵坐标数位之和大于k的方格存在危险不可进入。
 * 小华从入口(0,0)进入，任何时候只能向左，右，上，下四个方向移动一格。
 * 请问小华最多能获得多少克黄金?
 *
 * @输入描述
 * 坐标取值范围如下:
 * 0 <= m <=50
 * 0 <= n <=50
 * k的取值范围如下
 * 0 ≤ k ≤ 100
 * 输入中包含3个字数，分别是m，n,k
 *
 * @输出描述
 * 输出小华最多能获得多少克黄金
 *
 * @示例1
 * 输入：40 40 18
 * 输出：1484
 *
 * @示例2
 * 输入：5 4 7
 * 输出：20
 */

function sumOfDigits(num) {
  let sum = 0;
  while (num) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

function movingCount(m, n, k) {
  let visited = new Array(m).fill(0).map(() => new Array(n).fill(false));
  let result = 0;

  function dfs(i, j) {
    if (
      i < 0 ||
      i >= m ||
      j < 0 ||
      j >= n ||
      visited[i][j] ||
      sumOfDigits(i) + sumOfDigits(j) > k
    ) {
      return;
    }
    visited[i][j] = true;
    result += 1;
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  dfs(0, 0);
  return result;
}

console.log(movingCount(5, 4, 7));
