import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest', // interprete de archivos .ts para testing con jest
	testEnvironment: 'node', // verificador de chequeo entre el jest con node
	verbose: true, // te entrega detalle de que es lo que se va sucendiendo con los tests por la terminal
	coverageDirectory: 'coverage', // directorio de cobertura de los tests
	collectCoverage: true, // habilitamos el recoletor de cobertura de tests
	transform: {
		// se genera la vinculación del interprete de ts para esos archivos de testing con .ts
		'^.+\\.ts?$': 'ts-jest'
	},
	testMatch: ['<rootDir>/src/**/test/*.ts'], // haciendo match con el directorio que contendrá los tests
	collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'], // darle contexto al generador de cobertura del reporte
	coverageThreshold: {
		// habilitamos que tan estrictos queremos ser al obtener los resultados de cobertura
		global: {
			branches: 1,
			functions: 1,
			lines: 1,
			statements: 1
		}
	},
	coverageReporters: ['text-summary', 'lcov'], // genera el reporte lcov en coverage y en base al te genera un resumen
	moduleNameMapper: {
		// registro de módulos permitidos para simularlos en archivos de testing
		'@bootstrap/(.*)': ['<rootDir>/src/bootstrap/$1'],
		'@auth/(.*)': ['<rootDir>/src/features/auth/$1'],
		'@user/(.*)': ['<rootDir>/src/features/user/$1']
	}
};

export default config;
