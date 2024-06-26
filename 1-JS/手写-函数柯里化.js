/** 函数柯里化 */
/** 1.基础版 */
const curryBase = (discount) => {
  return (price) => price * discount;
};

const today = curryBase(0.7);

// A:
console.log(today(200));
// B:
console.log(today(1));

/** 2. 高级版 */
const curry = (fn, ...args) => {
  if (args.length === fn.length) {
    return fn.apply(null, args);
  }
  return (...innerArgs) => curry(fn, ...args, ...innerArgs);
};

const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
};

const sum = curry(add);
// A
const ASum = sum(200);
// B
const BSum = ASum(100);
// C
const CSum = BSum(20);
// D
const DSum = CSum(100);
// E
const ESum = DSum(100);

console.log(ESum);
