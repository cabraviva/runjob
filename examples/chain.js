// Import Job.js
const Job = require('../main.js')

// Create a chain
const myChain = new Job.Chain()

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

// And add them to the chain
myChain.add(myJob, longJob)
myChain.add(mySecondJob)

// Handle chain
// myChain.handle()

// Handle chain in 2 seconds
myChain.run.in(2).seconds()