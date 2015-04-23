   
$(document).on("pagebeforeshow", function() { 
	   jsKeyboard.generateHolder();	
	   jsKeyboard.keyboard["default"] = jsKeyboard.defaultKeyboard;
	   jsKeyboard.keyboard["numpad"] = jsKeyboard.numericKeyboard;
	   jsKeyboard.keyboard["datepad"] = jsKeyboard.dateKeyboard;	
		$(':input').not('[type="reset"]').not('[type="submit"]').on('click', function(e)
         {        	 
			if ($(this).attr("vkb")!= null && $(this).attr("vkb") != 'undefined'){			
				jsKeyboard.init($(this).attr("vkb"));
				jsKeyboard.settings.trigger=$(this).attr("vkbtrigger");
				$('#'+jsKeyboard.settings.popupID).popup('open');	
				jsKeyboard.currentElement = $(this);
				jsKeyboard.original=jsKeyboard.currentElement.val();
				jsKeyboard.currentElementCursorPosition = $(this).getCursorPosition();
				if (typeof(jQuery.ui.position) != 'undefined')
					if(jsKeyboard.settings.trigger != null && jsKeyboard.settings.trigger != undefined)
						$('#'+jsKeyboard.settings.popupID).position({of: $(this),my: "right top",at: "right bottom",collision:  "flipfit flipfit"});
					else
						$('#'+jsKeyboard.settings.popupID).position({of: $(this),my: "left top",at: "left bottom",collision:  "flipfit flipfit"});	
				else $('#'+jsKeyboard.settings.popupID+"-popup").addClass("ui-popup-android-container");			
			}
         });
     });
var jsKeyboard = {
    settings: {
		popupID:null,
		rebinded:false,
		trigger:null,
        buttonClass: "button", // default button class
        onclick: "jsKeyboard.write();", // default onclick event for button
        keyClass: "key", // default key class used to define style of text of the button
        text: {
            close: "close"
        }
    },
	rebind:function(divHost){
		$("#"+jsKeyboard.keyboardLayout).remove();
		jsKeyboard.settings.popupID="";
		jsKeyboard.settings.rebinded=true;	
		$("#" + divHost).html("<div role=\"main\" class=\"ui-content vkblayout\" style=\"padding:0.5em\"><div id=\""+jsKeyboard.keyboardLayout+"\" class=\"virtualKeyboard\"></div></div>");
		$(':input').not('[type="reset"]').not('[type="submit"]').on('click', function(e)
	         {	 
				if ($(this).attr("vkb")!= null && $(this).attr("vkb") != 'undefined'){					
					jsKeyboard.init($(this).attr("vkb"));
					jsKeyboard.settings.trigger=$(this).attr("vkbtrigger");
					jsKeyboard.currentElement = $(this);
					jsKeyboard.original=jsKeyboard.currentElement.val();
					jsKeyboard.currentElementCursorPosition = $(this).getCursorPosition();							
				}
	         });
	},
	generateHolder:function(){
		jsKeyboard.keyboardLayout ='vkb'+Math.random().toString(16).slice(2);
		jsKeyboard.settings.popupID=jsKeyboard.keyboardLayout +"pop";
		$(document.body).append("<div  id=\""+jsKeyboard.settings.popupID+"\" data-dismissible=\"false\"></div>");   
		$("#" + jsKeyboard.settings.popupID).html("<div role=\"main\" class=\"ui-content vkblayout\" style=\"padding:0.5em\"><div id=\""+jsKeyboard.keyboardLayout+"\" class=\"virtualKeyboard\"></div></div>");
		$("#" + jsKeyboard.settings.popupID).popup({create: function( event,ui){}});	
		$("#" + jsKeyboard.settings.popupID).popup( "option", "overlayTheme", "a" );
    },
	original:null,
    keyboard: [], // different keyboards can be set to this variable in order to switch between keyboards easily.
	init: function(keyboard) {			
        if (keyboard != null && keyboard != undefined)
		    jsKeyboard.generateKeyboard(keyboard);
        else
            jsKeyboard.generateKeyboard("default");
    },
    keyboardLayout: "", // it shows the html element where keyboard is generated
    currentKeyboard: "default", // it shows the which keyboard is used. If it's not set default keyboard is used.
    currentElement: null,
	cancel:function(){
		jsKeyboard.currentElement.val(jsKeyboard.original);
		jsKeyboard.original=null;
		$('#'+jsKeyboard.settings.popupID).popup('close');
		if(jsKeyboard.settings.trigger != null && jsKeyboard.settings.trigger != undefined)jsKeyboard.currentElement.trigger('keyup');
	},
	accept:function(){		
		jsKeyboard.original=null;
		$('#'+jsKeyboard.settings.popupID).popup('close');
		if(jsKeyboard.settings.trigger != null && jsKeyboard.settings.trigger != undefined)jsKeyboard.currentElement.trigger('keyup');
	},
	generateKeyboard: function(keyboard) {
        var bClass = "";
        var kClass = "";
        var onclick = "";
        var text = "";

        var s = "";
        s += "<div class=\"keyboard\">";
        //s += "<div class=\"keyboardHeader\">";
        //s += "<div onclick=\"jsKeyboard.hide();\"><span>" + jsKeyboard.settings.text.close + "</span><span class=\"closex\"> X</span></div>"
		//s += "<div><a href=\"#\" data-rel=\"back\" \" class=\"closex\">Close</a></div>"		
        //s += "</div>";

        /*small letter */
        if (jsKeyboard.keyboard[keyboard].smallLetter != undefined){
			s += "<div class=\"keyboardSmallLetter\">";        
			$.each(jsKeyboard.keyboard[keyboard].smallLetter, function(i, row) {
				generate_row(row);
        });s += "</div>";
		}
        

        /*capital letter*/
        if (jsKeyboard.keyboard[keyboard].capitalLetter != undefined){
			s += "<div class=\"keyboardCapitalLetter\">";		
			$.each(jsKeyboard.keyboard[keyboard].capitalLetter, function(i, row) {
				generate_row(row);
        }); s += "</div>";
		}
      

        /*number*/
        if (jsKeyboard.keyboard[keyboard].number != undefined){
			s += "<div class=\"keyboardNumber\">";
		    $.each(jsKeyboard.keyboard[keyboard].number, function(i, row) {
             generate_row(row);
        });s += "</div>";
		}
        

        /*symbols*/
        if (jsKeyboard.keyboard[keyboard].symbols != undefined){
			s += "<div class=\"keyboardSymbols\">";
		    $.each(jsKeyboard.keyboard[keyboard].symbols, function(i, row) {
             generate_row(row);
        });s += "</div>";
		}
        
		function generate_row(row){
			s+= "<div class=\"row\">"
			$.each(row.row, function(i, key) {
             generate(key);
        });s += "</div>";		
		}
        function generate(key) {
        var draw=true;        
        	if(jsKeyboard.settings.rebinded==true && (key.onclick == 'jsKeyboard.accept();' || key.onclick =='jsKeyboard.cancel();'))
        	draw=false;        		
        	if(draw){	
            bClass = key.buttonClass == undefined ? jsKeyboard.settings.buttonClass : key.buttonClass;
            kClass = key.keyClass == undefined ? jsKeyboard.settings.keyClass : key.keyClass;
            onclick = key.onclick == undefined ? jsKeyboard.settings.onclick.replace("()", "(" + key.value + ")") : key.onclick;
            text = (key.isChar != undefined || key.isChar == false) ? key.value : String.fromCharCode(key.value);
            s += "<div class=\"" + bClass + "\" onclick=\"" + onclick + "\"><div class=\"" + kClass + "\">" + text + "</div></div>";
            bClass = ""; kClass = ""; onclick = ""; text = "";
            }
        }

        $("#" + jsKeyboard.keyboardLayout).html(s);
		$("."+jsKeyboard.keyboard[keyboard].defaultSetup.value).css("display", "block");		
    },
    changeToSmallLetter: function() {
        $(".keyboardCapitalLetter,.keyboardNumber,.keyboardSymbols").css("display", "none");
        $(".keyboardSmallLetter").css("display", "block");
    },
    changeToCapitalLetter: function() {
        $(".keyboardCapitalLetter").css("display", "block");
        $(".keyboardSmallLetter,.keyboardNumber,.keyboardSymbols").css("display", "none");
    },
    changeToNumber: function() {
        $(".keyboardNumber").css("display", "block");
        $(".keyboardSymbols,.keyboardCapitalLetter,.keyboardSmallLetter").css("display", "none");
    },
    changeToSymbols: function() {
        $(".keyboardCapitalLetter,.keyboardNumber,.keyboardSmallLetter").css("display", "none");
        $(".keyboardSymbols").css("display", "block");
    },
    updateCursor: function() {
        //input cursor focus and position during typing
        jsKeyboard.currentElement.setCursorPosition(jsKeyboard.currentElementCursorPosition);
    },
	write: function(m,p) {
        var a = jsKeyboard.currentElement.val(),
		b = String.fromCharCode(m),
		pos = (typeof p=='undefined')?jsKeyboard.currentElementCursorPosition:p,
		elem=jsKeyboard.currentElement.attr("data-inputmask"),
		output=(elem != null && elem != undefined)?([a, b].join('')):([a.slice(0, pos), b, a.slice(pos)].join(''));					
		jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++;
		jsKeyboard.updateCursor();
		if(jsKeyboard.settings.trigger != null && jsKeyboard.settings.trigger != undefined)jsKeyboard.currentElement.trigger('keyup');
    },
    del: function(p) {
        var a = jsKeyboard.currentElement.val(),
            pos = (typeof p=='undefined')?jsKeyboard.currentElementCursorPosition:p,
            elem=jsKeyboard.currentElement.attr("data-inputmask"),
            output = (pos==0)?a:(elem != null && elem != undefined)?[a.slice(0, pos-1)].join(''):[a.slice(0, pos-1), a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
		if(jsKeyboard.currentElementCursorPosition>0)
			jsKeyboard.currentElementCursorPosition--;
		jsKeyboard.updateCursor();
		if(jsKeyboard.settings.trigger != null && jsKeyboard.settings.trigger != undefined)jsKeyboard.currentElement.trigger('keyup');
    },
	plusMinus:function(){
		if(jsKeyboard.currentElement.val().length>0){
		if(jsKeyboard.currentElement.val().slice(0,1)!='-')
            jsKeyboard.write(45,0);			
		else		
			jsKeyboard.del(1);
		}
	},
	clear:function(){
		jsKeyboard.currentElement.val("");
		jsKeyboard.currentElementCursorPosition=0;
	},
    enter: function() {
        var t = jsKeyboard.currentElement.val();
        jsKeyboard.currentElement.val(t + "\n");
		jsKeyboard.currentElementCursorPosition++;
    },
    space: function() {
        var a = jsKeyboard.currentElement.val(),
            b = " ",
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
    },
    writeSpecial: function(m) {
        var a = jsKeyboard.currentElement.val(),
            b = String.fromCharCode(m),
            pos = jsKeyboard.currentElementCursorPosition,
            output = [a.slice(0, pos), b, a.slice(pos)].join('');
        jsKeyboard.currentElement.val(output);
        jsKeyboard.currentElementCursorPosition++; //+1 cursor
    },   
    defaultKeyboard: {
		defaultSetup: { value:"keyboardSmallLetter" },
		animation:"slideup",
		xLocation:screen.width/2,
        capitalLetter:
            [
			{row:[// 1st row
               { value: 81 },{ value: 87 },{ value: 69 },{ value: 82 },{ value: 84 },{ value: 89 },{ value: 85 },{ value: 73 },{ value: 79 },{ value: 80 },
               { value: "Delete", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" }
			]},
			{row:[// 2nd row
               { value: 65, buttonClass: "button button_a" },{ value: 83 },{ value: 68 },{ value: 70 },{ value: 71 },{ value: 72 },{ value: 74 },{ value: 75 },{ value: 76 },
               { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" }
			]},
			{row:[// 3rd row
               { value: "abc", isChar: "false", buttonClass: "button button_smallletter", onclick: "jsKeyboard.changeToSmallLetter();", keyClass: "key key_smallletter" },
               { value: 90 },{ value: 88 },{ value: 67 },{ value: 86 },{ value: 66 },{ value: 78 },{ value: 77 },{ value: 44 },{ value: 46 },{ value: 64 }
			]},
			{row:[// 4th row
               { value: "Accept", isChar: "false", onclick: "jsKeyboard.accept();",buttonClass: "button button_accept",  keyClass: "key " },
			   { value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
               { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
               { value: "#$+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" },		   
			   { value: "Cancel", isChar: "false", onclick: "jsKeyboard.cancel();", buttonClass: "button button_cancel", keyClass: "key " }
			]}
            ],
        smallLetter: 
			[
			{row:[// 1st row
                { value: 113 },{ value: 119 },{ value: 101 },{ value: 114 },{ value: 116 },{ value: 121 },{ value: 117 },{ value: 105 },{ value: 111 },{ value: 112 },
                { value: "Delete", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" }
			]},
			{row:[// 2nd row
                { value: 97, buttonClass: "button button_a" },{ value: 115 },{ value: 100 },{ value: 102 },{ value: 103 },{ value: 104 },{ value: 106 },{ value: 107 },{ value: 108 },
                { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" }
			]},
			{row:[// 3rd row
                { value: "ABC", isChar: "false", buttonClass: "button button_capitalletterleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterleft" },
                { value: 122 },{ value: 120 },{ value: 99 },{ value: 118 },{ value: 98 },{ value: 110 },{ value: 109 },{ value: 44 },{ value: 46 },{ value: 64 }
			]},
			{row:[// 4th row
				{ value: "Accept", isChar: "false", onclick: "jsKeyboard.accept();",buttonClass: "button button_accept",  keyClass: "key " },
                { value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },                
                { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
                { value: "#$+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" },		   
				{ value: "Cancel", isChar: "false", onclick: "jsKeyboard.cancel();", buttonClass: "button button_cancel", keyClass: "key " }
			]}
		   ],
        number:
			[
			{row:[// 1st row
                { value: 49 },{ value: 50 },{ value: 51 },{ value: 52 },{ value: 53 },{ value: 54 },{ value: 55 },{ value: 56 },{ value: 57 },{ value: 48 },
                { value: "Delete", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" }
			]},
			{row:[// 2nd row
                { value: 45, buttonClass: "button button_dash" },{ value: 47 },{ value: 58 },{ value: 59 },{ value: 40 },{ value: 41 },{ value: 36 },{ value: 38 },{ value: 64 },
                { value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" }
			]},
			{row:[//3rd row                                
                { value: 63 },{ value: 33 },{ value: 34 },{ value: 124 },{ value: 92 },{ value: 42 },{ value: 61 },{ value: 43 }
			]},
			{row:[// 4th row
				{ value: "Accept", isChar: "false", onclick: "jsKeyboard.accept();",buttonClass: "button button_accept",  keyClass: "key " },
                { value: "ABC", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterleft" },
                { value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
                { value: "#$+", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToSymbols();", keyClass: "key key_symbols" },		   
				{ value: "Cancel", isChar: "false", onclick: "jsKeyboard.cancel();", buttonClass: "button button_cancel", keyClass: "key " }
			]}
            ],
        symbols: 
			[
			{row:[// 1st row
				{ value: 91 },{ value: 93 },{ value: 123 },{ value: 125 },{ value: 35 },{ value: 37 },{ value: 94 },{ value: 42 },{ value: 43 },{ value: 61 },
				{ value: "Delete", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_del", keyClass: "key key_del" }
			]},
			{row:[// 2nd row
				{ value: 95, buttonClass: "button button_underscore" },{ value: 92 },{ value: 124 },{ value: 126 },{ value: 60 },{ value: 62 },
				{ value: "&euro;", isChar: "false", onclick: "jsKeyboard.writeSpecial('&euro;');" },{ value: 163 },{ value: 165 },
				{ value: "Enter", isChar: "false", buttonClass: "button button_enter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" }
			]},
			{row:[// 3rd row            
				
				{ value: 46 },{ value: 44 },{ value: 63 },{ value: 33 },{ value: 39 },{ value: 34 },{ value: 59 },{ value: 92 }
			]},
			{row:[// 4th row
				{ value: "Accept", isChar: "false", onclick: "jsKeyboard.accept();",buttonClass: "button button_accept",  keyClass: "key " },
				{ value: "123", isChar: "false", buttonClass: "button button_numberleft", onclick: "jsKeyboard.changeToNumber();", keyClass: "key key_number" },
				{ value: "Space", isChar: "false", buttonClass: "button button_space", onclick: "jsKeyboard.space();", keyClass: "key key_space" },
				{ value: "ABC", isChar: "false", buttonClass: "button button_symbolsright", onclick: "jsKeyboard.changeToCapitalLetter();", keyClass: "key key_capitalletterleft" }, 
				{ value: "Cancel", isChar: "false", onclick: "jsKeyboard.cancel();", buttonClass: "button button_cancel", keyClass: "key " }
			]}
         ]
    },
	numericKeyboard: {
		defaultSetup: { value: "keyboardNumber" },
		animation:"slideup",
		xLocation:screen.width/2,
        number: [
				{row:[//1st row                
					{ value: "C", isChar: "false", onclick: "jsKeyboard.clear()", buttonClass: "button button_minidel", keyClass: "key key_del" },{ value: 47 },{ value: 42 },{value:45}
				]},
				{row:[//2nd row                
					{ value: 55 },{ value: 56 },{ value: 57 },{value:43}
				]},
				{row:[//3rd row                
					{ value: 52 },{ value: 53 },{ value: 54 },
					{ value: "+/-", isChar: "false", buttonClass: "button button_minipm", onclick: "jsKeyboard.plusMinus();", keyClass: "key key_pm" }
				]},
				{row:[//4th row                
					{ value: 49 },{ value: 50 },{ value: 51 },{ value: 37 }
				]},
				{row:[//5th row
					{ value: 48 },{value:46},{ value: "Enter", isChar: "false", buttonClass: "button button_minienter", onclick: "jsKeyboard.enter();", keyClass: "key key_enter" },
					{ value: "D", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_minidel", keyClass: "key key_del" }
				]},
				{row:[//6th row
					{ value: "Accept", isChar: "false", onclick: "jsKeyboard.accept();",buttonClass: "button button_accept",  keyClass: "key " },
					{ value: "Cancel", isChar: "false", onclick: "jsKeyboard.cancel();", buttonClass: "button button_cancel", keyClass: "key " }
				]}
            ]
    },
    dateKeyboard: {
		defaultSetup: { value: "keyboardNumber" },
		animation:"slideup",
		xLocation:screen.width/2,
        number: [				
				{row:[//1st row                
					{ value: 55 },{ value: 56 },{ value: 57 }
				]},
				{row:[//2nd row                
					{ value: 52 },{ value: 53 },{ value: 54 }					
				]},
				{row:[//3rd row                
					{ value: 49 },{ value: 50 },{ value: 51 }
				]},
				{row:[//4th row
					{ value: "Accept", isChar: "false", onclick: "jsKeyboard.accept();",buttonClass: "button button_accept",  keyClass: "key " },
					{ value: 48 },{value:46},
					{ value: "D", isChar: "false", onclick: "jsKeyboard.del()", buttonClass: "button button_minidel", keyClass: "key key_del" },
					{ value: "Cancel", isChar: "false", onclick: "jsKeyboard.cancel();", buttonClass: "button button_cancel", keyClass: "key " }
				]}
            ]
    }
}


// GET CURSOR POSITION
jQuery.fn.getCursorPosition = function(){
    if(this.lengh == 0) return -1;
    return $(this).getSelectionStart();
}

jQuery.fn.getSelectionStart = function(){
    if(this.lengh == 0) return -1;
    input = this[0];

    var pos = input.value.length;

    if (input.createTextRange) {
        var r = document.selection.createRange().duplicate();
        r.moveEnd('character', input.value.length);
        if (r.text == '')
        pos = input.value.length;
        pos = input.value.lastIndexOf(r.text);
    } else if(typeof(input.selectionStart)!="undefined")
    pos = input.selectionStart;

    return pos;
}

//SET CURSOR POSITION
jQuery.fn.setCursorPosition = function(pos) {
  this.each(function(index, elem) {
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });
  return this;
};
