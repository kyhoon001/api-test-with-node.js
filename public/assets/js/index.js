/* eslint-disable */

$(document).ready(function () {

    console.log('call : /public/index.js');


    $("#btn_delete").click(function () {

        $.ajax({
            url: '/show/delete',
            type: "DELETE",
            data: {
                'id': $(this).data("id"), //id값
            },
            success: function () {
                location.href = '/logout';
            },
            error: (msg) => showError(msg),
        });
        console.log("현재 접속중인 계정" + $(this).data("id"));


    });



    $('#editor').hide();

    $('#editbutton').click(function () {

        $('#editor').show();
    });




    $("#btn-edit").click(function () {


        var name = $("input[name='user_name']").val();
        var password = $("input[name='user_password']").val();
        var nick = $("input[name='user_nick']").val();
        var email = $("input[name='user_email']").val();

        if (!name) {
            alert('경고이름', '이름필드를 확인하여주세요.', 'error')
        } else if (!password) {
            alert('경고패스워드', '패스워드필드를 확인하여주세요.', 'error')
        } else if (!nick) {
            alert('경고닉네임', '닉네임을 확인하여주세요.', 'error')
        } else if (!email) {
            alert('계정오류', '계정을 확인하여주세요.', 'error')
        } else {
            $(this).closest("form").submit(); //(DOM에서 'form'을 찾아 submit)
        }
    });





});
