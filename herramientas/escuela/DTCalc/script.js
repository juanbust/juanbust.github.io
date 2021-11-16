// Character lengths in h1
// Number at the left is the unicode of a character
// Number at the right is the length in millimeters of that character
const charLengths = {
    // Space
    32 : 0.6,

    // Uppercase characters (A-Z with spanish-specific characters such as Ñ at the end)
    65 : 0.7,
    66 : 0.6,
    67 : 0.5,
    68 : 0.6,
    69 : 0.5,
    70 : 0.5,
    71 : 0.6,
    72 : 0.6,
    73 : 0.1,
    74 : 0.4,
    75 : 0.6,
    76 : 0.5,
    77 : 0.7,
    78 : 0.6,
    79 : 0.6,
    80 : 0.6,
    81 : 0.7,
    82 : 0.6,
    83 : 0.6,
    84 : 0.6,
    85 : 0.6,
    86 : 0.7,
    87 : 0.9,
    88 : 0.7,
    89 : 0.7,
    90 : 0.6,
    193 : 0.7,
    201 : 0.5,
    205 : 0.1,
    211 : 0.6,
    218 : 0.6,
    220 : 0.6,
    209 : 0.6,

    // Lowercase characters (a-z with spanish-specific characters such as ñ at the end)
    97 : 0.5,
    98 : 0.5,
    99 : 0.4,
    100 : 0.5,
    101 : 0.5,
    102 : 0.4,
    103 : 0.5,
    104 : 0.5,
    105 : 0.1,
    106 : 0.1,
    107 : 0.5,
    108 : 0.2,
    109 : 0.7,
    110 : 0.5,
    111 : 0.5,
    112 : 0.5,
    113 : 0.5,
    114 : 0.4,
    115 : 0.5,
    116 : 0.4,
    117 : 0.5,
    118 : 0.5,
    119 : 0.7,
    120 : 0.5,
    121 : 0.5,
    122 : 0.5,
    225 : 0.5,
    233 : 0.5,
    237 : 0.1,
    243 : 0.5,
    250 : 0.5,
    252 : 0.5,
    241 : 0.5,

    // Numbers
    48 : 0.5,
    49 : 0.3,
    50 : 0.5,
    51 : 0.5,
    52 : 0.6,
    53 : 0.5,
    54 : 0.5,
    55 : 0.5,
    56 : 0.5,
    57 : 0.5,

    // Punctuation signs
    33 : 0.1,
    34 : 0.5,
    39 : 0.2,
    40 : 0.2,
    41 : 0.2,
    43 : 0.5,
    44 : 0.2,
    45 : 0.5,
    46 : 0.1,
    58 : 0.1,
    59 : 0.2,
    61 : 0.5,
    63 : 0.5,
    91 : 0.2,
    93 : 0.2,
};

const letterSpacing = 0.2;

let pixiApp;

let font = new FontFaceObserver('ISOCPEUR', {});
// Start loading the font
font.load().then(() => {
    pixiApp = new PIXI.Application({ width: 1000, height: 200, antialias: true, backgroundAlpha: 0 });
    pixiApp.stage.pivot.set(-2, 0);
    document.getElementById("preview-container").appendChild(pixiApp.view);

    PIXI.BitmapFont.from("isocpeur", {
        fontFamily: "ISOCPEUR",
        fontSize: 100,
        strokeThickness: 1,
        fill: "black"
    }, {
        chars:  [' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
                ' ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ'],
    });

    let graphics = new PIXI.Graphics();
    pixiApp.stage.addChild(graphics);

    let tipText = new PIXI.BitmapText("", { fontName: 'isocpeur', fontSize: 14});
    pixiApp.stage.addChild(tipText);

    let textObjects = [];

    let textInput = document.getElementById("text-input");
    let sizeInput = document.getElementById("size-input");
    let centerInput = document.getElementById("center-input");
    let rowInput = document.getElementById("row-input");

    if(!localStorage.DT_text) {
        localStorage.DT_text = "Hola";
        localStorage.DT_size = 5;
        localStorage.DT_center = false;
        localStorage.DT_row = 0;
    }

    if(textInput.value == "") textInput.value = localStorage.DT_text;
    if(sizeInput.value == "") sizeInput.value = localStorage.DT_size;
    centerInput.value = localStorage.DT_center;
    if(rowInput.value == "") rowInput.value = localStorage.DT_row;

    function makePreview() {
        document.getElementById("center-options").style.display = centerInput.checked ? "block" : "none";
    
        localStorage.DT_text = textInput.value;
        localStorage.DT_size = sizeInput.value;
        localStorage.DT_center = centerInput.checked;
        localStorage.DT_row = rowInput.value;
    
        renderPreview(textInput.value, sizeInput.value, centerInput.checked, rowInput.value);
    }
    
    textInput.addEventListener("input", makePreview);
    sizeInput.addEventListener("input", makePreview);
    centerInput.addEventListener("click", makePreview);
    rowInput.addEventListener("input", makePreview);
    
    makePreview();
    
    function renderPreview(text, size, centerText, rowLength) {
        // render las cotas and the main text
        let textLength = getFullLength(text, size);
        let canvasTextLength = getFullLength(text, 35);
        let centeringSpace = rowLength / 2 - textLength / 2; 
        let canvasCenteringSpace = (rowLength / size * 35) / 2 - canvasTextLength / 2; 
    
        tipText.x = 0;
        tipText.y = 150;
        tipText.text = "";
    
        graphics.clear();
    
        if(centerText && centeringSpace < 0) {
            tipText.text = "El texto que ingresaste no entraba en el renglón;\nla previsualización de centrado fue desactivada.\n\n";
            tipText.y = 120;
            centerText = false;
        }
    
        if(text.includes("í") || text.includes("Í")) {
            tipText.text += "Por alguna razón la i con acento aparece fuera de lugar;\nsu posicionamiento vendría a ser el mismo que la i sin acento."
        }
    
        if(centerText) {
            renderText(canvasCenteringSpace - 2, -5, text, 50, 0);
    
            drawCota(canvasCenteringSpace, 80, canvasTextLength, roundToHalfs(textLength).toString(), 1);
            drawCota(0, 80, canvasCenteringSpace, roundToHalfs(centeringSpace).toString(), 2);
            drawCota(0, 120, rowLength / size * 35, rowLength.toString(), 3);
        }
        else {
            renderText(-2, -5, text, 50, 0);
    
            drawCota(0, 80, canvasTextLength, roundToHalfs(textLength).toString(), 1);
            drawCota(-100, 0, 0, "", 2);
            drawCota(-100, 0, 0, "", 3);
        }
    
        // make letter guide
        let letterGuide = document.getElementById("letterguide-container");
        letterGuide.innerHTML = "";
    
        letterGuide.innerText = "Espacio entre letras: " + roundToHalfs(letterSpacing * size) + "mm\n\n";
        letterGuide.innerText += "Ancho de las letras:\n";
    
        let letterWidthTable = document.createElement("table");
    
        for(let i = 0; i != text.length; i++) {
            let tableRow = document.createElement("tr");
    
            let letter = document.createElement("td");
            let equalSign = document.createElement("td");
            let letterWidth = document.createElement("td");
    
            letter.innerText = text.charAt(i);
            equalSign.innerText = "=";
            letterWidth.innerText = roundToHalfs(charLengths[text.charCodeAt(i)] * size) + "mm";
    
            tableRow.appendChild(letter);
            tableRow.appendChild(equalSign);
            tableRow.appendChild(letterWidth);
    
            letterWidthTable.appendChild(tableRow);
        }
    
        letterGuide.appendChild(letterWidthTable);
    }
    
    function drawCota(x, y, width, text, textId) {
        graphics.lineStyle(2, 0x000000, 1);
        graphics.moveTo(x, y);
        graphics.lineTo(x + width, y);
    
        // draw end lines
        graphics.moveTo(x, 0);
        graphics.lineTo(x, y + 10);
        graphics.moveTo(x + width, 0);
        graphics.lineTo(x + width, y + 10);
    
        // draw arrows at the ends
        graphics.lineStyle(0);
        graphics.beginFill(0x000000, 1);
        graphics.drawPolygon([x, y, x + 16, y + 3, x + 16, y - 3]);
        graphics.drawPolygon([x + width, y, x + width - 16, y + 3, x + width - 16, y - 3]);
        graphics.endFill();
    
    
        renderText(width / 2 - getFullLength(text, 17.5) / 2 + x, y - 25, text, 25, textId);
    }
    
    
    // weird way to accurately render text, but it works
    function renderText(x, y, text, size, textId) {
        let textObject = { chars: [] };
    
        if(textObjects[textId]) {
            for(let i = 0; i != textObjects[textId].chars.length; i++){
                textObjects[textId].chars[i].destroy();
            }
        }
    
        let xpos = x;
    
        for(let i = 0; i != text.length; i++){
            let charObject = new PIXI.BitmapText(text.charAt(i), { fontName: 'isocpeur', fontSize: size});
            charObject.x = xpos;
            charObject.y = y;
    
            pixiApp.stage.addChild(charObject);
            textObject.chars.push(charObject);
            xpos += charLengths[text.charCodeAt(i)] * (size-size/(10/3));
    
            if(text.charAt(i + 1) && text.charAt(i + 1) != " " && text.charAt(i) != " ") {
                xpos += letterSpacing * (size-size/(10/3));
            }
        }
    
        textObjects[textId] = textObject;
    }
    
    function getFullLength(text, h) {
        let result = 0;
    
        for(let i = 0; i != text.length; i++) {
            if(charLengths[text.charCodeAt(i)] != null) {
                result += charLengths[text.charCodeAt(i)];
    
                if(text.charAt(i + 1) && text.charAt(i + 1) != " " && text.charAt(i) != " ") {
                    result += letterSpacing;
                }
            }
            else {
               return NaN; 
            }
        }
    
        result *= h;
    
        return result;
    }
    
    function getCenterStart(textLength, rowLength) {
        return rowLength / 2 - textLength / 2;
    }
    
    function roundToHalfs(number) {
        return Math.round(number * 2) / 2;
    }
});