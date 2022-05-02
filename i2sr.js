// improved two-stage suffix sorting + rank sort

function compare(R,a,b,i,n,r){
	for(n-=a<b?b:a;i<n&&!(r=R[a+i]-R[b+i]);)i+=2;return r||b-a
}
function subsort(R,A,l,h,d,n){
	if(10<h-l)
		for(var i=l+2,j,m=i,t;i<h;A[j]=t)
			for(t=A[j=++i];m<j&&compare(R,t,A[j-3],d,n)<0;)A[j]=A[j-=3];
	for(i=l;i<h;A[j]=t)
		for(t=A[j=++i];l<j&&compare(R,t,A[j-1],d,n)<0;)A[j--]=A[j]
}
function median(R,A,a,b,c,d,z){
	var r=A[a]+d,s=A[b]+d;
	r=r<z?R[r]:-1,s=s<z?R[s]:-1,d+=A[c],d=d<z?R[d]:-1;
	return r<s?s<d?b:r<d?c:a:r<d?a:s<d?c:b
}
function getPivot(R,A,r,l,h,d,z){
	if(r<65)var m=l,n=l+(r>>1),p=h;
	else r>>=3,
		m=median(R,A,l,p=l+r,p+=r,d,z),
		n=median(R,A,p+=r,p+=r,p+=r,d,z),
		p=median(R,A,p+=r,p+=r,h,d,z);
	p=A[m=median(R,A,m,n,p,d,z)];A[m]=A[l];A[l]=p;
	return p+d<z?R[p+d]:-1
}
function mqsort(R,I,l,h,d,n){
	for(var a,b,i,j,o,p,r,s=0,t,L=[],H=[],D=[];;){
		if(h-l<20){
			for(l<h&&subsort(R,I,l,h,d,n);l<=h;)R[I[l]]=l++;
			if(!s)break;
			l=L[--s];h=H[s];d=D[s];
			continue}
		p=getPivot(R,I,h-l+1,l,h,d,n);
		for(i=a=l,j=b=h;;I[j--]=t){
			for(;i<=j&&(r=((t=I[i]+d)<n?R[t]:-1))<=p;i++)
				r^p||(I[i]=I[a],I[a++]=t-d);
			for(;i<=j&&(r=((t=I[j]+d)<n?R[t]:-1))>=p;j--)
				r^p||(I[j]=I[b],I[b--]=t-d);
			if(i>j)break;
			t=I[i],I[i++]=I[j]}
		if((p=a-l)<(r=i-a))r=p;o=j;
		for(p=l;r--;I[o--]=t)t=I[p],I[p++]=I[o];
		if((p=h-b)<(r=b-j))r=p;o=h;
		for(p=i;r--;I[o--]=t)t=I[p],I[p++]=I[o];
		i+=l-a;j-=~h+b;
		if(j<=h)L[s]=j,H[s]=h,D[s++]=d;
		if(i<j)L[s]=i,H[s]=j-1,D[s++]=d+2;
		h=i-1}
}
function sortTypeBstr(B,I,C,R,n){
	for(var A=C.slice(),p=1,r,i=n-1,j;i--;)
		if(r=B[i]-B[i+1])
			r<0&&p>0&&(I[A[B[i]<<8|B[i+1]]++]=i),p=r;
	for(;i<255;)
		for(j=++i;j<255;p-r>1&&mqsort(R,I,r,--p,2,n))
			p=A[r=i<<8|++j],r=C[r]
}
function setTypeAB(B,I,C,n){
	for(var i=255,j,p,A=new Uint32Array(256),E=A.slice();j=i;A[i]=E[i]){
		for(;j;)E[--j]=C[j<<8|i];
		for(j=C[i--<<8];j>E[i];)
			if((p=I[--j])>0&&B[p]>=B[--p])
				I[--E[B[p]]]=p}
	B[n-1]<B[n]||(I[C[B[n-1]<<8|B[n]]++]=n-1);
	for(A[255]=C[65536];j<n;)
		if((i=I[j++])>0&&B[i]<=B[--i]&&C[p=B[i]<<8|B[i+1]]<A[B[i]])
			I[C[p]++]=i
}
/* suffix sort
@A: input (Uint8Array / Array)
@I: suffix array (Int32Array / Array)
@C: counting table (Int32Array / Array)
*/
function I2SRsort(A,I,C){
	if(!C)C=new Uint32Array(65537);
	for(var i=0,c,n=A.length,F=C.slice(1),H=new Uint32Array(256),R=new Int32Array(n);i<n;)F[A[i]<<8|A[++i]]++;
	for(i=0;i<65536;)C[i+1]=F[i]+C[i++];
	for(i=0;i<n;)R[i]=C[(A[i]<<8|A[++i])+1]-1;
	sortTypeBstr(A,I,C,R,n);setTypeAB(A,I,C,n);
	return I
}
/* BWT
@T: input (Uint8Array / Array)
@U: output (Uint8Array / Array / null)
@A: suffix array (Int32Array / null)
@C: counting table (Int32Array / nul)
@n: input size (Number / null)
*/
function i2srBWTe(T,U,A,C,n){
	n=n||T.length;C=C||new Uint32Array(65537);
	var a=typeof U=="object",c,i=0,p,s,SA=A||new Int32Array(n),B=a?U:[];I2SRsort(T,SA,C);
	for(C.fill(0),C[B[0]=T[n-1]]++;s=SA[i++];)C[B[i]=T[--s]]++;
	for(p=i;i<n;)C[B[i]=T[SA[i++]-1]]++;
	if(a)return p;--p;
	for(a=n<257?1:n<65537?2:n<16777217?3:4;a--;p>>=8)B[i++]=p&255;
	return B}

/* unBWT
@A: input (Uint8Array / Array)
@B: output (Uint8Array / Array / null)
@p: primary index
*/
function BWTd(A,B,p){
	for(var i=A.length,n=i,C=new Uint32Array(257),N=new Uint32Array(n);i;)++C[A[--i]+1];
	for(;i<255;)C[i+1]+=C[i++];
	for(i=0;i<p;)N[C[A[i]]++]=i++;
	for(;i<n;)N[C[A[i++]]++]=i;
	for(i=p,C=B||new Uint8Array(n),n=0;i;C[n++]=A[i-(i>=p)])i=N[i-1];
	return C
}