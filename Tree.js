const Node = require("./Node"); // "./Node" because Node.js is in the same folder

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) return null; // if array is empty, there's nothing to make a node from, so return null

    const uniqueArray = [...new Set(array)]; // remove duplicates b/c a Set can only hold unique values
    const sortedArray = uniqueArray.sort((a, b) => a - b); // sort ascending

    const midIndex = Math.floor(sortedArray.length / 2);
    const root = new Node(sortedArray[midIndex]);

    root.left = this.buildTree(sortedArray.slice(0, midIndex));
    root.right = this.buildTree(sortedArray.slice(midIndex + 1));
    return root;
  }

  includes(value) {
    let currentNode = this.root; // starts at root
    while (currentNode !== null) {
      if (value === currentNode.data) {
        return true;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
    }
    return false;
  }
}

module.exports = Tree;
