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

  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (value === currentNode.data) return; // no duplicates

      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  delete(value) {
    this.root = this.removeNode(this.root, value);
  }

  removeNode(node, value) {
    if (node === null) return null; // base case, value not found

    if (value < node.data) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // Node to delete found

      // Case 1: No children (leaf)
      if (node.left === null && node.right === null) return null;

      // Case 2: One child
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      // Case 3: Two children
      // Find the smallest value in the right subtree
      let tempNode = node.right;
      while (tempNode.left !== null) {
        tempNode = tempNode.left;
      }

      // Replace current node's data with that value
      node.data = tempNode.data;

      // Delete the duplicate node in the right subtree
      node.right = this.removeNode(node.right, tempNode.data);

      return node;
    }
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    let queue = [this.root];

    while (queue.length > 0) {
      let node = queue.shift(); // remove the first node
      callback(node.value); // call callback on its value

      if (node.left) queue.push(node.left); // add left child
      if (node.right) queue.push(node.right); // add right child
    }
  }

  inOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (this.left) {
      this.left.inOrderForEach(callback);
    }

    callback(this.value);

    if (this.right) {
      this.right.inOrderForEach(callback);
    }
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    callback(this.value);
    if (this.left) this.left.preOrderForEach(callback);
    if (this.right) this.right.preOrderForEach(callback);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw new Error("Callback is required");
    }

    if (this.left) this.left.postOrderForEach(callback);
    if (this.right) this.right.postOrderForEach(callback);
    callback(this.value);
  }
}

module.exports = Tree;
