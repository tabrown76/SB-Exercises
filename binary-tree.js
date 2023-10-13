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

  minDepth() {
    return this._minDepthHelper(this.root);
  }

  _minDepthHelper(node) {
    if (node === null) return 0;
    if (node.left === null && node.right === null) return 1;

    let minDepth = Number.MAX_SAFE_INTEGER;

    if (node.left !== null) {
      minDepth = Math.min(this._minDepthHelper(node.left), minDepth);
    }

    if (node.right !== null) {
      minDepth = Math.min(this._minDepthHelper(node.right), minDepth);
    }

    return minDepth + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    return this._maxDepthHelper(this.root);
  }

  _maxDepthHelper(node) {
    if (node === null) return 0;
    return 1 + Math.max(this._maxDepthHelper(node.left), this._maxDepthHelper(node.right));
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    if (this.root === null) return 0;
    let maxSum = -Infinity;

    const dfs = (node) => {
      if (!node) return 0;
      const left = Math.max(0, dfs(node.left));
      const right = Math.max(0, dfs(node.right));
      maxSum = Math.max(maxSum, node.val + left + right);
      return node.val + Math.max(left, right);
    };

    dfs(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let nextLarger = null;

    const dfs = (node) => {
      if (!node) return;
      if (node.val > lowerBound) {
        if (nextLarger === null) nextLarger = node.val;
        else nextLarger = Math.min(nextLarger, node.val);
      }
      dfs(node.left);
      dfs(node.right);
    };

    dfs(this.root);
    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
