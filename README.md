# bodhi-server
An open source blockchain explorer for monitoring Bodhi platform


## Get Started

### 1. Clone Project
1. `git clone https://github.com/bodhiproject/bodhi-api.git`
2. `npm install`

### 2. Install Redis
1. Install Redis `apt-get install redis-server`
2. Start Redis `redis-server --daemonize yes`
  '--daemonize yes' means running in background
3. Check if the process started or not:
  `ps aux | grep redis-server` 

### 3. Run Project
`npm start`


## Development

#### Kue-Scheduler

We use Kue-Scheduler, a simplified extension for Kue to run worker in Queue. Create and get a job instance is straight forward, however due to multi-layer wrappers create events like 'failed' on job is a bit tricky.

We can achieve events addition via below two methods.

1. Add events in Queue.on('schedule success')

```
Queue.on('schedule success', function(job) {
  if (jobObj.type === jobName) {
    job.on('complete', function(result) {
        console.log('Job completed with data ', result);
    }).on('failed attempt', function(errorMessage, doneAttempts) {
        console.log('Job failed');
    }).on('failed', function(errorMessage) {
        console.log('Job failed');
    }).on('progress', function(progress, data) {
        console.log('\r  job #' + job.id + ' ' + progress +
            '% complete with data ', data);
    });
  }
});
```

2. Add events for a specific job
This is done via getting access to job instance in Queue.now() and Queue.eveny() functions which would call buildJob to create instantiated object. Note: this method doesn't apply to __Every__ job.

```
Queue.now(job, function(error, job) {
    job.on('complete', function(result) {
        console.log('Job completed with data ', result);
    }).on('failed attempt', function(errorMessage, doneAttempts) {
        console.log('Job failed');
    }).on('failed', function(errorMessage) {
        console.log('Job failed');
    }).on('progress', function(progress, data) {
        console.log('\r  job #' + job.id + ' ' + progress +
            '% complete with data ', data);
    });
});
```

We chose the first option as recommended and pass events to JobQueue.scheduleJob as the third parameters.

## Deployment

## Testing

