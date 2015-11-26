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

  /*
   * The functions for the editor
   */
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

    /*
     * Listen on all keyups that happens inside the editor
     * Will problably be the key to the heart in this.
     * And most likely the most blurry code
     */
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

    /*
     * Gets the current row (<p>) we're at right know
     */
    getSelectedNode: function (cb) {
      // Seems like we need to wait juuuust a milisecond.. or we might miss the selection
      setTimeout(function () {
        var selection = window.getSelection(),
          ourDroid = null;

        // Check if were inside the editor, which we should be
        if (markdowneditor.fn.findUpId(selection.getRangeAt(0).startContainer, 'editor')) {
          // Lets see if we're at the row
          if (selection.anchorNode.nodeName.toLowerCase() === 'p') {
            ourDroid = selection.anchorNode;
          // Or if we're inside the row
          } else {
            ourDroid = markdowneditor.fn.findUpTag(selection.getRangeAt(0).startContainer, 'p');
          }
          listenRow = ourDroid;
        }

        // Just incase we ever need to have a callback when we get the current row
        if (typeof(cb) == 'function') {
          cb();
        }
      }, 1);
    },

    /*
     * Traverse up in the DOM to find a parent with a certain ID
     */
    findUpId: function (el, id) {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.id === id)
          return el;
      }
      return null;
    },

    /*
     * Traverse up in the DOM to find a prent with a certain Tag
     */
    findUpTag: function (el, tag) {
      while (el.parentNode) {
        el = el.parentNode;
        if (el.tagName.toLowerCase() === tag)
          return el;
      }
      return null;
    }
  };

  /*
   * Created the markdowneditor
   */
  Element.prototype.markdowneditor = function (options) {
    if (this) {
      current = new markdowneditor(this, options);
    }
    return this;
  }

  /*
   * Get the editor and fire it up
   */
  var me = document.querySelector('.markdown-editor');
  if (me !== null) {
    me.markdowneditor();
  }

})();
