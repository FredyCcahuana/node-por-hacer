//libreria fileSistem
const fs = require('fs');

//arreglo donde se guardaran todas las notas
let listadoPorHacer = [];

//funcion crear que recibe descripcion se guarda en el listadoPorHacer
const guardarDB = () => {
    //convierte objeto en formato JSON
    let data = JSON.stringify(listadoPorHacer);
    //parametros para guardar
    //(direcion donde esta formato JSON,data a guaradar, funcion error )
    fs.writeFile('db/data.json', data, (err) => {
        //si hay error
        if (err)
            throw new Error('No se pudo grabar', err);
    });
}


const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {
    cargarDB();
    //crea el objeto para guardar el listado y su estado
    let porHacer = {
        descripcion,
        completado: false
    };
    //descripcion loo guarda en el listado
    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //buscar considencias para actualizar la informacion "descripcion" brindada por el usuario
    //para esto se realiza con un callbax
    //index tiene el valor de -1 si no encuentra 0 en adelante si llega a encontrarlo
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {
    cargarDB();
    //funcion para quitar un arreglo ingresado y devuelve un arreglo
    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    });
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}