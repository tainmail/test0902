
  hljs.tabReplace = '    ';
  hljs.initHighlightingOnLoad();


  // A stylesheet switcher for the test page. Not part of the highlight.js itself
  // (c) Vladimir Epifanov <voldmar@voldmar.ru>
  (function(container_id) {
      if (window.addEventListener) {
          var attach = function(el, ev, handler) {
              el.addEventListener(ev, handler, false);
          }
      } else if (window.attachEvent) {
          var attach = function(el, ev, handler) {
              el.attachEvent('on' + ev, handler);
          }
      } else {
          var attach = function(el, ev, handler) {
              ev['on' + ev] = handler;
          }
      }


      attach(window, 'load', function() {
          var current = null;

          var info = {};
          var links = document.getElementsByTagName('link');
          var ul = document.createElement('ul')

          for (var i = 0; (link = links[i]); i++) {
              if (link.getAttribute('rel').indexOf('style') != -1
                  && link.title) {

                  var title = link.title;

                  info[title] = {
                  'link': link,
                  'li': document.createElement('li')
                  }

                  ul.appendChild(info[title].li)
                  info[title].li.title = title;

                  info[title].link.disabled = true;

                  info[title].li.appendChild(document.createTextNode(title));
                  attach(info[title].li, 'click', (function (el) {
                      return function() {
                          current.li.className = '';
                          current.link.disabled = true;
                          current = el;
                          current.li.className = 'current';
                          current.link.disabled = false;
                      }})(info[title]));
              }
          }

          current = info['Default']
          current.li.className = 'current';
          current.link.disabled = false;

          ul.id = 'switch';
          container = document.getElementById(container_id);
          container.appendChild(ul);
      });

  })('styleswitcher');
