const { SerialPort, ReadlineParser } = require('serialport');
const { Sequelize } = require('sequelize');
const Mamovsar = require('./src/model/mamovsar')

const PUERTO_OBJETIVO = 'COM4'; // Reemplaza con el puerto deseado
const BAUD_RATE = 9600;
let port;
let parser;


const postConductividad = async (tocOnline)=>{
    try{

        const TOC = new Mamovsar(tocOnline)
        TOC.save();

        return 'Dato guardado'

    }catch(error){
        console.log(error);
    }
}

const getDateTime = (fecha, hora) => {
  const meses = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
    'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
  };

  const [dia, mesStr, anio] = fecha.toLowerCase().split(' ');
  const mes = meses[mesStr];

  return `${anio}/${mes}/${dia.padStart(2, '0')} ${hora}`;
}




function iniciarConexion() {
  console.log(`[${new Date().toLocaleTimeString()}] Intentando conectar a ${PUERTO_OBJETIVO}...`);

  port = new SerialPort({ path: PUERTO_OBJETIVO, baudRate: BAUD_RATE }, (err) => {
    if (err) {
      console.log('Puerto no disponible. Reintentando en 2s...');
      setTimeout(iniciarConexion, 2000);
      return;
    }
  });

  parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

  port.on('open', () => {
    const data = PUERTO_OBJETIVO
    console.log(`[${new Date().toLocaleTimeString()}] Conectado a ${PUERTO_OBJETIVO}`);
    dataSplit = data.split(',')
    tocOnline ={
      aud_esta: 'I',
      aud_usua: 'sa',
      aud_fech: getDateTime(dataSplit[1], dataSplit[2]),
      emp_codi: '1',
      codmaq: 'SAT0001',
      nommaq: 'PLANTA DE AGUA PURIFICADA',
      sar_vtoc: dataSplit[3],
      sar_utoc: 'ppb',
      sar_vaic: dataSplit[4],
      sar_unic: 'ppb',
      sar_vatc: dataSplit[5],
      sar_untc: 'ppb',
      sar_cocr: dataSplit[6],
      sar_ucoc: 'uS/cm',
      sar_vcon: dataSplit[8],
      sar_ucon: 'uS/cm',
      sar_vtem: dataSplit[7],
      sar_utem: '°C',
      sar_acon: '',
      sar_atoc: '',
    }
    console.log(tocOnline)
  });

  parser.on('data', (data) => {
    console.log('Datos recibidos:', data);
  });

  port.on('error', (err) => {
    console.error('Error:', err.message);
  });

  port.on('close', () => {
    console.warn(`[${new Date().toLocaleTimeString()}] Puerto cerrado. Intentando reconectar...`);
    setTimeout(iniciarConexion, 2000);
  });
}

// Función para enviar datos (solo si el puerto está abierto)
function enviar(texto) {
  if (port && port.isOpen) {
    port.write(texto + '\r\n', (err) => {
      if (err) {
        return console.error('Error al enviar:', err.message);
      }
      console.log('Enviado:', texto);
    });
  } else {
    console.log('No se puede enviar: el puerto no está conectado');
  }
}

// Iniciar la conexión
iniciarConexion();
