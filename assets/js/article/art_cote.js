$(function () {
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            type: "GET",
            success: (res) => {
                console.log(res);
                let HTMLStr = template('t1', { data: res.data });
                $('tbody').html(HTMLStr)
            }
        });
    }





})