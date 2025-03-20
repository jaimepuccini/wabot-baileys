/* FUNCIONES USADAS */

// Función para convertir milisegundos a hh:mm:ss
export function msToTime(duration: number): string {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const pad = (num: number) => (num < 10 ? '0' + num : num);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Funcion para escoger un saludo dependiendo de la hora del dia
export function obtenerSaludo(): string {
    // Obtener la hora actual en formato 24 horas
    const horaActual = new Date().getHours();
  
    // Lógica para determinar el saludo
    if (horaActual >= 0 && horaActual < 12) {
      return "buenos días";
    } else if (horaActual >= 12 && horaActual < 19) {
      return "buenas tardes";
    } else {
      return "buenas noches";
    }
  }

// Funcion para escoger un saludo genérico aleatorio
export function randomSaludo() {
  const listMessages = [`Hola pana!`, 'Cómo has estado?', 'Ejele', 'Eups...']
  const randomMessage = listMessages[Math.floor(Math.random() * listMessages.length)]
  return randomMessage
}

// Funcion para escoger un la respuesta a un agradecimiento
export function randomGracias() {
  const listMessages = [`De nada`, 'Es un placer', 'Para servirte', 'Es un gusto', 'No hay de qué', 'Ha sido un gusto', 'No hay problema', 'Espero haberte ayudado', 'Estamos para ayudarte']
  const randomMessage = listMessages[Math.floor(Math.random() * listMessages.length)]
  return randomMessage
}

// Funcion para extraer una palabra de una cadena, dada una posición
export function extraerPalabra(cadena: string, pos: number): string {
  
  const palabras = cadena.split(' '); // Dividimos la cadena en un array de palabras

  if (pos >= 0 && pos < palabras.length) { // Validamos si la posición solicitada es válida
    const palabra = palabras[pos];

    if (/[a-zA-Z0-9]/.test(palabra[0])) { // Validamos si el primer carácter es alfanumérico
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase(); // Capitalizamos la primera letra y convertimos el resto a minúsculas
    } else {
      return palabra; // Si el primer carácter no es alfanumérico, devolvemos la palabra sin cambios
    }
  } else {
    return '';
  }
}

// Definición de la función sleep (espera en milisegundos)
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Elimina los números de una cadena de caracteres
function eliminarNumeros(cadena: string): string {
  return cadena.replace(/\d+/g, '');
}