/*snake game by Chase last edited 4/5/2018*/

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

let multiplier=10;
let speed=200;
let canvas={
	offset:{
		x:10,
		y:10
	},
	width:myCanvas.width/multiplier,
	height:myCanvas.height/multiplier,
	penColor:color=>ctx.fillStyle=color,
	fill:(x,y)=>ctx.fillRect(x*multiplier,y*multiplier,multiplier,multiplier)
}

let food={
	pos:{},
	create:()=>{
		food.pos={
			x:getRandomInt(canvas.width),
			y:getRandomInt(canvas.height)		
		}
		if(arrayMatch(snake.body,food.pos)) food.create();
		else food.draw(food.pos);
	},
	draw:({x,y})=>{
		canvas.penColor("yellow");
		canvas.fill(x,y);
	}
};

let snake={
	head:{},
	getTail:x=>x=snake.body[0],
	dir:{
		current:"",
		pre:""
	},
	grow:false,
	body:[],
	length:5,
	draw:({x,y})=>{
		canvas.penColor("white");
		snake.body.push({x,y});
		canvas.fill(x,y);
	},
	erase:({x,y})=>{
		canvas.penColor("gray");
		snake.body.splice(0,1);
		canvas.fill(x,y);		
	},
	next:{}
};

let ctx = myCanvas.getContext("2d");
let dir=["up","down","left","right"];

let move=()=>{
	let crash;
	switch(snake.dir.current){
		case "up":
			snake.next={
				x:snake.head.x,
				y:snake.head.y-1
			};
			crash=snake.next.y<0;
			snake.dir.pre="up";
			break;
		case "down":
			snake.next={
				x:snake.head.x,
				y:snake.head.y+1
			};
			crash=snake.next.y==canvas.height;		
			snake.dir.pre="down";
			break;
		case "left":
			snake.next={
				x:snake.head.x-1,
				y:snake.head.y
			};
			crash=snake.next.x<0;		
			snake.dir.pre="left";
			break;
		case "right":
			snake.next={
				x:snake.head.x+1,
				y:snake.head.y
			};
			crash=snake.next.x==canvas.width;		
			snake.dir.pre="right";
			break;
		}

	if(crash||arrayMatch(snake.body,snake.next)){
		clearInterval(intv);
		start.disabled="";
		return;
	};		

	snake.draw(snake.head=snake.next);
	if(snake.grow){
		snake.grow=false;
		score.innerText=Number(score.innerText)+1;
		food.create();
	}
	else snake.erase(snake.getTail());
}

let initCreate=()=>{
	switch(snake.dir.current){
		case "up":
			snake.draw({x:snake.head.x, y:--snake.head.y});
			break;
		case "down":
			snake.draw({x:snake.head.x, y:++snake.head.y});
			break;
		case "left":
			snake.draw({x:--snake.head.x, y:snake.head.y});
			break;
		case "right":
			snake.draw({x:++snake.head.x, y:snake.head.y});
			break;
		}
}

onkeydown=e=>{
	switch(e.keyCode){
		case 37:
			if(snake.dir.pre=="up"||snake.dir.pre=="down") snake.dir.current="left";
			break;
		case 38:
			if(snake.dir.pre=="left"||snake.dir.pre=="right") snake.dir.current="up";
			break;
		case 39:
			if(snake.dir.pre=="up"||snake.dir.pre=="down") snake.dir.current="right";
			break;
		case 40:
			if(snake.dir.pre=="left"||snake.dir.pre=="right") snake.dir.current="down";
			break;
	}
}

let intv;

start.onclick=()=>{
	start.disabled="disabled";

	canvas.penColor("gray");
	ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
	snake.body=[];

	snake.head={
		x:getBetweenInt(canvas.offset.x,canvas.width-canvas.offset.x),
		y:getBetweenInt(canvas.offset.y,canvas.height-canvas.offset.y)
	};

	snake.dir.current=dir[getRandomInt(dir.length)];
	food.create();

	for(let i=0;i<snake.length;i++) initCreate();

	intv=setInterval(()=>{
		if(posMatch(snake.head,food.pos)) snake.grow=true;
		move();
	},speed);

}

start.click();