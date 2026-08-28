## Props

I have a feeling that this is where it all begins, like when the introduction of sunwukong is fianlly wrapped up, and you then make sunwukong meets his shifu, and communication comes into play, drama comes into play.

But actually, it seems to be something just like calling a function, it is not that magical after all.

But maybe it is something that you can... play around, like more individual

### A bit of reviewing on deconstructingd syntax

For example, you have

```
const props = { displayText: "CLick me", color: "blue"}
```

It is a normal day, you defined a object that has two **properties**

And then, you thought you wanna use one of them, so you do

```
props.displayText
```

This is fine. But, you drank too much coffee and you were like I want the world upside down, so you did this **unpack** thingy

```
const { displayText, color } = props
```

Now `displayText` and `color` exist as their own variables, they... ascended.... But in the material world nothing flipped, `props` ia still the object of the two properties. But now you can write

```
function Button({displayText}) {
    return <button>{displayText}</button>
}
```

instead of

```
function Button(props) {
    return <button>{props.displayText}</button>
}
```

### Props are great, they can be displayed/router/trigger..

As stated in the title, you can not only

```
<Component say="this" />
```

But also

```
<Component this={true}/>
```

And even

```
function A(){
    function b() {
        //defination
    }
    return <Component whatever={b}/>
}
```

In the above example. It means "For this thing I want to do (A), I show a reusable piece (Component), and I plug in the specific behavior (b) that makes it do what I need this time."

Because "function is just a piece of data too"

More specifically

```
# ./Talker.js

import React from 'react';
import Button from './Button';

function Talker() {
  function talk() {
    let speech = '';
    for (let i = 0; i < 10000; i++) {
      speech += 'blah ';
    }
    alert(speech);
	}
  return <Button talk={talk}/>;
}

export default Talker;
```

What was bugging me at first was that it looked like it is consuming a pre-defined property named "talk", but it is actually defining, when you use this function, you can add the flavor of `talk` and it would then refer to `talk()` in the same function

```
# ./Button.js

import React from 'react';

function Button(props) {
  return (
    <button onClick={props.talk}>
      Click me!
    </button>
  );
}

export default Button;
```

And here it is the actual consuming of it.

### handleEvent, onEvent, and props.onEvent

So it can be tricky? When you use an `onClick` as a prop name on an instance of component, or using is to create a DOM manipulation fucntion?...but somehow people decide to keep it confusing but at least it reads consistent?

This is the shame of humanity.

Then, the course started to introduce to me how you can refer to the child of a prop (`props.children`), so it goes into almost another dimension... now in a component, you have no limit, you express yourself and then connect things however you want

```
<p>the child raised by the pp couple</p>
```

This dropped me a bomb. So I asked "is it used in modern ui? like i feel like this is a pattern that can gets interesting when you wanna make it generative." And it seems like I was on the right path.

> Data → UI. You map over data to generate children on the fly:
>
> ```
> <Grid>
>
>  {items.map(item => <Card key={item.id}>{item.title}</Card>)}
>
> </Grid>
> ```
>
> The layout doesn't know how many cards exist — the data decides.This is very dope! Imagine using semantic data to generate UI! (design and computer worlds finally show a sign or merging)

### default value

small step, but save ass in real life
