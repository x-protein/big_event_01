$(function () {
    getUserInof();
})

/* 获取用户信息（封装到入口函数的外面） */
// 原因：后面其他的页面有调用
function getUserInof() {
    /* 发生请求 */
    $.ajax({
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    });
}

function renderAvatar(user) {
    // 1.渲染名称
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }

}