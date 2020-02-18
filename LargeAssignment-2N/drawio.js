/******************* DRAWIO *******************/
/*
    Structure for the assignment 2 project
*/
window.drawio = {
    shapes: [],
    unreShapes: [],
    selectedShape: 'pencil',
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    startColor: "#000000",
    fillElement: false,
    lineWidth: 10,
    fontSize: 45,
    Font: 'Arial',
    Text: '',
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        LINE: 'line',
        PENCIL: 'pencil',
        TEXT: 'text',
        MOVE: 'move',
    }
};

$(function (){
    // Document is loaded and parsed
    function drawCanvas() {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        if (drawio.selectedElement) {
            drawio.selectedElement.render();
        }
        for (var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    };

    $('.icon').on('click', function () {
        if ($(this).data('shape')) {
            $('.icon').removeClass('selected');
            $(this).addClass('selected');
            if($(this).data('shape') === 'text') {
                $('#text-tool-settings').removeClass('hidden');
            } else {
                $('#text-tool-settings').addClass('hidden');
            }
            drawio.selectedShape = $(this).data('shape');
        }
    });

/******************* CLEAR ALL *******************/
    $('#clearAll').on('click', function () {
        drawio.shapes = [];
        drawio.unreShapes = [];
        drawCanvas();
    });

/******************* UNDO *******************/
    $('#undo').on('click', function () {
        if (drawio.shapes.length) {
            var poppedElement = drawio.shapes.pop();
            drawio.unreShapes.push(poppedElement);
            drawCanvas();
            console.log('clicked');
        }
    });

    /******************* REDO *******************/
    $('#redo').on('click', function () {
        if (drawio.unreShapes.length) {
            let poppedElement = drawio.unreShapes.pop();
            drawio.shapes.push(poppedElement);
            drawCanvas();
            console.log('clicked');
        }
    });
    
    /******************* FONTS *******************/
    // listen when fonts from dropdownList get changes
    $('#fontSelect').on('change', function () {
        drawio.Font = $("#fontSelect option:selected").text();
    });

    /******************* TEXT *******************/
    $('#textBox').on('input', function () {
        drawio.Text = $('#textBox').val();
    });

    /******************* LINE WIDTH *******************/
    $('#line-size').on('change', function () {
        drawio.lineWidth = $('#line-size').val();
        $('#valueOfRange').text(drawio.lineWidth);
    });

    /******************* SIZE OF TEXT *******************/
    $('#font-size').on('change', function () {
        drawio.fontSize = $('#font-size').val();
        $('#valueOfFontSize').text(drawio.fontSize);
    });

    /******************* FILL SHAPES *******************/
    $('#fillShapes').change(function () {
        if ($(this).is(":checked")) {
            drawio.fillElement = true;
        } else {
            drawio.fillElement = false;
        }
    });
    /******************* COLORS *******************/
    $('#color-picker').change(function () {
        drawio.startColor = $('#color-picker').spectrum('get').toHexString();
    });

    /******************* LIST OF SAVED FILES *******************/
    function listOfFiles() {
        for (var i = 0; i < localStorage.length; i++) {
            var fileName = localStorage.key(i);
            var listElement = $("<option class=\"list-of-files\"></option>").attr('data-name', fileName).html(fileName);
            $('#all-files').append(listElement);
        }
    }
    listOfFiles();

    /******************* SAVE DRAWINGS *******************/
    $('#save-btn').on('click', function () {
        var fileNames = [];
        for (var i = 0; i < localStorage.length; i++) {
            fileNames.push(localStorage.key(i));
        }
        var str = JSON.stringify(drawio.shapes);
        var data = window.prompt("Name your file:");
        localStorage.setItem(data, str);
        window.alert("Your drawing: " + data + " has been saved!");
    });

    /******************* MOUSE-DOWN *******************/
    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({ x: mouseEvent.offsetX, y: mouseEvent.offsetY}, 0, 0);
                break;
            case drawio.availableShapes.PENCIL:
                drawio.selectedElement = new Pencil({ x: mouseEvent.offsetX, y: mouseEvent.offsetY });
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({ x: mouseEvent.offsetX, y: mouseEvent.offsetY }, 0, 0);
                break;
            // case drawio.availableShapes.MOVE:
            // 
        }
    });

    /******************* MOUSE-MOVE *******************/
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if (drawio.selectedElement) {
            // drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
        }
        drawCanvas();
    });

    /******************* MOUSE-UP *******************/
    $('#my-canvas').on('mouseup', function () {
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
    });

    /******************* COLOR-PICKER *******************/
    $("#color-picker").spectrum({
        color: "#000000",
        showInput: true,
        showAlpha: true,
        className: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,
        maxSelectionSize: 10,
        preferredFormat: "hex",
        localStorageKey: "spectrum.demo",
        move: function (color) {

        },
        show: function () {

        },
        beforeShow: function () {

        },
        hide: function () {

        },
        change: function () {

        },
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
        ]
    });

});