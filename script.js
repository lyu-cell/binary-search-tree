class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = null;
    this.sortUniqueArray(array);
  }

  sortUniqueArray(array) {
    let set = new Set(this.orderedArray(array));
    let value = [];
    set.forEach((v) => value.push(v));

    let treeRoot = this.buildTree(value, 0, value.length - 1);
    this.root = { zeroRoot: treeRoot };
  }

  orderedArray(array) {
    let orderedArray = [];

    if (array.length === 1) return array;
    else {
      let rightSide = array.splice(Math.round((array.length - 1) / 2));

      let left = this.orderedArray(array);
      let right = this.orderedArray(rightSide);
      let arraySize = left.length + right.length;

      for (let i = 0; i < arraySize; i++) {
        if (left[0] < right[0] || right.length === 0)
          orderedArray.push(left.splice(0, 1)[0]);
        else if (right[0] < left[0] || left.length === 0)
          orderedArray.push(right.splice(0, 1)[0]);
        else if (right.length !== 0 && left[0] === right[0]) {
          orderedArray.push(left.splice(0, 1)[0]);
        }
      }
    }

    return orderedArray;
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.round((start + end) / 2);
    let root = new Node(array[mid]);

    root.left = this.buildTree(array, start, mid - 1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  }

  insertRef(value, node) {
    if (value < node.data && node.left === null)
      node.left = { data: value, left: null, right: null };
    else if (value > node.data && node.right === null)
      node.right = { data: value, left: null, right: null };
    else {
      if (value < node.data) this.insertRef(value, node.left);
      else if (value > node.data) this.insertRef(value, node.right);
    }
  }

  insert(value) {
    this.insertRef(value, this.root.zeroRoot);
  }

  subtreeHeight(node) {
    let firstScore = 0;
    let secondScore = 0;

    if (node.right === null && node.left === null) return 1;
    else {
      if (node.right !== null && node.left !== null) {
        firstScore = this.subtreeHeight(node.right);
        secondScore = this.subtreeHeight(node.left);
      } else if (node.right !== null && node.left === null)
        firstScore = this.subtreeHeight(node.right);
      else secondScore = this.subtreeHeight(node.left);
    }

    if (firstScore > secondScore) {
      firstScore++;
      return firstScore;
    } else if (secondScore > firstScore) {
      secondScore++;
      return secondScore;
    } else {
      firstScore++;
      return firstScore;
    }
  }


  parentOfNode(value, node) {
    let rightValue = null;
    let leftValue = null;

    if (node === null) return;
    else if (node.left === undefined && node.zeroRoot.data === value) return node;
    else if (node.left !== undefined && node.data === value) return "m";
    else {
      if (node.left === undefined) {
        if (value > node.zeroRoot.data) {
          rightValue = this.parentOfNode(value, node.zeroRoot.right);
        } else leftValue = this.parentOfNode(value, node.zeroRoot.left);
      } else {
        if (value > node.data) {
          rightValue = this.parentOfNode(value, node.right);
        } else leftValue = this.parentOfNode(value, node.left);
      }
    }

    if (rightValue === "m" || leftValue === "m") {
      if (node.left !== undefined) return node;
      else return node.zeroRoot;
    } else if (rightValue !== undefined && rightValue !== null) return rightValue;
    else if (leftValue !== undefined && leftValue !== null) return leftValue;
  }

  info(value) {
    let nodeParent = this.parentOfNode(value, this.root);
    let removableNodeInfo = { parent: nodeParent, side: null };
  
    if (nodeParent.left === undefined) removableNodeInfo.side = "zeroRoot";
    else if (nodeParent.left !== null && nodeParent.left.data === value) {
      removableNodeInfo.side = "left";
    } else removableNodeInfo.side = "right";
  
    return removableNodeInfo;
  }
  

  farthest(direction, node) {
    if (node[direction] === null) return node;
    else {
      return this.farthest(direction, node[direction]);
    }
  }
  
  deleteNode(value) {
    let remInfo = this.info(value);
    let remNode = remInfo.parent[remInfo.side];

    if (remNode.left !== null && remNode.right !== null) {
      let repInfo = this.info(this.farthest("left", remNode.right).data);
      let repNode = repInfo.parent[repInfo.side];

      if (repNode.right === null) {
        let repStore = repNode;
        repInfo.parent[repInfo.side] = null;

        repStore.right = remNode.right;
        repStore.left = remNode.left;

        remInfo.parent[remInfo.side] = repStore;
      } else if (repNode.right !== null) {
        let repStore = repNode;
        repInfo.parent[repInfo.side] = repNode.right;
        repStore.right = null;

        repStore.right = remNode.right;
        repStore.left = remNode.left;
        remInfo.parent[remInfo.side] = repStore;
      }
    } else if(remNode.left !== null && remNode.right === null || 
      remNode.right !== null && remNode.left === null) {
      if(remNode.left === null && remNode.right !== null) {
        let repStore = remNode.right
        remInfo.parent[remInfo.side] = repStore
      } else if(remNode.right === null && remNode.left !== null) {
        let repStore = remNode.left
        remInfo.parent[remInfo.side] = repStore
      }
    } else if(remNode.left === null && remNode.right === null) {
      remInfo.parent[remInfo.side] = null
    }
  }

  find(value) {
    let result = this.parentOfNode(value, this.root)
    
    if(result.right === undefined) return result.zeroRoot
    else if(result.right !== null && result.right.data === value) return result.right
    else return result.left
  }


  levelOrderTraversal(callback) {
    let queue = [t.root.zeroRoot]
    
    function innerLevelOrder(callback) {
      if(queue.length === 0) return
      if(callback === null || callback === undefined) throw(console.error("provide a valid callback"));
      else {
        callback(queue[0])
  
        if(queue[0].left !== null) queue.push(queue[0].left)
        if(queue[0].right !== null) queue.push(queue[0].right)
  
        queue.shift()
        innerLevelOrder(callback)
      }
    }

    innerLevelOrder(callback)
  }

  preOrderTraversal(callback) {

    function preOrder(node) {
      if(node === null) return
      else {
        callback(node)
        preOrder(node.left)
        preOrder(node.right)
      }
    }
  
    preOrder(this.root.zeroRoot)
  }
  
  inOrderTraversal(callback) {

    function inOrder(node) {
      if(node === null) return
      else {
        inOrder(node.left)
        callback(node)
        inOrder(node.right)
      }
    }
  
    inOrder(t.root.zeroRoot)
  }

  postOrderTraversal(callback) {

    function postOrder(node) {
      if(node === null) return
      else {
        postOrder(node.left)
        postOrder(node.right)
        callback(node)
      }
    }
  
    postOrder(t.root.zeroRoot)
  }
  
  height(node) {
    return this.subtreeHeight(node)
  }
  

  
}



let t = new Tree([0, 2, 44, 44, 20, 5, 44, 39, 46, 7, 31, 27]);
 

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  } 
};


prettyPrint(t.root.zeroRoot)















