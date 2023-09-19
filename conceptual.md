### Conceptual Exercise

Answer the following questions below:

- What is a JWT? JSON web token

- What is the signature portion of the JWT?  What does it do? it serializes the data in the token such that, if it were changed, it will no longer validate

- If a JWT is intercepted, can the attacker see what's inside the payload? yes

- How can you implement authentication with a JWT?  Describe how it works at a high level. by using the built in validate function for jwt

- Compare and contrast unit, integration and end-to-end tests. unit tests check how individual functions work. integration and end to end tests check to make sure those functions work together correctly

- What is a mock? What are some things you would mock? a mock is any sort of fake data; you could mock entries in your db or returns from external APIs

- What is continuous integration? CI is where code from multiple developers is merged into a single repo, using testing to make sure that everything works as expected

- What is an environment variable and what are they used for? env variables are set outside the scope of the program. they can be used to configure testing, for security purposes, language/region settings etc

- What is TDD? What are some benefits and drawbacks? test-driven development is where you write the tests for your code FIRST, then write the code to make those tests work. benefits can include early bug detection and modularization; some drawbacks can include the setup and maintence time

- What is the value of using JSONSchema for validation? automatically standardizes data, checks for data types, handles errors, sanitizes data, etc

- What are some ways to decide which code to test? important parts of the code, code where the user is generating input, points of integration, etc should be more extensively tested than code w/simple logic

- What does `RETURNING` do in SQL? When would you use it? when changing your db, you can use RETURNING to ensure that it changed the way you expect it to. you can use it to INSERT, UPDATE, DELETE, retrieve dynamically generated values (like a sequential id)

- What are some differences between Web Sockets and HTTP? http is stateless/web sockets are 'stateful', web sockets don't have standard response codes (ie. 200, 404)

- Did you prefer using Flask over Express? Why or why not (there is no right
  answer here --- we want to see how you think about technology)?  i'm not sure. we didn't exactly do the same things in express that we did in flask. they each had parts that i liked and parts that i didn't care so much for
