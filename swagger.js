import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const router = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi : '3.0.0',
    info: {
      title: 'Olx clone node js project',
      version: '1.0.0',
    },
    servers:[
        {
            api:'http://localhost:4000/'
        }
    ]
  },
  apis: [
    "../routes/auth.route.js",
    "../routes/product.route.js",
    "../routes/user.route.js",
    "../routes/category.route.js",
    "../routes/subcategory.route.js"
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocs));

export default router;
