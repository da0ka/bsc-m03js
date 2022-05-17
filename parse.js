function memove(A,B,C,a,b,n){
	if(a+n<=b||b+n<=a)for(n+=a;a<n;C[a++]=C[b++])A[a]=A[b],B[a]=B[b];
	else{
		for(var c=0,d=a,D=[],E=[],F=[];d<b+n;F[c++]=C[d++])D[c]=A[d],E[c]=B[d];
		for(n+=d=a;b<d;C[a++]=C[b++])A[a]=A[b],B[a]=B[b];
		for(;c;C[n]=F[c])A[--n]=D[--c],B[n]=E[c]
	}
}
function bit_scan_reverse(a,b,c){
	c=(65535<a)<<4,c|=b=(255<(a>>=c))<<3,c|=b=(15<(a>>=b))<<2;return(c|=b=(3<(a>>=b))<<1)|a>>b>>1
}
function segupdate(S,pa,lc,rc,w){
	if(!S[lc].n)return S[pa]=S[rc];
	if(!S[rc].n)return S[pa]=S[lc];
	pa=S[pa];lc=S[lc];rc=S[rc];
	pa.n=lc.n+rc.n;pa.m=lc.m+rc.m;
	pa.l=lc.m||w[lc.l]<=w[rc.l]?lc.l:rc.l;
	pa.r=!rc.m&&w[lc.r]<=w[rc.r]?lc.r:rc.r;
	pa.i=lc.r;pa.j=rc.l;
	if(lc.n>1&&w[lc.i]+w[lc.j]<=w[pa.i]+w[pa.j])pa.i=lc.i,pa.j=lc.j;
	if(rc.n>1&&w[rc.i]+w[rc.j]<w[pa.i]+w[pa.j])pa.i=rc.i,pa.j=rc.j
}
function raise_power_of_two(n,a){for(a=1;a<n;)a*=2;return a}
function next_power_of_2(n){return--n,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,++n}

function hutucker_get_lengths(n,W,S,C){
	var i=0,j=S.length,k=0,l,m=raise_power_of_two(n),s=m+m-1,pa=C.subarray(n),L=pa.subarray(n*2-1);
	if(j<s)for(;j<s;)S[j++]={};
	for(;i<n;s.l=s.r=C[i]=i++)s=S[m-1+i],s.n=s.m=1;
	for(;i<m;)S[m-1+i++].n=0;
	for(i--;i;)segupdate(S,--i,2*i+1,2*i+2,W);
	for(;k<n-1;){
		W[i=S.i]+=W[j=S.j];
		C[i]=pa[C[i]]=pa[C[j]]=n+k++;
		s=S[m-1+i],s.n=1,s.m=0,s.l=s.r=i;
		for(l=m+i;l>>=1;)segupdate(S,l-1,2*l-1,2*l,W);
		S[m-1+j].n=0;
		for(l=m+j;l>>=1;)segupdate(S,l-1,2*l-1,2*l,W)
	}
	for(L[i=2*n-2]=0;i;)L[--i]=L[pa[i]]+1;
	for(;i<n;)W[i]=L[i++]
}
function pivot_cost3(A,B,C){return A+B+C+B+(A<C?A:C)}
function pivot_cost4(A,B,C,D){return A+B+C+D+Math.min(A+B+C+D,Math.min(pivot_cost3(A,B,C),pivot_cost3(B,C,D)))}
function pivot_cost5(A,B,C,D,E){return A+B+C+D+E+Math.min(Math.min(pivot_cost4(B,C,D,E),A+B+pivot_cost3(C,D,E)),Math.min(pivot_cost3(A,B,C)+D+E,pivot_cost4(A,B,C,D)))}

function split_trivial_context(C,S,P,q,O,o,z){
	for(var i=O[o++],c=C[i],p=P[i],s=S[i],e,n;o<z;i=e){
		e=O[o++],c-=n=e-i,S[i]=s,q.push(P[i]=p),p+=C[i]=n;
		if(n>1)C[i+1]=0
	}
	S[i]=s,q.push(P[i]=p),C[i]=c;
	if(c>1)C[i+1]=0
}
function populate_context_frequencies(C,S,i,p,F){
	var t=C[i],c;t-=p-i>>>0<t;
	for(p=i;t>1&&(c=C[++i])>0;)t-=F[S[i]]=c;
	F[S[p]]=t
}
function populate_next_segments(C,S,P,i,p,F,q){
	var t=C[i],c;t-=p-i>>>0<t;
	for(p=i;t>1&&(c=C[++i])>0;t-=c)
		F[S[i]]^c&&q.push(P[i]);
	t>0&&F[S[p]]^t&&q.push(P[p])
}
function normalize_context(C,S,P,p,us,ts){
	if(us>1){
		for(var i=0,j,c,o,s;++i<us;C[j]=c,S[j]=s,P[j]=o)
			for(c=C[j=i+p],s=S[j],o=P[j];j>p&&(C[j-1]<c||C[j-1]===c&&S[j-1]>s);S[j--]=S[j])C[j]=C[j-1],P[j]=P[j-1];
		for(j=i+p-1,i=i<7?p:j-5;i<j;S[j--]=c)c=C[i],C[i]=C[j],C[j]=c,c=P[i],P[i]=P[j],P[j]=c,c=S[i],S[i++]=S[j]
	}
	C[p]=ts;if(us<ts)C[p+us]=0
}
const OPTIMAL_ABT_SMALL_THRESHOLD=7,OPTIMAL_ABT_LARGE_THRESHOLD=257,MAX_ALPHABET_SIZE=65536,SYMBOL_HISTORY_MAX_DEPTH=16;

function m03_parser(L,n,p,F,k,coder,mode){
	for(var i=OPTIMAL_ABT_LARGE_THRESHOLD,a=i,C=this.alphabetic_tree_cost=[],R=this.alphabetic_tree_root=[];i--;R[i]=new Uint32Array(a))C[i]=new Float64Array(a);
	this.L=L;this.n=n;this.primary_index=p;
	this.k=k;this.root_frequencies=F;
	this.alphabetic_tree_keys=new Uint32Array(a);
	this.alphabetic_tree_weight=new Uint32Array(a);
	this.C=new Uint32Array(n);this.P=new Uint32Array(n);this.S=new(k<256?Uint8Array:Uint16Array)(n);// context
	this.Lc=new Uint32Array(k);this.Lp=new Uint32Array(k);this.Ls=new(k<256?Uint8Array:Uint16Array)(k);// left context
	this.Symbol_history=new Uint8Array(k*SYMBOL_HISTORY_MAX_DEPTH);
	this.current_segments=[0];this.next_segments=[];
	this.parent_frequencies=new Uint32Array(++k);
	this.left_frequencies=new Uint32Array(k);
	this.hutucker=[];this.list=new Uint32Array(k+(2*k-1<<1));
	this.T1_model=new Uint16Array(192).fill(1);// 96*2
	this.T2_model=new Uint16Array(384).fill(1);// 96*4
	this.Ternary_model=new Uint16Array(768).fill(1);// 192*4;
	this.Tree_model=new Uint16Array(512).fill(1);// 256*2;
	this.coder=coder;this.mode=mode;this.initialize_alphabetic_tree_roots()
}
m03_parser.prototype={
run:function(){
	var n=this.n,p,C=this.C,S=this.S,F=this.root_frequencies,L=this.L;
	if(this.mode){
		this.decode_root_frequencies(F,this.k,n-1);
		this.initialize_root_context(F);
		this.parse_contexts();
//		for(;n;)L[--n]=S[n]
	}else{
		this.encode_root_frequencies(F,this.k,n-1);
		this.initialize_root_context(F);
		this.parse_contexts();
		//for(p=this.primary_index;n;)if(--n^p&&C[n]^1&&this.S[n]^L[n])throw 0
	}
},
destroy:function(){this.C=this.P=this.hutucker=this.current_segments=this.next_segments=null},

initialize_alphabetic_tree_roots:function(){
	for(var l=0,R=this.alphabetic_tree_root,m=OPTIMAL_ABT_LARGE_THRESHOLD-1;l<m;)R[l][l+1]=R[l][l]=l++
},
initialize_root_context:function(F){
	for(var c=-1,f,u=0,t=1,C=this.C,P=this.P,S=this.S;++c<this.k;)if(f=F[c])
		C[u]=f,S[u]=c,P[u++]=this.current_segments[u]=t,t+=f
	normalize_context(C,S,P,0,u,t)
},
parse_contexts:function(){
	function cmp(a,b){return a-b}
	for(var C=this.C,P=this.P,S=this.S,a,q,l;l=(q=this.current_segments).length;this.next_segments=q){
		for(a=0;a<l;a=n){
			for(var i=q[a],e=i+C[i],n=a;++n<l&&q[n]<e;);
			if(this.is_trivial_context(i))
				split_trivial_context(C,S,P,this.next_segments,q,a,n);
			else
				populate_context_frequencies(C,S,i,this.primary_index,this.parent_frequencies),
				this.split_context_recursive(q,a,n,0)
		}
		q.length=0;this.current_segments=this.next_segments.sort(cmp)
	}
},
split_context_recursive:function(O,a,z,lv){
	var b=O[a],p=z-a;
	if(p<2)return populate_next_segments(this.C,this.S,this.P,b,this.primary_index,this.parent_frequencies,this.next_segments);
	if(this.is_trivial_context(b))return split_trivial_context(this.C,this.S,this.P,this.next_segments,O,a,z);
	if(p>=OPTIMAL_ABT_SMALL_THRESHOLD&&p<=OPTIMAL_ABT_LARGE_THRESHOLD){
		this.build_optimal_alphabetic_tree(O,a,z);
		return this.traverse_alphabetic_tree(O,a,z,0,z+~a,lv)
	}
	p=p>2?this.choose_context_pivot_using_heuristic(O,a,z):a+1;
	this.split_context_by_pivot(b,O[p],lv++,p-a<2,z-p<2);
	this.split_context_recursive(O,a,p,lv);
	this.split_context_recursive(O,p,z,lv)
},
traverse_alphabetic_tree:function(O,a,z,l,r,lv){
	if(r-l<OPTIMAL_ABT_SMALL_THRESHOLD-1)return this.split_context_recursive(O,a+l,a+r+1,lv);
	if(l===r)return populate_next_segments(this.C,this.S,this.P,O[a+l],this.primary_index,this.parent_frequencies,this.next_segments);
	if(this.is_trivial_context(O[a+l]))return split_trivial_context(this.C,this.S,this.P,this.next_segments,O,a+l,a+r+1);
	var p=this.alphabetic_tree_root[l][r];
	this.split_context_by_pivot(O[a+l],O[a+p+1],lv++,p===l,r-p<2);
	this.traverse_alphabetic_tree(O,a,z,l,p,lv);
	this.traverse_alphabetic_tree(O,a,z,p+1,r,lv)
},
choose_context_pivot_using_heuristic:function(O,a,z){
	var b=O[a],c=z-a,e=z=b+this.C[b];
	if(c>6){
		for(var i=c,path=new Uint8Array(64),F=this.left_frequencies;i--;z=b)b=O[a+i],F[i]=1+z-b;
		hutucker_get_lengths(c,F,this.hutucker,this.list);
		for(z=0;++i<c;){
			for(b=F[i];z<b;)path[z++]=0;
			if(path[0])return a+i;
			for(;b;)if(path[--b]^=1)break
		}throw 0
	}
	b=1+O[++a]-b;
	if(c<4)return b>e-O[a+1]?a:a+1;
	var o2=a+1,o3=a+2,B=1+O[o2]-O[a],C=1+O[o3]-O[o2];
	if(c<5){
		var D=1+e-O[o3],c1=pivot_cost3(B,C,D),c2=b+B+C+D,c3=pivot_cost3(b,B,C);
		if(c2<=c1)a=o2,c1=c2;
		if(c3<c1)a=o3;
		return a
	}
	D=1+O[i=a+3]-O[o3];
	if(c<6){
		var E=1+e-O[i];
		c1=pivot_cost4(B,C,D,E),
		c2=b+B+pivot_cost3(C,D,E),
		c3=pivot_cost3(b,B,C)+D+E;
		if(c2<=c1)a=o2,c1=c2;
		if(c3<c1)a=o3,c1=c3;
		if(pivot_cost4(b,B,C,D)<c1)a=i;
		return a
	}
	c1=pivot_cost5(B,C,D,E=1+O[z=a+4]-O[i],F=1+e-O[z]),
	c2=b+B+pivot_cost4(C,D,E,F),
	c3=pivot_cost3(b,B,C)+pivot_cost3(D,E,F),
	c=pivot_cost4(b,B,C,D)+E+F;
	if(c2<=c1)a=o2,c1=c2;
	if(c3<=c1)a=o3,c1=c3;
	if(c<c1)a=i,c1=c;
	if(pivot_cost5(b,B,C,D,E)<c1)a=z;
	return a
},
build_optimal_alphabetic_tree:function(O,a,z){
	var n=z-a,i=n-1,K=this.alphabetic_tree_keys,C=this.alphabetic_tree_cost,W=this.alphabetic_tree_weight,R=this.alphabetic_tree_root;
	for(K[n-1]=1+O[a]+this.C[O[a]]-O[a+n-1];i--;C[i][i+1]=W[i]=K[i]+K[i+1])K[i]=1+O[a+i+1]-O[a+i];
	for(a=2;a<n;)
		for(var l=0,r=a++;r<n;B[r]=c+=W[l]+=K[r],R[l++][r++]=b)
			for(var b=i=R[l][r-1],B=C[l],c=B[b]+C[b+1][r],h=R[l+1][r];i<h;){
				z=B[++i]+C[i+1][r];
				if(z<c)c=z,b=i&255
			}
},
split_context_by_pivot:function f(p,r,lv,lf,rf){
	var i,c,o=this.primary_index,s,C=this.C,t=C[p],P=this.P,S=this.S,ps=t,ls=r-p,rs=ps-ls,u=p+1,lu=0,ru=p,Lc=this.Lc,Lp=this.Lp,Ls=this.Ls,F=this.left_frequencies;
	t-=o-p>>>0<t;
	if(this.mode){
		for(;t>1&&(c=C[u])>0;u++)t-=c;C[p]=t
	}else if(ls>rs){
		for(i=r;t>1&&(c=C[u])>0;)t-=F[S[u++]]=c;
		F[S[p]]=C[p]=t;
		for(F[0]+=o-i>>>0<rs;i<r+rs;)F[this.L[i++]]--
	}else{
		for(i=p;t>1&&(c=C[u])>0;F[S[u++]]=0)t-=c;
		C[p]=t;F[S[p]]=0;
		for(F[0]-=o-i>>>0<ls;i<p+ls;)F[this.L[i++]]++
	}
	var ln=ls,rn=rs;
	ln-=o-p>>>0<ls;rn-=o-r>>>0<rs;
	for(i=p;i<u;++i){
		t=C[i],c=F[s=S[i]];
		if(t<=ln+rn-t)
			c=ln<=rn?this.predict(c,t,ln,rn,u-i,s,lv,lf):t-this.predict(t-c,t,rn,ln,u-i,s,lv,rf);
		else t=ln+rn-t,c=ln-c,
			c=ln<=rn?this.predict(c,t,ln,rn,u-i,s,lv,rf):t-this.predict(t-c,t,rn,ln,u-i,s,lv,lf),
			c=ln-c,t=ln+rn-t;
		ln-=c;rn+=c-t;
		if(c>0)Lc[lu]=c,Lp[lu]=P[i],Ls[lu++]=s,C[i]-=c,P[i]+=c;
		if(C[i]>0)C[ru]=C[i],P[ru]=P[i],S[ru++]=S[i]
	}
	memove(C,S,P,r,p,ru-=p);normalize_context(C,S,P,r,ru,rs);
	for(c=lu;c;S[p+c]=Ls[c])C[p+--c]=Lc[c],P[p+c]=Lp[c];normalize_context(C,S,P,p,lu,ls)
},
is_trivial_context:function(a){return!this.C[a+1]&&this.primary_index-a>>>0>=this.C[a]},

encode_root_frequencies:function(F0,k,n){
	for(var i=0,a=1,b=2,p=k,F=new Float64Array(33),S=new Float64Array(33),N=n,M=n,c=k;p;)F[bit_scan_reverse(F0[--p]+1)]++;
	for(;i<33&&c>0;c-=f){
		var f=F[i++],min=Math.max(c-(M/(b-1)>>>0),0),max=c*(b-2)<N?c-1:c;
		this.coder.EncodeValue(min>>>0,f>>>0,max>>>0);
		N-=f*(b-2);M-=f*(a-1),a*=2,b*=2
	}
	for(i=33,a=(1<<30)*4,b=a*2,c=N=M=0;i--;b/=2)
		S[i]=c,c+=f=F[i],N+=f*(a-1),M+=f*(b-2),a/=2;
	for(p=0;p<k;this.coder.EncodeValue(min>>>0,f>>>0,max>>>0)){
		for(i=0,a=1,b=2,c=bit_scan_reverse(F0[p]+1);i<c;S[i++]--,a*=2,b*=2)
			f=F[i],f>0&&this.coder.Encode(f>>>0,S[i]>>>0,f+S[i]>>>0);
		S[i]>0&&this.coder.Encode(0,F[i]>>>0,F[i]+S[i]>>>0);
		F[i]--;N-=--a;M-=b-=2;
		min=Math.max(a,n-M);
		max=Math.min(b,n-N);
		n-=f=F0[p++]
	}
},
decode_root_frequencies:function(F0,k,n){
	for(var i=0,a=1,b=2,F=new Float64Array(33),S=new Float64Array(33),N=n,M=n,c=k;i<33&&c>0;c-=f){
		var min=Math.max(c-((M/(b-1)>>>0)),0),max=c*(b-2)<N?c-1:c,f=F[i++]=this.coder.DecodeValue(min>>>0,max>>>0);
		N-=f*(b-2);M-=f*(a-1),a*=2,b*=2
	}
	for(i=33,a=(1<<30)*4,b=a*2,c=N=M=0;i--;b/=2)
		S[i]=c,c+=f=F[i],N+=f*(a-1),M+=f*(b-2),a/=2;
	for(var p=0;p<k;n-=F0[p++]=this.coder.DecodeValue(min>>>0,max>>>0)){
		for(i=0,a=1,b=2;S[i]>0;S[i++]--,a*=2,b*=2)if((f=F[i])>0){
			if(this.coder.GetCumFreq(c=f+S[i]>>>0)<f){
				this.coder.Decode(0,f>>>0,c);break
			}
			this.coder.Decode(f>>>0,S[i]>>>0,c)
		}
		F[i]--;N-=--a;M-=b-=2;
		min=Math.max(a,n-M);
		max=Math.min(b,n-N)
	}
},
predict:function(c,t,ln,rn,sn,s,lv,leaf){
	var b,f,h,i,n,p,r=t>ln?t-ln:0,d=SYMBOL_HISTORY_MAX_DEPTH,H=this.Symbol_history,P;
	t-=r;if(lv>=d)lv=d-1;
	H[d=s*d+lv]=!ln;
	if(t<1)return 0;
	rn-=r<<1;h=lv>1?H[d-1]|H[d-2]:lv&&H[d-1];
	if(t<3){
		i=ln+rn+r===sn;
		i+=2*(ln==t);i+=4*h;i+=8*leaf;
		i+=Math.min(bit_scan_reverse(r+1),3)<<4;
		i+=sn<9?sn-2<<6:448;
		i+=(ln*11/rn)<<9;
		if(t<2){
			i=m03_T1_model_state_table[i];
			P=this.T1_model.subarray(i*2);r=P[0]+P[1];
			if(r>m03_T1_model_scale_table[i])
				r=P[0]-=P[0]>>1,r+=P[1]-=P[1]>>1;
			if(this.mode){
				f=this.coder.GetCumFreq(r);
				c=0|f>=P[0];
				this.coder.Decode(c&&P[0],P[c]++,r);
			}else this.coder.Encode(c&&P[0],P[c]++,r);
			H[d]=1
		}else{
			i=m03_T2_model_state_table[i];
			P=this.T2_model.subarray(i*4);b=P[0]+P[1]+P[2];
			if(b>m03_T2_model_scale_table[i])
				b=P[0]-=P[0]>>1,b+=P[1]-=P[1]>>1,b+=P[2]-=P[2]>>1;
			if(this.mode){
				f=this.coder.GetCumFreq(b);
				c=0|(f>=P[0])+(f>=P[0]+P[1]);
				f=c&&(c<2?P[0]:P[0]+P[1]);
				this.coder.Decode(f,P[c]++,b);
			}else this.coder.Encode(c&&(c<2?P[0]:P[0]+P[1]),P[c]++,b);
			H[d]=c!==1
		}
	}else{
		i=Math.min(bit_scan_reverse(sn-1),3);
		i+=4*(r>0);i+=8*(ln===t);
		i+=leaf<<4;i+=h<<5;
		i+=Math.min(bit_scan_reverse(t-2),7)<<6;
		i+=ln*11/rn<<9;
		i=m03_Ternary_model_state_table[i];
		P=this.Ternary_model.subarray(i*4);b=P[0]+P[1]+P[2];
		if(b>m03_Ternary_model_scale_table[i])
			b=P[0]-=P[0]>>1,b+=P[1]-=P[1]>>1,b+=P[2]-=P[2]>>1;
		if(this.mode){
			f=this.coder.GetCumFreq(b);
			p=0|(f>=P[0])+(f>=P[0]+P[1]);
			f=p&&(p<2?P[0]:P[0]+P[1]);
			this.coder.Decode(f,P[p]++,b);
		}else p=0|(c>0)+(c===t),this.coder.Encode(p&&(p<2?P[0]:P[0]+P[1]),P[p]++,b);
		if(H[d]=p!==1)c=p&&t;
		else{
			i=r>--t;i+=2*h;
			i+=t<17?t-2<<2:60;
			i+=ln*5/rn<<6;i*=16;
			for(n=h=1;n^t&&h<16;h+=h+b){
				p=m03_Tree_model_state_table[i+h];
				P=this.Tree_model.subarray(p*2);r=P[0]+P[1];
				if(r>m03_Tree_model_scale_table[p])
					r=P[0]-=P[0]>>1,r+=P[1]-=P[1]>>1;
				p=n+(t-n+1>>1);
				if(this.mode){
					f=this.coder.GetCumFreq(r);
					b=0|f>=P[0];
					this.coder.Decode(b&&P[0],P[b]++,r);
				}else b=0|c>=p,this.coder.Encode(b&&P[0],P[b]++,r);
				b?n=p:t=p-1
			}this.mode?c=this.coder.DecodeValue(n,t):this.coder.EncodeValue(n,c,t)
		}
	}return c
}}
