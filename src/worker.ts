import { MultiWorker, Scheduler, Queue } from 'node-resque';
import EmailService from './services/emailService';
import SendGrid from './services/sendGrid';

const REDIS_URL = process.env.REDIS_URL || '127.0.0.1';

async function start() {
  const connectionDetails = {
    pkg: "ioredis",
    host: REDIS_URL,
    password: null,
    port: 6379,
    database: 0,
  };

  const jobs = {
    add : {
      perform: async () => {
        console.log('sending email');
        const sendGrid = new SendGrid();
        const emailService = new EmailService(sendGrid);
        await emailService.send('konami99@hotmail.com')
      }
    }
  }

  const multiWorker = new MultiWorker(
    {
      connection: connectionDetails,
      queues: ["math"],
      minTaskProcessors: 1,
      maxTaskProcessors: 100,
      checkTimeout: 1000,
      maxEventLoopDelay: 10,
    },
    jobs
  );

  const scheduler = new Scheduler({ connection: connectionDetails });

  multiWorker.start();

  await scheduler.connect();
  scheduler.start();
}

start();