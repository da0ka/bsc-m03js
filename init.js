(function(){
	var F=[],hit="\0";
	window.wait0=function(fn){
		F[F.length]=fn;
		window.postMessage(hit,"*")
	};
	window.onmessage=function(e){
		if(e.source===window&&e.data===hit)
			e.stopPropagation(),
			F[0]&&F.shift()()
	}
})();
(function(){
	var of=document.forms.oform,uf=document.forms.uform,info=document.getElementById("info"),b=document.getElementById("flist"),c;
	b.ondrop=uf.upfile.onchange=function(e){b.className="dpass";
		function rate(a,z){sum+=a-rate.a;rate.a=a;info.value=(a/z*1e4|0)/100+"%";info.style.width=(sum/fs*1e4|0)/100+"%"}
		function done(O,a,z){rate(a,a);i+=z;
			f[f.p].e.lastChild.value=a+' to '+z+' in '+(new Date-fr.st)+'ms',
			f[f.p].e.firstChild.href=URL.createObjectURL(new Blob([O.buffer||new Uint8Array(O)])),
			++f.p<f.length?fr.readAsArrayBuffer(f[f.p]):info.value+=", "+fs+" to "+i+"("+(i/fs*1e4|0)/100+"%)"+", "+(new Date-e)+"ms";uf.upfile.value=""
		}
		var f=(e.dataTransfer||e.target).files,i=f.p=0,n,r,sum=0,fs=0,fr=new FileReader,dc=uf.fdec.checked,blks=of.bs.value<<10*of.bkm.selectedIndex;
		if(blks>0x7ff00000)blks=0x7ff00000;
		self.BWTe=of.sorter.selectedIndex?libsais_bwt:i2srBWTe;
		fr.onload=function(a){
			fr.st=new Date;a=new Uint8Array(fr.result);rate.a=0;
			dc?M03d(a,done,rate):M03e(a,blks,of.ss.selectedIndex,done,rate)
		}
		for(e.preventDefault(e.stopPropagation());e=f[i++];fs+=e.size)
			e.e=r=document.createElement("li"),n=e.name,
			r.innerHTML='<a download="'+n+'.out">'+n+'</a> <input type=button>',
			b.appendChild(r);
		i=0;e=new Date;fr.readAsArrayBuffer(f[f.p])
	};
	b.onclick=function(e){e=e.target||e.srcElement;e.nodeName=="INPUT"&&e.type=="button"&&confirm("remove?")?e.parentNode.outerHTML="":0};
	b.ondragover=function(e){this.className="dover";e.preventDefault();e.dataTransfer.dropEffect='copy'};
	b.ondragleave=function(){this.className="dpass"}
	document.getElementById("kill").onclick=function(){
		info.value="ready..";
		uf.upfile.value=b.innerHTML=""
	};
	document.getElementById("save").onclick=function(){
		for(var a=b.getElementsByTagName("a"),c=0,d;d=a[c++];)d.click();
		if(c<2)a=this,a.innerText="miss",setTimeout(function(){a.innerText="Save"},500)
	};
	of.onclick=function(e,n){
		e=e.target||e.srcElement;
		if(e.nodeName=="INPUT")n=e.type,n!="text"&&n!="number"||(e.value="")
	};
	for(c of of.children)c.nodeName!="INPUT"&&c.type!="text"||(c.onblur=function(){this.value||(this.value=this.defaultValue)})
})()