import { MultiWorker, Scheduler, Queue } from 'node-resque';
import JobWrapper from './services/queue/jobWrapper';
import SendEmailJob from './jobs/sendEmailJob';
import QueueService from './services/queue/queueService';

async function start() {
  const jobs = {
    send : JobWrapper.wrap(new SendEmailJob()),
  }

  const multiWorker = new MultiWorker(
    {
      connection: QueueService.connectionDetails,
      queues: ['email'],
      minTaskProcessors: 1,
      maxTaskProcessors: 100,
      checkTimeout: 1000,
      maxEventLoopDelay: 10,
    },
    jobs
  );

  const scheduler = new Scheduler({ connection: QueueService.connectionDetails });

  multiWorker.start();

  await scheduler.connect();
  scheduler.start();
}

start();