### doing some exercises and sum the takeaways

#### messed up my understanding of `{props.children}`

So what it actually does is to say "you need to take all I have as it is.." kind of like giving it a lot of 'elasticity'

So like in a function such as 

```
function Card(props) {
  return (
    <div className="card">
      <h3>{props.title}</h3>
      <p>{props.body}</p>
    </div>
  );
}
```
if what you pass is not `title` and `body`, but  `title`, `body`, and `image`, then what you wanted won't show. So that is why

```
function Card(props) {
    return (
        <div>
            {props.children}
        </div>
    )
}
```
instead, is better when you want to have more elasticity, when things are not so as expected.

A even better example (which I got wrong) - 

```
function MyComponent(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.children}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <MyComponent title="Hello">
        <span>This is some text!</span>
      </MyComponent>
    </div>
  );
}
```
The above snippet would return 

```
<div>
  <div>
    <h1>Hello</h1>
    <p><span>This is some text!</span></p>
  </div>
</div>
```

the `span` is wrapped inside of the `p`, 

So even though it looks like 

```
<MyComponent title="Hello">
  <span>This is some text!</span>
</MyComponent>
```

It is underneath, just

```
MyComponent({
  title: "Hello",
  children: <span>This is some text!</span>
})
```