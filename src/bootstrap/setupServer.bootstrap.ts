import { Application, json, urlencoded, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';

export class RedSocialServer {

	private app: Application;

	constructor(app: Application) {
		this.app = app;
	}

	public start(): void { // definimos lo que va a ejecutar el servidor cuando se levante

	}

}
