import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { signupSchema } from '@auth/schemas/signup';
import { joiValidation } from '@decorators/joiValidation.decorators';
import { BadRequestError } from '@errors/badRequestError';
import { authService } from '@services/db/auth.service';
import { Generators } from '@generators/generators';
import { IAuthDocument } from '@auth/interfaces/authDocument.interface';
import { SignUpUtility } from './utilities/signup.utility';

export class SignUpController extends SignUpUtility {
	@joiValidation(signupSchema)
	public async register(req: Request, res: Response): Promise<void> {
		const { username, email, password, avatarColor, avatarImage } = req.body;
		const checkIfUserExist = await authService.getUserByUsernameOrEmail(username, email);
		if (checkIfUserExist) {
			throw new BadRequestError('Invalid credentials for this user');
		}

		const authObjectId: ObjectId = new ObjectId();
		const userObjectId: ObjectId = new ObjectId();
		const uId = `${Generators.generateRandomIntegers(12)}`;
		const passwordHash = await Generators.hash(password);
		const authData: IAuthDocument = SignUpController.prototype.signUpData({
			_id: authObjectId,
			uId,
			username,
			email,
			password: passwordHash,
			avatarColor
		});
	}
}
