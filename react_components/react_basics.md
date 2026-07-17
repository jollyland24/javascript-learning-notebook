## Digging a bit into React Components writing

### So what does Next.js help with?

- With plain React, the virtual DOM trees are compared, and once the changes
  are decided, they're turned into real DOM in the browser. Next.js changes
  this: it renders components to complete HTML on the server first, sends that
  finished HTML to the browser, then loads the JS afterward.
- That enables a separate hydration step, conceptually different from
  `createRoot` — instead of building the DOM from scratch, hydration attaches
  interactivity to the already-rendered server HTML.
- In plain React, every component runs in the browser. In Next.js, components
  run on the server by default (their JS never reaches the browser); you add
  `use client` to opt a component back into running in the browser.

### Then the question comes - so is Next.js better than plain React?

#### Next.js wins when

- You want users to see content immediately — real HTML arrives before the JS
  loads, instead of a blank page while JS downloads and runs
- SEO matters — plain React's initial HTML is basically empty
  (`<div id="root"></div>`) and gets filled in by JS later, which crawlers may
  not wait for. Next.js sends HTML that already contains the content, so
  crawlers see it
- You want to ship less JS and keep secrets server-side — Server Component code
  never reaches the browser (smaller bundle), and DB queries / API keys stay on
  the server
- Cleaner data fetching — Server Components fetch data during render, right next
  to the database/API, avoiding client-side fetch waterfalls and loading spinners

#### Plain React wins when

- Mostly front-end interactivity, not much server/backend involved
- Simpler to reason about — everything runs in one place (the browser)
- Embedding a single interactive widget into a page something else already
  controls — e.g. dropping a React comment box or live-search bar into an
  existing HTML/WordPress/Rails page by mounting it into one `<div>`. Next.js
  would be overkill

## Rendering Magics

### Stuff i really dont care about

#### CASE

I learned that I need to import ReactDOM..but I have Next.js why would I care.
BUT the fun thing is if it is React, the component needs to look like "MyComponent" instead of "mycomponent". but still, why would I care stuff on this execution level?

I really don't know what is the takeaway here, so I asked Claude again, and it said `Lowercase tags are furniture. Capitalized tags are people.` How I understand is that the lowercased stuff are usually things like HTML elements that you can't call or change, and then the capitalized are usually, and one nuance is that when the compiler is looking up for the functions, since it is already conventionally first letter capitalized, people just went for the PascalCase Style? On a side note, for the camelCase, it is used for `descriptions and actions.`

#### return

Ok I do no actually remember much about when to use return and when not, but what I do remember is that if you need to get something out of a function, like it is calculating something, then you need a return. Here it is just the same notion but for returining jsx code

```
function MyComponent() {
    return <div>Hello</div>};
```

#### App.js / index.js

Both needed but their difference is more dimentional than the difference in the naming

> - `index.js` = the door/plug — the single connection point between your React realm and the real web page. Runs first, mounts everything, then gets out of the way.
> - `App.js` = the realm — the living, top-level world of your actual app, which index.js picks up and plugs in.
