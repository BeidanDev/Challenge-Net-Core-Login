function Save(pageid) {
    $(this).attr("disabled", true);

    var a = {};
    WebsitePageContents = [];
    a['accion'] = 'save';
    a['WebPageId'] = pageid;
    $("startu").each(function () {
        WebsitePageContents.push({
            Clave: $(this).attr('id'),
            Valor: $(this).html().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        });
    });
    $("startucontrol").each(function () {
        WebsitePageContents.push({
            Clave: $(this).attr('id'),
            Valor: $(this).html().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        });
    });
    a['WebsitePageContents'] = JSON.stringify(WebsitePageContents);
    $.post('/save.aspx', a).done(function () {
        alert("Changes Saved");
        window.location.href = window.location.href.split('?')[0];
    });
}

function ReloadByCurrentVersion(versionnumber) {
    window.location.href = window.location.href.split('?')[0] + '?pageversion=' + versionnumber;
}

function ShowHideCurrentVersion(currentid, currentwebsitepageversionid) {
    if (currentid !== currentwebsitepageversionid) {
        $('#SetAsCurrentVersion').show();
        $('#ThisIsCurrentVersion').hide();
    }
    else {
        $('#SetAsCurrentVersion').hide();
        $('#ThisIsCurrentVersion').show();
    }
}

function SetAsCurrentVersion(currentid, currentwebsitepageid) {
    $(this).attr("disabled", true);

    var a = {};
    a['accion'] = 'setascurrentversion';
    a['CurrentID'] = currentid;
    a['CurrentWebsitePageID'] = currentwebsitepageid;

    $.post('/save.aspx', a).done(function () {
        alert("Changes Saved");
        window.location.reload();
    });
}

function addLink() {
    var linkURL = prompt('Enter a URL:', 'http://');
    var sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
}

function addOL() {
    var sText = document.getSelection();
    document.execCommand('insertOrderedList', false, '<ol>' + sText + '</ol>');
}

function addUL() {
    var sText = document.getSelection();
    document.execCommand('insertUnorderedList', false, '<ul>' + sText + '</ul>');
}

$(document).ready(function () {
    $('[contenteditable="true"]').on('paste', function (e) {
        e.preventDefault();
        var text = '';
        if (e.clipboardData || e.originalEvent.clipboardData) {
            text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            text = window.clipboardData.getData('Text');
        }
        if (document.queryCommandSupported('insertText')) {
            document.execCommand('insertText', false, text);
        } else {
            document.execCommand('paste', false, text);
        }
    });
    $('#show-edit-catalog').removeClass('hide');
});