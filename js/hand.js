function Hand(side) {
	var self = this;
	self.side = side;

	self.draw = function(ctx) {
		ctx.fillStyle = "red";
		if(self.side == "left") {
			ctx.fillRect(0, ctx.canvas.height/2 - 50, 100, 100);
		} else {
			ctx.fillRect(ctx.canvas.width - 100, ctx.canvas.height/2 - 50, ctx.canvas.width, 100);
		}
	}
}