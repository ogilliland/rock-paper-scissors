var canvas, ctx, h1, h2, controller;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	h1 = new Hand("left");
	h2 = new Hand("right");
	controller = new Controller();
}

function updateCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	h1.draw(ctx);
	h2.draw(ctx);
	requestAnimationFrame(draw);
}

window.onresize = function() {
	updateCanvas();
}

window.onload = function() {
	init();
	updateCanvas();
	draw();
}