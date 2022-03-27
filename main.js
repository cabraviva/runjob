const { handle } = require('express/lib/application')

const uuid = require('uuid').v4

class Job {
    constructor (fn, name = 'Job') {
        this.fn = fn
        this.interval = []
        this.timeout = []
        this.id = uuid()
        this.name = name
        this.getsExecuted = []
        Job.jobs.apply(this)

        let currentJob = this

        this.run = {
            now: function () {
                currentJob.addExecutionLiteral('now')
                currentJob.fn()
                return currentJob
            },
            nowAndWait: function () {
                currentJob.addExecutionLiteral('nowAndWait')
                return new Promise((resolve, reject) => {
                    const executor = currentJob.fn()

                    try {
                        executor.then(resolve)
                    } catch (_e) {
                        resolve()
                    }

                    try {
                        executor.catch(resolve)
                    } catch (_e) {}
                    
                })
            },
            every: function (interval) {
                return {
                    ms: function () {
                        currentJob.addExecutionLiteral(`every ${interval} ms`)
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    miliseconds: function () {
                        currentJob.addExecutionLiteral(`every ${interval} ms`)
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    seconds: function () {
                        currentJob.addExecutionLiteral(`every ${interval} seconds`)
                        interval = interval * 1000
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    second: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} seconds`)
                        interval = interval * 1000
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    minutes: function () {
                        currentJob.addExecutionLiteral(`every ${interval} minutes`)
                        interval = interval * 1000 * 60
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    minute: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} minutes`)
                        interval = interval * 1000 * 60
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    hours: function () {
                        currentJob.addExecutionLiteral(`every ${interval} hours`)
                        interval = interval * 1000 * 60 * 60
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    hour: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} hours`)
                        interval = interval * 1000 * 60 * 60
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    days: function () {
                        currentJob.addExecutionLiteral(`every ${interval} days`)
                        interval = interval * 1000 * 60 * 60 * 24
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    day: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} days`)
                        interval = interval * 1000 * 60 * 60 * 24
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    weeks: function () {
                        currentJob.addExecutionLiteral(`every ${interval} weeks`)
                        interval = interval * 1000 * 60 * 60 * 24 * 7
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    week: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} weeks`)
                        interval = interval * 1000 * 60 * 60 * 24 * 7
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    months: function () {
                        currentJob.addExecutionLiteral(`every ${interval} months`)
                        interval = interval * 1000 * 60 * 60 * 24 * 30
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    month: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} months`)
                        interval = interval * 1000 * 60 * 60 * 24 * 30
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    years: function () {
                        currentJob.addExecutionLiteral(`every ${interval} years`)
                        interval = interval * 1000 * 60 * 60 * 24 * 365
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    },
                    year: function () {
                        interval = interval || 1
                        currentJob.addExecutionLiteral(`every ${interval} years`)
                        interval = interval * 1000 * 60 * 60 * 24 * 365
                        currentJob.interval.push(setInterval(currentJob.run.now, interval))
                        return currentJob
                    }
                }
            },
            in: function (timeout) {
                return {
                    ms: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} ms`)
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    miliseconds: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} ms`)
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    seconds: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} seconds`)
                        timeout = timeout * 1000
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    second: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} seconds`)
                        timeout = timeout * 1000
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    minutes: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} minutes`)
                        timeout = timeout * 1000 * 60
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    minute: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} minutes`)
                        timeout = timeout * 1000 * 60
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    hours: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} hours`)
                        timeout = timeout * 1000 * 60 * 60
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    hour: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} hours`)
                        timeout = timeout * 1000 * 60 * 60
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    days: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} days`)
                        timeout = timeout * 1000 * 60 * 60 * 24
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    day: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} days`)
                        timeout = timeout * 1000 * 60 * 60 * 24
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    weeks: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} weeks`)
                        timeout = timeout * 1000 * 60 * 60 * 24 * 7
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    week: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} weeks`)
                        timeout = timeout * 1000 * 60 * 60 * 24 * 7
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    months: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} months`)
                        timeout = timeout * 1000 * 60 * 60 * 24 * 30
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    month: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} months`)
                        timeout = timeout * 1000 * 60 * 60 * 24 * 30
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    years: function () {
                        currentJob.addExecutionLiteral(`in ${timeout} years`)
                        timeout = timeout * 1000 * 60 * 60 * 24 * 365
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    },
                    year: function () {
                        timeout = timeout || 1
                        currentJob.addExecutionLiteral(`in ${timeout} years`)
                        timeout = timeout * 1000 * 60 * 60 * 24 * 365
                        currentJob.timeout.push(setTimeout(currentJob.run.now, timeout))
                        return currentJob
                    }
                }
            }
        }

        // And Keyword
        this.and = this.run

    }

    addExecutionLiteral (literal) {
        this.getsExecuted.push(literal)
    }

    cancel () {
        try {
            for (const ival of this.interval) {
                clearInterval(ival)
            }
            this.interval = []
        } catch {

        }

        try {
            for (const tout of this.timeout) {
                clearInterval(tout)
            }
            this.timeout = []
        } catch {

        }

        return this
    }
}

// Job.sleep
Job.sleep = function (ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

// Job Trees
Job.jobs = {
    registred: []
}

Job.jobs.apply = function (rawJob) {
    Job.jobs.registred.push({
        id: rawJob.id,
        name: rawJob.name,
        'gets executed': rawJob.getsExecuted,
    })
}

function genTree (rJobs) {
    let i = 0
    for (const _job of rJobs) {
        rJobs[i]['gets executed'] = rJobs[i]['gets executed'].join(', ')
        i++
    }

    return rJobs
}

Job.tree = function () {
    console.table(genTree(Job.jobs.registred))
}

// #############################################################################
// #############################################################################
// #############################################################################
// ################################## Queues ###################################
// #############################################################################
// #############################################################################
// #############################################################################

Job.Queue = class Queue {
    constructor () {
        this.jobs = []
        const self = this
        this._job = new Job(function () {
            self.handle()
        })

        this.run = this._job.run
    }

    add (...jobs) {
        for (const jobToQueue of jobs) {
            this.jobs.push(jobToQueue)
        }
    }

    getJobs () {
        return this.jobs
    }

    shiftJobs () {
        this.jobs.shift()
    }

    async handleFirstJob () {
        const firstJob = this.getJobs()[0]
        if (typeof firstJob !== 'object') return 'No jobs in queue'

        const jobResult = await (firstJob.run.nowAndWait())

        this.shiftJobs()

        return jobResult
    }

    async handle () {
        while (this.getJobs().length > 0) {
            await this.handleFirstJob()
        }
    }
}

// #############################################################################
// #############################################################################
// #############################################################################
// ################################### Chain ###################################
// #############################################################################
// #############################################################################
// #############################################################################

Job.Chain = class Chain {
    constructor () {
        this.jobs = []
        const self = this
        this._job = new Job(function () {
            self.handle()
        })

        this.run = this._job.run
    }

    add (...jobs) {
        for (const jobToQueue of jobs) {
            this.jobs.push(jobToQueue)
        }
    }

    getJobs () {
        return this.jobs
    }

    shiftJobs () {
        this.jobs.shift()
    }

    handleFirstJob () {
        const firstJob = this.getJobs()[0]
        if (typeof firstJob !== 'object') return 'No jobs in queue'

        const jobResult = (firstJob.run.now())

        this.shiftJobs()

        return jobResult
    }

    handle () {
        while (this.getJobs().length > 0) {
            this.handleFirstJob()
        }
    }
}

module.exports = Job