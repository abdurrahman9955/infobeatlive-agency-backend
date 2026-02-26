// src/routes/classContactRoutes.ts
import { Router } from 'express';
import { ClassContactController } from './contact';

const contactRouter = Router();
const contactController = new ClassContactController();

contactRouter.post('/contacts/create', contactController.create);

export default contactRouter;
