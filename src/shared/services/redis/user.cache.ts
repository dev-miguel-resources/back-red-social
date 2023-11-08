import Logger from 'bunyan';
import { BaseCache } from './base.cache';
import { logger } from '@configs/configLogs';
import { IUserDocument } from '@user/interfaces/userDocument.interface';
import { ServerError } from '@errors/serverError';
import { Generators } from '@generators/generators';

const log: Logger = logger.createLogger('userCache');

export class UserCache extends BaseCache {
	constructor() {
		super('userCache');
	}

	// implementations
	public async saveToUserCache(
		key: string,
		userUId: string,
		createdUser: IUserDocument
	): Promise<void> {
		// tener los datos a la mano de lo que recibimos de user
		const {
			_id,
			uId,
			username,
			email,
			avatarColor,
			blocked,
			blockedBy,
			postsCount,
			profilePicture,
			followersCount,
			followingCount,
			notifications,
			social,
			work,
			location,
			school,
			quote,
			bgImageVersion,
			bgImageId,
			createdAt
		} = createdUser;

		// format -> pasar todo a cadena
		const dataToSave = {
			_id: `${_id}`,
			uId: `${uId}`,
			username: `${username}`,
			email: `${email}`,
			avatarColor: `${avatarColor}`,
			createdAt: `${createdAt}`,
			postsCount: `${postsCount}`,
			blocked: JSON.stringify(blocked),
			blockedBy: JSON.stringify(blockedBy),
			profilePicture: `${profilePicture}`,
			followersCount: `${followersCount}`,
			followingCount: `${followingCount}`,
			notifications: JSON.stringify(notifications),
			social: JSON.stringify(social),
			work: `${work}`,
			location: `${location}`,
			school: `${school}`,
			quote: `${quote}`,
			bgImageVersion: `${bgImageVersion}`,
			bgImageId: `${bgImageId}`
		};

		// flujos de control
		try {
			if (!this.client.isOpen) {
				await this.client.connect();
			}

			// key: user -> lo que voy a guardar
			// score: es un entero de base 10 para identificar el objeto en redis
			// value: es el identificador que denota al usuario: _id
			await this.client.ZADD('user', { score: parseInt(userUId, 10), value: `${key}` });
			for (const [itemKey, itemValue] of Object.entries(dataToSave)) {
				await this.client.HSET(`users:${key}`, `${itemKey}`, `${itemValue}`);
			}
		} catch (error) {
			log.error(error);
			throw new ServerError('Server Redis error. Try again.');
		}
	}

	public async getUserFromCache(userId: string): Promise<IUserDocument | null> {
		try {
			if (!this.client.isOpen) {
				await this.client.connect();
			}

			const response: IUserDocument = (await this.client.HGETALL(
				`users:${userId}`
			)) as unknown as IUserDocument;
			response.createdAt = new Date(Generators.parseJson(`${response.createdAt}`));
			response.postsCount = Generators.parseJson(`${response.postsCount}`);
			response.blocked = Generators.parseJson(`${response.blocked}`);
			response.blockedBy = Generators.parseJson(`${response.blockedBy}`);
			response.notifications = Generators.parseJson(`${response.notifications}`);
			response.social = Generators.parseJson(`${response.social}`);
			response.followersCount = Generators.parseJson(`${response.followersCount}`);
			response.followingCount = Generators.parseJson(`${response.followingCount}`);

			return response;
		} catch (error) {
			log.error(error);
			throw new ServerError('Server Redis error. Try again.');
		}
	}
}
