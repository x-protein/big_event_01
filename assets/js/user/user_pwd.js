$(function () {


    /* 效验表单 */
    let form = layui.form;
    form.verify({
        /* 密码 */
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        /* 新密码 */
        samepwd: function (value) {
            // 原密码与新密码不能一致
            if (value == $('[name=oldPwd').val()) {
                return '原密码与新密码不能一致';
            }
        },
        /* 确认新密码 */
        rePwd: function (value) {
            // 新密码与确认新密码必须一致
            if (value !== $('[name=newPwd').val()) {
                return '新密码和确认密码必须一致'
            }
        }
    });

    $('.layui-form').on('submit', function (e) {
       $$()
        $.ajax({
            url: "/my/updatepwd",
            type: "POST",
            data: layui,
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功！');
                $('.ayui-form')[0].reset();
                
            }
        });
    })

})