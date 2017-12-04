/* global describe,it,beforeEach*/

import moment from 'moment';
import _ from 'lodash';

const JobQueue = require(`./index`).default;
const assert = require('chai').assert;

describe('jobQueue class', () => {
  beforeEach(() => {});

  describe('methods', () => {
    /** Run now job and make sure complete event fired at the last attempt */
    it('Now completes with 3 attempts', function(done) {
      this.timeout(20000);

      const expectedCount = 3;
      const jobName = 'Now with 3 attempts';
      const interval = 0;
      const options = {
        attempts: expectedCount,
        backoff: {
          delay: 1500,
        },
        silent: true,
      };

      let count = 0;

      const events = [{
          name: 'complete',
          fn(result) {
            console.log(`Complete event - result: ${result}`);
            assert.equal(count, expectedCount, 'Attempt count is not as expected');

            /*  Test case ends here. */
            done();
          },
        },
        {
          name: 'failed attempt',
          fn(errorMessage, numAttempts) {
            console.log(`Failed attempt event - No.${numAttempts}, message: ${errorMessage}`);
          },
        },
        {
          name: 'failed',
          fn(errorMessage) {
            console.log(`Failed event - message: ${errorMessage}`);
          },
        },
      ];

      // Schedule job with options and events
      JobQueue.scheduleJob({
          jobName,
          interval,
          cb() {
            count += 1;
            if (count >= expectedCount) {
              return Promise.resolve('Attempt passed.');
            }

            return Promise.reject('Attempt failed.');
          },
        },
        options,
        events,
      );
    });

    /** Run now job and make sure failed event fired at the last attempt
        This test is flaky when run in batch */
    it('Now fails with 3 attempts', function(done) {
      this.timeout(20000);

      const expectedCount = 3;
      const jobName = 'Now with 3 attempts';
      const interval = 0;
      const options = {
        attempts: expectedCount,
        backoff: {
          delay: 1500,
        },
        silent: true,
      };

      let count = 0;

      const events = [{
          name: 'complete',
          fn(result) {
            console.log(`Complete event - result: ${result}`);
            assert.equal(count, expectedCount, 'Attempt count is not as expected');

            /*  Test case ends here. */
            done();
          },
        }, {
          name: 'failed attempt',
          fn(errorMessage, numAttempts) {
            console.log(`Failed attempt event - No.${numAttempts}, message: ${errorMessage}`);
          },
        },
        {
          name: 'failed',
          fn(errorMessage) {
            console.log(`Failed event - message: ${errorMessage}`);

            assert.equal(count, expectedCount, 'Attempt count is not as expected');
            /*  Test case ends here. */
            done();
          },
        },
      ];

      // Schedule job with options and events
      JobQueue.scheduleJob({
          jobName,
          interval,
          cb() {
            count += 1;
            return Promise.reject('Attempt failed.');
          },
        },
        options,
        events,
      );
    });

    /** Run every job and make sure complete event fired when job succeeds */
    it('Every non-unique completes at the 3rd attempt', function(done) {
      this.timeout(20000);

      const expectedCount = 3;
      const jobName = 'Every with 3 attempts';
      const interval = 3000;
      const options = {
        attempts: expectedCount,
        backoff: {
          delay: 60000,
        },
        silent: true,
      };

      let count = 0;
      const jobs = [];

      const events = [{
          name: 'complete',
          fn(result) {
            console.log(`Complete event - result: ${result}`);
            assert.notEqual(jobs[jobs.length - 1].id, jobs[jobs.length - 2].id, 'JobIds should not equal.');
            assert.equal(count, expectedCount, 'Attempt count is not as expected');

            /*  Test case ends here. */
            done();
          },
        }, {
          name: 'failed attempt',
          fn(errorMessage, numAttempts) {
            console.log(`Failed attempt event - No.${numAttempts}, message: ${errorMessage}`);
          },
        },
        {
          name: 'failed',
          fn(errorMessage) {
            console.log(`Failed event - message: ${errorMessage}`);

            assert(false, `Failed event should not fire, count=${count}, expected=${expectedCount}`);

            /*  Test case ends here. */
            done();
          },
        },
      ];

      // Schedule job with options and events
      JobQueue.scheduleJob({
          jobName,
          interval,
          cb(job) {
            count += 1;
            jobs.push(job);

            if (count >= expectedCount) {
              return Promise.resolve(`Attempt passed. count=${count}`);
            }

            return Promise.reject(`Attempt failed. count=${count}`);
          },
        },
        options,
        events,
      );
    });

    /** Run every job and make sure failed event fired when job failed
        This test is flaky when run in batch */
    it('Every non-unique fails at the 3rd attempt', function(done) {
      this.timeout(20000);

      const jobName = 'Every with 3 attempts';
      const interval = 3000;
      const options = {
        attempts: 1,
        backoff: {
          delay: 60000,
        },
        silent: true,
      };

      let runCount = 0;
      let eventCount = 0;
      const jobs = [];

      const events = [{
          name: 'complete',
          fn(result) {
            console.log(`Complete event - result: ${result}`);
            assert(false, `Failed event should not fire, runCount=${runCount}`);

            /*  Test case ends here. */
            done();
          },
        }, {
          name: 'failed attempt',
          fn(errorMessage, numAttempts) {
            console.log(`Failed attempt event - No.${numAttempts}, message: ${errorMessage}`);
          },
        },
        {
          name: 'failed',
          fn(errorMessage) {
            eventCount += 1;
            console.log(`Failed event - event count: ${eventCount}`);

            if (eventCount >= 3) {
              assert.equal(eventCount, runCount, 'Event count is not equal to run count.');
              assert.notEqual(jobs[jobs.length - 1].id, jobs[jobs.length - 2].id, 'JobIds should not equal.');
              // /*  Test case ends here. */
              done();
            }
          },
        },
      ];

      // Schedule job with options and events
      JobQueue.scheduleJob({
          jobName,
          interval,
          cb(job) {
            runCount += 1;
            jobs.push(job);

            return Promise.reject(`Attempt failed. runCount=${runCount}`);
          },
        },
        options,
        events,
      );
    });
  });
});