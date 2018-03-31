
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
	draw:(x,y,color="#777")=>{
		snake.changeColor(color);
		ctx.fillRect(x*mutiplier,y*mutiplier,mutiplier,mutiplier);
		snake.body[x][y]=true;
	}
}

let snake={
	pos:{
		head:{},
		tail:{}
	},
	body:[],
	tail:5,
	changeColor:function(color){
		ctx.fillStyle=color;
	}
};

for(let i=0;i<canvas.width;i++) snake.body[i]=[];

/*let food={
	pos:{
		x:getRandomInt(canvas.width),
		y:getRandomInt(canvas.height)
	},
	put:canvas.draw(this.x,this.y,"green")
};*/

let ctx = myCanvas.getContext("2d");

let dir=["up","down","left","right"];

snake.pos.head={
	x:snake.pos.tail.x=getBetweenInt(canvas.offset.x,canvas.width-canvas.offset.x),
	y:snake.pos.tail.y=getBetweenInt(canvas.offset.y,canvas.height-canvas.offset.y)
}

//canvas.draw(snake.pos.head.x,snake.pos.head.y,"#888"); //head
snake.dir=dir[getRandomInt(dir.length)];

/*snake.dir="right";*/

var intv;

switch(snake.dir){
	case "up":
		for(let i=0;i<snake.tail;i++) canvas.draw(snake.pos.tail.x,++snake.pos.tail.y);
		break;
	case "down":
		for(let i=0;i<snake.tail;i++) canvas.draw(snake.pos.tail.x,--snake.pos.tail.y);
		break;
	case "left":
		for(let i=0;i<snake.tail;i++) canvas.draw(++snake.pos.tail.x,snake.pos.tail.y);
		break;
	case "right":
		for(let i=0;i<snake.tail;i++) canvas.draw(--snake.pos.tail.x,snake.pos.tail.y);
		break;
}

/*
intv=setInterval(()=>{
	switch(snake.dir){
		case "up":
			canvas.draw(snake.pos.head.x,--snake.pos.head.y);
			canvas.draw(snake.pos.tail.x,snake.pos.tail.y--,"white");
			break;
		case "down":
			canvas.draw(snake.pos.head.x,++snake.pos.head.y);
			canvas.draw(snake.pos.tail.x,snake.pos.tail.y++,"white");
			break;
		case "left":
			canvas.draw(--snake.pos.head.x,snake.pos.head.y);
			canvas.draw(snake.pos.tail.x--,snake.pos.tail.y,"white");
			break;
		case "right":
			canvas.draw(++snake.pos.head.x,snake.pos.head.y);
			canvas.draw(snake.pos.tail.x++,snake.pos.tail.y,"white");
			break;		
	}
},speed);

*/