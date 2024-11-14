My way of working:

Tasks:
Backend:

1. Setting up backend project.
2. Figuring out how to get file with sha from a github repo.
3. Use langchain to pass the file content to a prompt in langchain.
4. Get quality score and the reasoning from the model (currenlty will use gpt 4)

Frontend:

1. Setting up next js with typescript
2. Setting up tailwind css and an initial form for submitting sha and github link.

Extensions:

1. Make the code work with pull requests and commits.
2. Add functionality to search from web to get latest coding quality standards and practices as well.

Improvements:

1. Setting up login/signup (Make a flow diagram for this.)
2. Saving history of the chat using langchain persistance layer. (make a flow diagram for this.)

API Endpoints
/code-quality
(create a code quality snippet for a result)

How to run locally:

1. go to backend folder and run following commands

```
npm install
npm start
```

2. Go to frontent folder and run the following commands

```
npm install
npm run dev
```

This will open the application on http://localhost:3000. Navigate there and try out the app.
