import Logger from 'bunyan';
import { logger } from '@configs/configLogs';

const log: Logger = logger.createLogger('userCache');

export class Generators {
	// static se pueden invocar sin necesidad de instanciar la clase
	static parseJson(property: string) {
		try {
			const prop = JSON.parse(property);
			return prop;
		} catch (error) {
			log.error(error);
			return property;
		}
	}
}
