import QueueService from './queueService'
import { Queue } from 'node-resque';

describe('QueueService', () => {
  it('calls enqueue on Queue', async () => {
    const enqueueMock = jest.fn();
    Queue.prototype.enqueue = enqueueMock;

    await QueueService.enqueue('queue1', 'sendEmail');

    expect(enqueueMock).toBeCalled()
  })
})