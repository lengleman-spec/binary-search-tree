// driver.js
const Tree = require("./Tree");

// Helper function to generate random numbers < 100
function generateRandomArray(size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

// 1️⃣ Create BST from a random array
const numbers = generateRandomArray(10);
console.log("Random array:", numbers);

const bst = new Tree(numbers);

// 2️⃣ Check if the tree is balanced
console.log("Is the tree balanced?", bst.isBalanced());

// 3️⃣ Function to safely print traversals
function printTraversals(tree) {
  // Helper to get node value (works for .data or .value)
  const getNodeValue = (node) => (node ? (node.data ?? node.value) : null);

  // Level order
  const levelOrderArray = [];
  tree.levelOrderForEach((node) => {
    const val = getNodeValue(node);
    if (val !== null) levelOrderArray.push(val);
  });
  console.log("Level order:", levelOrderArray);

  // Preorder
  const preOrderArray = [];
  tree.preOrderForEach((node) => {
    const val = getNodeValue(node);
    if (val !== null) preOrderArray.push(val);
  });
  console.log("Preorder:", preOrderArray);

  // Inorder
  const inOrderArray = [];
  tree.inOrderForEach((node) => {
    const val = getNodeValue(node);
    if (val !== null) inOrderArray.push(val);
  });
  console.log("Inorder:", inOrderArray);

  // Postorder
  const postOrderArray = [];
  tree.postOrderForEach((node) => {
    const val = getNodeValue(node);
    if (val !== null) postOrderArray.push(val);
  });
  console.log("Postorder:", postOrderArray);
}

// 4️⃣ Print initial traversals
console.log("\n--- Traversals of initial tree ---");
printTraversals(bst);

// 5️⃣ Unbalance the tree by adding numbers > 100
const unbalancedNumbers = [101, 110, 120, 130];
unbalancedNumbers.forEach((num) => bst.insert(num));
console.log("\nAdded numbers to unbalance the tree:", unbalancedNumbers);

// 6️⃣ Check if tree is balanced now
console.log("Is the tree balanced now?", bst.isBalanced());

// 7️⃣ Rebalance the tree
bst.rebalance();
console.log("\nTree rebalanced!");

// 8️⃣ Check balance after rebalance
console.log("Is the tree balanced now?", bst.isBalanced());

// 9️⃣ Print traversals after rebalancing
console.log("\n--- Traversals after rebalance ---");
printTraversals(bst);
