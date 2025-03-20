import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, addAction, EVENTS } from '@builderbot/bot'

const flowDelivery = addKeyword('delivery')
    .addAnswer(
        [
            '*Claro que tenemos delivery*, además, es gratis en la zona que comprende Las Tejerías, El consejo, La Victoria, Cagua, Turmero y Maracay. Fuera de esta zona, con todo gusto podemos hacerle el envío mediante: Domesa, Tealca o MRW.\n',
            'Si deseas hacer un pedido, nos facilitas los datos que requerimos para registrar la venta, validar las garantías y dónde te lo hacemos llegar.\n',
            '¿Desea hacer un pedido? (*S/N*)'
        ], { media: 'https://www.itsca.net/wp-content/uploads/Entrega-Inmediata-Cuadrada.jpg' }
    )
    .addAction({ capture: true }, async (ctx, { flowDynamic, fallBack }): void => {
        const input = ctx.body.toUpperCase()
        console.log('input:', input);

        if (!['S', 'N'].includes(input)) {
            return fallBack('Opción no válida. Por favor, escribe S o N.');
        } else {
            if (input === 'S') {
                await flowDynamic('Por favor, envíanos los siguientes datos para registrar la venta validar la garantia.\n\n- Nombre completo\n- Número de cédula o RIF\n- email\n- Dirección de entrega\n- Producto que deseas adquirir.\n\nUsaremos este número de Whatsapp como número de contacto, luego, nos pondremos en contacto contigo para coordinar la entrega.')
            } else {
                await flowDynamic('Gracias por su interés en nuestros productos. ¿En qué más podemos ayudarle?')
            }
        }

    })



export default flowDelivery

/*
const flowDelivery = addKeyword('delivery')
    .addAnswer(
        [
            '*Claro que tenemos delivery*, además, es gratis en la zona que comprende Las Tejerías, El consejo, La Victoria, Cagua, Turmero y Maracay. Fuera de esta zona, con todo gusto podemos hacerle el envío mediante: Domesa, Tealca o MRW.\n',
            'Si deseas hacer un pedido, nos facilitas los datos que requerimos para registrar la venta, validar las garantías y dónde te lo hacemos llegar.\n',
            'Escribe *PEDIDO*, para enviarte los datos requeridos.\n',
            '¿Desea hacer un pedido? (*S/N*)'
        ], { media: 'https://www.itsca.net/wp-content/uploads/Entrega-Inmediata-Cuadrada.jpg' }
    ), {capture: true}, 
    async (ctx, ctxFn) => {
        const input = ctx.body.toUpperCase()

        if (!['S', 'N'].includes(input)) {
            console.log('Opción no válida:', input);
            return fallBack('Opción no válida. Por favor, escribe S o N.');
        } else {
            if (input === 'S') {
                await flowDynamic('Por favor, indícanos tu nombre completo, número de cédula o RIF, email, dirección de entrega, teléfono de contacto y el producto que deseas adquirir.\nLuego, nos pondremos en contacto contigo para coordinar la entrega.')
            } else {
                await flowDynamic('Gracias por su interés en nuestros productos. ¿En qué más podemos ayudarle?')
            }
        }
    }
*/