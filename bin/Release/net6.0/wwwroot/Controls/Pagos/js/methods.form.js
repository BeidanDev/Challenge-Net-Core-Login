function TokenAction(action, tokenid) {

    $('#token_message_' + tokenid).html('');

    var original = $('.' + action + tokenid).get(0).outerHTML;

    var html = '';
    html += '<span class="' + action + tokenid + '">';
    html += $('.' + action + tokenid).html();
    html += ' <i class="fa fa-spinner"></i>';
    html += '</span>';
    $('.' + action + tokenid).replaceWith($(html));

    var Data = {};
    Data.action = action;
    Data.tokenid = tokenid;

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
                    $('#token_message_' + tokenid).html(response);
                }
                else {
                    response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + data.Mensaje + '</div>';
                    $('#token_message_' + tokenid).html(response);
                    $('.' + action + tokenid).replaceWith($(original));
                }
            });
    }
    catch (e) {
        response = '<div class="alert alert-danger" style="margin: 8px 0 10px 0;">' + e + '</div>';
        $('#token_message_' + tokenid).html(response);
        $('.' + action + tokenid).replaceWith($(original));
    }

}