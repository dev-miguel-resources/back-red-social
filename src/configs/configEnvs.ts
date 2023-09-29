import dotenv from 'dotenv';

dotenv.config({});

class ConfigEnvs {
	public SECRET_KEY_ONE: string | undefined;
	public SECRET_KEY_TWO: string | undefined;
	public NODE_ENV: string | undefined;

	constructor() {
		this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
		this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
		this.NODE_ENV = process.env.NODE_ENV;
	}

	public validateConfig(): void {
		console.log(this);
		for (const [key, value] of Object.entries(this)) {
			if (value === undefined) {
				throw new Error(`Configuration ${key} is undefined`);
			}
		}
	}
}

export const config: ConfigEnvs = new ConfigEnvs();
