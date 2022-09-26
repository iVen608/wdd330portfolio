function byTagName(node, tagName){
  let x = [];
  let tagNameUpper = tagName.toUpperCase()
    for(let i = 0; i < node.childNodes.length; i++){
      let curr = node.childNodes[i];
      if(curr.tagName === tagNameUpper){
        x.push(curr);
      }
      if(curr.childNodes.length > 0){
        for(let j = 0; j < curr.childNodes.length; j++){
          if(curr.childNodes[j].tagName === tagNameUpper){
            x.push(curr.childNodes[j])
          }
        }
      }
    }
    return(x)
}

console.log(byTagName(document.body, "h1").length);
  // → 1
console.log(byTagName(document.body, "span").length);
  // → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
