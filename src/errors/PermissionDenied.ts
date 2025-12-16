export class PermissionDenied extends Error {
	public status: number;

	constructor(message: string = 'Permission denied') {
		super(message);
		this.name = 'PermissionDenied';
		this.status = 403;
		Error.captureStackTrace(this, this.constructor);
	}
}
