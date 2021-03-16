$(function () {
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        console.log(dt);
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    let q = {
        pagenum: 1,
        pagesize: 1,
        cate_id: '',
        state: '',
    }

    let layer = layui.layer;
    initTable();
    function initTable() {
        $.ajax({
            url: "/my/article/list",
            type: "GET",
            data: q,
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('获取文章列表')
                }

                let strhtml = template('t1', { data: res.data })
                $('tbody').html(strhtml)

                renderPage(res.total)
            }
        });
    }




    /* 初始化分类 */
    let form = layui.form;
    // 调用
    initCate();
    // 封装
    function initCate() {
        $.ajax({
            url: "/my/article/cates",
            type: "GET",
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                /* 渲染 */
                let htmlStr = template('tpl-cate', { data: res.data })
                $('[name="city-id"]').html(htmlStr);
                form.render()
            }
        });
    }


    /* 筛选功能 */
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })

    /*分页 */
    let laypage = layui.laypage;
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 5, 10],
            jump: function (obj, first) {
                console.log(first, obj.curr, obj.limit);

                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    // q.pagenum = obj.curr;
                    initTable();
                }
            }
        })
    }


    /* 删除 */
    // let layer = layui.layer;
    // /* 删除 */
    $('tbody').on('click', '.btn-delete', function () {
        /* 获取id  发送ajax 获取数据*/
        let Id = $(this).attr('data-id')
        console.log(Id);

        layer.confirm('是否确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: "/my/article/delete/" + Id,
                type: "GET",
                success: (res) => {
                    console.log(res);
                    layer.msg('恭喜你，文章类别删除成功')
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        // return layer.msg(res.message)
                        q.pagenum--;

                    }
                    initTable();
                    
                }

            })

            layer.close(index);

        })
    })

})