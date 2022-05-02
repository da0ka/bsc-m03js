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
	function cmp(a,b){return a-b}
	A instanceof Uint8Array||(A=new Uint8Array(A));
	var a=0,x,z=A.length,m=-1>>>1,p,bp,rc=new RangeCoder,F=new Uint32Array(65537);
	rate=rate||function(){};done=done||function(A){return A};
	bs&=m;if(bs<256)bs=256;if(bs>z)bs=z;
	rc.EncodeBit(ss&=1,1,1);
	function top(){
		var U=A.subarray(a,a+bs),n=U.length;
		if(a&&n==bs)rc.EncodeBit(0,1,1);
		else a&&rc.EncodeBit(1,1,1),rc.EncodeValue(0,bs=n,m);
		if(!n)return done(rc.Flush(),z,rc.a);
		a&&F.fill(0);x=a;
		bp=BWTe(U.slice(),U,0,F,m=n);
		n>1&&rc.EncodeValue(0,bp-1,n-1);
		var i=0,bn=bs>>ss,L=new(ss?Uint16Array:Uint8Array)(bn+1);
		for(;i<bp;)L[i++]=A[a++];
		for(;i<bn;)L[++i]=A[a++];
		p=new m03_parser(L,bn+1,bp,F,1<<8*(ss+1),rc,0);
		p.encode_root_frequencies(F,p.k,bn);
		p.initialize_root_context(F);
		wait0(run)
	}
	function run(){
		var C=p.C,P=p.P,S=p.S,a,q,l,d=256,t=+new Date;
		for(rate(x,z);l=(q=p.current_segments).length;){
			for(a=0,x+=l*1.5>>1;a<l;a=n){
				for(var i=q[a],e=i+C[i],n=a;++n<l&&q[n]<e;);
				if(p.is_trivial_context(i))
					split_trivial_context(C,S,P,p.next_segments,q,a,n);
				else
					populate_context_frequencies(C,S,i,p.primary_index,p.parent_frequencies),
					p.split_context_recursive(q,a,n,0)
			}
			q.length=0;p.current_segments=p.next_segments.sort(cmp);p.next_segments=q;
			if(!--d||Date.now(d=256)-t>200)return wait0(run)
		}p.destroy();wait0(top)
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
	function cmp(a,b){return a-b}
	var z=A.length,o=0,p,bp,rc=new RangeCoder(A),bs=-1>>>1,ss=rc.DecodeBit(1,1),F=new Uint32Array(65537),O=[];
	rate=rate||function(){};done=done||function(A){return A};
	function top(){
		if(!o||rc.DecodeBit(1,1))bs=rc.DecodeValue(0,bs);
		if(!bs)return done(O,z,o);o&&F.fill(0);
		bp=bs>1?rc.DecodeValue(0,bs-1)+1:1;
		p=new m03_parser(0,(bs>>ss)+1,bp,F,1<<8*(ss+1),rc,1);
		p.decode_root_frequencies(F,p.k,p.n-1);
		p.initialize_root_context(F);
		wait0(run)
	}
	function run(){
		var C=p.C,P=p.P,S=p.S,a,q,l,d=256,t=+new Date;
		for(rate(rc.a,z);l=(q=p.current_segments).length;){
			for(a=0;a<l;a=n){
				for(var i=q[a],e=i+C[i],n=a;++n<l&&q[n]<e;);
				if(p.is_trivial_context(i))
					split_trivial_context(C,S,P,p.next_segments,q,a,n);
				else
					populate_context_frequencies(C,S,i,p.primary_index,p.parent_frequencies),
					p.split_context_recursive(q,a,n,0)
			}
			q.length=0;p.current_segments=p.next_segments.sort(cmp);p.next_segments=q;
			if(!--d||Date.now(d=256)-t>200)return wait0(run)
		}
		e=p.k;n=p.n;p.destroy();p=new Uint32Array(n);
		for(i=e--;i;)F[i--]=F[i];
		for(F[i]=0;i<e;)F[i+1]+=F[i++];
		for(i=0;i<bp;)p[F[S[i]]++]=i++;
		for(;i<n;)p[F[S[i++]=S[i]]++]=i;
		for(i=bp;i;O[o++]=S[i-(i>=bp)])i=p[i-1];
		wait0(top)
	}return wait0(top)
}