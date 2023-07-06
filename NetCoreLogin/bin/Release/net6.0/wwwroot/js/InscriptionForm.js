function SetUpValidationRules() {

    jQuery.validator.addMethod("PostalCode", function (value, element) {
        return this.optional(element) || /^[\w\s\-]*$/i.test(value);
    }, "");

    $("#txtMothersName").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtFathersName").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCommunity").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtGender").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtGovernmentIdProof").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtBirthday").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtFullAddress").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtPinCode").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtPais").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtEstado").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCiudad").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtEstadoTexto").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCiudadTexto").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCitizenship").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtWorkExperience").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtWorkExperienceQuantity").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtWorkExperienceUnity").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCurrentlyEmployed").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCurrentOrganizationName").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtCurrentDesignation").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtMostRecentExperience").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtMostRecentOrganizationName").rules("add", { required: true, messages: { required: "Required." } });
    $("#txtMostRecentDesignation").rules("add", { required: true, messages: { required: "Required." } });
}

$(document).ready(function () {

    var validator = $("#InscriptionForm").validate(
        {
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('fieldError');
            },
            unhighlight: function (element, errorField, validClass) {
                $(element).removeClass('fieldError');
            }
        });

    if ($('#InscriptionForm').length != 0) {
        SetUpValidationRules();
    }

    $('#txtMovil').focus(function () {
        $(this).keydown(function (event) {
            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    });

    $('#txtTelefono').focus(function () {
        $(this).keydown(function (event) {
            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                // Allow: Ctrl+A
                (event.keyCode == 65 && event.ctrlKey === true) ||
                // Allow: home, end, left, right
                (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                    event.preventDefault();
                }
            }
        });
    });

    $('#btnRequestInfo').click(function () //When clicked the following code runs.
    {
        var originalText = $('#btnRequestInfo').html();
        $('#btnRequestInfo').html('PLEASE WAIT...').attr('disabled', true);
        $('#divRequestInfo').html('');

        var validator = $("#InscriptionForm").validate();
        var response = '';

        if (validator.form()) {
            var student = GetInscriptoData();

            if (student) {
                try {
                    $.ajax({
                        type: 'POST',
                        url: $('#txtStudentPortalUrl').val() + '/ajax/updateinscriptos',
                        dataType: 'json',
                        async: true,
                        data: student
                    }).done(function (data) {
                        SetResponse(originalText, data.status, data.description);
                    }).fail(function (xhr, textStatus, errorThrown) {
                        var error = '';
                        if (xhr.status != 200) {
                            if (errorThrown === "") {
                                error = 'No se pudo realizar esta operación.';
                            } else {
                                error = errorThrown;
                            }
                        }
                        SetResponse(originalText, 'Error', error);
                    });
                }
                catch (error) {
                    SetResponse(originalText, 'Error', error);
                }
            }
        }
        else {
            validator.focusInvalid();
            SetResponse(originalText, '', '');
        }
    });
});

function SetResponse(originalText, status, description) {
    var response = '';
    if (status == 'OK') {
        if (description == '') description = 'Record updated successfully.';
        response += '<div class="alert alert-success alert-dismissible fade show" role="alert">';
        response += '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        response += '  <strong>OK: </strong> ' + description;
        response += '</div>';
    }
    else if (status == 'ERROR') {
        if (description == '') description = 'An error has occurred.';
        response += '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
        response += '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        response += '  <strong>Error: </strong> ' + description;
        response += '</div>';
    }
    $('#divRequestInfo').html(response);
    $('#btnRequestInfo').html(originalText).removeAttr('disabled');
}

function GetInscriptoData() {
    try {
        var inscriptoData = {};

        inscriptoData.Birthday = $('#txtBirthday').val();
        inscriptoData.Citizenship = $('#txtCitizenship').val();
        inscriptoData.Ciudad = $('#txtCiudad').val();
        inscriptoData.CiudadTexto = $('#txtCiudadTexto').val();
        inscriptoData.Community = $('#txtCommunity').val();
        inscriptoData.CurrentDesignation = $('#txtCurrentDesignation').val();
        inscriptoData.CurrentlyEmployed = $('#txtCurrentlyEmployed').val();
        inscriptoData.CurrentOrganizationName = $('#txtCurrentOrganizationName').val();
        inscriptoData.Estado = $('#txtEstado').val();
        inscriptoData.EstadoTexto = $('#txtEstadoTexto').val();
        inscriptoData.FathersName = $('#txtFathersName').val();
        inscriptoData.FullAddress = $('#txtFullAddress').val();
        inscriptoData.Gender = $('#txtGender').val();
        inscriptoData.GovernmentIdProof = $('#txtGovernmentIdProof').val();
        inscriptoData.MostRecentDesignation = $('#txtMostRecentDesignation').val();
        inscriptoData.MostRecentExperience = $('#txtMostRecentExperience').val();
        inscriptoData.MostRecentOrganizationName = $('#txtMostRecentOrganizationName').val();
        inscriptoData.MothersName = $('#txtMothersName').val();
        inscriptoData.Pais = $('#txtPais').val();
        inscriptoData.PinCode = $('#txtPinCode').val();
        inscriptoData.WorkExperience = $('#txtWorkExperience').val();
        inscriptoData.WorkExperienceQuantity = $('#txtWorkExperienceQuantity').val();
        inscriptoData.WorkExperienceUnity = $('#txtWorkExperienceUnity').val();

        inscriptoData.AntecedentesAcademicos = JSON.stringify(GetAntecedentesAcademicos());

        return inscriptoData;
    }
    catch (e) {
        alert('Error in GetInscriptoData(): ' + e);
    }
}

function GetAntecedentesAcademicos() {
    var antecedentesAcademicos = [];

    var count = $("#informacionEducativa").children().length;
    for (var i = 1; i <= count; i++) {
        antecedentesAcademicos.push({
            "CiudadEstudio": $('#txtCiudadEstudio' + i).val(),
            "CiudadEstudioTexto": $('#txtCiudadEstudioTexto' + i).val(),
            "EstadoEstudio": $('#txtEstadoEstudio' + i).val(),
            "EstadoEstudioTexto": $('#txtEstadoEstudioTexto' + i).val(),
            "FechaEntregaDiploma": $('#txtFechaEntregaDiploma' + i).val(),
            "NivelEducativo": $('#txtNivelEducativo' + i).val(),
            "NombreColegio": $('#txtNombreColegio' + i).val(),
            "PaisEstudio": $('#txtPaisEstudio' + i).val(),
            "Promedio": $('#txtPromedio' + i).val()
        });
    };

    return antecedentesAcademicos;
}