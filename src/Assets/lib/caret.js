﻿!function (e) { e.fn.caret = function (e) { var t = this[0], n = t && "true" === t.contentEditable; if (0 != arguments.length) { if (t) { if (-1 == e && (e = this[n ? "text" : "val"]().length), window.getSelection) n ? (t.focus(), window.getSelection().collapse(t.firstChild, e)) : t.setSelectionRange(e, e); else if (document.body.createTextRange) if (n) { var o = document.body.createTextRange(); o.moveToElementText(t), o.moveStart("character", e), o.collapse(!0), o.select() } else { var o = t.createTextRange(); o.move("character", e), o.select() } n || t.focus() } return this } if (t) { if (window.getSelection) { if (n) { t.focus(); var c = window.getSelection().getRangeAt(0), r = c.cloneRange(); return r.selectNodeContents(t), r.setEnd(c.endContainer, c.endOffset), r.toString().length } return t.selectionStart } if (document.selection) { if (t.focus(), n) { var c = document.selection.createRange(), r = document.body.createTextRange(); return r.moveToElementText(t), r.setEndPoint("EndToEnd", c), r.text.length } var e = 0, o = t.createTextRange(), r = document.selection.createRange().duplicate(), a = r.getBookmark(); for (o.moveToBookmark(a) ; 0 !== o.moveStart("character", -1) ;) e++; return e } if (t.selectionStart) return t.selectionStart } } }(jQuery);
//# sourceMappingURL=jquery.caret.min.js.map