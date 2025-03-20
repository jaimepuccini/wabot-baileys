import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { MemoryDB as Database } from '@builderbot/bot'
import { addKeyword, EVENTS } from '@builderbot/bot'
import option1 from './flowOption1'
import option2 from './flowOption2'


const flowMenu = addKeyword<Provider, Database>('menu')
    .addAnswer(
        [
            '🙌 Para atenderte más rápido, quisiera ofrecerte las siguientes interacciones.\nSelecciona el número de la opcion que te interesa:\n',
            '1️⃣- *Productos* que vendemos 🛒',
            '2️⃣- *Servicios* que prestamos ⚙️',
            '3️⃣- *FAQ* o preguntas frecuentes ❓',
            '0️⃣-👉 Salir 💪'
        ].join('\n'),
        { capture: true },
        async (ctx, { gotoFlow, fallBack, endFlow }) => {
            const option: string = ctx.body
            switch (option) {
                case "1":
                    return gotoFlow(option1)
                case "2":
                    return gotoFlow(option2)
                case "3":
                    return gotoFlow(option3)
                case "0":
                    return endFlow('Siempre puedes regresar, escribiendo *MENU*')
                default:
                    return fallBack(`❌ La pción ${option} válida! ❌`)
            }
        }
    )

export default flowMenu