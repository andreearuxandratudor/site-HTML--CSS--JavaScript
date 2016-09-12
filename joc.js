var nr_incarcate=0;
var nr_de_incarcat;
var v_img=[];



function incarca()
{
	$.get('joc.xml',function(data)
	{
		
		var imagini = data.getElementsByTagName("imagine");
		nr_de_incarcat=imagini.length;
		for(var i=0;i<imagini.length;i++)
		{
			
			// presupunem ca src e mereu primul
			var s = imagini[i].childNodes[1];
			
			//var s = imagini[i].getElementsByTagName("src")[0];
			//ca sa le adaugam in pagina:
			var p = document.createElement("img");
			v_img.push(p);
			p.src=s.textContent;
			//p=new Image(s.textContent);
			//document.body.appendChild(p);
			p.onload=function()
			{
				nr_incarcate++;
				if(nr_incarcate==nr_de_incarcat){
													document.getElementById("b_start").disabled=false;
												}
			}
			var pgf=document.createElement('p');
			pgf.innerHTML=imagini[i].getAttribute("clasa");	
			document.body.appendChild(pgf);
		}
	});
}

function desen()
{
	canv=document.getElementById("canv");
	ctx=canv.getContext("2d");
	for(var i=0;i<v_img.length;i++)
	{
		ctx.drawImage(v_img[i],i*30,i*30);
	}
}