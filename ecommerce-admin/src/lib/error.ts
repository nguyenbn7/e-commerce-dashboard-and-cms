import { StatusCodes } from 'http-status-codes';

export class ClientError extends Error {
	status: number;

	constructor(detail?: string, status?: number, options?: ErrorOptions) {
		super(detail, options);
		this.status = status ?? StatusCodes.INTERNAL_SERVER_ERROR;
	}
}

export interface ResponseError {
	title: string;
	status: number;
	detail: string;
	[x: string]: unknown;
}
