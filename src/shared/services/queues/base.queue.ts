//"bullmq": "3.13.4",
import Queue from 'bull';
import Logger from 'bunyan';
import { ExpressAdapter, createBullBoard, BullAdapter } from '@bull-board/express';
import { config } from '@configs/configEnvs';
import { logger } from '@configs/configLogs';
import { IAuthJob } from '@auth/interfaces/authJob.interface';
import { IUserJob } from '@user/interfaces/userJob.interface';
import { IEmailJob } from '@user/interfaces/emailJob.interface';

type IBaseJobData = IAuthJob | IUserJob | IEmailJob;
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

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		/*this.queue.on('completed', (job: Job) => {
			//job.remove();
		});*/

		this.queue.on('global:completed', (jobId: string) => {
			this.log.info(`Job ${jobId} completed`);
		});

		this.queue.on('stalled', (jobId: string) => {
			this.log.info(`Job ${jobId} is stalled`);
		});

	}

	protected addJob(name: string, data: IBaseJobData): void {
		this.queue.add(name, data, { attempts: 3, backoff: { type: 'fixed', delay: 5000 } });
	}

	protected processJob(name: string, concurrency: number, callback: Queue.ProcessCallbackFunction<void>): void {
		this.queue.process(name, concurrency, callback);
	}
}
