import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { addKeyword, EVENTS } from '@builderbot/bot'

const flowBeam = addKeyword (['beam',  'video bin', 'bean', 'video bean', 'video beam'])
    .addAnswer(
        [
            'Tenemos el servicio de Alquiler de Video Beam por hora, únicamente para El Consejo, La Victoria, Cagua, Turmero y Maracay, por el precio base de 5$ la hora.\n',
            'Toda la información que requieres está disponible en el siguiente link a nuestra página. Por favor, asegúrate de haber leído las *CONDICIONES DEL SERVICIO*.\n',
            '🔗 https://itsca.net/producto/servicio-de-alquiler-de-video-beam/?ref=wabot\n',
            'Pregunta lo que necesites si aún te queda alguna inquietud.\n',
            'Si deseas contratar el servicio, requerimos que nos envíes:',
            '- La fecha, hora y dirección precisa del evento para poder validar si tenemos la agenda libre para servirles debidamente.',
            '- Nombre y número de teléfono de quien nos recibirá en el evento.\n',
            'Nos dará mucho gusto apoyarte en el evento.\n',
            '¿Hay algo más en lo que te pueda ayudar?'
        ],
            {media:'https://www.itsca.net/wp-content/uploads/Video-Beam-2.jpg'}
    )

export default flowBeam