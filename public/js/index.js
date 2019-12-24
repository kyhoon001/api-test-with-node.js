$(document).ready(function () {
    
    $("#btn-market-save").click(function () {
        
        var _this = $(this)//button의 this를 저장
        $(this).prop("disabled", true); //버튼을 또 못누르도록
        $(this).text("로딩중..."); //버튼 텍스트 바꾸어주기

        var date = $("input[name*='date']").val();
        var count = $("input[name*='count']").val();
        var mcode = $("select[name*='mcode']").val();


        //jquery.ajax와 유사
        // app/controller/InternalController.js의 createResult 전송합니다.
        fetch('/internal/result', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({date:date, mcode:mcode, count:count}),
        }).then(function (response) {
            /* 조회된 개수가 0개 일경우 200을 리턴합니다. */
            if (response.status === 200) {
                location.reload();
            } else {
                swal({
                    type: 'warning',
                    title: '주의',
                    text: "조회된 결과수가 0개이므로 저장되지 않았습니다.",
                })
            }
            _this.prop("disabled", false);
            _this.text("조회하기");
        }).catch(function (data) {
            _this.prop("disabled", false);
            _this.text("조회하기");
            showError(msg)
        });

    });

    /* 데이터 삭제 */
    $(".btn-delete-history").click(function () {

        // app/controller/InternalController.js의 deleteResult로 전송합니다.
        $.ajax({
            url: '/internal/delete',
            type: "DELETE",
            data: {
                'id': $(this).data("id"), //id값
            },
            success: function () {
                location.reload();
            },
            error: (msg) => showError(msg),
        })


    });
});


function showError(msg) {
    swal({
        type: 'error',
        title: '에러코드',
        text: JSON.stringify(msg),
    })
}
