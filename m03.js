/* js version of bsc-m03 based on v0.2.1 (c) 2021-2022 Ilya Grebnov

	bsc-m03 is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or(at your option) any later version.
	bsc-m03 is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
	without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
	You should have received a copy of the GNU General Public License along with bsc-m03. If not, see <https://www.gnu.org/licenses/>
*/
/* M03e
@A: input(Uint8Array / Uint16Array)
@bs: block size(256 - 0x7ff00000)
@ss: symbol size(0: 8bits, 1:16bits)
@done: call back of last process.
	done(A)
	@A: compressed array of input.
	e.g, console.log(A)
@rate: call back of progress
	rate(a,z)
	@a: current position
	@z: last position
	e.g, console.log(a/z,"%")
*/
if(!this.wait0)this.wait0=setTimeout;

function M03e(A,bs,ss,done,rate){
	A instanceof Uint8Array||(A=new Uint8Array(A));
	var a=0,z=A.length,m=-1>>>1,bp,rc=new RangeCoder,F=new Uint32Array(65537);
	rate=rate||function(){};done=done||function(A){return A};
	bs&=m;if(bs<256)bs=256;if(bs>z)bs=z;
	rc.EncodeBit(ss&=1,1,1);
	function top(){
		var U=A.subarray(a,a+bs),n=U.length;
		if(a&&n==bs)rc.EncodeBit(0,1,1);
		else a&&rc.EncodeBit(1,1,1),rc.EncodeValue(0,bs=n,m);
		if(!n)return done(rc.Flush(),z,rc.a);
		a&&F.fill(0);rate(a,z);
		bp=BWTe(U.slice(),U,0,F,m=n);
		n>1&&rc.EncodeValue(0,bp-1,n-1);
		wait0(run)
	}
	function run(){
		var i=0,bn=bs>>ss,L=new(ss?Uint16Array:Uint8Array)(bn+1);
		for(;i<bp;)L[i++]=A[a++];
		for(;i<bn;)L[++i]=A[a++];
		i=new m03_parser(L,bn+1,bp,F,1<<8*(ss+1),rc,0);
		i.run();i.destroy();wait0(top)
	}return wait0(top)
}
/* M03d
@A: input (Uint8Array)
@done: call back of last process.
	done(A)
	@A: decompressed array of input.
	e.g, console.log(A)
@rate: call back of progress.
	rate(a,z)
	@a: current position
	@z: last position
	e.g, console.log(a/z,"%")
*/
function M03d(A,done,rate){
	var z=A.length,o=0,bp,rc=new RangeCoder(A),bs=-1>>>1,ss=rc.DecodeBit(1,1),F=new Uint32Array(65537),O=[];
	rate=rate||function(){};done=done||function(A){return A};
	function top(){
		if(!o||rc.DecodeBit(1,1))bs=rc.DecodeValue(0,bs);
		if(!bs)return done(O,z,o);
		o&&F.fill(0);rate(rc.a,z);
		bp=bs>1?rc.DecodeValue(0,bs-1)+1:1;wait0(run)
	}
	function run(){
		var bn=bs>>ss,cs=1<<8*(ss+1),S,p=new m03_parser(0,bn+1,bp,F,cs,rc,1);
		p.run();S=p.S;p.destroy();p=new Uint32Array(bn);
		for(i=cs--;i;)F[i--]=F[i];
		for(F[i]=0;i<cs;)F[i+1]+=F[i++];
		for(i=0;i<bp;)p[F[S[i]]++]=i++;
		for(;i<bn;)p[F[S[i++]=S[i]]++]=i;
		for(i=bp;i;O[o++]=S[i-(i>=bp)])i=p[i-1];
		wait0(top)
	}return wait0(top)
}