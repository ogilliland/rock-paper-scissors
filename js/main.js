var canvas, ctx, game;

function init() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	h1 = new Hand("left");
	h2 = new Hand("right");
	controller = new Controller();
	game = new Game(controller, h1, h2);
}

function updateCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw() {
	game.update();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	game.h1.draw(ctx);
	game.h2.draw(ctx);
	game.draw(ctx);
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