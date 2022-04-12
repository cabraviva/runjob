# runjob
 A Javascript Jobrunner with human syntax

# Features
- Jobs
- Queues
- Chains

# Install
```sh
npm install runjob
```

# Import
```js
const Job = require('runjob')
```

# Creating a Job
```js
const myJob = new Job(function () {
    console.log('Look mum, I got a job!')
}, 'MyJob')
```

The name (second argument) is optional and is only relevant for the Job.tree() function

# Executing a Job
## Now
```js
myJob.run.now()
```

## In 500 ms
```js
myJob.run.in(500).ms()
```

## In 2 seconds
```js
myJob.run.in(2).seconds()
```

## In 3 minutes
```js
myJob.run.in(3).minutes()
```

## Every 500 ms
```js
myJob.run.every(500).ms()
```

## Every 2 seconds
```js
myJob.run.every(2).seconds()
```

## Every 3 minutes
```js
myJob.run.every(3).minutes()
```

## At a specific Date
```js
myJob.run.at(new Date().getTime() + 3000) // Run at the Date in 3 seconds
myJob.run.at(new Date(new Date().getTime() + 4000)) // Run at the Date in 4 seconds
myJob.run.at(new Date()) // Run now
```

# List all Jobs
Just simply run
```js
Job.tree()
```

# Queues
A queue handles jobs successively and fires an event when the queue is empty. Queues also work like they are a job, so you can use something like `myQueue.run.in(2).seconds()` to handle it at a certain time.

## Creating a Queue
```js
const myQueue = new Job.Queue()
```

## Adding Jobs to a queue
First you need to create a few jobs. Then you can add them to the queue like this:
```js
myQueue.add(jobOne, jobTwo)
myQueue.add(jobThree)
```

## Handling a Queue
```js
myQueue.handle().then(() => {
    console.log('Queue finished!')
})
```

# Chains
Chains are like queues, but they work simultaneously. This means that if the Chain is handled all jobs are started at the same time.

You can use a Chain exactly like a Queue, but you have to use `Job.Chain` instead of `Job.Queue`.
It's also important to know that Chains don't fire an event if they finished, so you can't use `myChain.handle().then()` and have to use `myChain.handle()`
