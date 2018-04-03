/*lib*/
let getRandomInt=max=>Math.floor(Math.random() * Math.floor(max));
let getBetweenInt=(min, max)=> {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let posMatch=(pos1,pos2)=>{
	if(pos1.x==pos2.x&&pos1.y==pos2.y) return true;
}

let arrayMatch=(array,item)=>{
	for(let x of array) if(x.x==item.x&&x.y==item.y) return true;
}

/*initial*/

let mutiplier=10;
let speed=1000;
let canvas={
	offset:{
		x:10,
		y:10
	},
	width:myCanvas.width/mutiplier,
	height:myCanvas.height/mutiplier,
	penColor:color=>ctx.fillStyle=color,
	fill:(x,y)=>ctx.fillRect(x*mutiplier,y*mutiplier,mutiplier,mutiplier)
}

let food={
	pos:{},
	create:()=>{
		food.pos={
			x:getRandomInt(canvas.width),
			y:getRandomInt(canvas.height)		
		}
		food.draw(food.pos);
	},
	draw:({x,y})=>{
		canvas.penColor("yellow");
		canvas.fill(x,y);
	}
};

let snake={
	head:{},
	getTail:x=>x=snake.body[0],
	dir:"",
	grow:false,
	body:[],
	length:5,
	draw:({x,y})=>{
/*		canvas.penColor("#777");
*/		canvas.penColor("#fff");
		snake.body.push({x,y});
		canvas.fill(x,y);
	},
	erase:({x,y})=>{
		canvas.penColor("gray");
		snake.body.splice(0,1);
		canvas.fill(x,y);		
	},
	lookingforGrow:()=>{
	if(snake.grow){
		snake.grow=false;
		food.create();
	}
	else snake.erase(snake.getTail());
}

};

let ctx = myCanvas.getContext("2d");
let dir=["up","down","left","right"];

snake.head={
	x:getBetweenInt(canvas.offset.x,canvas.width-canvas.offset.x),
	y:getBetweenInt(canvas.offset.y,canvas.height-canvas.offset.y)
};

snake.draw(snake.head); //head

snake.dir=dir[getRandomInt(dir.length)];
food.create();

let move=()=>{switch(snake.dir){
	case "up":
		snake.draw({x:snake.head.x, y:--snake.head.y});
		snake.lookingforGrow();
		break;
	case "down":
		snake.draw({x:snake.head.x, y:++snake.head.y});
		snake.lookingforGrow();
		break;
	case "left":
		snake.draw({x:--snake.head.x, y:snake.head.y});
		snake.lookingforGrow();
		break;
	case "right":
		snake.draw({x:++snake.head.x, y:snake.head.y});
		snake.lookingforGrow();
		break;		
	}
}

onkeydown=(e)=>{
	switch(e.keyCode){
		case 37:
			snake.dir="left";
			break;
		case 38:
			snake.dir="up";
			break;
		case 39:
			snake.dir="right";
			break;
		case 40:
			snake.dir="down";
			break;
	}
}

let intv=setInterval(()=>{

	if(posMatch(snake.head,food.pos)) snake.grow=true;
	move();
},200);