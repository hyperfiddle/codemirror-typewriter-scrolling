/**
 * LICENSE : MIT
 */
"use strict";
(function (mod) {
    if (typeof exports == "object" && typeof module == "object") {
        mod(require("codemirror"));
    }
    else if (typeof define == "function" && define.amd) {
        define(["codemirror"], mod);
    }
    else {
        mod(CodeMirror);
    }
})(function (CodeMirror) {
    "use strict";
    CodeMirror.commands.scrollSelectionToCenter = function (cm) {
        if (cm.getOption("disableInput")) {
            return CodeMirror.Pass;
        }
        var s = cm.getScrollInfo(); // {left: 0, top: 285, height: 314, width: 694, clientHeight: 29, …}
        var scrollTo_y = s.height - s.clientHeight;
        cm.scrollTo(0, scrollTo_y);
    };
    CodeMirror.defineOption("typewriterScrolling", false, function (cm, val, old) {
        if (old && old != CodeMirror.Init) {
            cm.off("changes", onChanges);
        }
        if (val) {
            cm.on("changes", onChanges);
        }
    });
    function onChanges(cm, changes) {
        if (cm.getSelection().length !== 0) {
            return;
        }
        for (var i = 0, len = changes.length; i < len; i++) {
            var each = changes[i];
            if (each.origin === 'setValue') {
                cm.execCommand("scrollSelectionToCenter");
                return;
            }
        }
    }
});
