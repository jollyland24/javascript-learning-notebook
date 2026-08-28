I need a crush course on forms

### setting up input.js

So firstly, the mental model of using React is, the DOM that the browswer owns has the knowledge of the HTML tree, as well as the **live current state**, whereas the VDOM, as a result of state changes, tells the DOM what to render.
`state (lives in React)  →  render()  →  VDOM description  →  patch real DOM`.

On top of that, the state is managed by a pair of communicators, in this case it is `<input value={userInput} onChange={handleUserInput} />`, where the value is used to communicate from React to DOM to push the truth down to browser, and the onchange used to communicate the DOM manipulation back to React.

Well I did learn better how to read code, from [last week](/Users/jolly/Documents/GitHub/boeing-kg/apps/client/src/stores/useAppStore.ts) So first I could see that there is no return, so the main part is the function called `Input()`, where two big `div` s are there, from the hint of the styles, I can see that one is about email container, the other is input display, for now, there is no jsx code yet.

> 🖊️ There *is* a return. And `<>…</>` **is** JSX — you meant "no `{}` yet".
> Reading the CSS names to guess intent: good, keep doing that.

Then I put `onChange={handleUserInput}` as one of attributes of `<input />`, which brought me back the memory of writing components for the first time, where I had this feeling that the parts work together well but mentally we need to know who depends on who, like in this case, a handlder like `handleUserInput` is commonly a pair with a component that requires more complex logics

> 🖊️ Handlers pair with **state**, not with complexity.
> `onX` = prop you pass. `handleX` = function you write.

### complete the function

so it is almost a recap

```jsx
// an example function that uses a hook to update the input dynamically 
function Example() { 
    const [userInput, setUserInput] = useState(""); // destructuring of useState into the value + function pair
    function handleChange(e) {
        setUserInput(e.target.value);
    } // extract the handler outside of jsx
    return <input type="text" value={userInput} onChange={handleUserInput} />; // update values in jsx
}

```

The one delight is that now we can also give user feedback of the input like how React sees it, by using `{userInput}`

### "controlled" vs "uncontrolled"

Im pointed to this [doc](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components), so the takeaway is that they are different, like prototypical kinds of components, in a nutshell, it is about "does the parent own this state, or does the component?"

when we say "controlled" component, (part of) the information derives from the parent via `props`, and when we say "uncontrolled", the information updates via component level `state`

> 🖊️ Roughly right, three sharpenings.
>
> **1. Controlled is both directions**, not just props in. Props down, events up.
> Taking a prop *and* keeping your own copy is the classic bug:
> `const [text, setText] = useState(props.value)` — two copies again, they drift.
>
> **2. "comes from props" doesn't separate them.** `defaultValue` / `defaultOpen`
> are props too. The real test is *when the prop is read*:
>
> | | prop is read |
> |---|---|
> | controlled | **every render** |
> | uncontrolled | **once, at mount** |
>
> Change `value` from outside → input updates. Change `defaultValue` from
> outside → nothing, it stopped listening.
>
> **3. Uncontrolled ≠ `useState`.** A plain `<input>` stores its value in the
> **DOM node**, no React state at all. `useState` is how *your own* components
> do it. General term: "internal storage".

