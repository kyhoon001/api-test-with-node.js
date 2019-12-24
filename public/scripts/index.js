/* eslint-disable */

//검색 구현

$(document).ready(function () {

    $('#search_name').click(function () {

        window.location = "search_name.html";
    });
    $('#search_interaction').click(function () {
        window.location = "search_interaction.html";
    });
    $('#search_shape').click(function () {
        window.location = "search_shape.html";
    });
    $('#seacrch_ingredient').click(function () {
        window.location = "search_ingredient.html";
    });

});

//설명창 만들기
$(document).ready(function () {
    $('#search_shape').hover(function () {
        $("#Info_interaction").collapse('hide');
        $("#Info_name").collapse('hide');
        $("#Info_ingredient").collapse('hide');
        $("#Info_shape").collapse('show');
    }, function () {
        $("#Info_shape").collapse('hide');
    });
});

$(document).ready(function () {
    $('#search_name').hover(function () {
        $("#Info_interaction").collapse('hide');
        $("#Info_shape").collapse('hide');
        $("#Info_ingredient").collapse('hide');
        $("#Info_name").collapse('show');
    }, function () {
        $("#Info_name").collapse('hide');
    });
});
$(document).ready(function () {
    $('#search_interaction').hover(function () {
        $("#Info_shape").collapse('hide');
        $("#Info_name").collapse('hide');
        $("#Info_ingredient").collapse('hide');
        $("#Info_interaction").collapse('show');
    }, function () {
        $("#Info_interaction").collapse('hide');
    });
});

$(document).ready(function () {
    $('#seacrch_ingredient').hover(function () {
        $("#Info_interaction").collapse('hide');
        $("#Info_shape").collapse('hide');
        $("#Info_name").collapse('hide');
        $("#Info_ingredient").collapse('show');
    }, function () {
        $("#Info_ingredient").collapse('hide');
    });
});
