

function processCSVFile() {
    // Obtain entry elements inside te file
    var inputArchivo = $('#csvInput')[0];

    // Verify if a least one element was selected
    if (inputArchivo.files.length > 0) {
        // Obtain first file selected
        var archivo = inputArchivo.files[0];



        // Cargar el archivo y validar el formato antes de analizarlo
        var parsedData = Papa.parse(archivo, {
            header: true,
            delimiter: ',',
            skipEmptyLines: true,
            complete: function (results) {

                data = results.data;

                // Acceder a las columnas (encabezados)
                var columnas = results.meta.fields; // Esto te dará un array con los nombres de las columnas

                // Acceder a los valores de cada fila
                var filas = results.data; // Esto te dará un array con todas las filas del CSV

                //$('#exampleModalScrollable').show();


                // Contenido HTML que deseas cargar en la nueva pestaña
                var mailingLabels = "";
                // Iterar sobre las filas y acceder a los valores de cada columna

                var seleccionado = $('input[name="ownerResident"]:checked').attr('id');

                var contadorIteraciones = 0;

                //mailingLabels+=`<div class="container">`

                $.each(data, function (index, fila) {
                    if (index % 2 === 0) { // Si el índice es par

                        contadorIteraciones++;

                        if (contadorIteraciones % 10 === 1) {
                            // Mensaje de consola cuando comienza cada ciclo de 10 iteraciones
                            mailingLabels += `
                                <center><div class="container">
                                    <div style="text-align: justify;">`;
                        }

                        // Realizar alguna acción basada en el botón seleccionado
                        switch (seleccionado) {
                            case 'owner':
                                mailingLabels += `
                                    <div class="column">
                                        ${fila["TRUE_OWNER1"]}</br>
                                        ${fila["TRUE_MAILING_ADDR1"]}</br>
                                        ${fila["TRUE_MAILING_CITY"]}, ${fila["TRUE_MAILING_STATE"]} ${fila["TRUE_MAILING_ZIP_CODE"]}</BR>                       
                                    </div>`;

                                var siguienteIndex = index + 1;
                                if (siguienteIndex < data.length) {
                                    var siguienteItem = data[siguienteIndex];
                                    mailingLabels += `
                                        <div class="column">
                                            ${siguienteItem["TRUE_OWNER1"]}</br>
                                            ${siguienteItem["TRUE_MAILING_ADDR1"]}</br>
                                            ${siguienteItem["TRUE_MAILING_CITY"]}, ${siguienteItem["TRUE_MAILING_STATE"]} ${siguienteItem["TRUE_MAILING_ZIP_CODE"]}</br>                                   
                                        </div></br>`;
                                }
                                // Realizar acciones específicas para "Owners"
                                break;
                            case 'resident':

                                mailingLabels += `
                                    <div class="column">
                                        RESIDENT</br>
                                        ${fila["TRUE_SITE_ADDR"]}</br>
                                        ${fila["TRUE_SITE_CITY"]}, FL ${fila["TRUE_SITE_ZIP_CODE"]}</BR>                    
                                    </div>`;

                                var siguienteIndex = index + 1;
                                if (siguienteIndex < data.length) {
                                    var siguienteItem = data[siguienteIndex];
                                    mailingLabels += `
                                        <div class="column" style="padding-left:15px;">
                                            RESIDENT</br>
                                            ${siguienteItem["TRUE_SITE_ADDR"]}</br>
                                            ${siguienteItem["TRUE_SITE_CITY"]},FL ${siguienteItem["TRUE_SITE_ZIP_CODE"]}</br>                        
                                        </div></br>`;
                                }

                                // Realizar acciones específicas para "Residents"
                                break;
                            case 'both':

                                mailingLabels += `                                
                                    <div class="column">
                                        ${fila["TRUE_OWNER1"]}</br>
                                        ${fila["TRUE_MAILING_ADDR1"]}</br>
                                        ${fila["TRUE_MAILING_CITY"]}, ${fila["TRUE_MAILING_STATE"]} ${fila["TRUE_MAILING_ZIP_CODE"]}</BR>                       
                                    </div>`;

                                var siguienteIndex = index + 1;
                                if (siguienteIndex < data.length) {
                                    var siguienteItem = data[siguienteIndex];
                                    mailingLabels += `
                                        <div class="column">
                                            ${siguienteItem["TRUE_OWNER1"]}</br>
                                            ${siguienteItem["TRUE_MAILING_ADDR1"]}</br>
                                            ${siguienteItem["TRUE_MAILING_CITY"]}, ${siguienteItem["TRUE_MAILING_STATE"]} ${siguienteItem["TRUE_MAILING_ZIP_CODE"]}</br>                                   
                                        </div></br>`;
                                }
                                if (fila["TRUE_MAILING_ADDR1"] != fila["TRUE_SITE_ADDR"]) {
                                    mailingLabels += `
                                    <div class="column">
                                        RESIDENT</br>
                                        ${fila["TRUE_SITE_ADDR"]}</br>
                                        ${fila["TRUE_SITE_CITY"]}, FL ${fila["TRUE_SITE_ZIP_CODE"]}</BR>                    
                                    </div>`;

                                    var siguienteIndex = index + 1;
                                    if (siguienteIndex < data.length) {
                                        var siguienteItem = data[siguienteIndex];
                                        mailingLabels += `
                                        <div class="column">
                                            RESIDENT</br>
                                            ${siguienteItem["TRUE_SITE_ADDR"]}</br>
                                            ${siguienteItem["TRUE_SITE_CITY"]},FL ${siguienteItem["TRUE_SITE_ZIP_CODE"]}</br>                        
                                        </div></br>`;
                                    }
                                }
                                // Realizar acciones específicas para "Residents and Owner"
                                break;
                        }

                        if (contadorIteraciones % 10 === 0) {
                            mailingLabels += `
                                    </div>
                                    <div class="clear"></div>
                                </div></center>`;
                        }


                    }
                });
                var htmlContent = `
                <html>
                    <head>
                        <title>Mailing List Labels</title>                      

                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" 
                            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
                            crossorigin="anonymous" referrerpolicy="no-referrer" />

                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                size: letter;
                            }
                            .container {
                                width: 8.5in; /* Ancho total de la página */                                
                            }
                            .column {
                                width: 4in; /* Ancho de cada columna */
                                float: left;
                                padding: 10px;
                                margin-top:30px;
                            }
                            .clear {
                                clear: both; /* Limpia el float */
                            }
                            .floating-btn {
                                position: fixed;
                                bottom: 20px;
                                right: 20px;
                                background-color: #007bff;
                                color: #fff;
                                border: none;
                                border-radius: 50%;
                                width: 50px;
                                height: 50px;
                                font-size: 20px;
                                line-height: 50px;
                                text-align: center;
                                cursor: pointer;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                            }

                            .floating-close {
                                position: fixed;
                                bottom: 80px;
                                right: 20px;
                                background-color: #BE4C4C;
                                color: #fff;
                                border: none;
                                border-radius: 50%;
                                width: 50px;
                                height: 50px;
                                font-size: 20px;
                                line-height: 50px;
                                text-align: center;
                                cursor: pointer;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                            }
                            /* Establecer márgenes y saltos de página */
                            @page {
                                size: letter; /* Tamaño de la página */
                                margin: 0.5in; /* Márgenes de la página */
                                padding: 0;
                            }
                            .container {
                                page-break-inside: avoid; /* Evitar que el contenido se corte entre páginas */
                            }
                        </style>
                    </head>
                    <body>       
                        <center><h1>Mailing List Labels</h1></center></br>
                        <center><strong>${$('#description').val()}</strong></center></br>
                        <center><strong>${$('#department').val()}</strong></center></br>
                        <center><strong>${((seleccionado == 'owner') ? 'Addressed to Owner' : 'Addressed to Residents')}</strong></center></br>
                        <center><div class="container">
                            <div style="text-align: justify;">${mailingLabels}</div>
                            <div class="clear"></div>
                        </div></center>                        
                        <button class="floating-btn btn" onclick="imprimirPagina()"><i class="fa-solid fa-print"></i></button>
                        <button class="floating-close btn" onclick="cerrarPestana()"><i class="fa-solid fa-circle-xmark"></i></button>
                        <script>
                            // Función para imprimir el contenido de la página
                            function imprimirPagina() {
                                // Ocultar el botón antes de imprimir
                                var botones = document.querySelectorAll('.btn');
                                botones.forEach(function(boton) {
                                    boton.style.display = 'none';
                                });
                                window.print(); // Abre el diálogo de impresión del navegador
                                // Mostrar el botón después de imprimir
                                botones.forEach(function(boton) {
                                    boton.style.display = 'block';
                                });
                            }
                            function cerrarPestana() {
                                window.close(); // Cierra la pestaña actual
                            }
                        </script>
                    </body>
                </html>`;

                // Abrir una nueva pestaña y escribir el contenido HTML en ella
                var newTab = window.open();
                newTab.document.write(htmlContent);
            }
        });
    }
}

function verifyCSVInput() {

    // Obtain entry elements inside te file
    var inputArchivo = $('#csvInput')[0];

    // Verify if a least one element was selected
    if (inputArchivo.files.length > 0) {
        // Obtain first file selected
        var archivo = inputArchivo.files[0];

        // Obtain extension file
        var extension = archivo.name.split('.').pop().toLowerCase();

        // Función para verificar si el archivo tiene el formato CSV esperado
        function validarFormatoCSV(data) {
            // Verificar si data es una matriz con más de un elemento
            return Array.isArray(data) && data.length > 1;
        }

        // Cargar el archivo y validar el formato antes de analizarlo
        var parsedData = Papa.parse(archivo, {
            header: true,
            delimiter: ',',
            skipEmptyLines: true,
            complete: function (results) {
                if (archivo.name.endsWith(".csv")) {
                    if (!validarFormatoCSV(results.data)) {
                        formValido = false;
                        Swal.fire({
                            title: 'Error',
                            text: 'The ' + archivo.name + ' csv file is empty.',
                            icon: 'error'
                        });
                    } else if (results.errors.length > 0) {
                        console.log(results.errors);
                        csvValido = false;
                        Swal.fire({
                            title: 'Error',
                            text: 'the ' + archivo.name + ' is not a valid csv file.',
                            icon: 'error'
                        });
                    } else {
                        csvValido = true;
                        console.log('Selected CSV file:', archivo);
                        // Restart and hide previous validation messages
                        $('.form-group').removeClass('has-error');
                        $('.invalid-feedback').hide();

                        /*Swal.fire({
                            title: 'Sucess',
                            text: 'The ' + archivo.name + ' is a valid csv file.',
                            icon: 'success'
                        });*/

                    }
                }
                else {
                    csvValido = false;
                    Swal.fire({
                        title: 'Error',
                        text: 'the ' + archivo.name + ' is not a valid csv file.',
                        icon: 'error'
                    });
                }
                data = results.data;
                console.log(results.data);
            }
        });
    }

}


function verificarInputs() {
    if (csvValido) {
        formValido = true;
        // Restart and hide previous validation messages
        $('.form-group').removeClass('has-error');
        $('.invalid-feedback').hide();


        // Check fields
        $('input, textarea').each(function () {
            // Verify in the field is empty
            if ($(this).val().trim() === '') {
                formValido = false;
                $(this).closest('.form-group').addClass('has-error');
                $(this).siblings('.invalid-feedback').show();
            }
        });

        if (formValido) {
            processCSVFile();
            $('#myModal').modal('hide');
        }
    }
}