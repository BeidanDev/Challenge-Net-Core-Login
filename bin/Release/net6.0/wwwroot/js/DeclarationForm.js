$(document).ready(function () {

    $('#btnIAgreeAndApply').click(function () //When clicked the following code runs.
    {
        var originalText = $('#btnIAgreeAndApply').html();
        $('#btnIAgreeAndApply').html('PLEASE WAIT...').attr('disabled', true);
        $('#divIAgreeAndApply').html('');

        try {
            $.ajax({
                type: 'POST',
                url: $('#txtStudentPortalUrl').val() + '/ajax/savedeclaration',
                dataType: 'json',
                async: true,
                data: { 'Action': 'IAgreeAndApply' }
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
    $('#divIAgreeAndApply').html(response);
    $('#btnIAgreeAndApply').html(originalText).removeAttr('disabled');
    if (status == 'OK') {
        window.location.reload(); // Para que vuelva todo desactivado.
    }
}