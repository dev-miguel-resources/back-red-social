import express, { Express } from 'express';
import { RedSocialServer } from '@bootstrap/setupServer.bootstrap';
import { config } from '@configs/configEnvs';
import databaseConnection from '@bootstrap/setupDatabase.bootstrap';

class Application {

	public initialize(): void {
		this.loadConfig();
		databaseConnection();
		const app: Express = express();
		const server: RedSocialServer = new RedSocialServer(app);
		server.start();
	}

	private loadConfig(): void {
		config.validateConfig();
		config.validateCloudinaryConfig();
	}
}

const application: Application = new Application();
application.initialize();
