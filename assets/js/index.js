$(function () {
    getUserInof();

    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })

})

/* 获取用户信息（封装到入口函数的外面） */
// 原因：后面其他的页面有调用
function getUserInof() {
    /* 发生请求 */
    $.ajax({
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        },
        // complete: function (res) {
        //     let obj = res.responseJSON;
        //     console.log(obj);
        //     if (obj.status == 1 && obj.message == '身份认证失败！'){
        //     localStorage.removeItem('token');
        //     location.href = '/login.html';
        // }
        // }
    });
}

function renderAvatar(user) {
    // 1.渲染名称
    var name = user.nickname || user.username;
    $('#welcome1').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatat').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatat').show().html(text);
    }

}