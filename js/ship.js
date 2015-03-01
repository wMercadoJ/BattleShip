
var Ship = function(id){
	this.status = 'ALIVE';
	this.location = ["11","12"];
	this.direction = "VERTICAL";
	this.id = id;

	this.isDestroyed = function(){
		return true;
	};

	this.isHit = function(){
		return true;
	};


}