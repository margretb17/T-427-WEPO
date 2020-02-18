/*
    Define the shapes
*/
/******************* SHAPES *******************/
function Shape(position) {
    this.position = position;
    this.fill = drawio.fillElement;
    this.color = drawio.startColor;
    this.lineWidth = drawio.lineWidth;
};

Shape.prototype.render = function () {};

// Shape.prototype.move = function (shape, offset) {
//     console.log('move')
//     shape.position.x = offset.x;
//     shape.position.y = offset.y;
// }

Shape.prototype.resize = function () {};

/******************* RECTANGLE *******************/
function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};

// Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.beginPath();
    if (this.fill) {
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    } else {
        drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
    // drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

// Rectangle.prototype.move = function(position) {
//     this.__proto__.proto__.move.call(this, position);
// };

/******************* CIRCLE *******************/
function Circle(position, width, height, radius) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
    this.radius = radius;
};

// Assign the prototype
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    if (this.fill) {
        drawio.ctx.fill();
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Circle.prototype.resize = function (radius) {
    if (radius - this.position.x > 0) {
        this.radius = radius - this.position.x;
    } else {
        this.radius = -(radius - this.position.x);
    }
};

/******************* LINE *******************/
function Line(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
};

// Assign the prototype
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x, this.position.y);
    drawio.ctx.lineTo(this.width + this.position.x, this.height + this.position.y);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Line.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

/******************* PENCIL *******************/
function Pencil(position) {
    Shape.call(this, position);
    this.points = [];
}

// Assign the prototype
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.render = function () {
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.lineCap = 'round';
    drawio.ctx.beginPath();
    for (var i = 0; i < this.points.length; i++) {
        point = this.points[i];
        drawio.ctx.lineTo(point.x, point.y);
    }
    drawio.ctx.stroke();
};

Pencil.prototype.resize = function (x, y) {
    this.points.push({ x: x, y: y});
};

/******************* TEXT *******************/
function Text(position) {
    Shape.call(this, position);
    this.fontSize = drawio.fontSize;
    this.font = `${this.fontSize}px ${drawio.Font}`;
    this.text = drawio.Text;
    this.color = drawio.startColor;
}

// Assign the prototype
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function () {
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.font
    drawio.ctx.fillText(this.text, this.position.x, this.position.y);
}

Text.prototype.resize = function (text, font) {

}

