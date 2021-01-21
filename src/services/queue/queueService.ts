import { Queue } from 'node-resque';

export default class QueueService {
  private static queue: Queue;

  public static connectionDetails() {
    const REDIS_URL = 'redis-test.3svnlp.0001.usw2.cache.amazonaws.com' || '127.0.0.1';

    return {
      pkg: "ioredis",
      host: REDIS_URL,
      password: null,
      port: 6379,
      database: 0,
    }
  }

  public static async enqueue(q: string, func: string, args?: any[] | undefined): Promise<any> {
    const queue = this.getQueue();
    await queue.connect();
    await queue.enqueue(q, func, args);
    await queue.end();
  }

  private static getQueue() {
    if (QueueService.queue) {
      return QueueService.queue;
    }
    QueueService.queue = new Queue({ connection: QueueService.connectionDetails });
    return QueueService.queue;
  }
}