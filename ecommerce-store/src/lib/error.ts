export class ClientError extends Error {
	status: number;

	constructor(detail?: string, status?: number, options?: ErrorOptions) {
		super(detail, options);
		this.status = status ?? 500;
	}
}
