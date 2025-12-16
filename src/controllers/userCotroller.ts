import { Request, Response, NextFunction } from "express";
import { findUserById, findUserByEmail } from "../services/userService";
import { User } from "../model/User";
import { ValidationError } from "../errors/ValidationError";

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = (req as any).user?.email;
        if (!email) {
            throw new ValidationError(401, 'Unauthorized', ['Email not found in request']);
        }
        const user: User | null = await findUserByEmail(email);
        if (!user) {
            throw new ValidationError(404, 'User not found', ['No user found for this email']);
        }
        return res.json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLogin: user.lastLogin
        });
    } catch (err) {
        next(err);
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            throw new ValidationError(400, 'Validation failed', ['User ID is required']);
        }
        const user: User | null = await findUserById(parseInt(userId));
        if (!user) {
            throw new ValidationError(404, 'User not found', ['No user found for this ID']);
        }
        return res.json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            lastLogin: user.lastLogin
        });
    } catch (err) {
        next(err);
    }
}