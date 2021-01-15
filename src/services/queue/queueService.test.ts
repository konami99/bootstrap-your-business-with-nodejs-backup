import QueueService from './queueService'
import { Queue } from 'node-resque';

describe('', () => {
  it('', async () => {
    const enqueueSpy = jest.spyOn(Queue.prototype, 'enqueue')

    await QueueService.enqueue('queue1', 'sendEmail');

    expect(enqueueSpy).toBeCalled()
  })
})