// based on libsais v1.0.0
const SUFFIX_GROUP_MARKER=1<<30;
function SAcopy(A,a,b,n){
	if(n>15)A.set(A.subarray(b,b+n),a);
	else for(n+=a;a<n;)A[a++]=A[b++]
}
function SAmove(A,a,b,n){
	if(n>15)return SAmove2(A,a,b,n);
	if(a+n<=b||b+n<=a)for(n+=a;a<n;)A[a++]=A[b++];
	else{if(a<b){
		var c=b,C=A.slice(b+b-a,b+n);
		for(n+=a;a<c;)A[a++]=A[b++]
	}else{C=A.slice(c=a,b+n);
		for(n+=a;b<c;)A[a++]=A[b++]
	}for(c=0;a<n;)A[a++]=C[c++]}
}
function SAmove2(A,a,b,n){
	if(a+n<=b||b+n<=a)A.set(A.subarray(b,b+n),a);
	else if(a<b)
		n=A.slice(b+b-a,b+n),
		A.set(A.subarray(b,b+b-a),a),
		A.set(n,b);
	else n=A.slice(a,b+n),
		A.set(A.subarray(b,a),a),
		A.set(n,a+a-b)
}
function libsais_gather_lms_suffixes_8u(T,SA,n){
	for(var i=n-1,m=i,s=1,c0=T[i],c1=0;i>3;s^1||--m)
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^1||--m,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||--m,
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^1||--m,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s);
	for(;i;s^1||--m)c1=c0,SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s);
	return~m+n
}
function libsais_gather_compacted_lms_suffixes_32s(T,SA,n){
	for(var i=n-1,m=i,s=1,c0=T[i],c1=0;i>3;s^(-1<c1)||--m)
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^(-1<c0)||--m,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^(-1<c1)||--m,
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^(-1<c0)||--m,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s);
	for(;i;s^(-1<c1)||--m)c1=c0,SA[m]=i,c0=T[--i],s=s<<1|c0>c1-(1&s);
	return~m+n
}
function libsais_count_lms_suffixes_32s_2k(T,n,k,B){
	B.fill(0,0,2*k);
	for(var i=n-1,s=1,c0=T[i],c1=0;i>3;)
		c1=T[--i],s=s<<1&3|c1>c0-(1&s),B[c0<<1|s===1]++,
		c0=T[--i],s=s<<1&3|c0>c1-(1&s),B[c1<<1|s===1]++,
		c1=T[--i],s=s<<1&3|c1>c0-(1&s),B[c0<<1|s===1]++,
		c0=T[--i],s=s<<1&3|c0>c1-(1&s),B[c1<<1|s===1]++;
	for(;i;B[c1<<1|s===1]++)c1=c0,c0=T[--i],s=s<<1&3|c0>c1-(1&s);
	B[c0<<1]++
}
function libsais_count_and_gather_lms_suffixes_8u(T,SA,n,B,k){
	B.fill(0,0,k||1024);
	for(var i=n-1,m=i,s=1,c0=T[i],c1=0;i>3;)
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^1||--m,B[c0<<2|s]++,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||--m,B[c1<<2|s]++,
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^1||--m,B[c0<<2|s]++,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||--m,B[c1<<2|s]++;
	for(;i;B[c1<<2|s]++)c1=c0,SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||--m;
	B[c0<<2|s<<1&3]++;
	return~m+n
}
function libsais_count_and_gather_lms_suffixes_32s_2k(T,SA,n,k,B){
	B.fill(0,0,k*2);
	for(var i=n-1,m=i,s=1,c0=T[i],c1=0,b;i>3;)
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),m-=b=s===1,B[c0<<1|b]++,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),m-=b=s===1,B[c1<<1|b]++,
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),m-=b=s===1,B[c0<<1|b]++,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),m-=b=s===1,B[c1<<1|b]++;
	for(;i;B[c1<<1|b]++)c1=c0,SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),m-=b=s===1;
	B[c0<<1]++;
	return~m+n
}
function libsais_count_and_gather_compacted_lms_suffixes_32s_2k(T,SA,n,k,B){
	B.fill(0,0,k*2);
	for(var i=n-1,m=i,s=1,c0=T[i],c1=0,x=-1>>>1;i>3;)
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^c0>=0||--m,c0&=x,B[c0<<1|s===1]++,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^c1>=0||--m,c1&=x,B[c1<<1|s===1]++,
		SA[m]=i,c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^c0>=0||--m,c0&=x,B[c0<<1|s===1]++,
		SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^c1>=0||--m,c1&=x,B[c1<<1|s===1]++;
	for(;i;B[c1<<1|s===1]++)c1=c0,SA[m]=i,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^c1>=0||--m,c1&=x;
	c0&=x;B[c0<<1]++;
	return~m+n
}
function libsais_count_suffixes_32s(T,n,k,B){
	B.fill(0,0,k);
	for(var i=0,j=n-7;i<j;)B[T[i++]]++,B[T[i++]]++,B[T[i++]]++,B[T[i++]]++,B[T[i++]]++,B[T[i++]]++,B[T[i++]]++,B[T[i++]]++;
	for(;i<n;)B[T[i++]]++
}
function libsais_initialize_buckets_start_and_end_8u(B){
	for(var i=0,j=0,s=0,S=B.subarray(1536),E=B.subarray(1792);i<1021;E[j++]=s+=B[i++]+B[i++]+B[i++]+B[i++])S[j]=s
}
function libsais_initialize_buckets_start_and_end_32s_6k(k,B){
	var i=0,j=0,s=0,S=B.subarray(4*k),E=B.subarray(5*k);
	for(k=k-1<<2|1;i<k;E[j++]=s+=B[i++]+B[i++]+B[i++]+B[i++])S[j]=s;
}
function libsais_initialize_buckets_start_and_end_32s_4k(k,B){
	var i=0,j=0,s=0,S=B.subarray(2*k),E=B.subarray(3*k);
	for(k=k-1<<1|1;i<k;E[j++]=s+=B[i++]+B[i++])S[j]=s
}
function libsais_initialize_buckets_end_32s_2k(k,B){
	var i=0,s=0;
	for(k=k-1<<1|1;i<k;)B[i]=s+=B[i++]+B[i++]
}
function libsais_initialize_buckets_start_32s_1k(k,B){
	for(var i=0,s=0,b;i<k;s+=b)b=B[i],B[i++]=s
}
function libsais_initialize_buckets_end_32s_1k(k,B){
	for(var i=0,s=0;i<k;B[i++]=s)s+=B[i]
}
function libsais_initialize_buckets_start_and_end_32s_2k(k,B){
	for(var i=0,j=0,n=k-1<<1|1;i<n;i+=2)B[j++]=B[i];
	B.set(B.subarray(B[k]=0,k-1),k+1)
}
function libsais_initialize_buckets_for_lms_suffixes_radix_sort_8u(T,B,fs){
	for(var s=0,i=T[fs],j=0,C=B.subarray(1024);fs;B[j<<2|s]--)j=i,i=T[--fs],s=s<<1&3|i>j-(1&s);
	B[i<<2|s<<1&3]--;
	for(i=j=s=0;i<1021;i+=4,j+=2)C[j+1]=s,C[j]=s+=B[i+1]+B[i+3];
	return s
}
function libsais_initialize_buckets_for_lms_suffixes_radix_sort_32s_2k(T,k,B,fs){
	var i=T[fs]<<1,s=0,t=0;
	B[i++]++;B[i]--;
	for(i=0,k=k-1<<1|1;i<k;B[i]=t+=B[i++])B[i]=s+=B[i++]+B[i]
}
function libsais_initialize_buckets_for_lms_suffixes_radix_sort_32s_6k(T,k,B,fs){
	for(var s=0,i=T[fs],j=0,C=B.subarray(4*k);fs;B[j<<2|s]--)j=i,i=T[--fs],s=s<<1&3|i>j-(1&s);
	B[i<<2|s<<1&3]--;
	for(i=j=s=0,k=k-1<<2;i<=k;i+=4,j+=2)C[j+1]=s,C[j]=s+=B[i+1]+B[i+3];
	return s
}
function libsais_initialize_buckets_for_radix_and_partial_sorting_32s_4k(T,k,B,fs){
	var i=T[fs]<<1,j=0,s=0,t=0,S=B.subarray(2*k),E=B.subarray(3*k);
	B[i++]++;B[i]--;
	for(i=0,k=k-1<<1|1;i<k;B[i++]=s)S[j]=t,s+=B[i+1],E[j++]=t+=B[i++]+B[i]
}
function libsais_radix_sort_lms_suffixes_8u(T,SA,n,m,B){
	B=B.subarray(1024);
	for(var i=n,j=n-m+4,p;i>j;SA[--B[T[p=SA[--i]]<<1]]=p)SA[--B[T[p=SA[--i]]<<1]]=p,SA[--B[T[p=SA[--i]]<<1]]=p,SA[--B[T[p=SA[--i]]<<1]]=p
	for(j-=3;i>j;)SA[--B[T[p=SA[--i]]<<1]]=p
}
function libsais_radix_sort_lms_suffixes_32s_2k(T,SA,n,m,B){
	for(var i=n,j=n-m+4,p;i>j;SA[--B[T[p=SA[--i]]<<1]]=p)SA[--B[T[p=SA[--i]]<<1]]=p,SA[--B[T[p=SA[--i]]<<1]]=p,SA[--B[T[p=SA[--i]]<<1]]=p;
	for(j-=3;i>j;)SA[--B[T[p=SA[--i]]<<1]]=p
}
function libsais_radix_sort_lms_suffixes_32s_1k(T,SA,n,B){
	for(var i=n-1,m=0,s=1,c0=T[i],c1=0,c2=0;i>3;)
		c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^1||(SA[--B[c2=c0]]=i+1,m++),
		c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||(SA[--B[c2=c1]]=i+1,m++),
		c1=T[--i],s=s<<1&3|c1>c0-(1&s),s^1||(SA[--B[c2=c0]]=i+1,m++),
		c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||(SA[--B[c2=c1]]=i+1,m++);
	for(;i;)c1=c0,c0=T[--i],s=s<<1&3|c0>c1-(1&s),s^1||(SA[--B[c2=c1]]=i+1,m++);
	if(m>1)SA[B[c2]]=0;
	return m
}
function libsais_radix_sort_set_markers_32s(SA,k,B,mk){
	for(var i=0,j=k-4;i<j;)SA[B[i++<<1]]|=mk,SA[B[i++<<1]]|=mk,SA[B[i++<<1]]|=mk,SA[B[i++<<1]]|=mk;
	for(j+=3;i<j;)SA[B[i++<<1]]|=mk
}
function libsais_initialize_buckets_for_partial_sorting_8u(T,B,fs,lc){
	var i=0,j=0,s=lc+1,t=0,C=B.subarray(1024);
	for(B[T[fs]<<2|1]++;i<1021;i+=4)C[j]=s,s+=B[i]+B[i+2],t+=B[i+1],B[j++]=s,B[j++]=t
}
function libsais_initialize_buckets_for_partial_sorting_32s_6k(T,k,B,fs,lc){
	var i=0,j=0,s=lc+1,t=0,C=B.subarray(4*k);
	for(k=k-1<<2,B[T[fs]<<2|1]++;i<=k;i+=4)C[j]=s,s+=B[i]+B[i+2],t+=B[i+1],B[j++]=s,B[j++]=t
}
function libsais_partial_sorting_scan_left_to_right_8u(T,SA,n,B,c,d,k){
	var i=0,p=T[--n]<<1|T[n-1]>=T[n],v,x=-1>>>1,iB=B.subarray(k?4*k:1024),dN=B.subarray(k?2*k:512);
	SA[iB[p]++]=n|1<<31;dN[p]=++d;
	for(c--;i<c;dN[v]=d)
		p=SA[i++],d+=p<0,p&=x,SA[iB[v=T[--p]<<1|T[p-1]>=T[p]]++]=p|(dN[v]!=d)<<31,dN[v]=d,
		p=SA[i++],d+=p<0,p&=x,SA[iB[v=T[--p]<<1|T[p-1]>=T[p]]++]=p|(dN[v]!=d)<<31;
	for(c++;i<c;dN[v]=d)
		p=SA[i++],d+=p<0,p&=x,SA[iB[v=T[--p]<<1|T[p-1]>=T[p]]++]=p|(dN[v]!=d)<<31;
	return d
}
function libsais_partial_sorting_scan_left_to_right_32s_4k(T,SA,n,k,B,d){
	var i=0,j=n-1,c=T[j-1]<T[j],p,v,x=-1>>>1,iB=B.subarray(2*k);
	SA[iB[T[j]]++]=j|c<<31|SUFFIX_GROUP_MARKER;
	for(B[T[j]<<1|c]=++d;i<j;++i){
		p=SA[i];SA[i]=p&x;
		if(p>0)
			SA[i]=0,d+=p>>30,p&=~SUFFIX_GROUP_MARKER,c=T[--p-1]<T[p],v=T[p]<<1|c,
			SA[iB[T[p]]++]=p|c<<31|(B[v]!=d)<<30,B[v]=d;
		p=SA[++i];SA[i]=p&x;
		if(p>0)
			SA[i]=0,d+=p>>30,p&=~SUFFIX_GROUP_MARKER,c=T[--p-1]<T[p],v=T[p]<<1|c,
			SA[iB[T[p]]++]=p|c<<31|(B[v]!=d)<<30,B[v]=d;
	}
	for(;i<n;++i){
		p=SA[i];SA[i]=p&x;
		if(p>0)
			SA[i]=0,d+=p>>30,p&=~SUFFIX_GROUP_MARKER,c=T[--p-1]<T[p],v=T[p]<<1|c,
			SA[iB[T[p]]++]=p|c<<31|(B[v]!=d)<<30,B[v]=d
	}return d
}
function libsais_partial_sorting_scan_left_to_right_32s_1k(T,SA,n,k,B){
	var i=0,j=n-1,p,x=-1>>>1;
	for(SA[B[T[j]]++]=j|(T[j-1]<T[j])<<31;i<j;++i)
		p=SA[i],SA[i]=p&x,0<p&&(SA[i]=0,SA[B[T[--p]]++]=p|(T[p-1]<T[p])<<31),
		p=SA[++i],SA[i]=p&x,0<p&&(SA[i]=0,SA[B[T[--p]]++]=p|(T[p-1]<T[p])<<31);
	for(;i<n;++i)
		p=SA[i],SA[i]=p&x,0<p&&(SA[i]=0,SA[B[T[--p]]++]=p|(T[p-1]<T[p])<<31)
}
function libsais_partial_sorting_shift_markers_8u(SA,B,k){
	for(var C=B.subarray(k?4*k:1024),c=k?k-1<<1:510,p,q,x=1<<31;c>1;){
		for(var i=C[c],j=B[c-=2]+3,s=x;i>j;)
			p=SA[--i],s^=q=s^(p&x),SA[i]=p^q,
			p=SA[--i],s^=q=s^(p&x),SA[i]=p^q,
			p=SA[--i],s^=q=s^(p&x),SA[i]=p^q,
			p=SA[--i],s^=q=s^(p&x),SA[i]=p^q;
		for(j-=3;i>j;SA[i]=p^q)p=SA[--i],s^=q=s^(p&x)
	}
}
function libsais_partial_sorting_shift_markers_32s_4k(SA,n){
	for(var i=n,s=SUFFIX_GROUP_MARKER,m=s,p,q;i>3;)
		p=SA[--i],s^=q=(p&m^s)&(0<p)<<30,SA[i]=p^q,
		p=SA[--i],s^=q=(p&m^s)&(0<p)<<30,SA[i]=p^q,
		p=SA[--i],s^=q=(p&m^s)&(0<p)<<30,SA[i]=p^q,
		p=SA[--i],s^=q=(p&m^s)&(0<p)<<30,SA[i]=p^q;
	for(;i;)p=SA[--i],s^=q=(p&m^s)&(0<p)<<30,SA[i]=p^q
}
function libsais_partial_sorting_scan_right_to_left_8u(T,SA,n,B,fs,c,d,k){
	for(var i=n-fs,j=c+2,p,v,x=-1>>>1,dN=B.subarray(2*k||512);i>j;)
		p=SA[--i],d+=p<0,p&=x,SA[--B[v=T[--p]<<1|T[p-1]>T[p]]]=p|(dN[v]!=d)<<31,dN[v]=d,
		p=SA[--i],d+=p<0,p&=x,SA[--B[v=T[--p]<<1|T[p-1]>T[p]]]=p|(dN[v]!=d)<<31,dN[v]=d;
	for(j--;i>j;)
		p=SA[--i],d+=p<0,p&=x,SA[--B[v=T[--p]<<1|T[p-1]>T[p]]]=p|(dN[v]!=d)<<31,dN[v]=d;
	return d
}
function libsais_partial_sorting_scan_right_to_left_32s_4k(T,SA,n,k,B,d){
	for(var iB=B.subarray(3*k),i=n,p,v,m=~SUFFIX_GROUP_MARKER;i>1;){
		p=SA[--i];
		if(p>0)SA[i]=0,d+=p>>30,p&=m,v=T[--p]<<1|T[p-1]>T[p],SA[--iB[T[p]]]=p|(v&1)<<31|(B[v]!==d)<<30,B[v]=d;
		p=SA[--i];
		if(p>0)SA[i]=0,d+=p>>30,p&=m,v=T[--p]<<1|T[p-1]>T[p],SA[--iB[T[p]]]=p|(v&1)<<31|(B[v]!==d)<<30,B[v]=d;
	}
	for(;i;){
		p=SA[--i];
		if(p>0)SA[i]=0,d+=p>>30,p&=m,v=T[--p]<<1|T[p-1]>T[p],SA[--iB[T[p]]]=p|(v&1)<<31|(B[v]!==d)<<30,B[v]=d;
	}return d
}
function libsais_partial_sorting_scan_right_to_left_32s_1k(T,SA,n,k,B){
	for(var i=n,p;i>1;){
		p=SA[--i];if(p>0)SA[i]=0,SA[--B[T[--p]]]=p|(T[p-1]>T[p])<<31;
		p=SA[--i];if(p>0)SA[i]=0,SA[--B[T[--p]]]=p|(T[p-1]>T[p])<<31
	}
	for(;i;)p=SA[--i];if(p>0)SA[i]=0,SA[--B[T[--p]]]=p|(T[p-1]>T[p])<<31
}
function libsais_partial_sorting_gather_lms_suffixes_32s_4k(SA,n){
	for(var i=0,j=n-3,l=0,s,m=SUFFIX_GROUP_MARKER;i<j;)
		s=SA[i++],SA[l]=s-m&~m,l+=s<0,
		s=SA[i++],SA[l]=s-m&~m,l+=s<0,
		s=SA[i++],SA[l]=s-m&~m,l+=s<0,
		s=SA[i++],SA[l]=s-m&~m,l+=s<0;
	for(j+=3;i<j;)s=SA[i++],SA[l]=s-m&~m,l+=s<0;
}
function libsais_partial_sorting_gather_lms_suffixes_32s_1k(SA,n){
	for(var i=0,j=n-3,l=0,m=-1>>>1,s;i<j;)
		s=SA[i++],SA[l]=s&m,l+=s<0,
		s=SA[i++],SA[l]=s&m,l+=s<0,
		s=SA[i++],SA[l]=s&m,l+=s<0,
		s=SA[i++],SA[l]=s&m,l+=s<0;
	for(j+=3;i<j;)s=SA[i++],SA[l]=s&m,l+=s<0
}
function libsais_induce_partial_order_8u(T,SA,n,B,fs,lc){
	B.fill(0,512,1024);
	var d=libsais_partial_sorting_scan_left_to_right_8u(T,SA,n,B,lc,0);
	libsais_partial_sorting_shift_markers_8u(SA,B);
	libsais_partial_sorting_scan_right_to_left_8u(T,SA,n,B,fs,lc,d)
}
function libsais_induce_partial_order_32s_6k(T,SA,n,B,fs,lc,k){
	B.fill(0,2*k,4*k);
	var d=libsais_partial_sorting_scan_left_to_right_8u(T,SA,n,B,lc,0,k);
	libsais_partial_sorting_shift_markers_8u(SA,B,k);
	libsais_partial_sorting_scan_right_to_left_8u(T,SA,n,B,fs,lc,d,k)
}
function libsais_induce_partial_order_32s_4k(T,SA,n,k,B){
	B.fill(0,0,2*k);
	var d=libsais_partial_sorting_scan_left_to_right_32s_4k(T,SA,n,k,B,0);
	libsais_partial_sorting_shift_markers_32s_4k(SA,n);
	libsais_partial_sorting_scan_right_to_left_32s_4k(T,SA,n,k,B,d);
	libsais_partial_sorting_gather_lms_suffixes_32s_4k(SA,n);
}
function libsais_induce_partial_order_32s_2k(T,SA,n,k,B){
	libsais_partial_sorting_scan_left_to_right_32s_1k(T,SA,n,k,B.subarray(k));
	libsais_partial_sorting_scan_right_to_left_32s_1k(T,SA,n,k,B);
	libsais_partial_sorting_gather_lms_suffixes_32s_1k(SA,n);
}
function libsais_induce_partial_order_32s_1k(T,SA,n,k,B){
	libsais_count_suffixes_32s(T,n,k,B);
	libsais_initialize_buckets_start_32s_1k(k,B);
	libsais_partial_sorting_scan_left_to_right_32s_1k(T,SA,n,k,B);
	libsais_count_suffixes_32s(T,n,k,B);
	libsais_initialize_buckets_end_32s_1k(k,B);
	libsais_partial_sorting_scan_right_to_left_32s_1k(T,SA,n,k,B);
	libsais_partial_sorting_gather_lms_suffixes_32s_1k(SA,n)
}
function libsais_renumber_and_gather_lms_suffixes_8u(SA,n,m){
	for(var SAm=SA.subarray(m).fill(0,0,n>>1),i=0,j=m-3,l,o=1<<31,p,s,x=-1>>>1,name=0;i<j;)
		p=SA[i++],SAm[(p&x)>>1]=name|o,name+=p<0,
		p=SA[i++],SAm[(p&x)>>1]=name|o,name+=p<0,
		p=SA[i++],SAm[(p&x)>>1]=name|o,name+=p<0,
		p=SA[i++],SAm[(p&x)>>1]=name|o,name+=p<0;
	for(;i<m;)p=SA[i++],SAm[(p&x)>>1]=name|o,name+=p<0;
	if(name<m){
		for(i=m+(n>>1),j=m+3,l=n-1;i>j;)
			s=SA[--i],SA[l]=s&x,l-=s<0,
			s=SA[--i],SA[l]=s&x,l-=s<0,
			s=SA[--i],SA[l]=s&x,l-=s<0,
			s=SA[--i],SA[l]=s&x,l-=s<0;
		for(;i>m;)s=SA[--i],SA[l]=s&x,l-=s<0
	}else for(;m;)SA[--m]&=x;
	return name
}
function libsais_renumber_and_mark_distinct_lms_suffixes_32s_4k(SA,n,m){
	for(var SAm=SA.subarray(m).fill(0,0,n>>1),name=1,i=0,j=m-3,o=1<<31,p,q,r,s=-1,x=-1>>>1;i<j;)
		p=SA[i],SAm[(SA[i++]=p&x)>>1]=name|p&s&o,name+=p<0,
		q=SA[i],SAm[(SA[i++]=q&x)>>1]=name|q&p&o,name+=q<0,
		r=SA[i],SAm[(SA[i++]=r&x)>>1]=name|r&q&o,name+=r<0,
		s=SA[i],SAm[(SA[i++]=s&x)>>1]=name|s&r&o,name+=s<0;
	for(;i<m;)r=s,s=SA[i],SAm[(SA[i++]=s&x)>>1]=name|s&r&o,name+=s<0;
	if(name<=m){
		for(j=m+(n>>1)-3,s=-1;i<j;)
			p=SA[i],SA[i++]=p&(s|x),p||(p=s),
			q=SA[i],SA[i++]=q&(p|x),q||(q=p),
			r=SA[i],SA[i++]=r&(q|x),r||(r=q),
			s=SA[i],SA[i++]=s&(r|x),s||(s=r);
		for(j+=3;i<j;)r=s,s=SA[i],SA[i++]=s&(r|x),s||(s=r)
	}return--name
}
function libsais_renumber_and_mark_distinct_lms_suffixes_32s_1k(T,SA,n,m){
	var SAm=SA.subarray(m),i=n-m,j=n-4,l,o=1<<31,p,x=-1>>>1,name=1;
	libsais_gather_lms_suffixes_8u(T,SA,n);
	for(SA.fill(0,m,n-m);i<j;)
		p=SA[i++],SAm[p>>>1]=SA[i]-p+o+1,
		p=SA[i++],SAm[p>>>1]=SA[i]-p+o+1,
		p=SA[i++],SAm[p>>>1]=SA[i]-p+o+1,
		p=SA[i++],SAm[p>>>1]=SA[i]-p+o+1;
	for(j+=3;i<j;)p=SA[i++],SAm[p>>>1]=SA[i]-p+o+1;
	SAm[SA[n-1]>>>1]=o+1;
	for(i=0,j=(n>>1)-3;i<j;)
		p=SAm[i],SAm[i++]=p<0&&p&x,
		p=SAm[i],SAm[i++]=p<0&&p&x,
		p=SAm[i],SAm[i++]=p<0&&p&x,
		p=SAm[i],SAm[i++]=p<0&&p&x;
	for(j+=3;i<j;)p=SAm[i],SAm[i++]=p<0&&p&x;
	p=SA[0];var pl=SAm[p>>1],pd=o;
	for(i=1,j=m-1;i<j;){
		var q=SA[i++],ql=SAm[q>>1],qd=o;
		if(pl===ql){for(l=0;T[p+l]===T[q+l]&&++l<ql;);qd=l-ql&o}
		SAm[p>>1]=name|pd&qd;name+=qd<0;
		p=SA[i++];pl=SAm[p>>1];pd=o;
		if(pl===ql){for(l=0;T[p+l]===T[q+l]&&++l<pl;);pd=l-pl&o}
		SAm[q>>1]=name|qd&pd;name+=pd<0;
	}
	for(;i<m;pd=qd){
		q=SA[i++],ql=SAm[q>>1],qd=o;
		if(pl===ql){for(l=0;T[p+l]===T[q+l]&&++l<pl;);qd=l-pl&o}
		SAm[p>>1]=name|pd&qd;name+=qd<0;
		p=q;pl=ql
	}
	SAm[p>>1]=name|pd;
	if(name<m){
		for(j=m+(n>>1)-3,l=-1;i<j;)
			p=SA[i],SA[i++]=p&(l|x),p||(p=l),
			q=SA[i],SA[i++]=q&(p|x),q||(q=p),
			m=SA[i],SA[i++]=m&(q|x),m||(m=q),
			l=SA[i],SA[i++]=l&(m|x),l||(l=m);
		for(j+=3;i<j;)m=l,l=SA[i],SA[i++]=l&(m|x),l||(l=m)
	}return name
}
function libsais_reconstruct_lms_suffixes(SA,n,m){
	for(var SAnm=SA.subarray(n-m),i=0,j=m-3;i<j;)
		SA[i]=SAnm[SA[i++]],SA[i]=SAnm[SA[i++]],SA[i]=SAnm[SA[i++]],SA[i]=SAnm[SA[i++]];
	for(;i<m;)SA[i]=SAnm[SA[i++]]
}
function libsais_place_lms_suffixes_interval_8u(SA,n,m,B){
	for(var E=B.subarray(1792),c=255,i,j=n,l;c--;){
		l=B[c*2+3]-B[c*2+1];
		if(l>0)i=E[c],j>i&&SA.fill(0,i,j),SAmove(SA,j=i-l,m-=l,l)
	}
	SA.fill(0,0,j)
}
function libsais_place_lms_suffixes_interval_32s_4k(SA,n,k,m,B){
	for(var E=B.subarray(3*k),c=k-1,i,j=n,l;c--;){
		l=B[c*2+3]-B[c*2+1];
		if(l>0)i=E[c],j>i&&SA.fill(0,i,j),SAmove(SA,j=i-l,m-=l,l)
	}
	SA.fill(0,0,j)
}
function libsais_place_lms_suffixes_interval_32s_2k(SA,n,k,m,B){
	for(var c=k-2<<1,i,j=n,l;c>=0;c-=2){
		l=B[c+3]-B[c+1];
		if(l>0)i=B[c],j>i&&SA.fill(0,i,j),SAmove(SA,j=i-l,m-=l,l)
	}
	SA.fill(0,0,j)
}
function libsais_place_lms_suffixes_interval_32s_1k(T,SA,n,k,m,B){
	for(var i=m,c,l=B[--k],p;i>3;){
		if(T[p=SA[--i]]^k)SA.fill(0,c=B[k=T[p]],l),l=c;SA[--l]=p;
		if(T[p=SA[--i]]^k)SA.fill(0,c=B[k=T[p]],l),l=c;SA[--l]=p;
		if(T[p=SA[--i]]^k)SA.fill(0,c=B[k=T[p]],l),l=c;SA[--l]=p;
		if(T[p=SA[--i]]^k)SA.fill(0,c=B[k=T[p]],l),l=c;SA[--l]=p;
	}
	for(;i;SA[--l]=p)if(T[p=SA[--i]]^k)SA.fill(0,c=B[k=T[p]],l),l=c;
	SA.fill(0,0,l)
}
function libsais_place_lms_suffixes_histogram_32s_6k(SA,n,k,m,B){
	for(var E=B.subarray(5*k),c=k-1,i,j=n,l;c--;){
		l=B[c<<2|1];
		if(l>0)i=E[c],j>i&&SA.fill(0,i,j),SAmove(SA,j=i-l,m-=l,l)
	}
	SA.fill(0,0,j)
}
function libsais_place_lms_suffixes_histogram_32s_4k(SA,n,k,m,B){
	for(var E=B.subarray(3*k),c=k-1,i,j=n,l;c--;){
		l=B[c*2+1];
		if(l>0)i=E[c],j>i&&SA.fill(0,i,j),SAmove(SA,j=i-l,m-=l,l)
	}
	SA.fill(0,0,j)
}
function libsais_place_lms_suffixes_histogram_32s_2k(SA,n,k,m,B){
	for(var c=k-2<<1,i,j=n,l;c>=0;c-=2){
		l=B[c+1];
		if(l>0)i=B[c],j>i&&SA.fill(0,i,j),SAmove(SA,j=i-l,m-=l,l)
	}
	SA.fill(0,0,j)
}
function libsais_final_bwt_scan_left_to_right_8u(T,SA,n,B){
	var i=0,j=n-1,p,iB=B.subarray(1536),o=1<<31,x=-1>>>1;
	for(SA[iB[T[j]]++]=j|(T[j-1]<T[j])<<31;i<j;++i){
		p=SA[i];SA[i]=p&x;if(p>0)SA[i]=T[--p]|o,SA[iB[T[p]]++]=p|(T[p-(0<p)]<T[p])<<31;
		p=SA[++i];SA[i]=p&x;if(p>0)SA[i]=T[--p]|o,SA[iB[T[p]]++]=p|(T[p-(0<p)]<T[p])<<31
	}
	for(;i<n;++i){
		p=SA[i];SA[i]=p&x;if(p>0)SA[i]=T[--p]|o,SA[iB[T[p]]++]=p|(T[p-(0<p)]<T[p])<<31
	}
}
function libsais_final_sorting_scan_left_to_right_32s(T,SA,n,B){
	var i=0,j=n-1,o=1<<31,p;
	for(SA[B[T[j]]++]=j|(T[j-1]<T[j])<<31;i<j;){
		p=SA[i];SA[i++]=p^o;if(p>0)SA[B[T[--p]]++]=p|(T[p-(0<p)]<T[p])<<31;
		p=SA[i];SA[i++]=p^o;if(p>0)SA[B[T[--p]]++]=p|(T[p-(0<p)]<T[p])<<31
	}
	for(;i<n;){
		p=SA[i];SA[i++]=p^o;if(p>0)SA[B[T[--p]]++]=p|(T[p-(0<p)]<T[p])<<31
	}
}
function libsais_final_bwt_scan_right_to_left_8u(T,SA,n,B){
	for(var b,c,i=n,p,o=1<<31,x=-1>>>1,iB=B.subarray(1792);i>1;){
		p=SA[--i];p||(n=i);SA[i]=p&x;
		if(p>0)c=SA[i]=T[--p],b=T[p-(p>0)],SA[--iB[c]]=b<=c?p:b|o;
		p=SA[--i];p||(n=i);SA[i]=p&x;
		if(p>0)c=SA[i]=T[--p],b=T[p-(p>0)],SA[--iB[c]]=b<=c?p:b|o
	}
	for(;i;){
		p=SA[--i];p||(n=i);SA[i]=p&x;
		if(p>0)c=SA[i]=T[--p],b=T[p-(p>0)],SA[--iB[c]]=b<=c?p:b|o
	}return n
}
function libsais_final_sorting_scan_right_to_left_32s(T,SA,n,iB){
	for(var i=n,p,x=-1>>>1;i>1;){
		p=SA[--i];SA[i]=p&x;if(p>0)SA[--iB[T[--p]]]=p|(T[p-(0<p)]>T[p])<<31;
		p=SA[--i];SA[i]=p&x;if(p>0)SA[--iB[T[--p]]]=p|(T[p-(0<p)]>T[p])<<31
	}
	for(;i;){
		p=SA[--i];SA[i]=p&x;if(p>0)SA[--iB[T[--p]]]=p|(T[p-(0<p)]>T[p])<<31
	}
}
function libsais_induce_final_order_8u(T,SA,n,bwt,B){
	if(bwt){
		libsais_final_bwt_scan_left_to_right_8u(T,SA,n,B);
		return libsais_final_bwt_scan_right_to_left_8u(T,SA,n,B)
	}
	libsais_final_sorting_scan_left_to_right_32s(T,SA,n,B.subarray(1536));
	libsais_final_sorting_scan_right_to_left_32s(T,SA,n,B.subarray(1792));
	return 0
}
function libsais_induce_final_order_32s_6k(T,SA,n,k,B){
	libsais_final_sorting_scan_left_to_right_32s(T,SA,n,B.subarray(4*k));
	libsais_final_sorting_scan_right_to_left_32s(T,SA,n,B.subarray(5*k))
}
function libsais_induce_final_order_32s_4k(T,SA,n,k,B){
	libsais_final_sorting_scan_left_to_right_32s(T,SA,n,B.subarray(2*k));
	libsais_final_sorting_scan_right_to_left_32s(T,SA,n,B.subarray(3*k))
}
function libsais_induce_final_order_32s_2k(T,SA,n,k,B){
	libsais_final_sorting_scan_left_to_right_32s(T,SA,n,B.subarray(k));
	libsais_final_sorting_scan_right_to_left_32s(T,SA,n,B)
}
function libsais_induce_final_order_32s_1k(T,SA,n,k,B){
	libsais_count_suffixes_32s(T,n,k,B);
	libsais_initialize_buckets_start_32s_1k(k,B);
	libsais_final_sorting_scan_left_to_right_32s(T,SA,n,B);
	libsais_count_suffixes_32s(T,n,k,B);
	libsais_initialize_buckets_end_32s_1k(k,B);
	libsais_final_sorting_scan_right_to_left_32s(T,SA,n,B)
}
function libsais_compact_lms_suffixes_32s(T,SA,n,m,fs){
	for(var i=0,j=m-3,f=0,l=m-1,o=1<<31,p,r=n+fs-1,s,x=-1>>>1,SAm=SA.subarray(m);i<j;){
		p=SA[i++];s=SAm[p>>>1];if(s<0)T[p]|=o,s=i+o+f++;SAm[p>>>1]=s-f;
		p=SA[i++];s=SAm[p>>>1];if(s<0)T[p]|=o,s=i+o+f++;SAm[p>>>1]=s-f;
		p=SA[i++];s=SAm[p>>>1];if(s<0)T[p]|=o,s=i+o+f++;SAm[p>>>1]=s-f;
		p=SA[i++];s=SAm[p>>>1];if(s<0)T[p]|=o,s=i+o+f++;SAm[p>>>1]=s-f
	}
	for(;i<m;){
		p=SA[i++];s=SAm[p>>>1];if(s<0)T[p]|=o,s=i+o+f++;SAm[p>>>1]=s-f
	}
	for(i=m+(n>>1),j=m+3;i>j;)
		p=SA[--i],SA[l]=p&x,l-=p<0,SA[r]=p-1,r-=p>0,
		p=SA[--i],SA[l]=p&x,l-=p<0,SA[r]=p-1,r-=p>0,
		p=SA[--i],SA[l]=p&x,l-=p<0,SA[r]=p-1,r-=p>0,
		p=SA[--i],SA[l]=p&x,l-=p<0,SA[r]=p-1,r-=p>0;
	for(;i>m;)p=SA[--i],SA[l]=p&x,l-=p<0,SA[r]=p-1,r-=p>0;
	SAcopy(SA,n+fs-m,l+1,f);
	return f
}
function libsais_merge_compacted_lms_suffixes_32s(T,SA,n,m,f){
	for(var i=0,j=n-6,l=0,c,x=-1>>>1,SAnm=SA.subarray(~m+n),s=SAnm[l];i<j;++i){
		c=T[i];if(c<0)T[i]=c&x,SA[s]=i++,s=SAnm[++l];
		c=T[++i];if(c<0)T[i]=c&x,SA[s]=i++,s=SAnm[++l];
		c=T[++i];if(c<0)T[i]=c&x,SA[s]=i++,s=SAnm[++l];
		c=T[++i];if(c<0)T[i]=c&x,SA[s]=i++,s=SAnm[++l]
	}
	for(;i<n;++i){
		c=T[i];if(c<0)T[i]=c&x,SA[s]=i++,s=SAnm[++l]
	}
	for(i=0,j=m-3,s=SAnm[l=f];i<j;++i)
		SA[i]||(SA[i]=s,s=SAnm[++l]),
		SA[++i]||(SA[i]=s,s=SAnm[++l]),
		SA[++i]||(SA[i]=s,s=SAnm[++l]),
		SA[++i]||(SA[i]=s,s=SAnm[++l]);
	for(;i<m;++i)SA[i]||(SA[i]=s,s=SAnm[++l])
}
function libsais_reconstruct_compacted_lms_suffixes_32s_2k(T,SA,n,k,m,fs,f,B){
	if(f>0)
		SAcopy(SA,n-m-1,n+fs-m,f),
		libsais_count_and_gather_compacted_lms_suffixes_32s_2k(T,SA,n,k,B),
		libsais_reconstruct_lms_suffixes(SA,n,m-f),
		SAcopy(SA,n-m-1+f,0,m-f),
		SA.fill(0,0,m),
		libsais_merge_compacted_lms_suffixes_32s(T,SA,n,m,f);
	else
		libsais_count_and_gather_lms_suffixes_32s_2k(T,SA,n,k,B),
		libsais_reconstruct_lms_suffixes(SA,n,m)
}
function libsais_reconstruct_compacted_lms_suffixes_32s_1k(T,SA,n,k,m,fs,f){
	if(f>0)
		SAmove(SA,n-m-1,n+fs-m,f),
		libsais_gather_compacted_lms_suffixes_32s(T,SA,n),
		libsais_reconstruct_lms_suffixes(SA,n,m-f),
		SAcopy(SA,n-m-1+f,0,m-f),
		SA.fill(0,0,m),
		libsais_merge_compacted_lms_suffixes_32s(T,SA,n,m,f);
	else
		libsais_gather_lms_suffixes_8u(T,SA,n),
		libsais_reconstruct_lms_suffixes(SA,n,m)
}
function libsais_main_32s(T,SA,n,k,fs){
	if(k>0&&fs>=6*k){
		var a=fs-1024<6*k?16:1024,f=~95>>>1,m=n+fs-6*k,c=f+(m-a)*4+(a-1)*4&-a*4,B=SA.subarray(fs-a<6*k?m:c-f>>2);
		m=libsais_count_and_gather_lms_suffixes_8u(T,SA,n,B,k*4);
		if(m>1){
			SA.fill(0,0,n-m);
			f=SA[n-m],c=libsais_initialize_buckets_for_lms_suffixes_radix_sort_32s_6k(T,k,B,f);
			libsais_radix_sort_lms_suffixes_32s_2k(T,SA,n,m,B.subarray(4*k));
			libsais_radix_sort_set_markers_32s(SA,k,B.subarray(4*k),1<<31);
			libsais_initialize_buckets_for_partial_sorting_32s_6k(T,k,B,f,c);
			libsais_induce_partial_order_32s_6k(T,SA,n,B,f,c,k);
			var names=libsais_renumber_and_mark_distinct_lms_suffixes_32s_4k(SA,n,m);
			if(names<m){
				f=libsais_compact_lms_suffixes_32s(T,SA,n,m,fs);
				if(libsais_main_32s(SA.subarray(n+fs-m+f),SA,m-f,names-f,fs+n-2*m+f))return-2;
				libsais_reconstruct_compacted_lms_suffixes_32s_2k(T,SA,n,k,m,fs,f,B)
			}else libsais_count_lms_suffixes_32s_2k(T,n,k,B);
			libsais_initialize_buckets_start_and_end_32s_4k(k,B);
			libsais_place_lms_suffixes_histogram_32s_4k(SA,n,k,m,B);
			libsais_induce_final_order_32s_4k(T,SA,n,k,B)
		}else SA[0]=SA[n-1],
			libsais_initialize_buckets_start_and_end_32s_6k(k,B),
			libsais_place_lms_suffixes_histogram_32s_6k(SA,n,k,m,B),
			libsais_induce_final_order_32s_6k(T,SA,n,k,B);
		return
	}
	if(k>0&&fs>=4*k){
		a=fs-1024<4*k?16:1024,f=0x24315a40,m=n+fs-4*k,c=f+(m-a)*4+(a-1)*4&-a*4;
		B=SA.subarray(fs-a<4*k?m:c-f>>2);
		m=libsais_count_and_gather_lms_suffixes_32s_2k(T,SA,n,k,B);
		if(m>1){
			libsais_initialize_buckets_for_radix_and_partial_sorting_32s_4k(T,k,B,SA[n-m]);
			libsais_radix_sort_lms_suffixes_32s_2k(T,SA,n,m,B.subarray(1));
			libsais_radix_sort_set_markers_32s(SA,k,B.subarray(1),SUFFIX_GROUP_MARKER);
			libsais_place_lms_suffixes_interval_32s_4k(SA,n,k,m-1,B);
			libsais_induce_partial_order_32s_4k(T,SA,n,k,B);
			names=libsais_renumber_and_mark_distinct_lms_suffixes_32s_4k(SA,n,m);
			if(names<m){
				f=libsais_compact_lms_suffixes_32s(T,SA,n,m,fs);
				if(libsais_main_32s(SA.subarray(n+fs-m+f),SA,m-f,names-f,fs+n-2*m+f))return-2;
				libsais_reconstruct_compacted_lms_suffixes_32s_2k(T,SA,n,k,m,fs,f,B);
			}else libsais_count_lms_suffixes_32s_2k(T,n,k,B)
		}else SA[0]=SA[n-1];
		libsais_initialize_buckets_start_and_end_32s_4k(k,B);
		libsais_place_lms_suffixes_histogram_32s_4k(SA,n,k,m,B);
		libsais_induce_final_order_32s_4k(T,SA,n,k,B);
		return
	}
	if(k>0&&fs>=2*k){
		a=fs-1024<2*k?16:1024,f=~95>>>1,m=n+fs-2*k,c=f+(m-a)*4+(a-1)*4&-a*4;
		B=SA.subarray(fs-a<2*k?m:c-f>>2);
		m=libsais_count_and_gather_lms_suffixes_32s_2k(T,SA,n,k,B);
		if(m>1){
			libsais_initialize_buckets_for_lms_suffixes_radix_sort_32s_2k(T,k,B,SA[n-m]);
			libsais_radix_sort_lms_suffixes_32s_2k(T,SA,n,m,B.subarray(1));
			libsais_place_lms_suffixes_interval_32s_2k(SA,n,k,m-1,B);
			libsais_initialize_buckets_start_and_end_32s_2k(k,B);
			libsais_induce_partial_order_32s_2k(T,SA,n,k,B);
			names=libsais_renumber_and_mark_distinct_lms_suffixes_32s_1k(T,SA,n,m);
			if(names<m){
				f=libsais_compact_lms_suffixes_32s(T,SA,n,m,fs);
				if(libsais_main_32s(SA.subarray(n+fs-m+f),SA,m-f,names-f,fs+n-2*m+f))return-2;
				libsais_reconstruct_compacted_lms_suffixes_32s_2k(T,SA,n,k,m,fs,f,B)
			}else libsais_count_lms_suffixes_32s_2k(T,n,k,B)
		}else SA[0]=SA[n-1];
		libsais_initialize_buckets_end_32s_2k(k,B);
		libsais_place_lms_suffixes_histogram_32s_2k(SA,n,k,m,B);
		libsais_initialize_buckets_start_and_end_32s_2k(k,B);
		libsais_induce_final_order_32s_2k(T,SA,n,k,B);
		return
	}
	var A=fs<k&&new Int32Array(k+4096);
	a=fs-1024<k?16:1024,f=~95>>>1,m=n+fs-k,c=f+(m-a)*4+(a-1)*4&-a*4;
	B=fs-a>=k?SA.subarray(c-f>>2):fs<k?A:SA.subarray(m);
	SA.fill(0,0,n);
	libsais_count_suffixes_32s(T,n,k,B);
	libsais_initialize_buckets_end_32s_1k(k,B);
	m=libsais_radix_sort_lms_suffixes_32s_1k(T,SA,n,B);
	if(m>1){
		libsais_induce_partial_order_32s_1k(T,SA,n,k,B);
		names=libsais_renumber_and_mark_distinct_lms_suffixes_32s_1k(T,SA,n,m);
		if(names<m){
			if(A)A=B=null;
			f=libsais_compact_lms_suffixes_32s(T,SA,n,m,fs);
			if(libsais_main_32s(SA.subarray(n+fs-m+f),SA,m-f,names-f,fs+n-2*m+f))return-2;
			libsais_reconstruct_compacted_lms_suffixes_32s_1k(T,SA,n,k,m,fs,f);
			if(!B)B=new Int32Array(k+4096)
		}
		libsais_count_suffixes_32s(T,n,k,B);
		libsais_initialize_buckets_end_32s_1k(k,B);
		libsais_place_lms_suffixes_interval_32s_1k(T,SA,n,k,m,B)
	}
	libsais_induce_final_order_32s_1k(T,SA,n,k,B)
}
function libsais_main_8u(T,SA,n,bwt){
	var B=new Int32Array(6144),m=libsais_count_and_gather_lms_suffixes_8u(T,SA,n,B);
	libsais_initialize_buckets_start_and_end_8u(B);
	if(m>0){
		var fs=SA[n-m],lc=libsais_initialize_buckets_for_lms_suffixes_radix_sort_8u(T,B,fs);
		libsais_radix_sort_lms_suffixes_8u(T,SA,n,m,B);
		libsais_initialize_buckets_for_partial_sorting_8u(T,B,fs,lc);
		libsais_induce_partial_order_8u(T,SA,n,B,fs,lc);
		var names=libsais_renumber_and_gather_lms_suffixes_8u(SA,n,m);
		if(names<m){
			if(libsais_main_32s(SA.subarray(n-m),SA,m,names,n-2*m))return-2;
			libsais_gather_lms_suffixes_8u(T,SA,n);
			libsais_reconstruct_lms_suffixes(SA,n,m)
		}
		libsais_place_lms_suffixes_interval_8u(SA,n,m,B)
	}else SA.fill(0,0,n);
	return libsais_induce_final_order_8u(T,SA,n,bwt,B)
}
function libsais_bwt_copy_8u(U,A,C,n){
	for(var i=0,j=n-7;i<j;C[U[i]=A[i++]]++)C[U[i]=A[i++]]++,C[U[i]=A[i++]]++,C[U[i]=A[i++]]++,C[U[i]=A[i++]]++,C[U[i]=A[i++]]++,C[U[i]=A[i++]]++,C[U[i]=A[i++]]++;
	for(;i<n;)C[U[i]=A[i++]]++
}
function libsais(T,SA,n){
	if(!T||!SA||n<0)return-1;
	if(n<2){if(n)SA[0]=0;return 0}
	return libsais_main_8u(T,SA,n,0)
}
// BWT for 8bits symbol
function libsais_bwt(T,U,A,C,n){
	if(!T||!U)return-1;
	n=n||T.length;A=A||new Int32Array(n);
	C=C||new Int32Array(65537);
	if(n<2){if(n)C[U[0]=T[0]]=1;return n}
	var i=libsais_main_8u(T,A,n,1);
	if(i>=0)
		C[U[0]=T[n-1]]=1,
		libsais_bwt_copy_8u(U.subarray(1),A,C,i++),
		libsais_bwt_copy_8u(U.subarray(i),A.subarray(i),C,n-i);
	return i
}
// BWT for 16bits symbol. @T must be Int32Array
function libsais16_bwt(T,U,A,C,n,k){
	if(!T||!U)return-1;k>>>=0;
	n=n||T.length;A=A||new Int32Array(n);
	C=C||new Int32Array(k+1);
	if(n<2){if(n)C[U[0]=T[0]]=1;return n}
	libsais_main_32s(T,A,n,k||1<<16,0);
	var i=0,s,p;
	for(C[U[0]=T[n-1]]=1;s=A[i++];)C[U[i]=T[--s]]++;
	for(p=i;i<n;)C[U[i]=T[A[i++]-1]]++;
	return p
}
