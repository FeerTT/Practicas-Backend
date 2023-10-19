import { Request, Response } from "express";
import { Task } from "../entities/Task";
import { User } from "../entities/User";


export const createTask = async (req: Request, res: Response) => {
  try {
    // Extraer datos de la solicitud
    const { title, description, status, userId } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Crear la tarea y asignar al usuario
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = status;
    task.user = user; // Asignar una instancia de usuario
    // Guardar la tarea en la base de datos
    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

  export const getTaskById = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
  
      const task = await Task.findOne({ where: { id: taskId as any } });
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      return res.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const deleteTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
  
      const task = await Task.findOne({ where: { id: taskId as any } });
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      await task.remove();
  
      return res.json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const updateTask = async (req: Request, res: Response) => {
    try {
      const taskId = req.params.id;
      const { title, description, status } = req.body;
  
      const task = await Task.findOne({ where: { id: taskId as any } });
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
    
      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
  
      await task.save();
  
      return res.json(task);
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  export const getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find();
  
      return res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };