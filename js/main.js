$(document).ready(function () {
    var $testInput = $('input').first().focus();

    jsKeyboard.init("keyboard_container");
    jsKeyboard.currentElement = $testInput;
    jsKeyboard.currentElementCursorPosition = 0;
});