import { Application, Request, Response } from 'express';

// Router Parents: Rutas padres
export default (app: Application) => {
	const routes = () => {
		app.use('/healthcheck', (_req: Request, res: Response) => res.send('Server is OK!'));
	};
	routes();
};
