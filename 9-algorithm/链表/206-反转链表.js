/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * 将数组转为链表
 * @param valAry
 * @returns 返回头节点
 */
function createListNodes(valAry) {
  const count = valAry.length;
  const nodeAry = [];
  for (let i = count - 1; i > -1; i--) {
    let newNode = null;
    if (i === count - 1) {
      newNode = new ListNode(valAry[i], null);
    } else {
      newNode = new ListNode(valAry[i], nodeAry[nodeAry.length - 1]);
    }
    nodeAry.push(newNode);
  }
  const headerNode = nodeAry[nodeAry.length - 1];
  return headerNode;
}

/**
 * 将链表转为数组（用于 console.log 查看）
 * @param listNode 这是头节点
 * @returns 返回一个数组（数组中包含的是每个节点的 val）
 */
function ListNodeToAry(listNode) {
  if (listNode == null) {
    return null;
  }
  const valAry = [];
  let cursor = listNode;
  while (cursor !== null) {
    valAry.push(cursor.val);
    cursor = cursor.next;
  }
  return valAry;
}
/* ****************************************************************************************************
 *                                    分割线
 ************************************************************************************************* */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head == null) {
    return null;
  }
  let pre = null;
  let cur = head;
  while (cur != null) {
    // 将next节点存储起来
    let next = cur.next;
    // 上一轮循环中，在pre变量中存储的是上一个节点
    // 将当前节点的next，指向pre变量
    cur.next = pre;
    // 为pre这个中转变量重新赋值当前节点，为下个循环做准备
    pre = cur;
    // 移动指针
    cur = next;
  }
  return pre;
};

console.log(ListNodeToAry(reverseList(createListNodes([1, 2, 3, 4, 5]))));
