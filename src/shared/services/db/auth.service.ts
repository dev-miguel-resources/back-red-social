import { AuthModel } from '@auth/models/auth.schema';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { Generators } from '@generators/generators';

class AuthService {
	public async createAuthUser(data: IAuthDocument): Promise<void> {
		await AuthModel.create(data);
	}

	public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
		const query = {
			// pendiente el generators
			$or: [{ username: Generators.firstLetterUppercase(username) }, { email: Generators.lowerCase(email) }]
		};
		const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
		return user;
	}
}

export const authService: AuthService = new AuthService();
