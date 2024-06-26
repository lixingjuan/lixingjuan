const MyPromise = require("./Promise.all");

describe("MyPromise.all", () => {
  test("should resolve an empty array if input is an empty array", () => {
    return MyPromise.all([]).then((result) => {
      expect(result).toEqual([]);
    });
  });

  test("should reject if one of the promises is rejected", () => {
    const promises = [MyPromise.resolve(1), MyPromise.reject("error"), MyPromise.resolve(2)];
    return MyPromise.all(promises).catch((error) => {
      expect(error).toBe("error");
    });
  });

  test("should resolve with an array of results if all promises resolve", () => {
    const promises = [1, 2, 3].map((item) => MyPromise.resolve(item));
    return MyPromise.all(promises).then((result) => {
      expect(result).toEqual([1, 2, 3]);
    });
  });

  test("should reject if input is not an array", () => {
    return MyPromise.all("this is not an array").catch((e) => {
      expect(e).toBeInstanceOf(TypeError);
      expect(e.message).toBe("arguments must be array");
    });
  });
});
