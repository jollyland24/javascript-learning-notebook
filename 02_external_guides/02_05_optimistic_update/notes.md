### Theory

#### Videos
Followed a youtube video [^tutorial1]

What I understand optimistic updates is about doing tricks in the back so UI loads so smoothly, like a magic.

One example, a flow can be

``` 
user click
  → mutate(arg)
  → onMutate:  cancel refetches → snapshot cache → write the PREDICTED result
                                                   ▲ UI updates here, ~0ms
  → POST                          (user has already moved on)
  → onError:   restore snapshot → toast        ┐ one or the other
    onSuccess: usually nothing                 ┘
  → onSettled: invalidate → refetch → real server data replaces the prediction
``` 
I didn't want to follow the first view code breakdown.. so jumped to another one [^tutorial2] ~~and it sounds simpler? sounds like it can be named also optimistic? so it is just an async way of doing things?~~

So no, `useOptimistic` is an actual hook in React 19...and it is a modern approach many social media apps are using!

Try to watch another one...[^tutorial4], so like `useOptimistic` is also assuming that the fetch would succeed, so go ahead and update client UI, and then at the meantime we manage what we have in the back, if good, you map it over the old one(oh...that is why it is called **optimistic**...) if no good, you already have wrapped it into a try catch block, so it would have prompted a toast.


#### Repo Doc

Reading `docs/optimistic-updates.md` (which describes `apps/client/src/hooks/useOptimisticMutation.ts`). 


```
"This is handled by the useOptimisticMutation hook (apps/client/src/hooks/useOptimisticMutation.ts), which wraps TanStack Query's useMutation."
```
So it is using TanStack... how? I think the promise is taht this hook would handle all the TanStack stuff, it is a package of function calls, and it is not so seperate as it is `import { useMutation } from "@tanstack/react-query";` is how it is born, so it is actually react specific.


```
"When a mutation is triggered, the hook runs through the following steps in order:..."
```
I get this part, but it always bug me.. feel like I never understood what is "Fn" and why is it everywhere, it sounds like shorthand for Finland... So in TanStack, the convention is to us `SomethingFn` when it is a behavior, a function that dos something




### Case Study

Updating a collection is documented, with a written example [^repoquote1]. Creating
one is not. I first read that as a gap in the docs. It is not a gap. The hook
cannot do it.

#### Why every documented example works

Each example changes a thing that already exists. The id of that thing arrives in
the mutation argument. `useSaveNode` gets a `nodeId`. `useUpdatePersonalCollection`
gets a `collectionId`. The dynamic query key reads that argument:

```ts
queryKey: ({ collectionId }) => collectionQueryKeys.collection(collectionId),
```

#### Why create is different

A new collection has no id until the server makes one. The column is
`personal_collection_id: Generated<number>`, a Postgres serial. So the client
cannot predict it.

Look at my own diagram above. It says `write the PREDICTED result`. The id is the
one field I cannot predict. The diagram also says `onSuccess: usually nothing`.
For create, `onSuccess` is the only place the id exists. So create breaks both
lines.

#### The limit is in the type signatures, not in the docs

I was annoyed that `Fn` is on every prop name. The names are a convention. The
signatures are the answer:

```ts
mutationFn:    (arg)             => Promise<Result>   // makes Result
cacheUpdateFn: (clonedData, arg) => void              // takes arg. never Result.
queryKey:      (arg)             => string[]          // takes arg. never Result.
```

`Result` goes nowhere. Every prop that writes to the cache reads the argument
only. So there is no way to seed a cache entry whose key comes from the response.

Lesson: when a documented tool will not do what I need, read the interface before
I read the guide again. Prose examples show the happy path. Types show the limit.

#### What the code does instead

`CreateCollectionDialogTrigger` calls `queryClient.setQueryData` inside
`onSuccess`. It is the only `setQueryData` in a component in the whole app. It
works, but it runs after the server answers. That is not an optimistic update.
This is also why the branch needed a loading state: `navigate()` waits for the
POST.

#### Two ways out

1. The client makes the id and sends it in the POST body. Create then becomes the
   same shape as update.
2. Navigate to a placeholder id, then swap in the real id when the response
   arrives.

#### `useOptimistic` is a different problem

`useOptimistic` [^tutorial2] [^tutorial4] cannot help here. This app uses TanStack
Query, and `useOptimistic` has no cache to write to.

It is worth keeping the note for a different reason. It explains why the tutorials
felt easier than my real case. `useOptimistic` holds a local array during a
transition. You append a comment, it shows, the transition settles, the server
list replaces all of it. It never needs an id, because nothing is keyed and
nothing navigates.

My case needs the URL `/collections/{id}`. That is the point where a prediction
stops being cosmetic and must be a real address.

#### One thing I got right

My diagram puts `onError` before `onSettled`. The repo doc had them the other way
round, and the JSDoc in `useOptimisticMutation.ts` repeated it.

TanStack calls them in this order:

```
onMutate → mutationFn → onSuccess | onError → onSettled
```

So rollback runs before invalidation. The JSDoc was wrong twice. It also labelled
step 5 "On success" when the code invalidates from `onSettled`, which runs on both
paths.

This matters. As documented, invalidate-then-rollback would let a rollback
overwrite a fresh refetch. The code is correct. The doc described a bug that does
not exist. I fixed both.


[^tutorial1]: https://www.youtube.com/watch?v=cypK50wBCZs
[^tutorial2]: https://www.youtube.com/watch?v=OWuMckXJ-9k
[^tutorial3]: https://www.youtube.com/watch?v=M3mGY0pgFk0&t=125s
[^tutorial4]: https://www.youtube.com/watch?v=PPOw-sDeoNw
[^repoquote1]: https://github.com/cleverfranke/boeing-kg/blob/main/docs/optimistic-updates.md#updating-a-collection--dynamic-query-key


