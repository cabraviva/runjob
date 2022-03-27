// Import Job.js
const Job = require('../main.js')

// Create a queue
const myQueue = new Job.Queue()

// Create jobs
const myJob = new Job(function () {
    console.log('Hello World!')
})

const longJob = new Job(async function () {
    await Job.sleep(3000)
    console.log('Long job completed')
})

const mySecondJob = new Job(function () {
    console.log('Hello World2!')
})

// And add them to the queue
myQueue.add(myJob, longJob)
myQueue.add(mySecondJob)

// Handle queue
// myQueue.handle().then(() => {
//     console.log('Queue finished!')
// })

// Handle Queue in 2 seconds
myQueue.run.in(2).seconds()