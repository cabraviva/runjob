const Job = require('../main.js')

// Run a job directly
new Job(function () {
    console.log('Hello World!')
}, 'Hello World').run.now()

// Run a job repeatedly
const repeatedJob = new Job(function () {
    console.log('I am running repeatedly!')
})

repeatedJob.run.every().second().and.now()

// Cancel repeated Job after 5 seconds
new Job(function () {
    repeatedJob.cancel()
}).run.in(5.5).seconds()

// Job Tree
Job.tree()