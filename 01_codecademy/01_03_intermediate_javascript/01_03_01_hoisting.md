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

# Example

## Problem definition

https://github.com/cleverfranke/boeing-kg/pull/2958/changes here, I am working on registering the `mobileZoomLevelIndex`, where there was none, and now it is in `stores/`, and first I got comment "I think it'll be neater to just store the mobile zoom level index in the store, and keep the stepping/clamping logic within this file, instead of splitting the zooming logic across useZoom and useTimelineStore" (now I see I didn't read it thorougly enough and forgot about clamping....)

> **Comment.** You did not forget the clamping. You wrote it, as
> `clampZoomLevelIndex` in `useTimelineStore.ts`. The comment is not asking for
> clamping to exist. It is asking for it to live somewhere else.

But the real case study here I think is about understanding of scope, and in modern web practices, how you use utils, stores, etc.

> **Comment.** Agreed, and this example belongs in this file for a second
> reason. You used the word "hoisting" in this same PR thread, in the refactor
> sense. See "The refactor" below.

## Looking at the code

### The fix
- In `store`, added two things
  1. in the `useTimelineStore` block, under the desktop stuff, adding a initializated `mobileZoomLevelIndex`, and then set index, set step, which is a wraper on top of the index
  2. a new constant named `clampZoomLevelIndex`, that does the clamp stuff


- In `util`
  1. use the store
  2. in ths `useZoom`, update the old constants that updates the scale, to use the stored state

> **Comment — what this list leaves out, and it is the whole problem.**
> `zoomIn` and `zoomOut` were not added. They already existed in `useZoom`,
> as `useCallback`s. `git diff main...HEAD` shows the PR deleting them:
>
> ```ts
> const zoomIn = useCallback(() => {
>   setMobileZoomLevelIndex((zoomLevel) => {
>     if (zoomLevel < MOBILE_ZOOM_LEVELS.length - 1) { return zoomLevel + 1; }
>     else { return zoomLevel; }
>   });
> }, []);
> ```
>
> The `if (zoomLevel < MOBILE_ZOOM_LEVELS.length - 1)` is the clamping. It was
> already there, written as an if/else instead of `clamp()`.
>
> So the PR did not add stepping logic to the store. It moved stepping logic
> out of `useZoom` and into the store. Describing this as "added" is what made
> the review comment unreadable.

### The comment

"Why not use the mobileZoomLevelIndex you're already importing from the store in this file, instead of this .getState()?"

"I think it'll be neater to just store the mobile zoom level index in the store, and keep the stepping/clamping logic within this file, instead of splitting the zooming logic across useZoom and useTimelineStore"

> **Comment.** Read "keep … within this file" literally. "Keep" means it is
> already there. The reviewer is describing the code as it was on `main`, and
> asking for it back. It is not a request for new work.

### The refactor
 Well, now, thinking about it, the refactor I did on ".getState()" got a pass, what was changed was moving up the mobileZoomLevelIndex so I can cal it in initialMobileZoomLevel

> **Comment — this is the link to the first half of this doc.**
> You wrote in that thread: "do you mean hoisting the `mobileZoomLevelIndex`
> selector (currently declared further down, line 56) up above this line". That
> is hoisting in the refactor sense — you move the line by hand.
>
> But the reason the line had to move is hoisting in the language sense. You
> also wrote: "As the file is ordered now the const does not exist yet at this
> point." `const mobileZoomLevelIndex` was declared below, and line 40 read it
> from above. That is a temporal dead zone hit.
>
> `useTimelineStore.getState()` was an escape from the TDZ, and it changes
> behaviour, not only style. `getState()` reads the store outside React's
> subscription, so nothing re-renders when the value changes.
>
> Your stated blocker was correct: you cannot call a hook inside a ternary,
> because `props.isMobile` can flip on resize. The fix is not to escape the
> hook. It is to call the selector unconditionally and put the ternary on the
> value. That is what you did.

 Then the other comment - what I have fixed or tried to fix was moving th `stepMobileZoomLevelIndex` , the `zoomIn` and `zoomOut` into the store, but he also ment the clamping? I guess 1. I dont know why we want this 2. I dont know why you said I have already done it 3. how do i address?

> **1. Why we want this.**
>
> Narrow reason: a setter that silently clamps is a setter that lies.
> `setMobileZoomLevelIndex(99)` returns normally and stores `4`. The caller has
> no way to know its input was rewritten. That is a hidden side effect behind
> an innocuous name.
>
> General reason, and this is the case study: **promote to a wider scope only
> what needs the wider lifetime.** The ticket asked for one thing — the zoom
> level must survive unmount. That is the *value*. `zoomIn` does not need to
> survive anything. It is recreated on mount and works. It went up anyway,
> because it felt like it belonged next to the thing it operates on.
>
> A store answers "what is the value?" A hook answers "what are the legal
> moves?" Giving the store both jobs means reading "how does mobile zoom work"
> now costs two files.
>
> The counter-argument is real and worth knowing: clamping inside the setter
> guarantees the bound no matter who calls it. That wins when there are many
> callers. Here there is exactly one — `useZoom` — and `TimelineView` reaches
> everything through its return value. One caller, so locality wins.

> **2. Why "you already did it".**
>
> The clamping *rule* now exists three times across two files. One copy is
> yours, two are not:
>
> | Where | Whose |
> |---|---|
> | `useZoom.ts:188`, inline `clamp()` in the pinch handler | pre-existing |
> | `useZoom.ts`, the old `zoomIn`/`zoomOut` if/else | pre-existing, deleted by this PR |
> | `useTimelineStore.ts:55`, `clampZoomLevelIndex` | new |
>
> So you did not repeat your own work. You added a third home for a bound that
> `useZoom` was already enforcing.

> **3. How to address it.**
>
> The store reduces to two lines, both pure state:
>
> ```ts
> mobileZoomLevelIndex: number;
> setMobileZoomLevelIndex: (index: number) => void;   // plain set, no clamp
> ```
>
> Delete `zoomInMobile`, `zoomOutMobile`, and `clampZoomLevelIndex` from
> `useTimelineStore.ts`. `stepMobileZoomLevelIndex` goes with them, which
> resolves the naming comment for free.
>
> In `useZoom.ts`, define the bound once at module level and use it in all
> three places — the two callbacks and the pinch handler. Restore
> `zoomIn`/`zoomOut` close to their old shape, but writing to the store setter.
>
> One gotcha to plan for. The old callbacks used React's functional updater,
> `setMobileZoomLevelIndex((prev) => ...)`, with `[]` deps. The store setter
> takes a plain `number`, so that form is gone. Either add
> `mobileZoomLevelIndex` to the deps array, or widen the store setter to accept
> `number | ((prev: number) => number)`. The first is simpler. The second keeps
> `[]` deps.
>
> Then check the callers. `TimelineView.tsx:582` calls
> `setMobileZoomLevelIndex(0)` directly, which is in bounds, so removing the
> store's clamp is safe. That is the whole caller list.

> **Open question, unrelated to the review.**
> `DEFAULT_MOBILE_ZOOM_LEVEL_INDEX` is `1`, but `TimelineView.tsx:582` resets to
> `0` and line 573 hides the reset button at `!== 0`. Both predate this PR — `1`
> preserves the old `useState(1)` — but the ticket says "Default view: min zoom
> level", and min is index `0`. Ask the reviewer rather than deciding alone.


So what I can do now is actually return some code of the original? so in the store, now we still use the constant, we remove the 


### The take away

