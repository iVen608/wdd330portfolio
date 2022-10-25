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
"Recursive Functions","Functions that call itself until base case is met","Callbacks can be used to form event-driven asynchronous programming",
"Promises are the future result of async function","Example of how to form promises:",
"#const promise = new Promise((resolve, reject)=>{if(success){resolve(\"x\");}else{reject(\"y\");}}",
"Promises have a then() method that has two args, then(resolvedFunction, rejectionFunction)",
"catch() could be used alternatively for solely rejected clause","then() and catch() can be combined for a resolve and reject functions",
"Multiple promises can be chained together with the use of multiple then() clauses",
"async Functions were added in ES2017, and starts by added async before function delcaration.",
"After which, use await before functions inside the function, which will prevent the function from progressing till that function is completed",
"Callbacks can be used to create more generalized programs, for example, random number function, with a callback of squaring number function to retrieve a random squared number.",
"Add return function inside a function will change the function called if the function is set to a variable. Useful for storing information within the function with a private scope.","Functions inside functions have access to the scope of the outer function while the outside function cannot access the inside variable","Generators","Generators are defined by adding * after function keyword in function declaration","After which, the method next() will generate the next term in the sequence","Yield is similar to return for generators, however the yield will pause the loop until next() is called again","Functional programming is a programming paradigm like OOP, in which the focus is the use of pure functions.","A pure function is of these: return value is dependent on arguments provided only, no side-effects ie. change data elsewhere in the program, and referential transparency, will always return same results if given same inputs","Higher-order functions are functions that accept an argument of a function, or return another function, or both","Currying is reliant on higher-order functions and is able to use a single function into multiple"]

export default notes;
