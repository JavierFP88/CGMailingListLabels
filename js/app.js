var data=null;
var formValido = true;
var csvValido = true;

$(document).ready(function () {

    $('#modalButton').on('click', function (e) {
        $('#myModal').modal('show');

    });

    $('.close').on('click', function (e) {
        $('#myModal').modal('hide');
    }); 
    
    $('#notifyButton').on('click', function (e) {
        verificarInputs();
    });

    $('#csvInput').on('change', function (e) {      
        verifyCSVInput();
    });    

});
