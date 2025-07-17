const { SerialPort, ReadlineParser } = require('serialport');

const PUERTO_OBJETIVO = 'COM4'; // Reemplaza con el puerto deseado
const BAUD_RATE = 9600;
let port;
let parser;

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
    console.log(`[${new Date().toLocaleTimeString()}] Conectado a ${PUERTO_OBJETIVO}`);
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
