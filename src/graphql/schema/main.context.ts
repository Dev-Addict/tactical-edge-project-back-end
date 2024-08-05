import {Request, Response} from 'express';
import {BaseContext} from '@apollo/server';
import {ExpressContextFunctionArgument} from '@apollo/server/express4';

export interface MainContext extends BaseContext {
	req: Request;
	res: Response;
}

export const getMainContext = async ({
	req,
	res,
}: ExpressContextFunctionArgument): Promise<MainContext> => {
	return {req, res};
};
