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
    $.ajaxPrefilter(function (params) {
        // console.log(params);

        /* 拼接对应环境服务器地址 */
        params.url = baseURL + params.url;

    })
})