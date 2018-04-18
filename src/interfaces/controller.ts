interface IController {
	getObjects(req: any, res: any): void;
	getObject(req: any, res: any): void;
	createObject(req: any, res: any): void;
	updateObject(req: any, res: any): void;
	deleteObject(req: any, res: any): void;
}