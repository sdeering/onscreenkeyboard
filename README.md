jQuery mobile screen keyboard
================
Based on work of Sam Derring, (on-screen keyboard) this is an updated versio of it with new features.
Just like its predecessor it is powered by JavaScript/jQuery. Also this fork uses jQuery mobile.

Features
================
Difference of this keyboard and its predecessor.
1) The keyboard can be initialized in two ways:
	a) Automatically with the user of the jQuery event "pagebeforeshow". The keyboard gets initialized and performs the binding.
	   The binding is done only to the inputs that have the vkb attribute and are not of the types: reset, hidden, or submit.
	   As for the keyboard it appears on screen on a popup. This a jQuery Mobile(JQM) popup wiget (for this version JQM is required). 
	   If jQuery-ui is available it will use the position wiget to place the keyboard below or above the selected input.
	b) rebind method. --experimental--
	   Once the jsKeyboard object as been created you can call the rebind method .
	   example:
	   jsKeyboard.rebind("DIV ID TO WHERE YOU WANT TO PUT THE KEYBOARD");
	   
	   This tells the mobile screen keyboard to not show inside a popup instead to display itself on the div that you specified. It then proceeds and rebind rebind all of the inputs as normal. Once you rebind you can't go back to the popup.
2) The keyboard was adjusted to be more responsive than its predecessor. Adjusting the size of the entite layout is as easy as  manipulating the class "virtualKeyboard". Specifically, the attribute "font-size".
	Also, this version is preconfigured to generate a workable keyboard with screens with resolutions of 800x600 and 1024x768. 
	These settings can be found under the css:		
			@media all and (min-width: 601px) and (max-width: 801px)
			@media all and (min-width: 100px) and (max-width: 600px)
	This allows you to add or tweak your settings with ease.		
3) New keys were introduced. Such as: plus/minus toggle (+/-) and full input clear (C). You can see these keys on the numpad layout.
4) Custom keyboard layouts are different.
   This keyboard has a way to define the default layout. In the case of "defaultKeyboard" the key layout that will first appear is the "smallLetter" layout. (need to improve this)
    defaultKeyboard: {
		defaultSetup: { value:"keyboardSmallLetter" },
		animation:"slideup",
		xLocation:screen.width/2,
		    capitalLetter
        ........key layouts
        smallLetter
        ........key layouts
        number
         ........key layouts
        symbols
        ........key layouts
		}
   
   These other two settings can be ignored... They are for experimental use and currently they are NOT operational.
   	animation: 
		xLocation: 

Special Attributes 
vkb="LOADS KEYBOARD LAYOUT" 
vkb-trigger="true" : Tells mobile screen keyboard to trigger the keyUp event when a key is pressed.
vkb-clear="true" : Removes previous content of the input when the keyboard is needed.

Default Keyboard layouts
default : Querty ENG keyboard
numpad : Numeric keyboard
datepad : Digit pad with delete key


The MIT License (MIT)
================
Copyright © 2015 Geofrey Burgos,
Copyright © 2014 Sam Deering, http://samdeering.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
