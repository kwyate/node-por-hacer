const fs = require('fs');
const colors = require('colors');
let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) {
            console.log("Algo salio mal".red);
        } else {
            console.log('Se guardaron los cambios'.green);
        }
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
    let porHacer = {
        descripcion,
        completado: false
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    let listado = listadoPorHacer;

    for (let tarea of listado) {
        console.log('==========Por Hacer ==========='.green);
        console.log(tarea.descripcion);
        console.log('Estado: ', tarea.completado);
        console.log('==========Por Hacer ==========='.green);
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        console.log('Se han guardo los Cambios'.green);
        return true;
    } else {
        return false;
    }

}
const eliminar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion;
    })
    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        console.log('======================================'.green);
        console.log('Se ha eliminado correctamente la tarea'.green);
        console.log('======================================'.green);
    }
    // let index = listadoPorHacer.findIndex(tarea => {
    //     return tarea.descripcion === descripcion;
    // })
    // if (index >= 0) {
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     console.log('======================================'.green);
    //     console.log('Se ha eliminado correctamente la tarea'.green);
    //     console.log('======================================'.green);
    // }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    eliminar
}