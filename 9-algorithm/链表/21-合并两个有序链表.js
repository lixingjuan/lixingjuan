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

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  if (list1 === null) {
    return list2;
  } else if (list2 === null) {
    return list1;
  } else if (list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
};

// console.log(ListNodeToAry(mergeTwoLists(createListNodes([1, 2, 4]), createListNodes([1, 3, 4]))));
console.log(ListNodeToAry(mergeTwoLists(createListNodes([5]), createListNodes([1, 2, 4]))));
