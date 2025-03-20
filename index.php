<!DOCTYPE html>
<!-- Doc Ref: https://www.youtube.com/watch?v=AKBsgjjl3TQ -->

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="estilos/formularios.css?v=<?php echo(rand()); ?>">
    <title>Formulario con Lista Desplegable</title>
</head>
<body>

<?php 
    include 'bd_conect.php';

    // Consulta SQL para obtener los valores del campo DESCRIPCION
    $sql = "SELECT DISTINCT descripcion FROM referencia";
    $result = $link->query($sql);

    $descripcionValues = array();
    while ($fila = $result->fetch_assoc()) {
        array_push($descripcionValues, utf8_encode($fila['descripcion']));
    }
?>

<div class="main_container">
    <h1 class="centertext">ENVÍO DE MENSAJES MASIVOS</h1>
    <div class="nCols">
        <div>
            <form id="sendMessageForm">
                <div class="contenedor-titulo">
                    <h5>Tipo de destinatario</h5>
                    <hr>
                </div>
                <input type="radio" id="tipoUnico" name="tipo" value="U" checked required onchange='mostrarOcultarCampos(this.value)'> Número o JID de Grupo<br />
                <input type="radio" id="tipoMasivo" name="tipo" value="M" required onchange='mostrarOcultarCampos(this.value)'> Masivo

                <div class="contenedor-titulo">
                    <h5>Filtros</h5>
                    <hr>
                </div>

                <div id='unicoContainer' class='visible'>
                    <input type="text" id="recipient" name="recipient" placeholder="Número o JID de Grupo">
                </div>

                <div id='masivoContainer' class='oculto'>
                    <div style="display: flex;">
                        <div style="margin-right:10px;"><label for="direccion">Lugar: </label></div>
                        <div><input type="text" id="direccion" name="direccion" placeholder="Localidad"></div>
                    </div>
                    <div class="nCols">
                        <label for="genero">Género:</label>
                        <select name="genero" id="genero">
                            <option value="T">TODOS</option>
                            <option value="G">GRUPOS</option>
                            <option value="M">MASCULINO</option>
                            <option value="F">FEMENINO</option>
                            <option value="E">EMPRESAS</option>
                        </select>

                        <label for="referencia">Intereses:</label>
                        <select name="referencia" id="referencia">
                            <?php foreach ($descripcionValues as $valor) { ?>
                                <option value="<?php echo strtolower($valor); ?>"><?php echo ucfirst($valor); ?></option>
                            <?php } ?>
                        </select>
                    </div>
                    
                </div>
                                    
                <div class="contenedor-titulo">
                    <h5>Mensaje</h5>
                    <hr>
                </div>
                    
                <input type="text" id="saludo" name="saludo" placeholder="Saludo o prenombre" onchange='vistaprevia(this.value)'>
                <textarea id="bodymessage" style="height: 120px;" name="bodymessage" required placeholder="Cuerpo principal" onchange='vistaprevia(this.value)'></textarea>
                <input type="text" id="link2page" name="link2page" placeholder="Link a página" onchange='vistaprevia(this.value)'>
                <textarea id="postdata" style="height: 80px;" name="postdata" placeholder="Postdata o despedida" onchange='vistaprevia(this.value)'></textarea>
                <input type="text" id="mediaUrl" name="mediaUrl" placeholder="Url del adjunto" onchange='vistaimagen(this.value)'>
                
                <button type='submit'>Enviar Mensaje</button>
            </form>

            <script>  // El script va *dentro* del body, pero antes del cierre del body
                function mostrarOcultarCampos(tipo) {
                    const unicoContainer = document.getElementById('unicoContainer');
                    const masivoContainer = document.getElementById('masivoContainer');

                    if (tipo === 'U') {
                        unicoContainer.classList.remove('oculto');
                        unicoContainer.classList.add('visible');
                        masivoContainer.classList.remove('visible');
                        masivoContainer.classList.add('oculto');
                    } else if (tipo === 'M') {
                        masivoContainer.classList.remove('oculto');
                        masivoContainer.classList.add('visible');
                        unicoContainer.classList.remove('visible');
                        unicoContainer.classList.add('oculto');
                    }
                }
            </script>
        </div>

        <div>
            <div class="contenedor-titulo">
                <h5>Vista previa</h5>
                <hr>
            </div>
            <div id="imagen"></div>
            <textarea readonly id="preview" style="height: 300px;" name="preview"></textarea>
            <script>
                function vistaprevia() {
                    // 1. Obtener los valores de los campos del formulario
                    const recipient = document.getElementById("recipient").value;
                    const saludo = document.getElementById("saludo").value;
                    const bodymessaje = document.getElementById("bodymessage").value;
                    const link2page = document.getElementById("link2page").value;
                    const postdata = document.getElementById("postdata").value;
                    const mediaUrl = document.getElementById("mediaUrl").value;

                    // 2. Concatenar los valores
                    let textoConcatenado = saludo + bodymessaje + "\n";

                    if (link2page) {
                        textoConcatenado += link2page + "/?ref=" + recipient.substr(-7) + "\n\n";
                    }

                    if (postdata) {
                        textoConcatenado += postdata + "\n\n";
                    }

                    // 3. Mostrar el texto concatenado en el textarea destino
                    const textareaDestino = document.getElementById("preview");
                    textareaDestino.value = textoConcatenado;

                    return textareaDestino.value;
                }

                function vistaimagen(url) {
                    const imagenDiv = document.getElementById('imagen');
                    imagenDiv.innerHTML = ''; // Limpiar contenido anterior

                    if (url) {
                        const extensionesImagen = ['.jpg', '.png', '.gif', '.webp'];
                        const esImagen = extensionesImagen.some(ext => url.toLowerCase().endsWith(ext));

                        if (esImagen) {
                        const img = document.createElement('img');
                        img.src = url;
                        img.style.maxWidth = '350px';
                        img.style.width = '100%';
                        img.style['border-radius'] = '4px';
                        imagenDiv.appendChild(img);
                        } else {
                        imagenDiv.innerHTML = `<p>Se adjunta el archivo:<br>${url}</p>`;
                        }
                    }
                }
            </script>
        </div>

        <div>
            <h3>Listado de ID de grupos</h3>
            <div class="contenedor-titulo">
                <h5>Grupo de prueba</h5>
                <hr>
            </div>
            <ol>
            <?php
                    $sql = "SELECT apellido, telefono1 FROM contactos WHERE referencia LIKE '%Prueba%' and genero ='G'";
                    $result = $link->query($sql);

                    while ($fila = $result->fetch_assoc()) {
                        echo "<li>{$fila['apellido']}: <span class='SQLQuery'>{$fila['telefono1']}</span></li>";
                    }
                ?>
            </ol>
            <div class="contenedor-titulo">
                <h5>Lista de Grupos Registrados</h5>
                <hr>
            </div>
            <ol>
                <?php
                    $sql = "SELECT apellido, telefono1 FROM contactos WHERE referencia NOT LIKE '%Prueba%' and genero ='G'";
                    $result = $link->query($sql);

                    while ($fila = $result->fetch_assoc()) {
                        echo "<li>{$fila['apellido']}: <span class='SQLQuery'>{$fila['telefono1']}</span></li>";
                    }
                ?>
            </ol>
        </div>
    </div>
</div>

<script>
    const form = document.getElementById('sendMessageForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        let recipient = ""; // Initialize recipient outside the conditional blocks

        // Capture recipient variables
        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        const saludo = document.getElementById('saludo').value;
        const direccion = document.getElementById('direccion').value;
        const genero = document.getElementById('genero').value;
        const referencia = document.getElementById('referencia').value;

        // Capture message variables
        const bodymessage = document.getElementById('bodymessage').value;
        const link2page = document.getElementById('link2page').value;
        const postdata = document.getElementById('postdata').value;

        // Capture media URL
        const mediaUrl = document.getElementById('mediaUrl').value;

        // Construct the recipient
        if (tipo === 'U') {
            recipient = document.getElementById('recipient').value; 
        } else if (tipo === 'M') { // Use else if for mutually exclusive conditions
            recipient = "SELECT id, telefono1, nombre, apellido FROM contactos";

                recipient += ` WHERE direccion LIKE '%${direccion}%'`;

                if (genero !== "T" && referencia !== "todos") { 
                    recipient += ` AND genero = '${genero}' AND referencia LIKE '%${referencia}%'`;
                }

                if (genero === "T" && referencia !== "todos") {
                    recipient += ` AND referencia LIKE '%${referencia}%'`;
                }

                if (genero !== "T" && referencia === "todos") {
                    recipient += ` AND genero = '${genero}'`;
                }
                recipient +=' ORDER BY RAND()';
            } else {
                if (genero !== "T" && referencia !== "todos") { 
                    recipient += ` WHERE genero = '${genero}' AND referencia LIKE '%${referencia}%'`;
                }

                if (genero === "T" && referencia !== "todos") {
                    recipient += ` WHERE referencia LIKE '%${referencia}%'`;
                }

                if (genero !== "T" && referencia === "todos") {
                    recipient += ` WHERE genero = '${genero}'`;
                }
                recipient +=' ORDER BY RAND()';             
            }
        
        const message = vistaprevia();
        
        /*
        console.log("tipo:", tipo);
        console.log("genero:", genero);
        console.log("saludo:", saludo);
        console.log("direccion:", direccion);
        console.log("referencia:", referencia);
        console.log("Destinatario:", recipient);
        console.log("mediaUrl:", mediaUrl);
        console.log(message);
        */


        try {
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ tipo, recipient, saludo, bodymessage, link2page, postdata, mediaUrl })
                });
                
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error inesperado');
            }
            alert('El proceso de envío de mensajes ha finalizado');
        

    });
</script>

</body>
</html>
