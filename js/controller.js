var controls = {
	"32": "newRound",
	"49": { // 0 key
		"player": "left",
		"shape": "rock"
	},
	"50": { // 1 key
		"player": "left",
		"shape": "paper"
	},
	"51": { // 2 key
		"player": "left",
		"shape": "scissors"
	},
	"54": { // 6 key
		"player": "right",
		"shape": "rock"
	},
	"55": { // 7 key
		"player": "right",
		"shape": "paper"
	},
	"56": { // 8 key
		"player": "right",
		"shape": "scissors"
	}
}

function Controller() {
	var self = this;

	self.resetShapes = function() {
		self.shapes = {
			"left": null,
			"right": null
		}
	}

	self.activeRound = true;
	self.resetShapes();

	window.onkeypress = function(e) {
		var charCode = parseInt((e.which) ? e.which : e.keyCode);
		input = controls[charCode];

		if(input != undefined) {
			if(input == "newRound" && !self.activeRound) {
				self.newRound = true;
			} else if(input.hasOwnProperty("player") && input.hasOwnProperty("shape") && self.activeRound) {
				self.shapes[input.player] = input.shape;
			}
		}
	}
}