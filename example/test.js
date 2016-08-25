var adm = window.adm;

function showMsg() {
    var i = 0, len = arguments.length, msg = '';

    for (;i < len; i++) {
        if (typeof arguments[i] !== 'string') {
            arguments[i] = '<code>' + JSON.stringify(arguments[i]) + '</code>';
        }
        if (0 === i) {
            arguments[i] = '<b>' + arguments[i] + '</b>';
        }

        msg += ' ' + arguments[i];
    }

    $(`<p>${msg}</p>`).appendTo('body');
}

function eqeq(v1, v2) {
    return JSON.stringify(v1) === JSON.stringify(v2);
}

// 普通的 ajax 请求
adm.get({
    url: '/rest/user'
}).done((result) => {
    console.log(result.value);
    showMsg('普通的 ajax 请求(/rest/user): ', result.value);
}).then(() => {
    // code !== 200 的 ajax 请求
    return adm.get({
        url: '/rest/user/xxx'
    });
}).done((result) => {
    showMsg('code !== 200 的 ajax 请求(/rest/user/xxx): ', result);
}).then(() => {
    // 缓存到内存
    return adm.get({
        url: '/rest/user',
        cache: true,
        fromCache: true
    });
}).then((result) => {
    console.log(result);

    // 从内存读取
    let cache = adm.get('/rest/user');

    showMsg('从内存读取：', cache);
    showMsg('从内存读取与 url 获取值一致：', eqeq(result, cache));
}).then(() => {
    // 缓存到 sessionStorage
    return adm.get({
        url: '/rest/user',
        cache: 'sessionStorage'
    });
}).then((result) => {
    console.log(result);

    let cache = adm.get('/rest/user', 'sessionStorage');

    showMsg('从 sessionStorage 读取：', cache);
    showMsg('从 sessionStorage 读取与 url 获取值一致：', eqeq(result, cache));
}).then(() => {
    // 缓存到 localStorage
    return adm.get({
        url: '/rest/user',
        cache: 'localStorage'
    });
}).then((result) => {
    console.log(result);

    let cache = adm.get('/rest/user', 'localStorage');

    showMsg('从 localStorage 读取：', cache);
    showMsg('从 localStorage 读取与 url 获取值一致：', eqeq(result, cache));
}).then(() => {
    // 普通的缓存数据到 sessionStorage
    let data = {a: 1, b: 2};

    adm.save('testdata', data, 'sessionStorage');

    let cache = adm.get('testdata', 'sessionStorage');

    showMsg('普通的缓存数据到 sessionStorage，读取值：', cache, eqeq(cache, data));
});
