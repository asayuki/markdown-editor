(function () {

  var that = {},
    observerSettings = { attributes: true, childList: true, characterData: true },
    listenRow = null;

  var markdowneditor = function (el, args) {
    that.editor = el.querySelector('#editor');
    that.editor.addEventListener('focus', markdowneditor.fn.getSelectedNode);
    that.editor.addEventListener('mouseup', markdowneditor.fn.getSelectedNode);
    that.editor.addEventListener('keyup', markdowneditor.fn.rowListener);

    that.observer = new MutationObserver(markdowneditor.fn.editorObserver);
    that.observer.observe(that.editor, observerSettings);
  };

  markdowneditor.fn = markdowneditor.prototype = {
    editorObserver: function (mutations) {
      mutations.forEach(function(mutation) {

        // Do something with this later?
        var listValues = [].slice.call(that.editor.children)
          .map(function (node) { return node.innerHTML; })
          .filter(function (s) {
            if (s === '<br>') {
              return false;
            } else {
              return true;
            }
          });

      });
    },

    rowListener: function (ev) {
      if ([37, 38, 39, 40].indexOf(ev.keyCode) >= 0) {
        if (ev.shiftKey) {

        } else {
          markdowneditor.fn.getSelectedNode();
        }
      } else if (ev.keyCode === 13 && !ev.shiftKey) {
        markdowneditor.fn.getSelectedNode(function () {});
      } else {
        if (ev.altKey || ev.shiftKey || ev.ctrlKey) {
        } else {
          var text = listenRow.innerHTML;
          text = text.replace('&nbsp;', ' ');
          if (text.charAt(0) === '@') {
            if (/^[@]+\s$/.test(text)) {
            } else if (/^[@]+\s?[a-zA-ZåäöÅÄÖ0-9\/]+$/.test(text)) {
              if (text.length === 3) {
                // Here we need to select the current range and use document.execCommand
              }
            }
          }
        }
      }
    },

    getSelectedNode: function (cb) {
      setTimeout(function () {
        var selection = window.getSelection(),
          ourDroid = null;
        if (markdowneditor.fn.findUpId(selection.getRangeAt(0).startContainer, 'editor')) {
          if (selection.anchorNode.nodeName.toLowerCase() === 'p') {
            ourDroid = selection.anchorNode;
          } else {
            ourDroid = markdowneditor.fn.findUpTag(selection.getRangeAt(0).startContainer, 'p');
          }
          listenRow = ourDroid;
        }
        if (typeof(cb) == 'function') {
          cb();
        }
      }, 1);
    },

    findUpId: function (el, id) {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.id === id)
          return el;
      }
      return null;
    },

    findUpTag: function (el, tag) {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName.toLowerCase() === tag)
          return el;
      }
      return null;
    }
  };

  Element.prototype.markdowneditor = function (options) {
    if (this) {
      current = new markdowneditor(this, options);
    }
    return this;
  }

  var me = document.querySelector('.markdown-editor');
  if (me !== null) {
    me.markdowneditor();
  }

})();
