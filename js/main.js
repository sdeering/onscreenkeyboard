
     $(function () {
         jsKeyboard.init("virtualKeyboard");

         //first input focus
         var $firstInput = $(':input').first().focus();
         jsKeyboard.currentElement = $firstInput;
         jsKeyboard.currentElementCursorPosition = 0;
     });