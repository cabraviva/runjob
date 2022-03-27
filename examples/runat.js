const Job = require('../main.js')

const myJob = new Job(function () {
    console.log('I\'m running!')
})

myJob.run.at(new Date().getTime() + 3000) // Run at the Date in 3 seconds
myJob.run.at(new Date(new Date().getTime() + 4000)) // Run at the Date in 4 seconds

myJob.run.at(new Date('03/28/2022')) // Run at 03/28/2022 00:00:00