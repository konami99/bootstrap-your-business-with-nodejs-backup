import { MultiWorker, Scheduler, Queue } from 'node-resque';
import EmailService from './services/email/emailService';
import SendGrid from './services/email/sendGrid';
import QueueService from './services/queue/queueService';

async function start() {
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
      connection: QueueService.connectionDetails,
      queues: ["math"],
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