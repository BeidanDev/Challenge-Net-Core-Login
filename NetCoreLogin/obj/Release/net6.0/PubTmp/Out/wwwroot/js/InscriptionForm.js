function SetUpValidationRules() { // No van a ser obligatorios por ahora

    jQuery.validator.addMethod("PostalCode", function (value, element) {
        return this.optional(element) || /^[\w\s\-]*$/i.test(value);
    }, "");

    //$("#txtProgramCode").rules("add", { required: true, messages: { required: "Por favor seleccione un programa." } });
    //$("#txtPeriodoIngreso").rules("add", { required: true, messages: { required: "Por favor seleccione un período de ingreso." } });
    //$("#txtName").rules("add", { required: true, messages: { required: "Por favor ingrese su/s nombre/s." } });
    //$("#txtLastNamePaterno").rules("add", { required: true, messages: { required: "Por favor ingrese su primer apellido." } });
    //$("#txtCountry").rules("add", { required: true, messages: { required: "Por favor seleccione su nacionalidad." } });
    //$("#txtPaisNacimiento").rules("add", { required: true, messages: { required: "Por favor seleccione su país de nacimiento." } });
    //$("#txtSexo").rules("add", { required: true, messages: { required: "Por favor seleccione su sexo." } });
    //$("#txtBirthday").rules("add", { required: true, messages: { required: "Por favor seleccione su fecha de nacimiento." } });
    //$("#txtTipoDocumento").rules("add", { required: true, messages: { required: "Por favor seleccione su tipo de documento." } });
    //$("#txtNoDoc").rules("add", { required: true, messages: { required: "Por favor introduzca un número de documento." } });
    //$("#txtAddress").rules("add", { required: true, messages: { required: "Por favor ingrese su dirección de residencia." } });
    //$("#txtPais").rules("add", { required: true, messages: { required: "Por favor seleccione su país de residencia." } });
    //$("#txtEstado").rules("add", { required: true, messages: { required: "Por favor seleccione su estado de residencia." } });
    //$("#txtCiudad").rules("add", { required: true, messages: { required: "Por favor seleccione su ciudad de residencia." } });
    //$("#txtEstadoTexto").rules("add", { required: true, messages: { required: "Por favor ingrese su estado de residencia." } });
    //$("#txtCiudadTexto").rules("add", { required: true, messages: { required: "Por favor ingrese su ciudad de residencia." } });
    //$("#txtCodigoPostal").rules("add", { required: true, PostalCode: true, messages: { required: "Por favor ingrese su Código Postal.", PostalCode: "Caracteres inválidos." } });
    //$("#txtMovil").rules("add", { required: true, maxlength: 14, minlength: 10, messages: { required: "Por favor introduzca un teléfono móvil.", maxlength: "Se requieren no más de 14 dígitos.", minlength: "Se necesitan al menos 10 dígitos." } });
    //$("#txtTelefono").rules("add", { /*required: true, */maxlength: 14, /*minlength: 10, */messages: { /*required: "Por favor introduzca un teléfono de residencia.", */maxlength: "Se requieren no más de 14 dígitos."/*, minlength: "Se necesitan al menos 10 dígitos."*/ } });
    //$("#txtSituacionLaboral").rules("add", { required: true, messages: { required: "Por favor seleccione su situación laboral." } });
    //$("#txtEmail").rules("add", { required: true, email: true, messages: { required: "Por favor introduzca un correo electrónico válido.", email: "Por favor introduzca un correo electrónico válido." } });
    //$("#txtPass").rules("add", { required: true, minlength: 8, messages: { required: "Por favor introduzca su clave de acceso.", minlength: "Su clave debe tener al menos 8 dígitos." } });
    //$("#txtPassConfirm").rules("add", { required: true, minlength: 8, equalTo: "#txtPass", messages: { required: "Por favor confirme su clave de acceso.", minlength: "Por favor confirme su clave de acceso.", equalTo: "No coincide con la clave anterior." } });
    //$("#requestPolit").rules("add", { required: true, messages: { required: "Debe aceptar nuestra política de privacidad." } });
    //$("#requestTerms").rules("add", { required: true, messages: { required: "Debe aceptar nuestros términos y condiciones." } });
    //$("#requestcertification").rules("add", { required: true, messages: { required: "Debe aceptar la certificación de información." } });
    //$("#requestInformacionEducacion").rules("add", { required: true, messages: { required: "Debe aceptar la notificación de admisión incondicional." } });
}

function ChangeValidationRulesForIndiaPhones(CountryCode, FieldID, MaxLength) {
    if (CountryCode == 'in') {
        $(FieldID).attr('maxlength', MaxLength);
        $(FieldID).rules('remove', 'minlength');
        $(FieldID).rules('remove', 'maxlength');

        $(FieldID).rules("add",
            {
                minlength: MaxLength,
                maxlength: MaxLength,
                messages:
                {
                    minlength: MaxLength + " digits are required.",
                    maxlength: MaxLength + " digits are required."
                }
            });
    }
    else {
        $(FieldID).attr('maxlength', '14');
        $(FieldID).rules('remove', 'minlength');
        $(FieldID).rules('remove', 'maxlength');

        $(FieldID).rules("add",
            {
                minlength: 10,
                maxlength: 14,
                messages:
                {
                    minlength: "Se requieren al menos 10 dígitos.",
                    maxlength: "No more than 14 digits are required."
                }
            });
    }
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
        }
    });
});

function SetResponse(originalText, status, description) {
    var response = '';
    if (status == 'OK') {
        response += '<div class="alert alert-success alert-dismissible fade show" role="alert">';
        response += '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        response += '  <strong>OK: </strong> ' + description;
        response += '</div>';
    }
    else {
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
        inscriptoData.Residence = $('#txtResidence').val();
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