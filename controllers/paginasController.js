import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
    
    // CONSULTAR 3 VIAJES DEL MODELO DE VIAJE

    //para consultar dos veces l DB pero sobre cosas distittas hacer 2 await FUNCIONA pero esta mal, SOLUCION UNA PROMISE
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3}));
    promiseDB.push(Testimonial.findAll({ limit: 3}));
    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina:  'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales:  resultado[1]
        });
    } catch (error) {
        console.log(error)
    }

    
};

const paginaNostros = (req, res) => { 
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => { 
    //Consultar BD 
    //findAll => trae todos los resultados de la tabla
    const viajes = await Viaje.findAll();
    
    // console.log(viajes);

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes,
    });
}
//PARA MOSTRAR LOS MENSAJES DE LA GENTE EN TESTIMONIALES
const paginaTestimoniales = async (req, res) => { 

    try {
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
   
}

//muestra su viaje por su slug
const  paginaDetalleViaje = async (req,res) => {

    const { slug } = req.params;
    //no lo hicimos arriba pero usualmente tenemos que usar un try catch
    try {
        //si queremos traer uno solo de la DB usamoas findOne()
        const viaje = await Viaje.findOne({ where : { slug }});

        //una vista
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje,
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNostros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}