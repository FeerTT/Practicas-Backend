import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const requireAuthentication = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado, inicie sesión' });
  }

  // Validar el token JWT
  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Acceso no autorizado, inicie sesión' });
    }

    next();
  });
};