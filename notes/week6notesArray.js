//Symbols: ! = h3, # = li with code class

const notes = ["!Further Functions","Functions are first-class objects, have properties and methods",
"#function x(){console.log(\"x\")}","#x.length << 0 //has 0 parameters","#call(parameter) << adds value that can referred to inside program through this.parameter",
"Example:","#x.call(\"X\");","#function (x){console.log(this.name)} << would return name if x in call had name property",
"If the function doesn't refer to an object, can still be used, but provide null as first argument","#function.call(null, value)",
"apply() works similar to null call(), however uses an array for value.","#function.apply(null, [value]) << could still be one arg in value",
"You can add properties to functions, which can be used to store data inside the function, caching, which is called memoization",
"Immediately Invoked Function Expressions","#(function(){const x = \"x\"; console.log(`y+${x}`})();",
"These functions invoke as they're defined, and keeps temporary values within the scope, preferred for window load as its instantly ran ",
"Additionally can be used with 'use strict' to test that specific code in the block",
"IIFE provide for private scopes, so that the variables can only be used within that scope","Functions that Define and Rewrite Themselves",
"#function x(){console.log(\"X\"); x = function(){ console.log(\"y\");}}","#x() << \"x\"; x() << \"y\"; x() << \"y\";",
"If any properties were set, and the function is redefined, the function will lose those properties","Init-Time Branching",
"Using if-else statements to redefine a function, helpful for checking if client has specific feature, to rewrite main function to adjust to feature/no feature",
"Recursive Functions","Functions that call itself until base case is met"]

export default notes;
