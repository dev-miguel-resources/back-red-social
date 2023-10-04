import { Application, json, urlencoded, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { config } from '@configs/configEnvs';

// SINGLE RESPONSABILITY: S
// OPEN/CLOSED: O
export class RedSocialServer {
	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public start(): void {
		// definimos lo que va a ejecutar el servidor cuando se levante
		this.securityMiddleware(this.app);
		this.standardMiddleware(this.app);
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
		app.use(hpp());
		app.use(helmet());
	  app.use(cors({
			origin: config.CLIENT_URL,
			credentials: true,
			optionsSuccessStatus: 200,
			methods: ['GET', 'POST', 'PUT', 'DELETE']
		})
		);
	}

	private standardMiddleware(app: Application): void {
		app.use(compression());
		app.use(json({ limit: '50mb' }));
		app.use(urlencoded({ extended: true, limit: '50mb' }));
	}

	private routeMiddleware(app: Application): void {
		// reconocimiento de rutas
	}

	private globalErrorHandler(app: Application): void {

	}
}
