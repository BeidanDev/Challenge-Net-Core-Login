function dLocalValidationRules() {

    $('#PayerName').rules('add',
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

    $('#PayerDocument').rules('add',
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

    $('#PayerPhone').rules('add',
        {
            required: true,
            minlength: 7,
            maxlength: 14,
            messages:
            {
                required: 'Ingresa el número de teléfono del dueño de la tarjeta de crédito.',
                minlength: 'Ingresa al menos 7 dígitos.',
                maxlength: 'Ingresa no más de 14 dígitos.'
            }
        });
}

function dLocalPaymentMethods(type) {

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

function dLocalPaymentMethod(type, method) {

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

$(document).ready(function () {

    $('#PayerPhone').keyup(function () {
        if ($('#PayerPhone').val() === '') {
            $('#PayerPhone_country').val('');
        }
    });

    $('#PayerPhone').focus(function () {
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

    $('#dlocal_form').validate(
        {
            highlight: function (element) {
                $(element).addClass('fieldError');
            },
            unhighlight: function (element) {
                $(element).removeClass('fieldError');
            }
        });

    if ($('#dlocal_form').length !== 0) {
        dLocalValidationRules();
    }

    $('#dlocal_privacy').click(function () {

        var id_privacy = '#dlocal_privacy';
        var id_checkout = '#dlocal_checkout';

        if ($(id_privacy).is(':checked')) {
            $(id_checkout).attr('disabled', false);
        } else {
            $(id_checkout).attr('disabled', true);
        }

    });

    $('#dlocal_checkout').click(function () {

        var id_checkout = '#dlocal_checkout';
        var id_privacy = '#dlocal_privacy';
        var type = 'dlocal';

        var originalText = $(id_checkout).html();
        $(id_checkout).attr('disabled', true);
        $(id_privacy).attr('disabled', true);
        $('#' + type + '_message').html('');

        $(id_checkout).html('Por favor espere...');

        var response = '';
        var validator = $('#' + type + '_form').validate();
        if (validator.form()) {

            if (type == 'dlocal') {

                var cardHolderName = document.getElementById('PayerName').value;

                dlocal.createToken(card, {
                    name: cardHolderName
                }).then(function (result) {
                    // Send the token to your server.
                    $('#' + type + '_token').val(result.token);

                    /* Envío Form */
                    var form = GetDataDLocal();
                    if (form) {
                        try {
                            var studentportalurl = $('#' + type + '_studentportalurl').val();
                            $.ajax({
                                type: 'POST',
                                url: studentportalurl + '/procesarpagodlocal', //revisar si conviene separa la url o usar la misma
                                dataType: 'json',
                                async: true,
                                data: form
                            }).done(function (data) {
                                if (data.Mensaje.startsWith('APPROVED') || data.Mensaje.startsWith('PENDING') || data.Mensaje.startsWith('REDIRECT')) {
                                    var mensaje;

                                    if (data.Mensaje.startsWith('APPROVED')) {
                                        $(id_checkout).html('Exitoso!');
                                        mensaje = 'Su pago ha sido aprobado. En 5 segundos será redirigido a la sección principal.';
                                        setTimeout(function () { window.location.href = '/estudiantes'; }, 5000);
                                    }

                                    if (data.Mensaje.startsWith('PENDING')) {
                                        $(id_checkout).html(originalText);
                                        mensaje = data.Mensaje.replace('PENDIENTE. ', '');
                                    }

                                    if (data.Mensaje.startsWith('REDIRECT')) {
                                        var url = data.Mensaje.replace('REDIRECCIÓN. ', '');
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
                                if (xhr.status == 200) {
                                    response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + xhr.responseText + '</div>';
                                } else {
                                    response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">Ocurrió un error inesperado. Intente nuevamemte más tarde.</div>';
                                }
                                $('#' + type + '_message').html(response);
                            });
                        }
                        catch (e) {
                            $(id_checkout).html(originalText);
                            $(id_checkout).attr('disabled', false);
                            $(id_privacy).attr('disabled', false);
                            response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + e + '</div>';
                            $('#' + type + '_message').html(response);
                        }
                    }
                    /* Envío Form */

                }).catch((result) => {
                    if (result.error) {
                        $(id_checkout).html(originalText);
                        $(id_checkout).attr('disabled', false);
                        $(id_privacy).attr('disabled', false);
                        response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + result.error.message + '</div>';
                        $('#' + type + '_message').html(response);
                    }
                });

            }
        }
        else {
            $(id_checkout).html(originalText);
            $(id_checkout).attr('disabled', false);
            $(id_privacy).attr('disabled', false);
            validator.focusInvalid();
        }
    });
});

function GetDataDLocal() {
    try {
        var Data = {};

        Data.method = 'CARD';
        Data.type = 'dlocal';
        Data.token = $('#' + Data.type + '_token').val();
        Data.cuotaid = $('#' + Data.type + '_cuotaid').val();

        Data.PayerName = $('#PayerName').val();
        Data.PayerDocument = $('#PayerDocument').val();
        Data.PayerPhone = $('#PayerPhone').val();

        return Data;
    }
    catch (e) {
        alert('Error in GetDataDLocal(): ' + e);
    }
}