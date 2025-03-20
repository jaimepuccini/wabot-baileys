import { addKeyword, EVENTS } from '@builderbot/bot'
import flowMenu from './flowMenu'
import option2 from './flowOption2'

// 0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣

const option1 = addKeyword(EVENTS.ACTION)
    .addAnswer('¡Claro! Te invitamos a visitar nuestra tienda en línea donde encontrarás una amplia variedad de productos de tecnología.\n\n🛒 Puedes consultar nuestro catálogo completo en este enlace:\nhttps://itsca.net/tienda?ref=bot\n\nY recuerda que tenemos delivery gratis en El Consejo, La Victoria, Cagua, Turmero y Maracay.\n\n¿Qué deseas hacer? Selecciona una opción:')
    .addAnswer(['0️⃣- Menu anterior', '1️⃣ Buscar producto', '3 End'])
    .addAction(
        { capture: true },
        async (ctx, { gotoFlow, endFlow, fallBack }) => {
            const resp = ctx.body
            if (resp === "0") {
                return gotoFlow(flowMenu)
            } else if (resp === "1") {
                return gotoFlow(option2)
            } else if (resp === "2") {
                return endFlow('End')
            } else {
                return fallBack(`Option ${resp} is not valid, try it again.`)
            }
        }
    )

export default option1