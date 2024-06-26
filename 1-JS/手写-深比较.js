const isObject = (val) => {
  return typeof val === "object" && val !== null;
};

const deepCompare = (objA, objB) => {
  // 如果都不是 object类型，直接 === 比较是否相等
  if (!isObject(objA) && !isObject(objB)) {
    return objA === objB;
  }

  // 如果 === 为true, 则直接返回true
  if (objA === objB) {
    return true;
  }

  // 如果长度不相等，则直接返回false
  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  // 循环，一旦不相等，立即return
  for (let key in objA) {
    const res = deepCompare(objA[key], objB[key]);

    if (res === false) {
      return false;
    }
  }

  return true;
};

//定义两个对象进行比较
var obj1 = {
  x: 100,
  y: {
    a: 10,
    b: 10,
  },
  z: 200,
};
var obj2 = {
  x: 100,
  y: {
    a: 10,
    b: 10,
  },
  z: 200,
};

console.log(deepCompare(obj1, obj2));
