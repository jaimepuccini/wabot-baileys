import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, EVENTS } from '@builderbot/bot'

const flowTienda = addKeyword ('Escribo desde la tienda virtual de ITSCA, estoy interesado en')
    .addAnswer(
        [
            '*Gracias por visitar nuestra tienda en línea*!\n',
            'Normalmente toda la información está justo en la página que te trajo a este chat, de no ser el caso, por favor dejanos sáber cuál es tu inquietud o requerimiento.'
        ]
    )

export default flowTienda