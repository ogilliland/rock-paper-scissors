function Hand(side) {
	var self = this;
	self.side = side;
	if(side == "left") {
		self.bones = [
			// forearm
			new Bone(-400, 400, 500, 0, [
				// palm
				new Bone(0, 0, 175, 0, [
					finger(0, -75, 1.125),
					finger(0, -25, 1.25),
					finger(0, 25, 1.125),
					finger(0, 75, 1),
					// thumb first knuckle
					new Bone(-150, -75, 75, -0.8, [
						// thumb second knuckle
						new Bone(0, 0, 75, 0.4, [
							// thumb tip
							new Bone(0, 0, 50, 0.2)
						])
					])
				])
			])
		];
	} else {
		self.bones = [
			// forearm
			new Bone(window.innerWidth + 400, 400, -500, 0, [
				// palm
				new Bone(0, 0, -175, 0, [
					finger(0, -75, -1.125),
					finger(0, -25, -1.25),
					finger(0, 25, -1.125),
					finger(0, 75, -1),
					// thumb first knuckle
					new Bone(150, -75, -75, 0.8, [
						// thumb second knuckle
						new Bone(0, 0, -75, -0.4, [
							// thumb tip
							new Bone(0, 0, -50, -0.2)
						])
					])
				])
			])
		];
	}

	function finger(x, y, scale = 1) {
		// first knuckle
		return new Bone(x, y, 50*scale, 0, [
			// second knuckle
			new Bone(0, 0, 50*scale, 0, [
				// finger tip
				new Bone(0, 0, 40*scale, 0)
			])
		])
	}

	self.draw = function(ctx) {

		ctx.strokeStyle = "red";
		ctx.fillStyle = "red";
		ctx.lineWidth = 4;

		function drawBone(bone, dx = 0, dy = 0, dangle = 0) {
			// modify bone.x and bone.y by remaining angle (dangle)
			var x1 = dx + bone.x*Math.cos(dangle) - bone.y*Math.sin(dangle);
			var y1 = dy + bone.y*Math.cos(dangle) + bone.x*Math.sin(dangle);
			var x2 = dx + bone.x*Math.cos(dangle) - bone.y*Math.sin(dangle) + bone.length*Math.cos(bone.angle + dangle);
			var y2 = dy + bone.y*Math.cos(dangle) + bone.x*Math.sin(dangle) + bone.length*Math.sin(bone.angle + dangle);
			// draw bone
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
			// circle at bone origin
			ctx.beginPath();
			ctx.arc(x1, y1, 6, 0, 2*Math.PI);
			ctx.fill();
			// recursively draw children with offset from parent
			for(var i = 0; i < bone.children.length; i++) {
				drawBone(bone.children[i], x2, y2, bone.angle + dangle);
			}
		}

		for(var i = 0; i < self.bones.length; i++) {
			drawBone(self.bones[i]);
		}
	}
}

function Bone(x, y, length, angle = 0, children = []) {
	var self = this;
	self.x = x;
	self.y = y;
	self.length = length;
	self.angle = angle;
	self.children = children;
}