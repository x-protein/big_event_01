$(function () {
    /* 需求1： */
    /* 点击a（#link_reg）链接 跳转到注册页面 */
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    /* 点击a（#link_login）链接 跳转到登录页面 */
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 需求2：表单验证
    // console.log(layui);
    let form = layui.form;
    console.log(form);
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        /* 密码重重复校验规则 */
        repwd: function (value, item) {
            // console.log(value);
            console.log($('.reg-box input[name="password"]').val());
            if (value != $('.reg-box input[name="password"]').val()) {
                return '密码输入的不一致';
            }
        }
    });
    
    /* 需求3：注册*/
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/reguser",
            type: "POST",
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });

                layer.msg('用户名注册成功！', { icon: 6 });
                $('#link_login').click();
                $('#form_reg')[0].reset();
            }
        });
    });

    /* 需求4：登录跳转 */
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            type: "POST",
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                /* 效验返回状态 */
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });
                // 提示信息
                layer.msg('恭喜您，登录成功！', { icon: 6 });
                /* 页面的跳转 */
                location.href = '/index.html';
                /* 保存token */
                localStorage.setItem('token', res.token);
            }
        });
    });

});