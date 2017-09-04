var d = document;
var body = d.getElementsByTagName('body')[0]
,   pageWidth = body.getClientRects()[0].width
,   pageHeight = body.getClientRects()[0].height
,   c = d.getElementById('c')
,   ctx = c.getContext('2d')
,   title = d.getElementById('title')
,   pointCount = 256
,   velocityScale = 4
,   minVelocity = .25
,   minSize = 1
,   sizeScale = 1.3
,   dt = 0.1;

window.onresize = function (event) {
    c.width = pageWidth = event.target.innerWidth;
    c.height = pageHeight = event.target.innerHeight;
}
c.width = pageWidth;
c.height = pageHeight;

// 5 values: 
// x, y 
// v_x, v_y
// size
// color
var points = new Array(pointCount * 5);
for (var j=0,jlen=points.length;j<jlen;j+=5){
    points[j    ] = Math.random() * pageWidth;
    points[j + 1] = Math.random() * pageHeight;
    points[j + 2] = (2*Math.random() - 1) * velocityScale;
    points[j + 3] = (2*Math.random() - 1) * velocityScale;
    if (Math.abs(points[j + 1]) < minVelocity) { points[j + 1] = minVelocity }
    if (Math.abs(points[j + 2]) < minVelocity) { points[j + 2] = minVelocity }
    points[j + 4] = minSize + Math.random() * sizeScale;
//         points[j + 5] = points[j + 4];
}

// ctx.fillStyle = "#524656";
ctx.fillStyle = "#CF4647"

var step = function () {
    ctx.clearRect(0,0,pageWidth,pageHeight);
    for (var j=0,jlen=points.length;j<jlen;j+=5){
        // evolve
        points[j    ] += points[j + 2] * dt;
        points[j + 1] += points[j + 3] * dt;
        if (points[j] > pageWidth + points[j+4]) {
            points[j] = -points[j+4];
        } else if (points[j] < -points[j+4]) {
            points[j] = pageWidth + points[j+4];
        }
        if (points[j + 1] > pageHeight + points[j+4]) {
            points[j + 1] = -points[j+4];
        } else if (points[j + 1] < -points[j+4]) {
            points[j + 1] = pageHeight + points[j+4];
        }
        
        // draw
        ctx.beginPath();
        ctx.arc(points[j],points[j+1],points[j+4],0,2*Math.PI);
        ctx.fill();
    }
    requestAnimationFrame(step);
}

// go!
step();

function removeClass(element, _class) {
    element.className = (' '+element.className+' ').split(' ' + _class + ' ').join(' ');
}
function addClass(element, _class) {
    element.className += ' ' + _class;
}

/*
var squeezeType = false;
title.onmouseleave = function (event) {
    console.log("exit")
    squeezeType = !squeezeType;
    if (squeezeType) {
        removeClass(title, "squeeze-high");
        addClass(title, "squeeze-low");
    } else {
        removeClass(title, "squeeze-low");
        addClass(title, "squeeze-high");
    }
}
*/