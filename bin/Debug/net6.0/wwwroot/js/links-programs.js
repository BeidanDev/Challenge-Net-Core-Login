$(document).ready(function () {

    var pageHash = window.location.hash

    if (pageHash) {
        scrollToSection(pageHash);
    }

});

function scrollToSection(pageHash) {

    switch (pageHash) {
        case "#nav-licenciaturas-all":
            $("#nav-licenciaturas-all").addClass("active");
            $("#nav-licenciaturas-all").attr("aria-selected", "true");
            $("#nav-licenciaturas").addClass("active show");
            $("#nav-maestrias-all").removeClass("active");
            $("#nav-maestrias").removeClass("active show");
            $("#nav-doctorados-all").removeClass("active");
            $("#nav-doctorados").removeClass("active show");
            $("#nav-doctorados-all").attr("aria-selected", "false");
            break;
        case "#nav-maestrias-all":
            $("#nav-maestrias-all").addClass("active");
            $("#nav-maestrias-all").attr("aria-selected", "true");
            $("#nav-maestrias").addClass("active show");
            $("#nav-licenciaturas-all").removeClass("active");
            $("#nav-licenciaturas").removeClass("active show");
            $("#nav-doctorados-all").removeClass("active");
            $("#nav-doctorados").removeClass("active show");
            $("#nav-doctorados-all").attr("aria-selected", "false");
            break;
        case "#nav-doctorados-all":
            $("#nav-doctorados-all").addClass("active");
            $("#nav-doctorados-all").attr("aria-selected", "true");
            $("#nav-doctorados").addClass("active show");
            $("#nav-licenciaturas-all").removeClass("active");
            $("#nav-licenciaturas").removeClass("active show");
            $("#nav-maestrias-all").removeClass("active");
            $("#nav-maestrias").removeClass("active show");
            $("#nav-maestrias-all").attr("aria-selected", "false");
            break;
    }

    $('html, body').animate({
        scrollTop: $(pageHash).offset().top - 400
    });
}