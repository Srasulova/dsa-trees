/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth(node = this.root) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;

    if (!node.left) return this.minDepth(node.right) + 1;
    if (!node.right) return this.minDepth(node.left) + 1;

    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth(node = this.root) {
    if (!node) return 0;

    const leftDepth = this.maxDepth(node.left);
    const rightDepth = this.maxDepth(node.right);

    return Math.max(leftDepth, rightDepth) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum(node = this.root) {
    if (!node) return 0; // Return 0 for empty trees

    let result = { maxSum: -Infinity };

    function helper(node) {
      if (!node) return 0;

      const leftSum = Math.max(helper(node.left), 0);
      const rightSum = Math.max(helper(node.right), 0);

      const currentSum = node.val + leftSum + rightSum;
      result.maxSum = Math.max(result.maxSum, currentSum);

      return node.val + Math.max(leftSum, rightSum);
    }

    helper(node);
    return result.maxSum;
  }

  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(node, target, level = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { level, parent };

      const left = findLevelAndParent(node.left, target, level + 1, node);
      if (left) return left;

      return findLevelAndParent(node.right, target, level + 1, node);
    }

    const node1Info = findLevelAndParent(this.root, node1);
    const node2Info = findLevelAndParent(this.root, node2);

    return (
      node1Info.level === node2Info.level &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound, node = this.root) {
    if (!node) return null;

    let largerValue = null;

    function traverse(node) {
      if (!node) return;

      if (
        node.val > lowerBound &&
        (largerValue === null || node.val < largerValue)
      ) {
        largerValue = node.val;
      }

      traverse(node.left);
      traverse(node.right);
    }

    traverse(node);
    return largerValue;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
