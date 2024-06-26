var CQueue = function () {
  this.inStack = [];
  this.outStack = [];
};

CQueue.prototype.appendTail = function (value) {
  this.inStack.push(value);
};

CQueue.prototype.deleteHead = function () {
  // 如果出栈为空
  if (!this.outStack.length) {
    if (!this.inStack.length) {
      return -1;
    }
    // 把入栈的元素，依次pop, push到出栈
    this.in2out();
  }

  // 如果出栈不为空，直接pop
  return this.outStack.pop();
};

CQueue.prototype.in2out = function () {
  while (this.inStack.length) {
    this.outStack.push(this.inStack.pop());
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

const obj = new CQueue();
console.log(obj.appendTail(1));
console.log(obj.appendTail(2));
console.log(obj.appendTail(3));
console.log(obj.deleteHead());
console.log(obj.deleteHead());
console.log(obj.appendTail(4));
console.log(obj.appendTail(5));
console.log(obj.deleteHead());
console.log(obj.appendTail(6));
