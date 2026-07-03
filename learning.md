## Finally, I started to do my course again

Looks like I have learned a lot about Javascript basics already before, so I am picking up from JSX ~~today~~ this week.

Do we have many JSX files in client repo? No, but many TSX, which I suppose is typescript that needs to be compiled, same idea.

> [!NOTE]
> Recently I have being thinking how coding is basically just writing, sometimes there is really not many technical stuff, but writing with a bit of parralel translating in mind

## JSX Basics

### Attributes in JSX

```
const p1 = <p id='large'>foo</p>;
const p2 = <p id='small'>bar</p>;
```

So this gave me somthing to think about... how is this any useful... and I asked claude, it said **_"The thing it's quietly setting up is the actual idea, which is this: JSX turns a piece of UI into a value."_** It gets slightly more interesting, so the point is, in code, you can give things attributes, better examples are: `src={user.avatar}` which tells what resource to use, `disabled={isLoading} `which tells the logic of when it needs to be disabled, `className={animal.danger}` stamps a value from the data onto the element, which CSS can then style. So think of the general idea here, instead of just how this can be put in html.

> [!NOTE]
> And I thought about how tedious this is, and in real life, it is like a painter who like to list all the colors on a sheet, instead of going with instinct, and honestly, as one individual painter, you may go for either, but probably if you'd like to produce more paintings, you need those ready. So coding is based on the idea of mass production? And claude corrected me: **_"It is actually mass customization — one rule, many outputs, each one shaped by its own data"._** So I'm getting existential, and asked claude - "can we go back to feed cows?", claude nudged me to go back to learn javascript, I said "no like real real real flesh cows, like why do we have to work for this?", it said a lot of things, why would I quote what it said? it is not even a human being, but it mentioned that I still need to eat (get paid), yes, good reminder; then, it tried to convince me that my work actually has value but it is not as visible as looking at a happy cow. And eventually it left me to think if I want to feed cow or live in the world of abstraction.

### Some syntax stuff about wrapping functions

The rules under the hood:

- JS functions return one (and only one) value, it is a decision made in code to semantically make code more logical - one input is mapped with one output.
- JSX compiles to function calls, using 'Babel' to compile the HTML-looking code down to actual functions, which then would be executed by React (most likely).

### Render JSX code

So what must be there is the React libray `createRoot`, an example code snippet would look like this:

```
const toDoList = (
  <ol>
    <li>Learn React</li>
    <li>Become a Developer</li>
  </ol>
);

const container = document.getElementById('app');
const root = createRoot(container);
root.render(toDoList);
```

> [!NOTE]
> the learning here is also how tou break down the rendering by defining the `container` then the `root`, and then use the `root` ro render the defined jsx code, all of these are written in a complicated way because it is more human readable

### Rendering rule: root `render()` only updates DOM that have changed

So if you write it twice, if the DOM has not been updated it will not render the second one.

> [!NOTE]
> so today i was also thinking, why would i still learn coding? and it comes down to me that perhaps figma has a chance to win their bet of the creatives' future - that code is becoming the material, so what if graphic, web, whatever comes would just be made better if I know the basic materials better? just like the craft of wooden furnitures, there are good ideas in design, but sometimes also just good techniques used in making that makes people like it (I become so all of the sudden uncynical I think, part of the reason could be I returned to the gym yesterday) But syntax is not necessarily smart to really concor? Perhaps try to understand the concepts through abstracting the learnings, and so when designing I could design with a nicer pallete, and under the hood, it is just like learning ready made softwares, and all the tools are just scaffolding to actually make incredible things

## More Advanced JSX stuff

### Virtual DOM (VDOM)

aka. the victorious doorway to the magnificent (no, it is actually virtual document object model), it is like a snapshot, everytime something changes, it would make a new snapshot, and then compares it with the old one, find what changed, and then touches only those spots on the real DOM

### Styling a div like HTML

Give class (`className=`, not `class=`) to a div, so it would render your elements using defined css

### Javascript expression in JSX

Write javascript code inside of html elements

`root.render(<h1>2 + 3</h1>)` would literally print
`<h1>{2 + 3}</h1>` would calculate the formula. the curly braces are JS code's lil house

### Variables in JSX

Inside of the curly braces, since it is javascript expression, you can also use the variables, i mean, any vairables, even outside

**But if you wanna use an "expression", just remember to use the curly braces!**

> [!Note]
> and I wonder if I really do understand a lot about JS now...or should I actually learn more about react which is what I need to use every day

### Event linsters in JSX

```
function clickAlert() {
  alert('You clicked this image!');
}

<img onClick={clickAlert} />
```

So basically, you can also make the element do things (the function passed in) with the even listener

### JSX Conditions

You can't write if/else in the curly braces, no, but you can write a if/else that have curly braces in it.. because, if/else is not an "expression", which means it does not boil down to a "value". Some expressions example:

- variables
- function calls
- condition? a : b
- &&

### The (great) ternary operator

> [!NOTE]
> truthy/falsy will be my pets' name, if I ever would have two cats, or a cat and a dog, and the falsy would be the cat, the truthy would be the dog, naturally

`x? y : z`

> [!NOTE]
> I have a nice feeling about this, I like this expression very much.

Btw, the falsy club:

- false: full black dressed, gothic girly, no mean no, no tricks, no subtext
- 0: the cruel cruel capitalism, you live and die by the count, no means you've got none money!
- "" (empty string): "Tao is Tao..." emptiness holds it's own value
- null: Something was here before, but perhaps it was stolen, who? that's the question to you, my majestic investigator
- undefined: buddasim in it's core, pure absence-of-having-been-defined energy
- NaN: hell, cursed, and NaN isn't even equal to itself, NaN===NaN is also false

### && in JSX

Same idea, but it is two-sides, if/then kind of thing

### .map() in JSX

This seems to be very handy when you have bunch of data needs to be formated.

example-

```
people.map(everyone => <li>{everyone}</li>)   // "for everyone in the list..."
people.map(each => <li>{each}</li>)           // "for each one..."
```

> [!NOTE]
> I love arrays, it seperates things out with different natures, items are items, presenting is presenting

### Keys

[Not this key](/image.png)

But this key
`<li key="li-01">Example1</li>`

So it helps React to match up items before and after a change (changed items, reordering, deleting... all kinda state changes)
