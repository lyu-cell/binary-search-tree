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
  
    if(firstScore > secondScore) {
      firstScore++
      return firstScore
    }
    else if(secondScore > firstScore) {
      secondScore++
      return secondScore
    }
    else {
      firstScore++
      return firstScore
    }
  }
    

  getReplaceable (side, node) {
    if(side === "right" && node.right !== null && node.right.right === null && node.right.left === null) return node
    else if(side === "left" && node.left !== null && node.left.right === null && node.left.left === null) return node
    else {
      if(side === "right") {
        return getReplaceable(side, node.right)
      } else {
        return getReplaceable(side, node.left)
      }
    }
  }  

  delete(value) {
    let resultNode = null;
    function dfs(value, node) {
      if (node === null) return;
      else if (node.left !== undefined && node.data === value) return "m";
      else if (node.left === undefined) {
        if (dfs(value, node.zeroRoot) === "m") resultNode = node;
      } else if (value < node.data) {
        if (dfs(value, node.left) === "m") resultNode = node;
      } else if (value > node.data) {
        if (dfs(value, node.right) === "m") resultNode = node;
      }
    }

    dfs(value, t.root);

    if (resultNode.left === undefined) {
      if (
        resultNode.zeroRoot.left === null &&
        resultNode.zeroRoot.right === null
      )
        resultNode.zeroRoot = null;
      else if (
        resultNode.zeroRoot.left !== null &&
        resultNode.zeroRoot.right === null
      )
        resultNode.zeroRoot = resultNode.zeroRoot.left;
      
        else if(resultNode.zeroRoot.right !== null && 
              resultNode.zeroRoot.left === null)
        
              resultNode.zeroRoot = resultNode.zeroRoot.right;
              else {

              }
    } 
    
    else if (resultNode.left !== null && resultNode.left.data === value) {
      if (resultNode.left.left === null && resultNode.left.right === null)
        resultNode.left = null;
      else if (
        resultNode.left.left !== null &&
        resultNode.left.right === null
      ) {
        resultNode.left = resultNode.left.left;
      } else if (
        resultNode.left.right !== null &&
        resultNode.left.left === null
      ) {
        resultNode.left = resultNode.left.right;
      }
    } 
    
    else if (resultNode.right !== null && resultNode.right.data === value) {
      
      if (resultNode.right.left === null && resultNode.right.right === null)
        resultNode.right = null;
      else if (
        resultNode.right.right !== null &&
        resultNode.right.left === null
      ) {
        resultNode.right = resultNode.right.right;
      } else if (
        resultNode.right.left !== null &&
        resultNode.right.right === null
      ) {
        resultNode.right = resultNode.right.left;
      }
    }
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

console.log(
  "                                                                     "
);



t.insert(-1)


prettyPrint(t.root.zeroRoot);


console.log(t.subtreeHeight(t.root.zeroRoot.right))