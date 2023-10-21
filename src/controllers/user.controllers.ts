import { Request, Response } from "express";
import { User } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;


        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        user.name = name;
        
        await user.save();

        return res.json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findOne({ where: { id: userId as any } });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      return res.json(user);
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  };


export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { password, name } = req.body;

        const user = await User.findOne({ where: { id: userId as any } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (password) {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        user.name = name || user.name;

        await user.save();

        return res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ where: { id: userId as any } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.remove();

        return res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
       
        const user = await User.findOne({ where: { email } });

        
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }


        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

        return res.json({ token });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};