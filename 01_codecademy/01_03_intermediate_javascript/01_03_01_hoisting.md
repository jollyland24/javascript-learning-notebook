# Hoisting

I hit this concept while improving my code. Below is what I thought at each
step, and what was actually true.

## What I assumed at first (wrong)

I thought hoisting meant that you move constants to the top of a scope by hand.
I thought it was a style preference and that it blocked nothing.

**What is actually true.** That is a different idea with the same name. "Hoist a
value out of a loop" and "hoist state up" in React are refactors that a person
does. JavaScript hoisting is not a refactor. The engine does it, and you cannot
turn it off.

The engine reads each scope in two passes.

1. Pass one registers every declaration in that scope.
2. Pass two runs the statements from top to bottom.

Hoisting is the name for the result of pass one.

## My open question: does "top" mean the parent or the file?

Neither. It means the top of the enclosing scope. Each scope hoists its own
declarations. For `var` and for function declarations, that scope is the
enclosing function. For `let`, `const`, and `class`, it is the enclosing block.

## What I assumed about `const` and `var` (right idea, wrong wording)

I wrote that with `const` instead of `var` "we can do the hoisting but if we
call on top, it will throw an error".

**What is actually true.** `let` and `const` are hoisted, so that part was
right. But the reason for the error is not that hoisting failed. Pass one
registers the name either way. The kinds differ in whether the name holds a
usable value.

| Declaration | Name exists after pass one | Value after pass one |
|---|---|---|
| `var x = 1` | yes | `undefined` |
| `function f() {}` | yes | the complete function, body included |
| `let x` / `const x` | yes | none — a read throws `ReferenceError` |

For `let` and `const`, the name is reserved from the start of the scope and
stays unreadable until the declaration line runs. That gap is the temporal dead
zone. The error is `ReferenceError: Cannot access 'x' before initialization`,
which is not the same as "'x' is not defined". The name exists. It is not ready.

## Exercise 1: clickClack

The task: fill in the return statements so that `clickClack()` returns `"Moo!"`
when it is called. Put any other string in the other return statement.

```js
function clickClack() {
    return console.log("Moo!");
}

clickClack = function() {
    return console.log("any");
};

clickClack();
```

**What I thought.** The exercise was about code running from top to bottom.

**What happened.** The terminal printed `"any"`.

**What I got right.** `clickClack` was reassigned. The assignment on line 5 runs
before the call on line 9, so the second function is the one that runs.

**What was wrong.** `return console.log("Moo!")` prints `"Moo!"` and returns
`undefined`, because `console.log` returns `undefined`. The task asked for a
return value, so the correct line is `return "Moo!";`.

**The connection to hoisting I could not make.** Line 5 is `clickClack = ...`,
not `let clickClack = ...`. It is a plain assignment, and an assignment needs a
name that already exists. That name came from pass one, from the declaration on
line 1.

So the exercise is not only about top-to-bottom order. It separates the two
things that a function declaration does at once: pass one **creates the name**,
pass two **fills in the value**. Reassignment proves they are separate steps,
because the second step can happen twice.

## Exercise 2: foo

```js
foo();

let foo = function() {
    console.log("I love Codecademy!");
};

function foo() {
    console.log("I love JavaScript!");
}
```

**What I thought.**

a. `foo` is not initialized before it is called.
b. The bigger issue is that you cannot redeclare a `let` function.

**What I got right.** Point b is the answer, and it is the only issue. A
function declaration at the top level is `var` scoped. A `let` name and a `var`
name cannot share one scope. Node rejects the file:

```
SyntaxError: Identifier 'foo' has already been declared
```

**What was wrong.** Point a never applies. A `SyntaxError` happens when the
engine parses the file, which is before pass one and before pass two. No
statement runs. Neither message prints, and no temporal dead zone error appears.
Initialization order cannot be the problem in a file that never runs.
