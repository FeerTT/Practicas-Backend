import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from "../controllers/user.controllers";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controllers";
import { requireAuthentication } from "../auth/authMiddleware";

const router = Router()

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso generará un token mediante JWT
 *         content:
 *           application/json:
 *             example:
 *               token: token_jwt
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.post("/auth/login", loginUser);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para operaciones relacionadas con usuarios
 */
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: john@example.com
 *               password: hashedPassword1
 *               name: John Doe
 *               active: true
 *               createdAt: "2023-10-18T12:00:00.000Z"
 *               updatedAt: "2023-10-18T12:00:00.000Z"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.post("/users", createUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 email: john@example.com
 *                 password: hashedPassword1
 *                 name: John Doe
 *                 active: true
 *                 createdAt: "2023-10-18T12:00:00.000Z"
 *                 updatedAt: "2023-10-18T12:30:00.000Z"
 *               - id: 2
 *                 email: jane@example.com
 *                 password: hashedPassword2
 *                 name: Jane Doe
 *                 active: true
 *                 createdAt: "2023-10-18T12:15:00.000Z"
 *                 updatedAt: "2023-10-18T12:45:00.000Z"
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get("/users", getUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: john@example.com
 *               password: hashedPassword1
 *               name: John Doe
 *               active: true
 *               createdAt: "2023-10-18T12:00:00.000Z"
 *               updatedAt: "2023-10-18T12:30:00.000Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get("/users/:id", getUserById);




/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: updatedjohn@example.com
 *               password: hashedUpdatedPassword1
 *               name: Updated John Doe
 *               active: true
 *               createdAt: "2023-10-18T12:00:00.000Z"
 *               updatedAt: "2023-10-18T12:15:00.000Z"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.put("/users/:id", updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *         content:
 *           application/json:
 *             example:
 *               message: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             example:
 *               error: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.delete("/users/:id", deleteUser);

/*COMIENZO DE RUTAS PARA TASKS */

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API para operaciones tasks. REQUIERE ESTAR LOGEADO O CONTAR CON TOKEN DE ACCESO.
 */
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - JWTToken: [] # Especifica el esquema de seguridad que requiere JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - status
 *     responses:
 *       200:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               title: Tarea 1
 *               description: Descripción de la tarea 1
 *               status: Pendiente
 *       401:
 *         description: Acceso no autorizado, inicie sesión
 *         content:
 *           application/json:
 *             example:
 *               error: Acceso no autorizado, inicie sesión
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.post("/tasks", requireAuthentication, createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas y su relación
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: Tarea 1
 *                 description: Descripción de la tarea 1
 *                 status: Pendiente
 *                 userId: 1
 *                 createdAt: 2023-10-19T04:36:22.953Z
 *                 updatedAt: 2023-10-19T04:36:22.953Z
 *               - id: 2
 *                 title: Tarea 2
 *                 description: Descripción de la tarea 2
 *                 status: Completada
 *                 userId: 1
 *                 createdAt: 2023-10-19T04:36:22.953Z
 *                 updatedAt: 2023-10-19T04:36:22.953Z
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get("/tasks", getAllTasks);


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea y su relación por ID 
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               title: Tarea 1
 *               description: Descripción de la tarea 1
 *               status: Pendiente
 *               userId: 1
 *               createdAt: "2023-10-19T04:36:22.953Z"
 *               updatedAt: "2023-10-19T04:36:22.953Z"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: Task not found
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get("/tasks/:id",requireAuthentication, getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Modificar una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea modificada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 3
 *               title: "string"
 *               description: "string"
 *               status: "string"
 *               userId: 2
 *               createdAt: "2023-10-19T04:38:28.172Z"
 *               updatedAt: "2023-10-19T04:48:09.940Z"
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: Task not found
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.put("/tasks/:id" ,requireAuthentication , updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             example:
 *               message: Task deleted successfully
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             example:
 *               error: Task not found
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.delete("/tasks/:id",requireAuthentication, deleteTask);





export default router;