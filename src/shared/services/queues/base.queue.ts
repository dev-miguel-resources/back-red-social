//"bullmq": "3.13.4",
import Queue, { Job } from 'bull';
import Logger from 'bunyan';
import { ExpressAdapter, createBullBoard, BullAdapter } from '@bull-board/express';
import { config } from '@configs/configEnvs';
import { logger } from '@configs/configLogs';

type IBaseJobData = ''; // modificar este tipo
let bullAdapters: BullAdapter[] = [];
export let serverAdapter: ExpressAdapter;

export abstract class BaseQueue {
	queue: Queue.Queue;
	log: Logger;

	constructor(queueName: string) {
		this.queue = new Queue(queueName, `${config.REDIS_HOST}`);
		bullAdapters.push(new BullAdapter(this.queue));
		bullAdapters = [...new Set(bullAdapters)];
		serverAdapter = new ExpressAdapter();
		serverAdapter.setBasePath('/queues');

		createBullBoard({
			queues: bullAdapters,
			serverAdapter
		});

		this.log = logger.createLogger(`${queueName}Queue`);

		this.queue.on('completed', (job: Job) => {
			//job.remove();
		});

		this.queue.on('global:completed', (jobId: string) => {
			this.log.info(`Job ${jobId} completed`);
		});

		this.queue.on('stalled', (jobId: string) => {
			this.log.info(`Job ${jobId} is stalled`);
		});

		this.queue.on('error', (jobId: string) => {
			this.log.info(`Job ${jobId} has an error`);
		});
	}

	protected addJob(name: string, data: IBaseJobData): void {
		this.queue.add(name, data, { attempts: 3, backoff: { type: 'fixed', delay: 5000 } });
	}

	// restante método de concurrencia
}
