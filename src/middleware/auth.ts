import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface jwtPayload {
    userId: string;
    email: string;
}

export function authMiddleware(
    req: Request & { user?: jwtPayload },
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Ingen token skickad"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as jwtPayload;

        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Ogiltig token" });
    }
}