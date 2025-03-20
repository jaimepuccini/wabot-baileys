import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, EVENTS } from '@builderbot/bot'

import { randomGracias, extraerPalabra } from 'src/funciones'

// Flow para el saludo de bienvenida
const flowGracias = addKeyword(['gracias', 'muy agradecido', 'muy agradecida', 'gracias por tu ayuda', 'gracias por tu tiempo', 'gracias por tu atención', 'gracias por tu colaboración', 'gracias por tu apoyo', 'gracias por tu asistencia', 'gracias por tu disposición', 'gracias por tu paciencia', 'gracias por tu comprensión', 'gracias por tu compasión', 'gracias por tu generosidad', 'gracias por tu bondad', 'gracias por tu amabilidad', 'gracias por tu simpatía', 'gracias por tu solidaridad', 'gracias por tu empatía', 'gracias por tu comprensión', 'gracias por tu tolerancia', 'gracias por tu respeto', 'gracias por tu consideración', 'gracias por tu cortesía', 'gracias por tu gentileza'])
.addAction(async (ctx, ctxFn) => {
        /*
        console.log(ctx)
        const ahora = Date.now();
        */
        const nombre = extraerPalabra(ctx.name, 0) // tomamos la primera palabra de ctx.name
        const numRemitente = ctx.from; // tomamos el numero del remitente

        if (nombre === numRemitente) { //si el nombre es igual al número del remitente 
            nombre = "";
        }
        await ctxFn.flowDynamic (randomGracias() + ' _*' + (nombre) + '*_. ')
    })

export default flowGracias