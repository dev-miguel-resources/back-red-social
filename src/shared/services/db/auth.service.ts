import { AuthModel } from '@auth/models/auth.schema';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';

class AuthService {
	public async createAuthUser(data: IAuthDocument): Promise<void> {
		await AuthModel.create(data);
	}
}

export const authService: AuthService = new AuthService();
