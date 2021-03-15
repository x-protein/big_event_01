$(function () {

    /* 效验规则定义 */
    let form = layui.form;
    console.log(form);
    console.log(form.config.verify);
    form.verify({
        nickname: function (value) {
            console.log(value);

            if (value.trim().length < 1 || value.trim().length > 6) {
                return "昵称长度在 1 ~ 6 之间";
            }
        }
    });

    /* 用户渲染 */
    initUserInfo();
    let layer = layui.layer;
    function initUserInfo() {

        $.ajax({
            url: "/my/userinfo",
            type: "GET",
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUserInfo', res.data);
            }
        });

    };

    // 重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        /* 用上面的用户渲染方法实现 */
        initUserInfo();
    })

    /* 用户资料修改 */

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/my/userinfo",
            type: "POST",
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('用户修改信息失败');

                }

                layer.msg('恭喜您，用户信息修改成功');
                console.log(window);
                console.log(window.parent);

                window.parent.getUserInof();

            }
        });
    })





})