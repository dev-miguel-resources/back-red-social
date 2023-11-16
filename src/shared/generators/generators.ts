import Logger from 'bunyan';
import bcrypt from 'bcryptjs';
import { logger } from '@configs/configLogs';
import { config } from '@configs/configEnvs';

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

	static firstLetterUppercase(str: string): string {
		const valueString = str.toLowerCase();
		return valueString
			.split(' ')
			.map((value: string) => `${value.charAt(0).toUpperCase()}${value.slice(1).toLowerCase()}`)
			.join(' ');
	}

	static lowerCase(str: string): string {
		return str.toLowerCase();
	}

	static generateRandomIntegers(integerLength: number): number {
		const characters = '0123456789';
		let result = ' ';
		const charactersLength = characters.length;
		for (let i = 0; i < integerLength; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return parseInt(result, 10);
	}

	static hash(password: string): Promise<string> {
		return bcrypt.hash(password, Number(config.SALT_ROUND));
	}
}
