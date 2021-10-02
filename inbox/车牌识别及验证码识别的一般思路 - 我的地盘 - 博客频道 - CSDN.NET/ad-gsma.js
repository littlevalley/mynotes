
var cloudad_urls = [
'http://www.mobileasiaexpo.cn/1day?MAECN=CSDNNPS3'
, 'http://www.mobileasiaexpo.cn/1day/?MAECN=CSDN3'
, 'http://www.mobileasiaexpo.cn/1day/?MAECN=CSDNBBS2'
];

function cloudad_show() {
    var rd = Math.random();//max:1
    if (rd < 0.0064) {
        var idx = 0;
        if (rd < 0.0012) idx = 0;
        else if (rd < 0.0032) idx = 1;
        else idx = 2;

        if (idx == 0) {
            if (new Date() > new Date(2012, 4, 23, 0, 0, 0)) {
                return;
            }
        } else {
            if (new Date() > new Date(2012, 4, 19, 0, 0, 0)) {
                return;
            }
        }
        var ad_url = cloudad_urls[idx];

        cloudad_doRequest(ad_url, false);

        var view_url = 'http://ad.csdn.net/log.ashx';
        view_url += '?t=view&adtype=gsma&adurl=' + encodeURIComponent(ad_url);
        cloudad_doRequest(view_url, false);

    }
}

function cloudad_doRequest(url, useFrm) {
    var e = null;
    if (useFrm) {
        e = document.createElement("iframe");
    } else {
        e = document.createElement("img");
    }
    if (url.indexOf('?') > 0) url += '&r_m=';
    else url += '?r_m=';
    url += new Date().getMilliseconds();
    e.style.width = "1px";
    e.style.height = "1px";
    e.style.position = "absolute";
    e.style.visibility = "hidden";
    e.src = url;
    document.body.appendChild(e);
}

setTimeout(function () {
    cloudad_show();
}, 1000);
