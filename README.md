# Bodhi-API
An open source local API server for interacting with the Bodhi-Core platform and Qtum blockchain.

## Get Started

### 1. Clone project
SSH: 
```
git clone git@github.com:bodhiproject/bodhi-api.git
```
or HTTPS: 
```
git clone https://github.com/bodhiproject/bodhi-api.git
```

### 2. Install submodules
```
cd bodhi-api
git submodule update --init
```

### 3. Install npm-recursive-install
```
npm install -g recursive-install
```

### 4. Install dependencies 
```
npm-recursive-install
```

### 5. Run project
```
npm start
```

### 6. Run Qtum daemon
In order to actually call the Qtum blockchain you will need to start the Qtum daemon. You will need to download the latest [Qtum binary](https://github.com/qtumproject/qtum/releases) first.
```
cd qtum-x.xx.xx/bin
./qtumd -testnet -logevents -printtoconsole -rpcuser=bodhi -rpcpassword=bodhi
```

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

