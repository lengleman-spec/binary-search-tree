const Node = require("./Node"); // adjust path if needed

const Tree = require("./Tree");

describe("Tree includes", () => {
  test("returns true for a value that exists", () => {
    const tree = new Tree([1, 3, 4, 5, 7, 8, 9]);

    expect(tree.includes(5)).toBe(true);
  });

  test("returns false for a value that does not exist", () => {
    const tree = new Tree([1, 3, 4, 5, 7, 8, 9]);

    expect(tree.includes(10)).toBe(false);
  });

  test("insert will insert a new value", () => {
    const tree = new Tree([1, 3, 5]);
    tree.insert(4);

    expect(tree.includes(4)).toBe(true);
  });

  test("insert does not add duplicate value", () => {
    const tree = new Tree([1, 3, 5]);
    tree.insert(1);

    expect(tree.includes(1)).toBe(true);
  });
});
