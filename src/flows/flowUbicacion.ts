import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, EVENTS } from '@builderbot/bot'

const flowUbicacion = addKeyword (['ubicacion', 'ubicación', 'ubicado','donde estan ubicados', 'dónde están ubicados', 'donde te ubicas', 'dónde te ubicas', 'dónde se ubican', 'donde se ubican'])
    .addAnswer('Trabajamos desde _*La Victoria - Aragua*_, pero atendemos a particulares y empresas entre Las Tejerías y Maracay, en esta zona tenemos delivery gratis, fuera de ella, enviamos por Domesa, MRW, o Tealca')

export default flowUbicacion
