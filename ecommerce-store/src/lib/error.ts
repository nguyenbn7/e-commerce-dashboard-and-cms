export class ClientError extends Error {
	code: number;
  
	constructor(detail?: string, code?: number, options?: ErrorOptions) {
		super(detail, options);
		this.code = code ?? 500;
	}
}
