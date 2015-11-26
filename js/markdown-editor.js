(function () {
  var current = null,
    observerSettings = { attributes: true, childList: true, characterData: true };
    target = null,
    rowObserver = null,
    targetObserver = null,


  targetObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      rowObserver.disconnect();
      console.log(mutation);
      rowObserver.observe(mutation.addedNodes[0], observerSettings);
    });
  });

  rowObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      console.log(mutation);
    });
  });



  var markdowneditor = function (el, args) {
    target = el.querySelector('#editor');
    targetObserver.observe(target, observerSettings);
    target.addEventListener('focus', function (ev) {
      if (ev.target.innerHTML === '') {
        ev.target.innerHTML = '<div><br /></div>';
      }
    });
  };

  markdowneditor.fn = markdowneditor.prototype = {

  };

  Element.prototype.markdowneditor = function (options) {
    if (this) {
      current = new markdowneditor(this, options);
    }
    return this;
  }

  var mes = document.querySelectorAll('.markdown-editor');
  [].forEach.call(mes, function (me) {
    var options = {};
    me.markdowneditor(options);
  });

})();
