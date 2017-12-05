import _ from 'lodash';
import kue from 'kue-scheduler';
import logger from '../logger';
logger.setDebug(true);

const Queue = kue.createQueue();
Queue.clear();

const Defaults = {
  attempts: null, // No attempts on failure by default
  backoff: {
    delay: 30 * 1000, // Wait for 30 sec to retry
    type: 'fixed',
  },
};

class JobQueue {

  /**
   * Add a job to queue and start it
   * @param  {string} jobName
   * @param  {number} interval in milliseconds
   * @param  {func} cb  callback function which needs to return a promise
   * @return {[type]}        [description]
   */
  static scheduleJob(params, options) {
    // paramsCheck('scheduleJob', params, ['jobName', 'interval', 'cb']);
    const { jobName, interval, cb } = params;

    const { silent, attempts, backoff: bo } = options;
    const backoff = _.assign({}, Defaults.backoff, bo);

    const job = Queue.createJob(jobName)
      .priority('normal')
      .attempts(attempts || Defaults.attempts)
      .backoff(backoff)
      .removeOnComplete(true);

    if (interval === 0) {
      Queue.now(job);
    } else {
      // Schedule it to run every ${interval} milli-seconds. Function every(interval, job) accepts interval in either a human-interval String format or a cron String format.
      Queue.every(`${interval / 1000} seconds`, job);
    }

    // Processing a scheduled job.
    Queue.process(jobName, (instance, done) => {
      if (!silent) { logger.debug(`${jobName} - Run instance`); }

      // Execute callback func
      cb().then(() => {
        if (!silent) {
          logger.debug(`${jobName} - Completed!`);
        }
        done();
      }, (err) => {
        logger.error(err.stack ? err.stack : err.message);
        done(new Error(err.message));
      });
    });

    logger.debug(`Scheduled job ${jobName} to run ${interval === 0 ? 'now.' : (`every ${interval / 1000} seconds.`)}`);

    return job;
  }

  /**
   * Add a job to queue and start it
   * @param  {string} jobName
   * @param  {func} cb  callback function
   * @return {Parse.Promise}        [description]
   */
  static cancelJob(params) {
    // paramsCheck('cancelJob', params, ['jobName']);
    const { jobName, cb } = params;

    Queue.remove({ unique: jobName }, (err, res) => {
      if (err) {
        logger.error(`JobQueue.cancelJob - ${err}`);
        return;
      }

      logger.debug(`${jobName} - Job is successfully removed from Queue.`);

      if (!_.isUndefined(cb)) {
        // Execute callback func
        cb()
          .then(() => {
              logger.debug(`JobQueue.cancelJob - Finished`);
            },
            (error) => {
              logger.error(`JobQueue.cancelJob - ${error}`);
            });
      }
    });
  }

  /**
   * Cancel all jobs
   * @return {} 
   */
  static clear(){
    Queue.clear();
  }
}

// start kue UI to monitor jobs

// let kueInstance;
// if (process.env.NODE_ENV !== 'test') {
//   kueInstance = kue.app.listen(3001);
// }

// export const kueApp = kueInstance;
export default JobQueue;