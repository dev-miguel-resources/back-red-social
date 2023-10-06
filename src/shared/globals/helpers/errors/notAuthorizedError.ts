import { CustomError } from './customError';
import HTTP_STATUS from 'http-status-codes';

export class NotAuthorizedError extends CustomError {

	statusCode = HTTP_STATUS.UNAUTHORIZED;
	status = 'error';

	constructor(message: string) {
		super(message);
	}
}
