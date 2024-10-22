class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {

  constructor(array) {
    this.root = null
    this.sortUniqueArray(array)
  }

  sortUniqueArray(array) {
    let set = new Set(this.orderedArray(array))
    let value = []
    set.forEach(v => value.push(v))

    let treeRoot = this.buildTree(value, 0, value.length -1)
    this.root = treeRoot
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
          orderedArray.push(left.splice(0, 1)[0])
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
    console.log(node)
    if(value < node.data && node.left === null) node.left = {data: value, left: null, right: null}
    else if(value > node.data && node.right === null) node.right = {data: value, left: null, right: null}
    else {
      
      if(value < node.data) this.insertRef(value, node.left)
        else if(value > node.data) this.insertRef(value, node.right)
    }
  }

  insert(value) {
    this.insertRef(value, this.root)  
  }

}



let t = new Tree([0, 2, 44, 44, 20, 5, 44, 39, 46, 7, 31, 27])

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

t.insert(10)
console.log(prettyPrint(t.root))
