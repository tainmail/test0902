var pu = "http://adsense.scupio.com/adpinline/picadfile/";
var vpu = "http://pa.scupio.com/adpinline/PicAdFile/";

function onFlash() { na = 1; }

function mouseout(id) {
    var itm = document.getElementById(id);
    itm.style.zIndex = 0;
    itm.style.top = '0px';
    itm.style.left = '-2000px';
}

function mouseout2(id, adNo) {
    mouseout(id);
    onVideoHide(adNo);
}

function onVideoHide(adNo) {
    var m = thisMovie("flash" + adNo);
    if (m != null) {
        try { m.onHide(); } catch (e) { }
    }
}

function onVideoShow(adNo) {
    var m = thisMovie("flash" + adNo);
    if (m != null) {
        try { m.onShow(); } catch (e) { }
    }
}

var isFirstPlay = true;
function onPlay(r,adNo) {
    if (r == 'space' && na == 0) onPlay2(adNo);
    else if (r == 'space' && na == 1) na = 0;
    else { na = 1; onPlay2(adNo); }
}
function onPlay2(adNo) {
    if (isFirstPlay) {
        var m = thisMovie("flash" + adNo);
        if (m != null) {
            try { m.onPlay(); } catch (e) { }
        }
        isFirstPlay = false;
    }
}

function thisMovie(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    } else {
        return document[movieName];
    }
}

function now() { return +new Date(); }

function swfclick(adNo) {
    onscope('pic', adNo);
}

function redirect(adNo) {
    var ades = cu + ad[adNo] + up + '&clickrange=pic&redirect=2&rand=' + Math.random();
    go(ades);
}


function flashclick(adNo) {
    var ades = cu + ad[adNo] + up + '&clickrange=pic&redirect=0&rand=' + Math.random();
    includejs(ades);
}

function playvideo(adNo) {
    if (adNo >= 0) {
        var ades = cu + ad[adNo] + up + '&clickrange=video&redirect=0&rand=' + Math.random();
        includejs(ades);
        isFirstPlay = false;
    }
}



function createjs(jssrc) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jssrc);
    return s;
}

function includejs(jssrc) {
    var head = document.getElementsByTagName('head')[0];
    if (head) head.appendChild(createjs(jssrc));
    else document.body.appendChild(createjs(jssrc));
}

var bwtimer2;
var bwtimer3;
function hidevideo(id,ad) {
    clearTimeout(bwtimer2);
    cmd = 'mouseout2("' + id + '",' + ad + ')';
    bwtimer3 = setTimeout(cmd, 100);
}
function showvideo(id, a, b) {
    clearTimeout(bwtimer3);
    cmd = 'scsetimage("' + id + '",' + a + ',' + b + ')';
    bwtimer2 = setTimeout(cmd, 500);
}


function scsetimage2(scspanid, isFlash, adNo, th, tw, ph, pw, adC) {
    var maximgt = th - (ph + 10);
    var estrt = (th - 12) / adC;
    var imgl = tw - pw - 14;
    var scspitm = document.getElementById(scspanid);
    scspitm.style.zIndex = 50;    
    var esimgt = 0; if (maximgt > 0) { esimgt = estrt * adNo; esimgt = esimgt > maximgt ? maximgt : esimgt; }
    scspitm.style.top = esimgt + 'px';
    scspitm.style.left = imgl + 'px';
    if (IsSetSrc[adNo] == 0) {
        IsSetSrc[adNo] = 1;
        var isrc = pu + src[adNo];
        var ades = ad[adNo] + up;
        if (isFlash == 0)
            scspitm.firstChild.src = isrc;
        else {
            var flashVars;
            ades = cu + encodeURIComponent(ades + '&clickrange=pic');

            switch (isFlash) {
                case 1: // old flash ad
                    flashVars = 'clickTAG2=javascript:flashclick(' + adNo + ')&clickTAG=' + ades;
                    break;

                case 2: // old video ad
                    var videopath = vpu + src[adNo];
                    flashVars = 'vsource=' + videopath + '&clickTAG=' + ades + '&clickTAG2=javascript:playvideo(' + adNo + ')';
                    isrc = player;
                    break;

                case 3: // new flash ad
                    flashVars = 'clickTAG2=javascript:flashclick(' + adNo + ')&clickTAG=javascript:swfclick(' + adNo + ')';
                    break;

                case 4: // new video ad
                    flashVars = 'vpu=' + vpu + '&flvdir=' + flvdir[adNo] + '&flv=' + flv[adNo] + '&pic1=' + pic1[adNo] + '&pic2=' + pic2[adNo] + '&ct1=javascript:swfclick(' + adNo + ')' + '&ct2=javascript:playvideo(' + adNo + ')' + '&ct3=javascript:redirect(' + adNo + ')';
                    isrc = player;                                        
                    break;
            }

            scspitm.innerHTML = '<object id="flash' + adNo + '" type="application/x-shockwave-flash" data="' + isrc + '" width="' + pw + '" height="' + ph + '">'
            + '<param name="movie" value="' + isrc + '" />'
            + '<param name="SCALE" value="exactfit" />'
            + '<param name="wmode" value="transparent" />'
            + '<param name="FlashVars" value="' + flashVars + '" />'
            + '<param name="width" value="' + pw + '" />'
            + '<param name="height" value="' + ph + '" />'
            + '</object>';
        }
    }
    else {
        if (isFlash == 2 || isFlash == 4) {
            onVideoShow(adNo);
        }
    }
}
