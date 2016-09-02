var cu = "http://money.scupio.com/ADPinline/Click.aspx?";

function go(u) {
    if (navigator.appName == "Microsoft Internet Explorer")
    { var l = document.getElementById("bwlink"); l.target = "_blank"; l.href = u; l.click(); }
    else { window.open(u); }
}

function onscope(r, i) {
    var ru = cu + ad[i] + up;
    if (r == 'space' && na == 0) go(ru + '&clickrange=space');
    else if (r == 'space' && na == 1) na = 0;
    else if (r == 'subject') { na = 1; go(ru + '&clickrange=subject'); }
    else if (r == 'note') { na = 1; go(ru + '&clickrange=note'); }
    else { na = 1; go(ru + '&clickrange=' + r); }
}

function go2(u,t) {
    if (navigator.appName == "Microsoft Internet Explorer")
    { var l = document.getElementById("bwlink"); l.target=t; l.href = u; l.click(); }
    else { window.open(u,t); }
}

function onscope2(r,i,t) {
    var ru = cu + ad[i] + up;
    if (r == 'space' && na == 0) go2(ru + '&clickrange=space',t);
    else if (r == 'space' && na == 1) na = 0;
    else if (r == 'subject') { na = 1; go2(ru + '&clickrange=subject',t); }
    else if (r == 'note') { na = 1; go2(ru + '&clickrange=note',t); }
    else { na = 1; go2(ru + '&clickrange=' + r,t); }
}
