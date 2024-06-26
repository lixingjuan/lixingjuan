/* ****************************************************************************************************
 * 寄生式组合继承
 *
 * 实现方式：
 *      1. 前面步骤同组合继承
 *      2. 原型链接的地方，采用寄生继承，实现一个函数，利用Object.create, 完成原型链接
 * 解决的问题：组合继承中，构造函数总被调用两次的问题
 ************************************************************************************************* */

// 1. 定义父类
function Animal(categoryAndName) {
  this.categoryAndName = categoryAndName;
  this.colors = ["red", "blue", "green"];
}
Animal.prototype.speak = function () {
  console.log("hello," + this.categoryAndName);
};

// 2. !!定义子类，借用构造函数继承方法继承属性
function Dog(name, age) {
  Animal.call(this, "dog" + name);
  this.age = age;
}

// 3. !!利用原型式继承，实现inheritPrototype, 完成原型链接，从而使子类能继承父类的方法
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 4. 子类自定义方法
Dog.prototype.bark = function () {
  console.log("woof");
};

const dog1 = new Dog("Max");

console.log(dog1.colors);
dog1.speak();
