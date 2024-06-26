class Person {
  constructor(age) {
    this.age = age;
  }

  sayAge() {
    console.log(this.age);
  }
  allll() {
    console.log(this.age);
  }
}

class Girl extends Person {
  sex = "girl";
}

const lily = new Girl("lily");
console.log(lily.sex);
console.log(lily.age);
lily.sayAge();

class MyPromise {
  constructor() {
    console.log("2");
  }

  all(args) {
    if (!Array.isArray(args)) {
      throw TypeError("params must be array");
    }
    const fns = args.map(Promise.resolve);
    const result = [];
    let counter = 0;

    return new Promise((resolve, reject) => {
      fns.forEach((fn, index) => {
        fn.then(
          (res) => {
            result[index] = res;
            counter += 1;

            if (counter === fn.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
}

console.log(Person.allll);
// const res2 = MyPromise.all();
