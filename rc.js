function RangeCoder(A){
	this.B=this.N=this.L=0;this.R=-1>>>0;
	if(A)this.A=A,this.L=(A[0]<<24|A[1]<<16|A[2]<<8|A[this.a=3])>>>0;
	else this.A=[],this.a=-1
}
RangeCoder.prototype={
Flush:function(c,r){
	for(c=5;c--;this.L=this.L<<8>>>0)
		if(255>this.L>>>24)
			for(r=0xffffffff<this.L,this.A[this.a++]=255&r+this.B,this.B=this.L>>>24,r+=255;this.N;this.N--)this.A[this.a++]=255&r;
		else++this.N;
	return this.A
},
Encode:function(c,f,t){
	var r=this.R/t>>>0;this.L+=r*c;
	for(this.R=r*f;this.R<16777216;this.R*=256,this.L=this.L<<8>>>0)
		if(255>this.L>>>24)
			for(r=0xffffffff<this.L,this.A[this.a++]=255&r+this.B,this.B=this.L>>>24,r+=255;this.N;this.N--)this.A[this.a++]=255&r;
		else++this.N
},
EncodeBit:function(b,p,P=12){
	var r=this.R*p>>>P;
	this.L+=-b&r;
	for(this.R=r+(-b&this.R-r-r);this.R<16777216;this.R*=256,this.L=this.L<<8>>>0)
		if(255>this.L>>>24)
			for(r=0xffffffff<this.L,this.A[this.a++]=255&r+this.B,this.B=this.L>>>24,r+=255;this.N;this.N--)this.A[this.a++]=255&r;
		else++this.N
},
EncodeValue:function(n,v,m,o){
	for(;m-n>65535;v>o?n=o+1:m=o)o=n+(m-n>>1),this.EncodeBit(v>o,1,1);
	n^m&&this.Encode(v-n,1,m-n+1);
	return v
},
GetCumFreq:function(t){
	for(;this.R<16777216;this.R*=256)this.L=(this.L<<8|this.A[++this.a])>>>0;
	return this.L/(this.R/t>>>0)>>>0
},
Decode(c,f,t){var r=this.R/t>>>0;this.L-=r*c;this.R=r*f},
DecodeBit(p,P=12){
	for(;this.R<16777216;this.R*=256)this.L=(this.L<<8|this.A[++this.a])>>>0;
	var r=this.R*p>>>P,b=this.L>=r;
	if(b)this.R-=r,this.L-=r;
	else this.R=r;return b
},
DecodeValue:function(n,m,o){
	for(;m-n>65535;this.DecodeBit(1,1)?n=o+1:m=o)o=n+(m-n>>1);
	if(n^m)this.Decode(o=this.GetCumFreq(m-=n-1),1,m),n+=o;
	return n
}}