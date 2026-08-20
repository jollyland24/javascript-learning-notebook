## Hooksksksksksks

Cursious what "Build a “stateful” function component." means in the descrition

### Component State

Ok, it is game time. We've got two things couples - "The current state" and "The state setter", kind of reminds me of the initial speed and acceleration speed in physics

#### Ugh why there is raining smell oustide im inside learning how to use `useState()`

The basic shape of it is

```jsx
const [currentState, setCurrentState] = useState();
            v              v                
//      current value    to update         
```

So basically, we are destructuring useState()'s returend values intoo two pieces, but it is written in the way that reads more like "let's have the two features" that can be used in the one big hook?


#### I tried to find a good analogy for Hooks

So what I find interesting is, it is actually can be seen as a layer upper than JS stuff (functions), which in a good analogy in human world would be for a human to do a series of things. Whereas Hooks are like "habits and instincts", very iffy.

To put it in a more practical way, you are **Mark** from **the Severance**, everyday you log off after work and your memory is wiped, so you come back everyday, fresh (slightly off, cause innie remembers innie's day before)

You want to escape, of course, everyday you come back to Lumon, you expplore a bit of the building, and no luck, cause it is too complex.

You find the map. Every time you write something new on it — a corridor, a door, a name — the day ends. You wake up at your desk again, fresh, with no memory of walking that hallway. But the map has the new line on it. So you keep going from there.

And that is `useState()`

And then you try to hide it, so you are the only one who knows where to go, how to escape, so you sketch the map under your desk.

And that is `useRef()`


#### Is it accurate though?

```jsx
import { useState } from 'react';

export default function ColorPicker() {
  const [color, setColor] = useState('white');

  const divStyle = { backgroundColor: color };

  return (
    <div style={divStyle}>
      <p>The color is {color}</p>
      <button onClick={() => setColor('Aquamarine')}>Aquamarine</button>
      <button onClick={() => setColor('BlueViolet')}>BlueViolet</button>
      <button onClick={() => setColor('Chartreuse')}>Chartreuse</button>
      <button onClick={() => setColor('CornflowerBlue')}>CornflowerBlue</button>
    </div>
  );
}
```

The implementation flow was:

1. import, of course
2. create the `useState()` hook — with an initial value, otherwise `color` is
   `undefined` on first render and the `<p>` renders empty
3. wire the buttons with handlers that call the setter, each with its own value
4. build the styling from `color`, extracted into `divStyle`

`divStyle` gets rebuilt on every render, and that's the point — if it didn't, the
background would never change.

**Updated shape understanding:**

```jsx
const [color, setColor] = useState('white');
//     value   function
```

That's the whole reason `setColor` exists. If `color` were assignable I'd just
write `color = 'Aquamarine'` — but it's a const, and reassigning it wouldn't
repaint anything anyway, because React would never know something changed.

I think this understanding nuanced the analogy borrowed from the severance -

| the Severance | React |
| --- | --- |
| Mark (the innie who shows up) | the component function |
| what's currently written on the map | `color` — the value this render |
| the act of writing a new line | `setColor(...)` — the setter |
| the map surviving the wipe | React holding state between renders |


> why do i feel like my world changes a bit everytime i obsorb a new code knowledge, kind of like learning english as a non english first language person...so like... people already knew that... like how diff our worlds are...



#### OK, GREAT, CLOSER LOOK

```jsx
import { useState } from 'react';

function ToggleLoading() {
  const [isLoading, setIsLoading] = useState(true); // here! so it is simple, if you say something here, you get a kind of default value

  return (
    <div>
      <p>The data is {isLoading ? 'Loading' : 'Not Loading'}</p>
      <button onClick={() => setIsLoading(true)}>
        Turn Loading On
      </button>
      <button onClick={() => setIsLoading(false)}>
        Turn Loading Off
      </button>
    </div>
  );
}
```

> boolean... i love boolean... both in code and in design... so effective... so unrealistic... so non-human....


#### OK, MORE ON STATE SETTER

```jsx
import { useState } from 'react';

export default function EmailTextInput() { 
  const [email, setEmail] = useState(''); // why do we have a '' this time? -> it is the default empty string
  const handleChange = (event) => {  // then we receive a prop for this handlder 
    const updatedEmail = event.target.value; // we get the `event.target` from DOM, and we take the value
    setEmail(updatedEmail); // and we finally, use the setter, where we is doing something meta - it is actually using the updatedemail as what returns, is it related my first comment?
  }

  return (
    <input value={email} onChange={handleChange} />
  );
}
```

now like the whole thing goes beyond intuition....so this is how the machine explains it

```jsx
import { useState } from 'react';

export default function EmailTextInput() { 
  // '' = start empty. Not undefined — this value goes straight into the
  // input below, and an input needs *a* string, even a blank one.
  const [email, setEmail] = useState('');

  // We define this. We never call it. React calls it when someone types,
  // and React is the one that passes `event` in.
  const handleChange = (event) => {
    // event.target = the <input> that fired this
    // .value       = what's in the box right now
    // (Just where the browser puts it. No deeper meaning. Memorize it.)
    const updatedEmail = event.target.value;

    // Hand it to React. This ends the render and starts a new one.
    setEmail(updatedEmail);
  }

  return (
    // value={email}      → the box DISPLAYS state. It doesn't hold it.
    // onChange={handleChange} → hand over the function, don't call it
    <input value={email} onChange={handleChange} />
  );
}
```

OK, so the lesson is, when reading code, it is a wast of time to do it line by line like a machine, what makes it better is to read with a thread, in this example - 

1. What's on screen?      → read the `return` first. That's the visible output.
2. What does it depend on? → find the state it reads: `value={email}`, so → `email`
3. Where does that live?   → `const [email, setEmail] = useState('')`
4. Who writes it?          → `setEmail` — called from `handleChange`
5. What triggers that?     → `onChange` on the input



#### THEN MORE ON THE "use setter outside of jsx"

So before we had

```jsx
<button onClick={() => setColor('Aquamarine')}>Aquamarine</button> // this is inside of jsx
```

and now we have 

```jsx
const handleChange = (event) => { // we define the handler first, then pass to jsx
  const updatedEmail = event.target.value;
  setEmail(updatedEmail);
}

return <input value={email} onChange={handleChange} />; // this is jsx
```

so now the handler can get interesting itself.

```javascript
import React, { useState } from 'react';

const validPhoneNumber = /^\d{1,10}$/;

export default function PhoneNumber() {
  const [phone, setPhone] = useState('');
  const handleChange = ({ target })=> {
    const newPhone = target.value;
    const isValid = validPhoneNumber.test(newPhone);
    if (isValid) {
        setPhone(newPhone); // i really enjoyed this part...so simple and short, and it just lays on top of the one line before nicely
    }
  };

  return (
    <div className='phone'>
      <label for='phone-input' >Phone: </label>
      <input id='phone-input' value={phone} onChange={handleChange}/>  // this was okay fun, have to follow the shape of using jsx for the handling of it
  );
}
```

#### THEN MORE ON THE "Set from previous state"
