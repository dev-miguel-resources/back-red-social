import { Application, json, urlencoded, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { config } from '@configs/configEnvs';

export class RedSocialServer {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public start(): void {
		// definimos lo que va a ejecutar el servidor cuando se levante
	}

	private securityMiddleware(app: Application): void {
		app.use(
			cookieSession({
				name: 'session',
				keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
				maxAge: 24 * 7 * 3600000, // 1 semana
				secure: config.NODE_ENV !== 'development'
			})
		);

	}
}
