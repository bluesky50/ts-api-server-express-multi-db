import { STATUS_SERVER_ERROR, STATUS_UNPROCESSABLE_ENTITY, STATUS_OK } from '../configs/statuses';

export function handleInvalidInput(res: any): void {
	const status = res.statusCode;
	res.json({ status, message: 'Invalid input' });
}

export function handleServerError(res: any, err: any): void {
	const status = res.statusCode;
	res.json({ status, message: err.message });
}