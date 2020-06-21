var shades = ["#ffdbac", "#e0ac69", "#8d5524"];

function Hand(side) {
	var self = this;
	self.side = side;
	self.skinTone = shades[Math.floor(Math.random()*3)]; // randomise skin tone

	if(side == "left") {
		var factor = 1;
		var offset = 0;
	} else {
		var factor = -1;
		var offset = window.innerWidth;
	}

	self.bones = [
		// forearm
		new Bone(-400*factor+offset, 400, 500*factor, 0, 50, [
			// palm
			new Bone(0, 0, 150*factor, 0, 75, [
				finger(0, -60, 1.125*factor),
				finger(0, -20, 1.25*factor),
				finger(0, 20, 1.125*factor),
				finger(0, 60, 1*factor),
				// thumb first knuckle
				new Bone(-150*factor, -50, 90*factor, -0.6*factor, 20, [
					// thumb second knuckle
					new Bone(0, 0, 50*factor, 0.3*factor, 17.5, [
						// thumb tip
						new Bone(0, 0, 50*factor, 0.2*factor, 17.5)
					])
				])
			])
		])
	];

	function finger(x, y, scale = 1) {
		// first knuckle
		return new Bone(x, y, 45*scale, 0, 15, [
			// second knuckle
			new Bone(0, 0, 45*scale, 0, 15, [
				// finger tip
				new Bone(0, 0, 35*scale, 0, 15)
			])
		])
	}

	self.draw = function(ctx) {

		function drawBone(bone, showSkin = true, showBone = false, dx = 0, dy = 0, dangle = 0) {
			// modify bone.x and bone.y by remaining angle (dangle)
			var x1 = dx + bone.x*Math.cos(dangle) - bone.y*Math.sin(dangle);
			var y1 = dy + bone.y*Math.cos(dangle) + bone.x*Math.sin(dangle);
			var x2 = dx + bone.x*Math.cos(dangle) - bone.y*Math.sin(dangle) + bone.length*Math.cos(bone.angle + dangle);
			var y2 = dy + bone.y*Math.cos(dangle) + bone.x*Math.sin(dangle) + bone.length*Math.sin(bone.angle + dangle);
			if(showSkin) {
				// calculate skin vertices
				var sx1 = x1 - bone.skinWidth*Math.sin(dangle + bone.angle);
				var sy1 = y1 + bone.skinWidth*Math.cos(dangle + bone.angle);
				var sx2 = x1 + bone.skinWidth*Math.sin(dangle + bone.angle);
				var sy2 = y1 - bone.skinWidth*Math.cos(dangle + bone.angle);
				var sx3 = x2 + bone.skinWidth*Math.sin(dangle + bone.angle);
				var sy3 = y2 - bone.skinWidth*Math.cos(dangle + bone.angle);
				var sx4 = x2 - bone.skinWidth*Math.sin(dangle + bone.angle);
				var sy4 = y2 + bone.skinWidth*Math.cos(dangle + bone.angle);
				// draw skin
				ctx.lineWidth = 4;
				ctx.strokeStyle = self.skinTone;
				ctx.fillStyle = self.skinTone;
				ctx.beginPath();
				ctx.moveTo(sx1, sy1);
				ctx.lineTo(sx2, sy2);
				ctx.lineTo(sx3, sy3);
				ctx.lineTo(sx4, sy4);
				ctx.stroke();
				ctx.fill();
			}
			if(showBone) {
				// draw bone
				ctx.lineWidth = 4;
				ctx.strokeStyle = "red";
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
				// circle at bone origin
				ctx.fillStyle = "red";
				ctx.beginPath();
				ctx.arc(x1, y1, 6, 0, 2*Math.PI);
				ctx.fill();
			}
			// recursively draw children with offset from parent
			for(var i = 0; i < bone.children.length; i++) {
				drawBone(bone.children[i], showSkin, showBone, x2, y2, bone.angle + dangle);
			}
		}

		for(var i = 0; i < self.bones.length; i++) {
			drawBone(self.bones[i]);
		}
	}
}

function Bone(x, y, length, angle = 0, skinWidth = 50, children = []) {
	var self = this;
	self.x = x;
	self.y = y;
	self.length = length;
	self.angle = angle;
	self.children = children;
	self.skinWidth = skinWidth;
}