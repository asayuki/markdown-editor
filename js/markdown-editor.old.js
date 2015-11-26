var extend = function ( defaults, options ) {
  var extended = {};
  var prop;
  for (prop in defaults) {
    if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
      extended[prop] = defaults[prop];
    }
  }
  for (prop in options) {
    if (Object.prototype.hasOwnProperty.call(options, prop)) {
      extended[prop] = options[prop];
    }
  }
  return extended;
};

(function () {

  var current = null;

  var markdowneditor = function (el, args) {
    var editor = el.querySelector('#editor');
    editor.addEventListener('keydown', markdowneditor.fn.keydown);
    editor.addEventListener('keyup', markdowneditor.fn.keyup);
    editor.addEventListener('focus', markdowneditor.fn.focus);
    editor.focus();
  };

  markdowneditor.fn = markdowneditor.prototype = {

    focus: function (ev) {
      if(ev.target.innerHTML === '') {
        //console.log(ev);
        ev.target.innerHTML = '<div><br /></div>';
      }
    },

    keydown: function (ev) {

      var currentSel    = document.getSelection(),
        currentSelRange = currentSel.getRangeAt(0),
        currentSelText  = currentSel.anchorNode.textContent;

      if (ev.keyCode === 13) {
        // We need to create a whole new div
        //console.log(currentSel);
        //console.log(currentSelRange);
      }
    },

    keyup: function (ev) {

      var selection = document.getSelection();
      var text = selection.anchorNode.textContent;
      var range = selection.getRangeAt(0);
      var fragment = null;

      if (text.charAt(0) === '@') {
        if (/^[@]+\s$/.test(text)) {
          console.log('Hej!');
        } else if (/^[@]+\s?[a-zA-ZåäöÅÄÖ0-9\/]+$/.test(text)) {
          if (text.length === 3 && selection.anchorNode.parentNode.localName === 'div') {
            var thistext = text.substr(2,text.length);
            selection.anchorNode.textContent = '';
            fragment = range.createContextualFragment('@ <strong style="color: pink">' + thistext + '</strong>');
            var f = fragment.firstChild;
            var l = fragment.lastChild;
            range.insertNode(fragment);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      }

      if (ev.keyCode === 13) {
        console.log(selection);
        //console.log(range);
        console.log(selection.anchorNode.outerHTML);
        selection.anchorNode.outerHTML = '';

      }










      /*var currentSel    = document.getSelection(),
        currentSelRange = currentSel.getRangeAt(0),
        currentSelText  = currentSel.anchorNode.textContent;

      console.log(currentSelText);

      if (currentSelText.charAt(0) === '@') {
        if (/^[@]+\s$/.test(currentSelText)) {
          console.log('Här skall vi bara ge ett tip');
          console.log(currentSelRange);
          currentSelRange.deleteContents();
          console.log(currentSelRange);
          //var test = document.createElement('div');
          //test.innerHTML = '<strong style="color: pink;">bajs</strong>';
          //currentSel.anchorNode.parentNode.parentNode.insertBefore(test, currentSel.anchorNode.parentNode);
          //currentSel.anchorNode.parentNode.parentNode.removeChild(currentSel.anchorNode.parentNode);
        } else if (/^[@]+\s?[a-zA-ZåäöÅÄÖ0-9\/]+$/.test(currentSelText)) {
          //currentSel.anchorNode.insertBefore(sel.anchorNode, '<strong>' + currentSelText + '</strong>');
          //currentSel.anchorNode.parentNode.removeChild(currentSel.anchorNode);
        }
      }*/
    }


    /*change: function (ev) {
      console.log(ev.target.innerHTML);
      // Check if editors becomes empty, then we need to insert div with br inside of it
      if (ev.target.innerHTML === '' || ev.target.innerHTML === "<br>") {
        ev.preventDefault();
        //console.log(ev);
        ev.target.innerText = '';
        ev.target.blur();
        //console.log(ev);
        //setTimeout(function () {
          //ev.target.focus();
        //}, 2000);
      }

      var sel = document.getSelection(),
        nd = sel.anchorNode.textContent;

        //console.log(sel);
        //console.log(nd);

      // Check for @ in the beginning of a string
      if (nd.charAt(0) === '@') {
        if (/^[@]+\s$/.test(nd)) {
          console.log(sel);
          console.log('Show some kind of tip');

          console.log(sel.anchorNode.parentNode.parentNode);
          console.log(sel.anchorNode.parentNode);

          var test = document.createElement('div');
          test.innerHTML = '<strong style="color: pink;">bajs</strong>';

          sel.anchorNode.parentNode.parentNode.insertBefore(test, sel.anchorNode.parentNode);
          sel.anchorNode.parentNode.parentNode.removeChild(sel.anchorNode.parentNode);

        } else if (/^[@]+\s?[a-zA-ZåäöÅÄÖ0-9\/]+$/.test(nd)) {
          console.log(sel);
          console.log(sel.a);
          sel.anchorNode.insertBefore(sel.anchorNode, '<strong>' + nd + '</strong>');
          sel.anchorNode.parentNode.removeChild(sel.anchorNode);
        }
      }
    }*/
  };

  markdowneditor.defaults = {

  };

  Element.prototype.markdowneditor = function (options, callback) {
    if (this) {
      current = new markdowneditor(this, options);
    }
    return this;
  };

  var mes = document.querySelectorAll('.markdown-editor');
  [].forEach.call(mes, function (me) {

    var options = {};

    // Add options

    me.markdowneditor(options);
  });

})();
