# Tasks:

## Backend:

I did the following tasks in the order of priority.

1. Setting up backend project.
2. Figuring out how to get file with sha from a github repo.
3. Use langchain to pass the file content to a prompt in langchain.
4. Get quality score and the reasoning from the model (currenlty will use gpt 4)
5. Getting files from commits
6. passing files in chunks to the backend for processing.
7. Combining file content in one.

## Frontend:

1. Setting up next js with typescript
2. Setting up tailwind css and an initial form for submitting sha and github link.
3. Used sha cdn for quickly spinning up the components and setting up the containers.

# Improvements:

Currently, I haven't used any database, however in the future a database could be used for:- 2. Add functionality to search from web to get latest coding quality standards and practices as well. 3. Setting up login/signup (Make a flow diagram for this.) 4. Saving history of the chat using langchain persistance layer. (make a flow diagram for this.) 5. For the commit api call (since it takes a bit of time). Add functionality to stream LLM response as done in LLM. Langchain provides functions to stream response which I'm looking into now for later on.

API Endpoints
/code-quality
(create a code quality snippet for a result)

# How to run locally:

## a. Using node and npm.

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
I'll provide the env files for backend and frontend.

## b. Using docker

1. Install docker from https://docs.docker.com/engine/install/ubuntu/
2. Navaigate to the root of the project and run

```
docker-compose up --build
```

The application will run on port 80 of http://localhost

# Deployment:

I've dockerized the environment and currently don't have any free ec2 instance for deploying it.
For the deployment I was thinking of using aws ec2 and serving the application from port 80 as I'm doing here and use AWS ASG for scaling the application based on user demand. I have experience in that and that's why I dockerized the environment to showcase my expertise.

Kubernetes could also be looked into by making multiple pods of the application in a cluster. For that
there will be a need to write kubernetes manifests. These things will take a bit of time. Hence, I mentioned them in furture improvements since my main priority is to make a demo initially.

# Testing:

This is another aspect that would be looked into at this point. Setting up a testing environment for the backend and the frontend. For the backend, we can check edge case as follows:

## Backend:

1. When an invalid sha commit is provided.
2. Invalid file type is provided.
3. Invaild repo url is given.

We will use `mocha` and `chai` freamework for this.

## Frontend:

1. Check rendering of input fields.
2. Check rendering of form is correct.

We will use `jest` framework for this.
