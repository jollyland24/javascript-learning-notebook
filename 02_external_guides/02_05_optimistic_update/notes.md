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

Creating, updating a collection, is already documented with writtern examples of how to use the hook [^repoquote1]


[^tutorial1]: https://www.youtube.com/watch?v=cypK50wBCZs
[^tutorial2]: https://www.youtube.com/watch?v=OWuMckXJ-9k
[^tutorial3]: https://www.youtube.com/watch?v=M3mGY0pgFk0&t=125s
[^tutorial4]: https://www.youtube.com/watch?v=PPOw-sDeoNw
[^repoquote1]: https://github.com/cleverfranke/boeing-kg/blob/main/docs/optimistic-updates.md#updating-a-collection--dynamic-query-key


