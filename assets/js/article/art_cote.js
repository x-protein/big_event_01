$(function () {
    initArtCateList();

    /* 分类列表 */
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
    let layer = layui.layer;

    /* 添加类别  、  layui里面的弹出层  open */
    let indexadd = null;
    $('#btnAdd').on('click', function () {
        indexadd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html(),
        });


    })



    /* 提交文章（事件委托） */
    $('body').on('submit', '#form-add', function (e) {


        e.preventDefault();
        // console.log(111);
        $.ajax({
            url: "/my/article/addcates",
            type: "POST",
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                initArtCateList();
                layer.msg('恭喜你，提交成功')
                layer.close(indexadd);

            }

        });

    })


    /* 修改 */
    let indexEdit = null;
    let form = layui.form;

    $('tbody').on('click', '.btn-edit', function () {
        // console.log('1111');
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
        })


        /* 获取id  发送ajax 获取数据*/
        let Id = $(this).attr('data-id')
        console.log(Id);
        $.ajax({
            url: "/my/article/cates/" + Id,
            type: "GET",
            success: (res) => {
                console.log(res);
                form.val('form-edit', res.data)
            }
        });

        /* 提交文章（事件委托） */
        $('body').on('submit', '#form-edit', function (e) {
            e.preventDefault();
            // console.log(111);
            $.ajax({
                url: "/my/article/updatecate",
                type: "POST",
                data: $(this).serialize(),
                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    initArtCateList();
                    layer.close(indexEdit);

                }

            });

        })



    })

    // /* 删除 */
    $('tbody').on('click', '.btn-delete', function () {
        /* 获取id  发送ajax 获取数据*/
        let Id = $(this).attr('data-id')
        console.log(Id);

        layer.confirm('是否确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: "/my/article/deletecate/" + Id,
                type: "GET",
                success: (res) => {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('恭喜你，文章类别删除成功')
                    layer.close(index);
                    initArtCateList();
                }
            })
        })



    })


})