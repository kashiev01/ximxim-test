import  { Request, Response, NextFunction } from "express";
import { User } from '../models/User.model';


export const userSignUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	const { id, password } = req.body;
	
	try {
		const users = await User.findAll();
		const user = await User.findOne({where: {id}})
    	if (user) {
			throw new Error('This user already exists')
    	}
    	const newUser = await User.create({...req.body})
    	res.send(users)
	} catch (error) {
		next(error);
	}
	
};

// const loginUser = async (req: Request, res: Response, next: NextFunction) => {
// 	const { id, password } = req.body;
// 	let isMatch;

// 	const user = await User.findOne({ where: {id} });
// 	if (user?.password) {
// 		isMatch = await compareHash(password, user.password);
// 	}
// 	if (isMatch) {
// 		const token = jwt.sign(
// 			{ userId: user?._id, email: user?.email },
// 			process.env.JWT_SECRET as Secret,
// 			{ expiresIn: process.env.JWT_EXP }
// 		);
// 		res.status(200).json({
// 			success: true,
// 			token,
// 		});
// 	} else {
// 		res.send("Re-check credentials");
// 	}
// }

