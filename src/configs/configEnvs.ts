import dotenv from 'dotenv';

dotenv.config({});

class ConfigEnvs {
	public SECRET_KEY_ONE: string | undefined;
	public SECRET_KEY_TWO: string | undefined;
	public NODE_ENV: string | undefined;
	public CLIENT_URL: string | undefined;
	public SERVER_PORT: string | undefined;
	public REDIS_HOST: string | undefined;
	public DATABASE_URL: string | undefined;
	public SALT_ROUND: string | undefined;

	constructor() {
		this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
		this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
		this.NODE_ENV = process.env.NODE_ENV;
		this.CLIENT_URL = process.env.CLIENT_URL;
		this.SERVER_PORT = process.env.SERVER_PORT;
		this.REDIS_HOST = process.env.REDIS_HOST;
		this.DATABASE_URL = process.env.DATABASE_URL;
		this.SALT_ROUND = process.env.SALT_ROUND;
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
