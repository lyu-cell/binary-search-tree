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

function variableCheck(variable, node) {
    if(variable === "m") return node
    else return variable
}








function parentOfNode(value, node) {
  let rightValue = null;
  let leftValue = null;

  if(node === null) return
  else if(node.left === undefined && node.zeroRoot.data === value) return node
  else if(node.left !== undefined && node.data === value) return "m"
  else {
    if(node.left === undefined) {
      if(value > node.zeroRoot.data) {
        rightValue = parentOfNode(value, node.zeroRoot.right)
      } else leftValue = parentOfNode(value, node.zeroRoot.left)
    
    } else {
      if(value > node.data) {
        rightValue = parentOfNode(value, node.right)
      } else leftValue = parentOfNode(value, node.left)
    }
  }

  if(rightValue === "m" || leftValue === "m") {
    if(node.left !== undefined) return node
    else return node.zeroRoot
  }
  else if(rightValue !== undefined && rightValue !== null) return rightValue
  else if(leftValue !== undefined && leftValue !== null) return leftValue

}



function provideNodeInfo(value) {
  let parentNode = parentOfNode(value, t.root)
  let info = {nodeAt: null, parentNode: parentNode, leftHeight: null, rightHeight: null}

  if(parentNode.left === undefined) info.nodeAt = "zeroRoot"
  else {
    if(parentNode.left !== null && parentNode.left.data === value) info.nodeAt = "left"
    else info.nodeAt = "right"
  }

  let right = parentNode[info.nodeAt].right
  let left = parentNode[info.nodeAt].left

  if(right === null && left !== null) {
    info.leftHeight = t.subtreeHeight(left)
  } else if(left === null && right !== null) {
    info.rightHeight = t.subtreeHeight(right)
  } else {
    if(right !== null && left !== null) {
      info.rightHeight = t.subtreeHeight(right)
      info.leftHeight = t.subtreeHeight(left)
    }
  }

  return info
  
}








function deleteNode(value) {

  let info = provideNodeInfo(value)
  let node = info.parentNode[info.nodeAt] 
  

  if(info.leftHeight === null && info.rightHeight === null) {
    info.parentNode[info.nodeAt] = null
  } else if(info.leftHeight !== null || info.rightHeight !== null) {
    if(node.left !== null && node.right === null) {
      let grandN = node.left
      info.parentNode[info.nodeAt] = grandN
    } else if(node.right !== null && node.left === null){
      let grandN = node.right
      info.parentNode[info.nodeAt] = grandN
    }
  
  } 

}

t.insert(3)






























prettyPrint(t.root.zeroRoot)





function farthest(direction, node) {
  if(node[direction] === null) return node
  else {
    return farthest(direction, node[direction])
  }
}



function removeMid(value) {
  let info = provideNodeInfo(value)
  let node = info.parentNode[info.nodeAt]
  let r = null

  if(info.rightHeight !== null) {
    r = farthest("left", info.parentNode[info.nodeAt].right)
  } 
  
  
  let lastNodeInfo = provideNodeInfo(r.data)
  let lastNode = lastNodeInfo.parentNode[lastNodeInfo.nodeAt]
  
  console.log(lastNodeInfo)
  if(lastNode.left === null && lastNode.right === null) {
    lastNodeInfo.parentNode[lastNodeInfo.nodeAt] = null
    lastNode.right = node.right
    lastNode.left = node.left
    info.parentNode[info.nodeAt] = lastNode
    lastNodeInfo.parentNode[lastNodeInfo.nodeAt] = null
      
  } 
}






console.log("After ............................................................................................................................................................................")



prettyPrint(t.root.zeroRoot)


