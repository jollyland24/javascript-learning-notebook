I hit this concept while improving my code. 
What I understand is that hoist means you extract the constants to the top (top in scope, don't know if that means in parent or just top of file), and it is not a blocker of anything, but a pattern of preference


and in many cases, where we have `const` instead of `var` we can do the hoisting but if we call on top, it will throw an error

In the coding question, one exercise is 

```jsx
function clickClack() {
    return // your code here
}
 
clickClack = function() {
    return // your code here
};
 
clickClack();
```
where I needed to "Fill in the return statements so clickClack() returns "Moo!" when it is called. Add any other string to the other return statement."

so what I understand is this exercise wanted me to grab a sense of how code runs top to bottom, so 

```jsx
function clickClack() {
    return console.log("Moo!");// your code here
}
 
clickClack = function() {
    return console.log("any");// your code here
};
 
clickClack();
```
I did this and it gave me "any" in terminal, which means the `clickClack` was re-assigned?

I failed to connect this to the concept of hoisting

last coding question was

```jsx
foo();
 
let foo = function() {
console.log("I love Codecademy!");
};

function foo() {
    console.log("I love JavaScript!");
}
```

So I guess this is also to teach something about the top to bottom coding running order, but also revisit some ideas, such as 
a. initialization, here it is not initialized before calling, but 
b. another bigger issue exists because you can't re-declare a `let` function