function byTagName(node, tagName){
    let i = [];
    for(let i = 0; i < node.childNodes.length; i++){
      console.log(node[i]);
    }
}

console.log(byTagName(document.body, "h1").length);
  // → 1
console.log(byTagName(document.body, "span").length);
  // → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
