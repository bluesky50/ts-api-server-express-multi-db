export function validateStringInput(val: any): boolean {
	if (val === undefined) return false;
	if (typeof(val) !== 'string') return false;
	return true;
}

export function validateNumberInput(val: any): boolean {
	if (val === undefined) return false;
	if (typeof(val) !== 'number') return false;
	return true;
}

export function validateObjectInput(val: any): boolean {
	if (val === undefined) return false;
	if (typeof(val) !== 'object') return false;
	return true;
}

export function validateArrayInput(val: any): boolean {
	if (val === undefined) return false;
	return Array.isArray(val);
}

export function testAll(...args: any[]): boolean {
	const func = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		if(!func(arguments[i])) return false;
	}
	return true;
}