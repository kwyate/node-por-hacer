// const argv = require('yargs').argv;

const { argv } = require('./config/yargs');
const colors = require('colors');
const { crear, getListado, actualizar, eliminar } = require('./por-hacer/por-hacer')
let commando = argv._[0];

switch (commando) {

    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        getListado();
        break;
    case 'actualizar':
        actualizar(argv.descripcion, argv.completado);
        console.log('Se ha actualizado app');
        break;
    case 'eliminar':
        eliminar(argv.descripcion);
        break;
    default:
        console.log('Commando no reconocido');
}