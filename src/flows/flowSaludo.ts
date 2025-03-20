import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, EVENTS } from '@builderbot/bot'

import { obtenerSaludo, extraerPalabra } from 'src/funciones'

// Flow para el saludo de bienvenida
const flowSaludo = addKeyword(['hola', 'buenos dias', 'buenas tardes', 'buenas noches'])
.addAction(async (ctx, ctxFn) => {
        //console.log(ctx)
        const ahora = Date.now();
        const nombre = extraerPalabra(ctx.name, 0)
        await ctxFn.flowDynamic ('Hola _*' + (nombre) + '*_, '+ obtenerSaludo() +'. Gracias por escribir a ITSCA.NET. ¿En qué podemos ayudarte hoy?')
    })

export default flowSaludo