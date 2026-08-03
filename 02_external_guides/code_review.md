### Review Checklist


#### Validating Functions

#### Naming Conventions

#### Comments and Styles

-  __Is the code self explanatory enough?__ 
  
    “If the code is so unclear that it requires a comment, then maybe it should be rewritten instead”. The comments are beneficial when it acts like a tldr and/or a lil flyer of why/how/what to do with the solution, this seems to be a debate between developers if there is 'bad comments', but for now, keep code self-explanatory, and comment only when you have other intentions [^jsinfocomments]

-  __Are the functions abstracted enough?__ 
  
    Code can be factured into functions, functions can be extrated into helpers, etc. This helps the function to become self-descriptive[^jsinfofacture]

-  __(Should be prettier's job but) how's the style?__ 
    
    In the [cheat sheet](/media/download.png), you can find the details of syntax rules [^jsinfosyntax]




#### Architecture



#### Project Specific

### Agentic 

Recommended by OpenAI [^openai], human devs and AI can run reviews in parallel, where the human devs focus on:

- architectural alignment
- the implementation of composable patterns
- the use of correct conventions
- if the functionality matches the requirements

whereas AI would:

- run initial coding review, for one or more times
- execute parts of the code and interpret runtime behvaior, trace logics across files and services



### References

[^openai]: https://cdn.openai.com/business-guides-and-resources/building-an-ai-native-engineering-team.pdf

[^jsinfocomments]: https://javascript.info/comments#bad-comments

[^jsinfofacture]: https://javascript.info/comments#recipe-factor-out-functions

[^jsinfosyntax]: https://javascript.info/coding-style#syntax

[^airbnb]: https://github.com/airbnb/javascript

[^opencodereview]: https://github.com/alibaba/open-code-review

[^alibaba]: https://github.com/alibaba/Alibaba-Java-Coding-Guidelines

[^openaiinterview]: https://x.com/wquguru/status/2083943877187432904

