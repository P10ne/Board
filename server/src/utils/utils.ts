import { Response } from 'express';
const jwt = require('jsonwebtoken');

export const sendJsonResponse = <T>(res: Response<T>, status: number, content?: T) => {
    res.status(status);
    if (content) {
        res.json(content);
        return;
    }
    res.send();
};

export const sendErrorResponse = (res: Response, status: number, message: string) => {
    res.status(status);
    res.json({
        message
    });
};

export const verifyToken = <T>(token: string): T | null => {
    try {
        return jwt.verify(token);
    } catch {
        return null;
    }
}
