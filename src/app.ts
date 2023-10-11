import express, { Express } from 'express';
import { RedSocialServer } from '@bootstrap/setupServer.bootstrap';
import { config } from '@configs/configEnvs';

class Application {

	public initialize(): void {
		this.loadConfig();
		const app: Express = express();
		const server: RedSocialServer = new RedSocialServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
	}
}

const application: Application = new Application();
application.initialize();
