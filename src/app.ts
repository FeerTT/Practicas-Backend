import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentations by Fernando T. Trillo',
      version: '1.0.0',
      description: 'Methods',
    },
    components: {
      securitySchemes: {
        JWTToken: { 
          type: 'apiKey',
          in: 'header',
          name: 'Authorization', 
          description: 'Bearer Token',
        },
      },
    },
    security: [
      {
        JWTToken: [], 
      },
    ],
  },
  apis: ['src/routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use(userRoutes);

export default app;