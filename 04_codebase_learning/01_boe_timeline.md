## Actual Questions

### My questions & Inspection

#### 1. Why are there several nodes highligted everytime I land

So the components are in `apps/client/src/components/Timeline`, one of which is what makes the nodes get highlighted

[?] So the takeaway is to always look into the components as well when reading the docs? There is also a `TimeFilter` what does it have to do with Timeline?

[?] What is the difference between tracking the hex with GSAP and with react state?

[?] Where is this docuemnted? Any decisions made beyond the code implementation? (I could imagine that the nodes selection worths stakeholder discussions)

#### 2: How do we map the nodes to the different shapes of Hexs

This is the three.js part, where you construct all sort of knobs you can tweak in this file `apps/client/src/components/Visualization/three/hexagons/Hexagons.ts`

#### 3: How do we align the nodes in the axises?

The `apps/client/src/views/TimelineView.tsx` defines `timeScale` as single source of truth

["single source of truth" like these kind of comments is just so helpful!]

#### 4: How does it manage to show the connectors on hover?

[?] six hops is just... shows that it would be valuable to document it?

#### 5: Why does the mobile use different mechanisms for scaling, and what exactly is it using?

#### 6: How does the filter work together with the visualizations?

#### 7: How do you expand/compact the data point nodes?

#### 8: How does the volumn visualization work in the desktop scrubber?

#### 9: How does the animation of nodes moving around work?

#### 10: How does the focus mode/timeline visualization routed in the navigation?

### Gaps in documentation

## Pre-existing Questions (readers can ignore)

### Tech Stacks

- What are the tech stacks being used? The considerations and why?
  - I have already learned a bit in the documentation, why three.js is considered, even though

### Documentation Convention

- What is the general practice for documentation when building features? (really in general, like in software development)
  - The confusion I have had is often how much knowledge do we share with the so called future developers - can we assume that there are some common knowledge among us all, so even though you are introducing something compeletely new, you don't have to repeat the knowledge in documentation
  - Another thing is, from my pov, as a developer coming in later, who has little experience in development, how do I even know what I can be benefited from knowing?

### The myth of trying to first knowing before doing

- I also chatted with ruben about it and the take away is that what you need to know is the grander scheme of things, which allows you to route yourself. So I wonder if the question would eventually round down to the gaps I see in the repo documentation

- Also one specific file "axisapi" that can be better documented

### Just Google It

- So I googled also how to understand codebase and found a nice [video](https://www.youtube.com/watch?v=jqHXJ3O7WGw) about it as well.
