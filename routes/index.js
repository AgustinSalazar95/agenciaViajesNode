import express, { Router } from 'express';
import { paginaInicio, paginaNostros, paginaViajes, paginaTestimoniales, paginaDetalleViaje } from '../controllers/paginasController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';

const router = express.Router();
//req - lo q enviamos : res- lo q express nos responde :  next - no tengo ida
router.get('/', paginaInicio);

router.get('/nosotros', paginaNostros);

router.get('/viajes', paginaViajes);
//metodo del controlador en vez de hacer (/1 /2 /3 /4 ), loq  sigue de los : un nombre q eligas
router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);


export default router;