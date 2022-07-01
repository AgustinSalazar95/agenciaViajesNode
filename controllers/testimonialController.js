import { Testimonial } from '../models/Testimoniales.js';

//USAMOAS ASYNC WAIT POR Q PUEDE TARDE UN POCO LA DB
const guardarTestimonial = async (req,res) => {
    
    //vlaidar 
    const { nombre, correo, mensaje} = req.body;
    const errores = []

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El nombre esta vacio'})
    }
    if(correo.trim() === '') {
        errores.push({mensaje : 'El correo esta vacio'})
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje esta vacio'})
    }
    
    if(errores.length > 0) {

        // Consultar Testimoniales Existentes
        const testimoniales = await Testimonial.findAll();

        //mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    }else {
        //Almacenarlos en la base de DATOS
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}