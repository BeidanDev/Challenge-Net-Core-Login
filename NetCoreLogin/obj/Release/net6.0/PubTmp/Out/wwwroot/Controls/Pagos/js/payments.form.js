function CardValidationRules() {

    $('#card_name').rules('add',
        {
            required: true,
            minlength: 3,
            maxlength: 100,
            messages:
            {
                required: 'Ingresa los nombres y apellidos tal como aparecen en la tarjeta de crédito.',
                minlength: 'Ingresa al menos 3 caracteres.',
                maxlength: 'Ingresa no más de 100 caracteres.'
            }
        });

    $('#card_number').rules('add',
        {
            required: true,
            minlength: 17,
            maxlength: 24,
            messages:
            {
                required: 'Ingresa el número que aparece en la tarjeta de crédito.',
                minlength: 'El número ingresado es inválido.',
                maxlength: 'El número ingresado es inválido.'
            }
        });

    $('#card_month').rules('add',
        {
            required: true,
            messages:
            {
                required: 'Selecciona el mes de vencimiento de la tarjeta de crédito.'
            }
        });

    $('#card_year').rules('add',
        {
            required: true,
            messages:
            {
                required: 'Selecciona el año de vencimiento de la tarjeta de crédito.'
            }
        });

    $('#card_ccv').rules('add',
        {
            required: true,
            minlength: 3,
            maxlength: 4,
            messages:
            {
                required: 'Ingresa el código de seguridad de la tarjeta.',
                minlength: 'Ingresa al menos 3 dígitos.',
                maxlength: 'Ingresa no más de 4 dígitos.'
            }
        });

    $('#card_doc').rules('add',
        {
            required: true,
            minlength: 4,
            maxlength: 20,
            messages:
            {
                required: 'Ingresa el número de documento del propietario de la tarjeta',
                minlength: 'Ingresa al menos 4 caracteres.',
                maxlength: 'Ingresa no más de 20 caracteres.'
            }
        });

    $('#card_phone').rules('add',
        {
            required: true,
            minlength: 10,
            maxlength: 14,
            messages:
            {
                required: 'Ingresa el número de teléfono del dueño de la tarjeta de crédito.',
                minlength: 'Ingresa al menos 10 dígitos.',
                maxlength: 'Ingresa no más de 14 dígitos.'
            }
        });
}

function DebiValidationRules() {

    $('#debi_bank').rules('add',
        {
            required: true,
            messages:
            {
                required: 'Selecciona el banco al que pertenece la cuenta bancaria.'
            }
        });

    $('#debi_name').rules('add',
        {
            required: true,
            minlength: 3,
            maxlength: 100,
            messages:
            {
                required: 'Ingresa los nombres y apellidos del titular de la cuenta bancaria.',
                minlength: 'Ingresa al menos 3 caracteres.',
                maxlength: 'Ingresa no más de 100 caracteres.'
            }
        });

    $('#debi_type_user').rules('add',
        {
            required: true,
            messages:
            {
                required: 'Selecciona el tipo de cliente titular de la cuenta bancaria.'
            }
        });

    $('#debi_type_doc').rules('add',
        {
            required: true,
            messages:
            {
                required: 'Selecciona el tipo de documento del titular de la cuenta bancaria.'
            }
        });

    $('#debi_doc').rules('add',
        {
            required: true,
            minlength: 4,
            maxlength: 20,
            messages:
            {
                required: 'Ingresa el número de documento del titular de la cuenta bancaria.',
                minlength: 'Ingresa al menos 4 caracteres.',
                maxlength: 'Ingresa no más de 20 caracteres.'
            }
        });

    $('#debi_phone').rules('add',
        {
            required: true,
            minlength: 10,
            maxlength: 14,
            messages:
            {
                required: 'Ingresa el número de teléfono del titular de la cuenta bancaria.',
                minlength: 'Ingresa al menos 10 dígitos.',
                maxlength: 'Ingresa no más de 14 dígitos.'
            }
        });
}

function PaymentMethods(type) {

    $('div.col-method-payments').slideUp();
    $('a.a-method-payments svg').removeClass('fa-minus-square');
    $('a.a-method-payments svg').addClass('fa-plus-square');
    $('a.a-method-payments').css('font-weight', 'normal');

    if ($('input#current_accordion').val() === '') {
        setTimeout(function () {
            $('div.col-method-payments.col-method-' + type).slideDown();
            $('a.a-method-payments.a-method-' + type + ' svg').removeClass('fa-plus-square');
            $('a.a-method-payments.a-method-' + type + ' svg').addClass('fa-minus-square');
            $('a.a-method-payments.a-method-' + type).css('font-weight', 'bold');
        }, 0);
        $('input#current_accordion').val(type);
    }
    else {
        if ($('input#current_accordion').val() !== type) {
            setTimeout(function () {
                $('div.col-method-payments.col-method-' + type).slideDown();
                $('a.a-method-payments.a-method-' + type + ' svg').removeClass('fa-plus-square');
                $('a.a-method-payments.a-method-' + type + ' svg').addClass('fa-minus-square');
                $('a.a-method-payments.a-method-' + type).css('font-weight', 'bold');
            }, 400);
            $('input#current_accordion').val(type);
        } else {
            $('input#current_accordion').val('');
        }
    }

}

function PaymentMethod(type, method) {

    $('img.method_payment').removeClass('active');

    if (type !== $('input#current_type').val()) {
        $('input#current_type').val(type);
        $('div.method_div_hide').slideUp(); // slideUp()
        $('div.method_div_hide.method_div_' + type).slideDown(); // slideDown()
    }

    if (method !== $('input#current_method').val()) {
        $('input#current_method').val(method);
        $('div.method_div_hide.method_div_' + type).slideDown(); // slideDown()
        $('img.method_payment.' + method).addClass('active');
    }
    else {
        $('input#current_method').val('');
        $('div.method_div_hide').slideUp(); // slideUp()
        type = '';
    }

    if (type === 'card') {
        if (method === 'amex') {
            $('input#card_ccv').attr('maxlength', 4);
            $('input#card_ccv').attr('placeholder', '0000');
        }
        else {
            $('input#card_ccv').attr('maxlength', 3);
            $('input#card_ccv').attr('placeholder', '000');
        }

        $('div.credit_card').fadeIn();
        var studentportalurl = $('#' + type + '_studentportalurl').val();
        $('div.credit_card_method').css('background', 'url(' + studentportalurl + '"/controls/pagos/img/method_' + method + '.png") no-repeat center center');
        $('div.credit_card_method').css('background-size', '100% 100%');
    }
    else {
        $('div.credit_card').fadeOut();
        $('div.credit_card_method').css('background', 'none');
    }

    $('input#' + type + '_method').val(method);

    $('span.' + type + '_name').html($('img.method_payment.' + method).attr('data-name'));

}

function TokenAction(action, tokenid, cuotaid) {

    $('#token_message').html('');

    var original = $('.' + action + tokenid).get(0).outerHTML;

    var html = '';
    html += '<span class="' + action + tokenid + '">';
    html += $('.' + action + tokenid).html();
    html += ' <i class="fa fa-spinner"></i>';
    html += '</span >';
    $('.' + action + tokenid).replaceWith($(html));

    var Data = {};
    Data.action = action;
    Data.tokenid = tokenid;
    Data.cuotaid = cuotaid;

    var response = '';

    try {
        var studentportalurl = $('#token_studentportalurl').val();
        $.ajax(
            {
                type: 'POST',
                url: studentportalurl + '/metodos',
                dataType: 'json',
                async: true,
                data: Data
            }).done(function (data) {
                data = $.parseJSON(data);
                if (data.Mensaje.startsWith('OK')) {
                    setTimeout(function () { window.location.reload(); }, 2000);
                    response = '<div class="alert alert-success" style="margin: 8px 0 10px 0;">' + data.Mensaje.replace('OK. ', '') + '</div>';
                    $('#token_message').html(response);
                }
                else {
                    response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + data.Mensaje + '</div>';
                    $('#token_message').html(response);
                    $('.' + action + tokenid).replaceWith($(original));
                }
            }).fail(function (xhr, textStatus, errorThrown) {
                response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + xhr.responseText + '</div>';
                $('#token_message').html(response);
                $('.' + action + tokenid).replaceWith($(original));
            });
    }
    catch (e) {
        response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + e + '</div>';
        $('#token_message').html(response);
        $('.' + action + tokenid).replaceWith($(original));
    }

}

String.prototype.toCardFormat = function () {
    return this.replace(/[^0-9]/g, "").substr(0, 20).split("").reduce(cardFormat, "");
    function cardFormat(str, l, i) {
        return str + (!i || i % 4 ? "" : " ") + l;
    }
};

$(document).ready(function () {

    $('.credit_card_number').html('**** **** **** ****');
    $('.credit_card_date').html('00 / 00');
    $('.credit_card_name').html($('#card_name').val());

    $('#card_number').keyup(function () {
        if ($('#card_number').val() !== '') {
            $(this).val($(this).val().toCardFormat());
            $('.credit_card_number').html($('#card_number').val());
        } else {
            $('.credit_card_number').html('**** **** **** ****');
        }
    });

    $('#card_month').change(function () {
        var card_month = '00';
        var card_year = '00';
        if ($('#card_month').val() !== '') card_month = $('#card_month').val();
        if ($('#card_year').val() !== '') card_year = $('#card_year').val();
        $('.credit_card_date').html(card_month + ' / ' + card_year);
    });

    $('#card_year').change(function () {
        var card_month = '00';
        var card_year = '00';
        if ($('#card_month').val() !== '') card_month = $('#card_month').val();
        if ($('#card_year').val() !== '') card_year = $('#card_year').val();
        $('.credit_card_date').html(card_month + ' / ' + card_year);
    });

    $('#card_name').keyup(function () {
        if ($('#card_name').val() !== '') {
            $('.credit_card_name').html($('#card_name').val());
        } else {
            $('.credit_card_name').html('Nombre en la tarjeta');
        }
    });

    $('#card_phone').keyup(function () {
        if ($('#card_phone').val() === '') {
            $('#card_phone_country').val('');
        }
    });

    $('#card_number').focus(function () {
        $(this).keydown(function (event) {
            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || event.keyCode === 13 ||
                // Allow: Ctrl+A
                (event.keyCode === 65 && event.ctrlKey === true) ||
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

    $('#card_ccv').focus(function () {
        $(this).keydown(function (event) {
            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || event.keyCode === 13 ||
                // Allow: Ctrl+A
                (event.keyCode === 65 && event.ctrlKey === true) ||
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

    $('#card_phone').focus(function () {
        $(this).keydown(function (event) {
            // Allow: backspace, delete, tab, escape, and enter
            if (event.keyCode === 46 || event.keyCode === 8 || event.keyCode === 9 || event.keyCode === 27 || event.keyCode === 13 ||
                // Allow: Ctrl+A
                (event.keyCode === 65 && event.ctrlKey === true) ||
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

    $('#card_form').validate(
        {
            highlight: function (element) {
                $(element).addClass('fieldError');
            },
            unhighlight: function (element) {
                $(element).removeClass('fieldError');
            }
        });

    if ($('#card_form').length !== 0) {
        CardValidationRules();
    }

    $('#debi_form').validate(
        {
            highlight: function (element) {
                $(element).addClass('fieldError');
            },
            unhighlight: function (element) {
                $(element).removeClass('fieldError');
            }
        });

    if ($('#debi_form').length !== 0) {
        DebiValidationRules();
    }

    $('.chk_privacy').click(function () {

        var id_privacy = '#' + $(this).attr('id');
        var id_checkout = '#' + $(this).attr('id').replace('privacy', 'checkout');

        if ($(id_privacy).is(':checked') && $('#card_remember').is(':checked')) {
            $(id_checkout).attr('disabled', false);
        } else {
            $(id_checkout).attr('disabled', true);
        }

    });

    $('#card_remember').click(function () {

        if ($('#card_privacy').is(':checked') && $('#card_remember').is(':checked')) {
            $('#card_checkout').attr('disabled', false);
        } else {
            $('#card_checkout').attr('disabled', true);
        }

    });

    $('.btn_checkout').click(function () {

        var id_checkout = '#' + $(this).attr('id');
        var id_privacy = '#' + $(this).attr('id').replace('checkout', 'privacy');
        var type = $(this).attr('id').replace('_checkout', '');

        var originalText = $(id_checkout).html();
        $(id_checkout).attr('disabled', true);
        $(id_privacy).attr('disabled', true);
        $('#card_remember').attr('disabled', true);
        $('#' + type + '_message').html('');

        if (type.startsWith('token_')) {
            $(id_checkout).html('Espere...');
            $('#token_id').val(type.replace('token_', ''));
            type = 'token';
        } else {
            $(id_checkout).html('Por favor espere...');
        }

        var response = '';
        var validator = $('#' + type + '_form').validate();
        if (validator.form()) {

            if (type == 'card') { // Fix Nico Agosto 2020

                var mensaje = '¿Desea recordar sus datos para futuros pagos con SNHU y debitar automáticamente mis vencimientos de mi tarjeta de crédito o débito?';
                if ($("#card_remember").is(':checked')) {
                    mensaje = 'Recordar mis datos para futuros pagos con SNHU y debitar automáticamente mis vencimientos de mi tarjeta de crédito o débito.';
                }

                bootbox.confirm({
                    message: mensaje,
                    buttons: {
                        cancel: {
                            className: 'bg-white link text-danger',
                            label: 'Cancelar'
                        },
                        confirm: {
                            className: 'btn-custom btn-md',
                            label: 'Aceptar'
                        }
                    },
                    backdrop: true,
                    callback: function (result) {
                        if (result == true) {
                            //if (result) {
                            //    $("#card_remember").prop('checked', true);
                            //} else {
                            //    $("#card_remember").prop('checked', false);
                            //}
                            /* Envío Form */
                            var form = GetJsonData(type);
                            form.card = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(form.card), CryptoJS.enc.Utf8.parse('Start-University'),
                                {
                                    keySize: 128 / 8,
                                    iv: CryptoJS.enc.Utf8.parse('8080808080808080'),
                                    mode: CryptoJS.mode.CBC,
                                    padding: CryptoJS.pad.Pkcs7
                                }).toString();

                            if (form) {
                                try {
                                    var studentportalurl = $('#' + type + '_studentportalurl').val();
                                    $.ajax({
                                        type: 'POST',
                                        url: studentportalurl + '/procesarpago',
                                        dataType: 'json',
                                        async: true,
                                        data: form
                                    }).done(function (data) {
                                        data = $.parseJSON(data);
                                        if (data.Mensaje.startsWith('APPROVED') || data.Mensaje.startsWith('PENDING') || data.Mensaje.startsWith('REDIRECT')) {
                                            var mensaje;

                                            if (data.Mensaje.startsWith('APPROVED')) {
                                                $(id_checkout).html('Exitoso!');
                                                mensaje = 'Su pago ha sido aprobado. En 5 segundos será redirigido a la sección principal.';
                                                setTimeout(function () { window.location.href = '/estudiantes'; }, 5000);
                                            }

                                            if (data.Mensaje.startsWith('PENDING')) {
                                                $(id_checkout).html(originalText);
                                                mensaje = data.Mensaje.replace('PENDING. ', '');
                                            }

                                            if (data.Mensaje.startsWith('REDIRECT')) {
                                                var url = data.Mensaje.replace('REDIRECT. ', '');
                                                url = url.substring(0, url.length - 1);
                                                window.location.replace(url);
                                            }

                                            if (!data.Mensaje.startsWith('REDIRECT')) {
                                                response = '<div class="alert alert-success" style="margin: 8px 0 10px 0;">' + mensaje + '</div>';
                                                $('#' + type + '_message').html(response);
                                            }
                                        }
                                        else {
                                            $(id_checkout).html(originalText);
                                            $(id_checkout).attr('disabled', false);
                                            $(id_privacy).attr('disabled', false);
                                            $('#card_remember').attr('disabled', false);
                                            response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + data.Mensaje + '</div>';
                                            $('#' + type + '_message').html(response);
                                        }
                                    }).fail(function (xhr, textStatus, errorThrown) {
                                        $(id_checkout).html(originalText);
                                        $(id_checkout).attr('disabled', false);
                                        $(id_privacy).attr('disabled', false);
                                        $('#card_remember').attr('disabled', false);
                                        if (xhr.status == 200) {
                                            response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + xhr.responseText + '</div>';
                                        } else {
                                            response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">Ocurrió un error inesperado. Intente nuevamente más tarde.</div>';
                                        }
                                        $('#' + type + '_message').html(response);
                                    });
                                }
                                catch (e) {
                                    $(id_checkout).html(originalText);
                                    $(id_checkout).attr('disabled', false);
                                    $(id_privacy).attr('disabled', false);
                                    $('#card_remember').attr('disabled', false);
                                    response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + e + '</div>';
                                    $('#' + type + '_message').html(response);
                                }
                            }
                            /* Envío Form */
                        }
                        else {
                            $(id_checkout).html(originalText);
                            $(id_checkout).attr('disabled', false);
                            $(id_privacy).attr('disabled', false);
                            $('#card_remember').attr('disabled', false);
                        }
                    }
                });
            }
            else {

                /* Envío Form */
                var form = GetJsonData(type);

                if (type == 'token') {
                    form.token = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(form.token), CryptoJS.enc.Utf8.parse('Start-University'),
                        {
                            keySize: 128 / 8,
                            iv: CryptoJS.enc.Utf8.parse('8080808080808080'),
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7
                        }).toString();
                }

                if (form) {
                    try {
                        var studentportalurl = $('#' + type + '_studentportalurl').val();
                        $.ajax({
                            type: 'POST',
                            url: studentportalurl + '/procesarpago',
                            dataType: 'json',
                            async: true,
                            data: form
                        }).done(function (data) {
                            data = $.parseJSON(data);
                            if (data.Mensaje.startsWith('APPROVED') || data.Mensaje.startsWith('PENDING') || data.Mensaje.startsWith('REDIRECT')) {
                                var mensaje;

                                if (data.Mensaje.startsWith('APPROVED')) {
                                    $(id_checkout).html('Exitoso!');
                                    mensaje = 'Su pago ha sido aprobado. En 5 segundos será redirigido a la sección principal.';
                                    setTimeout(function () { window.location.href = '/estudiantes'; }, 5000);
                                }

                                if (data.Mensaje.startsWith('PENDING')) {
                                    $(id_checkout).html(originalText);
                                    mensaje = data.Mensaje.replace('PENDING. ', '');
                                }

                                if (data.Mensaje.startsWith('REDIRECT')) {
                                    var url = data.Mensaje.replace('REDIRECT. ', '');
                                    url = url.substring(0, url.length - 1);
                                    window.location.replace(url);
                                }

                                if (!data.Mensaje.startsWith('REDIRECT')) {
                                    response = '<div class="alert alert-success" style="margin: 8px 0 10px 0;">' + mensaje + '</div>';
                                    $('#' + type + '_message').html(response);
                                }
                            }
                            else {
                                $(id_checkout).html(originalText);
                                $(id_checkout).attr('disabled', false);
                                $(id_privacy).attr('disabled', false);
                                response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + data.Mensaje + '</div>';
                                $('#' + type + '_message').html(response);
                            }
                        }).fail(function (xhr, textStatus, errorThrown) {
                            $(id_checkout).html(originalText);
                            $(id_checkout).attr('disabled', false);
                            $(id_privacy).attr('disabled', false);
                            $('#card_remember').attr('disabled', false);
                            if (xhr.status == 200) {
                                response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + xhr.responseText + '</div>';
                            } else {
                                response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">Ocurrió un error inesperado. Intente nuevamente más tarde.</div>';
                            }
                            $('#' + type + '_message').html(response);
                        });
                    }
                    catch (e) {
                        $(id_checkout).html(originalText);
                        $(id_checkout).attr('disabled', false);
                        $(id_privacy).attr('disabled', false);
                        $('#card_remember').attr('disabled', false);
                        response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + e + '</div>';
                        $('#' + type + '_message').html(response);
                    }
                }
                /* Envío Form */

            }
        }
        else {
            $(id_checkout).html(originalText);
            $(id_checkout).attr('disabled', false);
            $(id_privacy).attr('disabled', false);
            $('#card_remember').attr('disabled', false);
            validator.focusInvalid();
        }
    });

    var countryData = window.intlTelInputGlobals.getCountryData();
    input = document.querySelector("#card_phone");
    addressDropdown = document.querySelector("#card_phone_country");

    $.get("https://ipinfo.io/json?token=19ee9d8cc6ef4b", function (response) {
        var DefaultCountry = response.country.toLowerCase();

        var iti = window.intlTelInput(input, {
            initialCountry: DefaultCountry,
            countryCode: DefaultCountry,
            nationalMode: false,
            autoHideDialCode: false,
            separateDialCode: false,
            preferredCountries: ["ar", "bz", "bo", "cl", "co", "cr", "cu", "ec", "sv", "es", "gt", "hn", "mx", "ni", "pa", "py", "pe", "pr", "do", "uy", "ve"]
        });

        for (var i = 0; i < countryData.length; i++) {
            var country = countryData[i];
            var optionNode = document.createElement("option");
            optionNode.value = country.iso2;
            var textNode = document.createTextNode(country.name);
            optionNode.appendChild(textNode);
            addressDropdown.appendChild(optionNode);
        }

        addressDropdown.value = iti.getSelectedCountryData().iso2;

        input.addEventListener('countrychange', function () {
            addressDropdown.value = iti.getSelectedCountryData().iso2;
        });

        addressDropdown.addEventListener('change', function () {
            iti.setCountry(this.value);
        });

    }, "json");

});

function GetData(type) {
    try {
        var Data = {};

        Data.type = type;
        Data.method = $('#' + type + '_method').val();
        Data.cuotaid = $('#' + type + '_cuotaid').val();

        if (type === 'card') {
            Data.card_name = $('#card_name').val();
            Data.card_number = $('#card_number').val();
            Data.card_month = $('#card_month').val();
            Data.card_year = $('#card_year').val();
            Data.card_ccv = $('#card_ccv').val();
            Data.card_doc = $('#card_doc').val();
            Data.card_phone = $('#card_phone').val();

            if ($('#card_remember').is(':checked')) {
                Data.card_remember = 1;
            } else {
                Data.card_remember = 0;
            }
        }

        if (type === 'cash') {
            /* CO */
            if (Data.method === 'pagatodo') Data.method = 'OTHERS_CASH';
            if (Data.method === 'apuestas_cucuta') Data.method = 'OTHERS_CASH';
            if (Data.method === 'gana') Data.method = 'OTHERS_CASH';
            if (Data.method === 'gana_gana') Data.method = 'OTHERS_CASH';
            if (Data.method === 'suchance') Data.method = 'OTHERS_CASH';
            if (Data.method === 'acertemos') Data.method = 'OTHERS_CASH';
            if (Data.method === 'laperla') Data.method = 'OTHERS_CASH';
            if (Data.method === 'apuestas_unidas') Data.method = 'OTHERS_CASH';
            if (Data.method === 'jer') Data.method = 'OTHERS_CASH';
            /* MX */
            if (Data.method === 'farmacias_ahorro') Data.method = 'OTHERS_CASH_MX';
            if (Data.method === 'farmacias_benavides') Data.method = 'OTHERS_CASH_MX';
            /* CL */
            if (Data.method === 'multicaja') Data.method = 'MULTICAJA';
            /* PE */
            if (Data.method === 'bcp') Data.method = 'BCP';
            if (Data.method === 'pagoefectivo') Data.method = 'PAGOEFECTIVO';
        }

        if (type === 'bank') {
            Data.method = 'BANK_REFERENCED';
        }

        if (type === 'token') {
            Data.token_id = $('#token_id').val();
        }

        if (type === 'debi') {
            Data.debi_bank = $('#debi_bank').val();
            Data.debi_name = $('#debi_name').val();
            Data.debi_type_user = $('#debi_type_user').val();
            Data.debi_type_doc = $('#debi_type_doc').val();
            Data.debi_doc = $('#debi_doc').val();
            Data.debi_phone = $('#debi_phone').val();
        }

        if (type === 'tran') {
            /* CL */
            if (Data.method === 'transbank') Data.method = 'TRANSBANK_DEBIT';
        }

        return Data;
    }
    catch (e) {
        alert('Error in GetData(): ' + e);
    }
}

function GetJsonData(type) {
    try {

        var Data = {};
        Data.type = type;
        Data.method = $('#' + type + '_method').val();
        Data.cuotaid = $('#' + type + '_cuotaid').val();

        if (type === 'card') {
            rp = {
                card_name : $('#card_name').val(),
                card_number : $('#card_number').val(),
                card_month : $('#card_month').val(),
                card_year : $('#card_year').val(),
                card_ccv : $('#card_ccv').val(),
                card_doc : $('#card_doc').val(),
                card_phone: $('#card_phone').val(),
                card_remember: $('#card_remember').is(':checked')
            };
            Data['card'] = JSON.stringify(rp);
        }

        if (type === 'cash') {
            /* CO */
            if (Data.method === 'pagatodo') Data.method = 'OTHERS_CASH';
            if (Data.method === 'apuestas_cucuta') Data.method = 'OTHERS_CASH';
            if (Data.method === 'gana') Data.method = 'OTHERS_CASH';
            if (Data.method === 'gana_gana') Data.method = 'OTHERS_CASH';
            if (Data.method === 'suchance') Data.method = 'OTHERS_CASH';
            if (Data.method === 'acertemos') Data.method = 'OTHERS_CASH';
            if (Data.method === 'laperla') Data.method = 'OTHERS_CASH';
            if (Data.method === 'apuestas_unidas') Data.method = 'OTHERS_CASH';
            if (Data.method === 'jer') Data.method = 'OTHERS_CASH';
            /* MX */
            if (Data.method === 'farmacias_ahorro') Data.method = 'OTHERS_CASH_MX';
            if (Data.method === 'farmacias_benavides') Data.method = 'OTHERS_CASH_MX';
            /* CL */
            if (Data.method === 'multicaja') Data.method = 'MULTICAJA';
            /* PE */
            if (Data.method === 'bcp') Data.method = 'BCP';
            if (Data.method === 'pagoefectivo') Data.method = 'PAGOEFECTIVO';
        }

        if (type === 'bank') {
            Data.method = 'BANK_REFERENCED';
        }

        if (type === 'token') {
            rp = {
                token_id : $('#token_id').val()
            };
            Data['token'] = JSON.stringify(rp);
        }

        if (type === 'debi') {
            rp = {
                debi_bank : $('#debi_bank').val(),
                debi_name : $('#debi_name').val(),
                debi_type_user : $('#debi_type_user').val(),
                debi_type_doc : $('#debi_type_doc').val(),
                debi_doc : $('#debi_doc').val(),
                debi_phone : $('#debi_phone').val()
            };
            Data['debi'] = JSON.stringify(rp);
        }

        if (type === 'tran') {
            /* CL */
            if (Data.method === 'transbank') Data.method = 'TRANSBANK_DEBIT';
        }

        return Data;
    }
    catch (e) {
        alert('Error in GetJsonData(): ' + e);
    }
}