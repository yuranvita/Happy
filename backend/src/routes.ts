import {Router} from 'express';
import OrpganagesController from './controllers/OrphanagesController';
import multer from 'multer';
import uploadconfig from './config/upload';

const routes = Router();
const upload = multer(uploadconfig);

routes.get('/orphanages' , OrpganagesController.index);
routes.get('/orphanages/:id' , OrpganagesController.show);
routes.post('/orphanages' , upload.array('images'),OrpganagesController.create);


export default routes;