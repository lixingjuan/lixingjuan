/**
 * @题目描述
 * 一张地图上有n个城市，城市和城市之间有且只有一条道路相连: 要么直接相连，要么通过其它城市中转相连(可中转一次或多次)。城市与城市之间的道路都不会成环。
 * 当切断通往某个城市i的所有道路后，地图上将分为多个连通的城市，设该城市i的聚集度为DPi(DegreeofPolymerization)，DPi=max(城市群1的城市个数，城市群2的城市个数，….城市群m 的城市个数)
 * 请找出地图上DP值最小的城市(即找到城市，使得DPj=min(DP1,DP2 ... DPn)))
 * 提示:如果有多个城市都满足条件，这些城市都要找出来(可能存在多个解)
 * 提示:DPi的计算，可以理解为已知一棵树，删除某个节点后;生成的多个子树，求解多个子数节点数的问题。
 *
 * @输入描述
 * 每个样例:第一行有一个整数N，表示有N个节点。1<=N<=1000。
 * 接下来的N-1行每行有两个整数x，y，表示城市x与城市y连接。1<=x,y<= N
 *
 * @输出描述
 * 输出城市的编号。如果有多个，按照编号升序输出。
 *
 * @示例1
 * 5
 * 1 2
 * 2 3
 * 3 4
 * 4 5
 * 输出
 * 3
 * 说明
 * 地图如下
 * 1 => 2 => 3 => 4 => 5
 * 对于城市3，切断通往3的所有道路后，形成2个城市群[(1，2)，(4，5)]，其聚集度分别都是2。DP3=2.
 * 对于城市4，切断通往城市4的所有道路后，形成2个城市群[(1，2，3)，(5)]，DP4=max(3，1)= 3.
 * 依次类推，切断其它城市的所有道路后，得到的DP都会大于2，因为城市3就是满足条件的城市，输出是3.
 *
 * @示例2
 * 6
 * 1 2
 * 2 3
 * 2 4
 * 3 5
 * 3 6
 * 输出
 * 2 3
 * 说明
 * 将通往2或者3的所有路径切断，最大城市群数量是3，其他任意城市切断后，最大城市群数量都比3大，所以输出23
 */

/**
 * 解题思路：
 * 1. 根据提供的城市之间的关系，构建树
 * 2. DFS遍历整个树，假设每个节点(城市)去掉，形成的城市群的节点
 * 3. 记录形成的城市群的DPI最小的节点
 */

class TreeNode {
  constructor(val) {
    this.val = val;
    this.children = [];
  }
}

const buildTree = (n, connections) => {
  const nodes = new Array(n + 1).fill(null).map((_, i) => new TreeNode(i));

  connections.forEach(([parent, child]) => {
    nodes[parent].children.push(nodes[child]);
  });

  return nodes[1]; // 返回根节点
};

const countNodes = (root) => {
  if (!root) return 0;

  let count = 1;
  for (const child of root.children) {
    count += countNodes(child);
  }
  return count;
};

const findMinDpCities = (N, connections) => {
  const root = buildTree(N, connections);
  let minDp = N;
  const minDpCities = [];

  const dfs = (node) => {
    let maxChildCount = 0;
    let parentCount = N - countNodes(node);

    for (const child of node.children) {
      const childCount = countNodes(child);
      maxChildCount = Math.max(maxChildCount, childCount);
      dfs(child);
    }

    const dp = Math.max(maxChildCount, parentCount);
    if (dp < minDp) {
      minDp = dp;
      minDpCities.length = 0;
      minDpCities.push(node.val);
    } else if (dp === minDp) {
      minDpCities.push(node.val);
    }
  };

  dfs(root);

  return minDpCities.sort((a, b) => a - b);
};

// 示例调用
console.log(
  findMinDpCities(5, [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
  ])
);

console.log(
  findMinDpCities(6, [
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 5],
    [3, 6],
  ])
);
