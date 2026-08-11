### Purpose - Does the code do what it's supposed to do?

#### Functionality 
- Does the function actually covers the full design intents?

#### System dependency 
TODO: define "Use design systems properly"

### Readability - Is the code easy to understand?

#### Naming

Every naming conventions I find useful while reading the documentations [^airbnbnaming] [^alibaba] [^jsinfoninja]

- Avoid sigle letter names

- Use **camelCase** when naming objects, functions, and instances

- Use **PascalCase** when naming constructors or classes

- Use **UPPER_SNAKE_CASE** when naming constants

- Acronyms and initialisms should always be all uppercased, or all lowercased. (eg. `HTTPRequests` instead of `HttpRequests`)

- Don't use uncommon abbreviations, or shortening words to make your own abbreviations, for example, `userAgent` → `ua`

- Don't encode the type in the name. Examples: `obj`, `data`, `value`, `item`... or `nameString`, where `name` does the job perfectly

- If the `interface` name is to indicate the ability of the `interface`, then its name should be an adjective.

- No space is used between the '(' character and its following character. Same for the ')' character and its preceding character.

- There must be one space between keywords, such as if/for/while/switch, and parentheses.

- There must be one space at both left and right side of operators, such as '=', '&&', '+', '-', ternary operator, etc.

- Java code has a column limit of 120 characters. Except import statements, any line that would exceed this limit must be line-wrapped

- There must be one space between a comma and the next parameter for methods with multiple parameters.

- Consider to give function the prefixes that are aligned with the codebase, bad example is, for example, mixing `displayMessage`, `renderCard`, `showText`, which gives you the wrong impression that they are functionally different. And on the other hand, consider to give functions that are indeed different less similar names.

- Name things by what they are, not by how they compare to something else. Avoid relative names like "mega", "new", "super".

- Do not use same names for variables inside and outside a function.

- Be precise on the naming based on what effects the function have, for example, `isReady()` should only carry out calculation, find and return the data, without creating "side-effetcs"

- Also, do not make your functions do anything that is not said in the name

- Name booleans with a predicate prefix: `isVisible`, — not `visible`.

- Prefer positive boolean names: `isValid` over `isNotValid` (so you never read `!isNotValid`)

#### Comments and Styles

- **Is the code self explanatory enough?**

  “If the code is so unclear that it requires a comment, then maybe it should be rewritten instead”. The comments are beneficial when it acts like a tldr and/or a lil flyer of why/how/what to do with the solution, this seems to be a debate between developers if there is 'bad comments', but for now, keep code self-explanatory, and comment only when you have other intentions [^jsinfocomments], an example of intentional comments, see this [image](media/example.webp).

- **Are the functions abstracted enough?**

  Code can be factured into functions, functions can be extrated into helpers, etc. This helps the function to become self-descriptive[^jsinfofacture]

### Performance - Does the code run efficiently?

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

[^jsinfoninja]: https://javascript.info/ninja-code

[^airbnb]: https://github.com/airbnb/javascript

[^airbnbnaming]: https://github.com/airbnb/javascript#naming-conventions

[^opencodereview]: https://github.com/alibaba/open-code-review

[^alibaba]: https://github.com/alibaba/Alibaba-Java-Coding-Guidelines

[^openaiinterview]: https://x.com/wquguru/status/2083943877187432904
