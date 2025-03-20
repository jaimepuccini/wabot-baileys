/*

URLs de Instalacion y referencias
- https://www.builderbot.app/es/ (documentacion)
- https://bot-whatsapp.netlify.app/ (documentacion)
- https://www.youtube.com/watch?v=twia5bKW6eg
- https://www.youtube.com/watch?v=-2LAr8A-lQI (trabajando con grupos de WA)
- https://www.youtube.com/watch?v=twia5bKW6eg&list=PLItELtCfBA389ShH6qJOUkjZdRsbTQg44&index=1&t=0s (Menus y otros flujos)
- https://github.com/jorgechavarriaga/builder_bot_baileys_examples/tree/master
- https://github.com/jorgechavarriaga/builder_bot_baileys_examples/blob/master/menu_gotoFlow/app.ts

*/

/* IMPORTAMOS LAS LIBRERIAS USADAS */
import { createBot, createProvider, createFlow, addKeyword, utils, EVENTS, addAnswer } from '@builderbot/bot'
import { MemoryDB as Database } from '@builderbot/bot'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import * as mysql from 'node_modules/mysql2/promise'
import dotenv from 'dotenv';
import { msToTime, obtenerSaludo, randomSaludo } from 'src/funciones'
import { sleep } from 'src/funciones';
import { idleFlow } from 'src/idle-custom'


/* IMPORTAMOS LOS FLUJOS DE CONVERSACION */
import flowMenu from './flows/flowMenu'
import option1 from './flows/flowOption1'
import option2 from './flows/flowOption2'
import flowSaludo from './flows/flowSaludo'
import flowGracias from './flows/flowGracias'
import flowPagos from './flows/flowPagos'
import flowBeam from './flows/flowBeam'
import flowTienda from './flows/flowTienda'
import flowUbicacion from './flows/flowUbicacion'
import flowDelivery from './flows/flowDelivery'


// Configuración de la base de datos (reemplaza con tus credenciales)
dotenv.config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const PORT = process.env.PORT ?? 3002


// Cuepo principal de la aplicacion

const main = async () => {
    const adapterFlow = createFlow(
        [
            flowSaludo,
            flowMenu,
            option1,
            option2,
            flowGracias,
            flowPagos,
            flowBeam,
            flowTienda,
            flowUbicacion,
            flowDelivery
        ]
    )
    const adapterProvider = createProvider(Provider)
    const adapterDB = new Database()

    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    //Aqui se reciben los datos que vienen del fotmulario HTML
    adapterProvider.server.post(
        '/send-message',
        handleCtx(async (bot, req, res) => {
            const { tipo, recipient, saludo, bodymessage, link2page, postdata, mediaUrl } = req.body;

            console.log(req.body);

            if (tipo === 'U') { // Si el mensaje es unico o unitario

                const tracklink2page = "➡️ "+link2page+"/?ref=bot"+ recipient.substr(-7) + "\n\n";
                const personalizedMessage = saludo+" "+bodymessage+"\n"+tracklink2page+postdata;

                console.log(`Mensaje se envia al ID: ${recipient}`);

                if (!recipient.includes('@')) { // Si el destinatario no es un grupo
                    await bot.sendMessage(recipient, personalizedMessage, { media: mediaUrl })
                } else {
                    if (mediaUrl === '') {
                        await bot.provider.sendText(recipient, personalizedMessage)  // esto solo envia texto
                    } else {
                        await bot.provider.sendMedia(recipient, mediaUrl, personalizedMessage ) //esto envia una imagen junto al texto
                    }
                }

            } else if (tipo === 'M') { // Si el mensaje es masivo se consulta la bd
                try {
                    const [rows] = await pool.query(recipient)
                    console.log('Conexion correcta con la BD')
                    let totalDelay: number = 0;
                    const startTime = Date.now();
                    for (const row of rows) {
                        const saludo = randomSaludo()
                        const { id, nombre, apellido, telefono1,} = row
                        const tracklink2page = link2page+"/?ref=bot"+ telefono1.substr(-7) + "\n";
                        const personalizedMessage = `${saludo} *${nombre}*, ${bodymessage}\n${tracklink2page}\n\n${postdata}`;
                        
                        const randtime = Math.floor(3*(Math.random() * 1201) + 300); // Genera un tiempo de espera aleatorio entre 3 x (300 y 1500) milisegundos
                        //console.log(`Esperando ${randtime} milisegundos...`)
                        
                        try{
                            if (!telefono1.includes('@')) { // Si el destinatario no es un grupo
                                await bot.sendMessage(telefono1, personalizedMessage, { media: mediaUrl })
                                console.log(`Mensaje enviado a ID ${id} - ${nombre} ${apellido} --> ${telefono1} correctamente.`);
                                await sleep(randtime);
                                totalDelay += randtime;
                            } else {
                                if (mediaUrl === '') {
                                    await bot.provider.sendText(telefono1, personalizedMessage)  // esto solo envia texto
                                } else {
                                    await bot.provider.sendMedia(telefono1, mediaUrl, personalizedMessage ) //esto envia una imagen junto al texto
                                }
                                await sleep(randtime*6);
                                totalDelay += randtime*6;
                                //console.log('Aquí se estrarían enviando mensajes a grupos')
                                console.log(`Mensaje enviado a ID ${id} - ${nombre} ${apellido} --> ${telefono1} correctamente.`);
                            }
                        } catch (error) {
                            console.error(`Error enviando mensajes a: ${telefono1}`, error);
                        }
                    }
                    const endTime = Date.now();
                    const totalTime = endTime - startTime;
                    const formattedTime = msToTime(totalTime);
                    console.log(`Hora de inicio: ${msToTime(startTime)}`)
                    console.log(`Hora de fin: ${msToTime(endTime)}`)
                    console.log(`Se enviaron ${rows.length} mensajes en ${formattedTime} o ${totalTime} milisegundos.`)
                    console.log(`El tiempo total de espera fue de ${totalDelay} milisegundos.`)
                    
                    // Enviar resumen al admin
                    const resumen = `Desde el bot se enviaron *${rows.length}* mensajes en *${formattedTime}* hh:mm:ss o *${totalTime}* milisegundos.\n\nEl tiempo total de retardos aleatorios fue de *${totalDelay}* milisegundos.`
                    await bot.sendMessage('584128471525', resumen, { })
                    
                } catch (error) {
                    console.error('Error al ejecutar la consulta SQL:', error)
                }
            }

        
          return res.end('trigger')
        })
    )

    httpServer(+PORT)
}

main()