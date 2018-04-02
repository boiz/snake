/*lib*/
let getRandomInt=max=>Math.floor(Math.random() * Math.floor(max));
let getBetweenInt=(min, max)=> {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
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
	draw:({x,y})=>{
		snake.changeColor("#777");
		snake.body.push({x,y});
		ctx.fillRect(x*mutiplier,y*mutiplier,mutiplier,mutiplier);
	},
	erase:({x,y})=>{
		snake.changeColor("gray");
		snake.body.splice(0,1);
		ctx.fillRect(x*mutiplier,y*mutiplier,mutiplier,mutiplier);
	}
}

let snake={
	head:{},
	getTail:x=>x=snake.body[0],
	dir:"",
	grow:false,
	body:[],
	length:5,
	changeColor:color=>ctx.fillStyle=color
};

//for(let i=0;i<canvas.width;i++) snake.body[i]=[];


let ctx = myCanvas.getContext("2d");
let dir=["up","down","left","right"];

snake.head={
	x:getBetweenInt(canvas.offset.x,canvas.width-canvas.offset.x),
	y:getBetweenInt(canvas.offset.y,canvas.height-canvas.offset.y)
}

canvas.draw(snake.head); //head

//snake.dir=dir[getRandomInt(dir.length)];

snake.dir="up";

let intv;
let grow=false;

let move=()=>{switch(snake.dir){
	case "up":
		canvas.draw({x:snake.head.x, y:--snake.head.y});
		if(!snake.grow)canvas.erase(snake.getTail());
		break;
	case "down":
		canvas.draw({x:snake.head.x, y:++snake.head.y});
		if(!snake.grow)canvas.erase(snake.getTail());
		break;
	case "left":
		canvas.draw({x:--snake.head.x, y:snake.head.y});
		if(!snake.grow)canvas.erase(snake.getTail());
		break;
	case "right":
		canvas.draw({x:++snake.head.x, y:snake.head.y});
		if(!snake.grow)canvas.erase(snake.getTail());
		break;		
	}
}