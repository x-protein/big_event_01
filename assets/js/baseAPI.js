$(function () {

    // 用哪个地址就打开哪个地址

    /* 开发环境服务器地址 */
    let baseURL = "http://api-breakingnews-web.itheima.net";
    /* 开测试环境服务器地址 */
    // let baseURL = "http://api-breakingnews-web.itheima.net";
    /* 生产环境服务器地址 */
    // let baseURL = "http://api-breakingnews-web.itheima.net";

    /* 拦截所有ajax请求 */
    // 处理参数
    $.ajaxPrefilter(function (options) {
        // console.log(options);
        // if ('http://127.0.0.1:5500' === '') {
        //     return;
        // }
        /* 拼接对应环境服务器地址 */
        options.url = baseURL + options.url;
        if (options.url.indexOf("/my/") !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            };

        }

        options.complete = function (res) {
            let obj = res.responseJSON;
            console.log(obj);
            if (obj.status == 1 && obj.message == '身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })
})