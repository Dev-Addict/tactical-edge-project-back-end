import {IUser} from '../../models/user/user.model';

declare global {
	declare namespace Express {
		export interface Request {
			user: IUser;
		}
	}
}
