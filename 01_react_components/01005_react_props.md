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

###
