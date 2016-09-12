var N=20;
var scor=0;


function start_joc(){ //constructor
	vect_obiecte=new Array();

	for(var i=0;i<N;i++) {
		var w=20;
		var h=20;
		var x=rand(0,parseInt(canv.width)-w); //coordonate aleatoare pentru pozitia obiectelor
		var y=rand(0,parseInt(canv.height)-h);
		var src="coffeee.png";
		var zindex=i; // pentru a pastra ordinea
		var ob_joc=new ObiectJoc(src,x,y,w,h,zindex);
		vect_obiecte.push(ob_joc);
		draw();
		setInterval(draw,100);
	}
	personaj= new Personaj("sleepy.png",100,100,64,64);
}

window.onload=function(){
	canv=document.getElementById("canv");
	ctx=canv.getContext("2d");
}

function ObiectJoc(src,x,y,w,h,zindex){
	this.src=src;
	this.x=x;
	this.y=y;
	this.w=w;
	this.h=h;
	this.zindex=zindex;
	var xf=rand(0,parseInt(canv.width-w));
	var yf=rand(0,parseInt(canv.height-h));
	this.miscare_continua=true;
	init_miscare(this,x,y,xf,yf,50);
	
}

function rand(a,b){
	return Math.floor(a+Math.random()*(b-a));
}


function init_miscare(ob, left_i, top_i, left_f, top_f, nr_pasi)
{

var DLeft=left_f-left_i;
var DTop=top_f-top_i;

var dleft=DLeft/nr_pasi;
var dtop=DTop/nr_pasi;
var top_r=top_i;
var left_r=left_i;
misca(ob,top_r,left_r,1,nr_pasi,dleft,dtop,left_f,top_f);
}

function misca(ob,top_r,left_r,pas_c,nr_pasi,dleft,dtop,left_f,top_f)
{

if (pas_c<nr_pasi)
    	{
    	top_r+=dtop;
    	left_r+=dleft;
    	ob.y=(Math.round(top_r));
    	ob.x=(Math.round(left_r));
       	pas_c++;
    	setTimeout(function () {misca(ob,top_r,left_r,pas_c,nr_pasi,dleft,dtop,left_f,top_f);},50);

    	}
else 
    	{
			if(ob.miscare_continua)
			{
			ob.y=(top_f);
			ob.x=(left_f);
			xf=rand(0,parseInt(canv.width-ob.w));
			yf=rand(0,parseInt(canv.height-ob.h));
			init_miscare(ob,ob.x,ob.y,xf,yf,50);
			}
		}
}



function draw(){
	//sortare dupa zindex
	ctx.clearRect(0,0,canv.width,canv.height);
	ctx.beginPath();
	for(var i=0;i<vect_obiecte.length;i++)
	{
		if(coliziune(vect_obiecte[i],personaj))
		{
			vect_obiecte.splice(i,1); // sterge 1 element(al doilea parametru) de pe pozitia i
			i--;
			scor++;
		}
		else{
		var imag=document.getElementById("ceva");
		ctx.drawImage(imag,vect_obiecte[i].x,vect_obiecte[i].y);
		}
	}
	var imag=document.getElementById("personaj");
	ctx.drawImage(imag,personaj.x,personaj.y);
	
	ctx.fillStyle = "rgb(205,104,137)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Scor: " + scor, 32, 32);
	ctx.closePath();
	if(scor==20)
		alert('Felicitari! Ai baut toate cafelele si nu mai esti somnoros! Daca vrei sa joci din nou, apasa butonul Start!');
}


function coliziune(ob1,ob2)
{
	if (ob1.x<=ob2.x+ob2.w&&ob2.x+ob2.w<=ob1.x+ob1.w)
	{
		if(ob1.y<=ob2.y&&ob2.y<=ob1.y+ob1.h)
			return true;
		if(ob1.y<=ob2.y+ob2.h&&ob2.y+ob2.h<=ob1.h+ob1.y)
			return true;
	}
	if(ob1.x<=ob2.x&&ob2.x<=ob1.x+ob1.w)
	{
		if(ob1.y<=ob2.x&&ob2.y<=ob1.y+ob1.h)
			return true;
		if(ob1.y<=ob2.y+ob2.h&&ob2.y+ob2.h<=ob1.h+ob1.y)
			return true;
	}
	 
	return false;
}


function Personaj(src,x,y,w,h)
{
	this.src=src;
	//this.x=x;this.y=y;
	
	//pun bufnita intr-o pozitie random
	this.x=rand(0,parseInt(canv.width-w));
	this.y=rand(0,parseInt(canv.height-h));
	this.w=w;
	this.h=h;
}



document.onkeydown=function()
{
	var e=arguments[0];
	var cod=e.keyCode?e.keyCode:e.charCode;
	if(cod=='37' && personaj.x-5>0)//left
		personaj.x-=5;
	if(cod=='39' && personaj.x+5<canv.width)//right
		personaj.x+=5;
	if(cod=='38' && personaj.y-5>0)//up
		personaj.y-=5;
	if(cod=='40' && personaj.y+5<canv.height)//down
		personaj.y+=5;
}