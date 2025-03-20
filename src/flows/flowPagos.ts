import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, EVENTS } from '@builderbot/bot'

const flowPagos = addKeyword (['pago', 'medios de pago', 'te puedo pagar', 'zelle', 'usdt', 'binance', 'airtm', 'zinli', 'divisas'])
    .addAnswer(
        [
            '💰💰💰💰💰💰💰\n',
            'Puedes pagar con:\n',
            '💵 Efectivo (solo divisas)',
            '📱 Pago móvil',
            '🪙 Binance (USDT)',
            '💳 Zinli',
            '🏧 AirTM\n',
            'Usa estos datos para hacer un Pago Móvil:',
            '- Cédula: 11183350',
            '- Móvil: 0412-8471525 (este número)',
            '- Bancos: Mercantil o Exterior\n',
            'Para pagos con Binance (USDT), Zinli o AirTM usa el correo jaimepuccini@gmail.com\n',
            '👉 Recuerda pasarme el capture al realizar pago.\nGracias 😎'
        ]
    )

export default flowPagos