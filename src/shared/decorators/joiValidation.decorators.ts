import { ObjectSchema } from 'joi';
import { JoiRequestValidationError } from '@errors/joiValidateError';

type IJoiDecorator = (target: unknown, key: string, descriptor: PropertyDescriptor) => void;

export function joiValidation(schema: ObjectSchema): IJoiDecorator {
	return (_target: unknown, _key: string, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value; // capturando el contexto de las validaciones: path

		descriptor.value = async function (...args: [Request]) {
			const req: Request = args[0];
			const { error } = await Promise.resolve(schema.validate(req.body));
			if (error?.details) {
				throw new JoiRequestValidationError(error.details[0].message);
			}
			return originalMethod.apply(this, args); // resuelve el path con sus argumentos de acuerdo al contexto de resolución
		};

		return descriptor; // esto por defecto dispara el método getter con la lectura del resultado
	};
}
