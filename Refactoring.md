# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

An analysis of the code to be refactored showed that there was room for improvement in 2 main areas; repeated code and nested conditionals. I found that the hashing logic could be encapsulated within a function, to avoid repeating the parameter declarations. I created this function to perform one thing only - hash the input data with the desired algorithm and return a value. I then replaced the direct calls to the crypto library with my own declared function, reducing the clunkiness of the code. 

In addition, i leveraged modern ES6 syntax with one liner ternaries, enabling me to combine multiple `if` blocks and reduce code clunkiness, leading more minimal code, while maintaining readability and correct functionality.