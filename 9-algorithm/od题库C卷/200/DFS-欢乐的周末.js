/**
 * @题目描述
 * 小华和小为是很要好的朋友，他们约定周末一起吃饭。
 * 通过手机交流，他们在地图上选择了多个聚餐地点(由于自然地形等原因，部分聚餐地点不可达)。
 * 求小华和小为都能到达的聚餐地点有多少个?
 *
 * @输入描述
 * 第一行输入m和n，m代表地图的长度，n代表地图的宽度
 * 第二行开始具体输入地图信息，地图信息包含:
 *
 * 0 为通畅的道路
 * 1 为障碍物 (且仅1为障碍物)
 * 2 为小华或者小为，地图中必定有且仅有2个(非障碍物)
 * 3 为被选中的聚餐地点 (非障碍物)
 *
 * @输出描述
 * 可以被两方都到达的聚餐地点数量，行末无空格
 *
 * @示例1
 * 输入：
 * 4 4
 * 2 1 0 3
 * 0 1 2 1
 * 0 3 0 0
 * 0 0 0 0
 *
 * 输出：
 * 2
 *
 * 说明：第一行输入地图的长宽为4，4，接下来4行是地图2表示华为的位置，3是聚餐地点，图中的两个3，小华和小为都可到达，所以输出2
 *
 * @示例2
 * 输入
 * 4 4
 * 2 1 2 3
 * 0 1 0 0
 * 0 1 0 0
 * 0 1 0 0
 *
 * 输出
 * 0
 */

const happyWeekend = (grid) => {
  let starts = [];
  let reachable = [{}, {}]; // 使用对象存储每个人可以到达的聚餐地点

  const m = grid.length;
  const n = grid[0].length;

  // 寻找小华和小为的位置
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        starts.push([i, j]);
      }
    }
  }

  function dfs(x, y, personIndex) {
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 1 || grid[x][y] === -1) {
      return;
    }

    if (grid[x][y] === 3) {
      reachable[personIndex][`${x},${y}`] = true; // 标记聚餐地点为可达
    }

    // 暂时记住当前位置的值
    const temp = grid[x][y];

    grid[x][y] = -1; // 标记当前位置已访问

    // 四个方向
    dfs(x - 1, y, personIndex);
    dfs(x + 1, y, personIndex);
    dfs(x, y - 1, personIndex);
    dfs(x, y + 1, personIndex);

    // 还原当前位置状态
    grid[x][y] = temp;
  }

  // 分别从小华和小为的位置开始执行DFS
  starts.forEach(([x, y], index) => {
    dfs(x, y, index);
  });

  // 计算两人都可以到达的聚餐地点数量
  return Object.keys(reachable[0]).filter((point) => reachable[1][point]);
};

console.log(
  happyWeekend([
    [2, 1, 0, 3],
    [0, 1, 2, 1],
    [0, 3, 0, 0],
    [0, 0, 0, 0],
  ])
);

console.log(
  happyWeekend([
    [2, 1, 2, 3],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ])
);
