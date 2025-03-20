Notas de la versión
-------------------

1. El bot contesta a los flujos definidos, en esta version, los flujos se encuetran en archivos separados para facilitar la lectura y adinistracion del código. Dichos flujos se pueden encontrar en la carpeta SCR/flows.

2. También se cuenta con un archivo de funciones donde se pueden encontrar algunas para generar saludos y agradecimientos aleatorios, timer para delay. convertir segundos en formato HH:MM:SS entre otras.

3. index.php reemplaza al index.html anterior. Esto para mejora el formulario que crea y envia los mensajes. Ahora, este formulario usa controles para seleccionar a los destinatarios según varios criterios, evitando tener que usar un recuado de texto para colocar una consulta SQL.

4. El formulario del index.php ahora puede crear una vista previa del mensaje que se está creando.

5. En función del destinatario o grupo de ellos, se añade al URL que se pide visitar, un tracking que nos permite identificar cual de ellos la visitó.

6. Quitamos las credenciales de acceso a la BD del cuerpo de archivos .ts y .php. Ahora las credenciales estan en un .env y se consultan desde aqui. Para lograr esto instalamos Composer en el proyecto y la dependencia dotenv.

7. Ahora el listado de grupos y sus JIDs se lee desde la BD, de modo que no queda expuesto en el código.


Nota:
1. Cuando en el campo de Género se selecciona GRUPOS, el campo LUGAR queda inutilizado o no tiene efecto.


Pendientes
----------

1. Aún quedan flujos por ajustar y depurar, este es el caso de: Menu.ts, flowOption1.ts y flowOption2.ts
2. se añadió el archivo de idle-custom.ts el cual debe ser estudiado para sacar provecho de él en flujos mas complejos.