var beats = {
	"rock": "scissors",
	"paper": "rock",
	"scissors": "paper"
}

function Game(controller, h1, h2) {
	var self = this;
	self.controller = controller;
	self.h1 = h1;
	self.h2 = h2;
	self.timer = 3;
	self.prevTime = new Date();

	self.update = function() {
		if(self.controller.newRound) {
			self.timer = 3;
			self.controller.newRound = false;
		}

		var currentTime = new Date();
		var delta = (currentTime - self.prevTime)/1000;
		self.timer -= delta;
		self.prevTime = currentTime;
	}

	self.draw = function() {
		var size = 128 * 4 * (1 - Math.max(0.75, self.timer % 1));
		var mainText = Math.ceil(self.timer);
		var subText = "";
		if(self.timer <= -1.5) {
			size = 64;
			if(self.controller.shapes.left == null || self.controller.shapes.right == null ) {
				mainText = "Whoops";
				subText = "No winners, no points!";
			} else {
				if(self.controller.shapes.left == self.controller.shapes.right) {
					// tie
					mainText = self.controller.shapes.left+" ties with "+self.controller.shapes.right;
					subText = "No winners, no points!";
				} else if(beats[self.controller.shapes.left] == self.controller.shapes.right) {
					// left wins
					mainText = self.controller.shapes.left+" beats "+self.controller.shapes.right;
					subText = "Left wins!";
				} else {
					// right wins
					mainText = self.controller.shapes.left+" is beaten by "+self.controller.shapes.right;
					subText = "Right wins!";
				}
			}
		} else if(mainText <= 0) {
			mainText = "GO!";
		}
		ctx.font = size+"px Staatliches";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(mainText, canvas.width/2, 150+size/4);
		ctx.font = "32px Staatliches";
		ctx.fillStyle = "gray";
		ctx.fillText(subText, canvas.width/2, 208);
	}
}