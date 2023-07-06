function DeleteInvoice(facturaid, cuotaid) {

    $('.invoice' + facturaid + cuotaid + '_message').html('');

    var original = $('.invoice' + facturaid + cuotaid).get(0).outerHTML;

    var html = '';
    html += '<span class="invoice' + facturaid + cuotaid + '">';
    html += $('.invoice' + facturaid + cuotaid).html();
    html += ' <i class="fa fa-spinner"></i>';
    html += '</span>';
    $('.invoice' + facturaid + cuotaid).replaceWith($(html));

    var Data = {};
    Data.action = 'delete';
    Data.facturaid = facturaid;

    var response = '';

    try {
        var studentportalurl = $('#invoice_studentportalurl').val();
        $.ajax(
            {
                type: 'POST',
                url: studentportalurl + '/agenda',
                dataType: 'json',
                async: true,
                data: Data
            }).done(function (data) {
                data = $.parseJSON(data);
                if (data.Mensaje.startsWith('OK')) {
                    setTimeout(function () { window.location.reload(); }, 2000);
                    response = '<div class="alert alert-success" style="margin: 8px 0 0 0;">' + data.Mensaje.replace('OK. ', '') + '</div>';
                    $('.invoice' + facturaid + cuotaid + '_message').html(response);
                }
                else {
                    response = '<div class="alert alert-danger" style="margin: 8px 0 0 0;">' + data.Mensaje + '</div>';
                    $('.invoice' + facturaid + cuotaid + '_message').html(response);
                    $('.invoice' + facturaid + cuotaid).replaceWith($(original));
                }
            });
    }
    catch (e) {
        response = '<div class="alert alert-danger" style="margin: 8px 0 0 0;">' + e + '</div>';
        $('.invoice' + facturaid + cuotaid + '_message').html(response);
        $('.invoice' + facturaid + cuotaid).replaceWith($(original));
    }

}