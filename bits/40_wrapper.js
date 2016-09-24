function _bessel_wrap(bessel0/*:BesselN*/, bessel1/*:BesselN*/, name/*:string*/, nonzero/*:number*/, sign/*:number*/)/*:BesselF*/ {
  return function bessel(x/*:number*/,n/*:number*/) {
    if(nonzero) {
      if(x === 0) return (nonzero == 1 ? -Infinity : Infinity);
      else if(x < 0) return NaN;
    }
    if(n === 0) return bessel0(x);
    if(n === 1) return bessel1(x);
    if(n < 0) return NaN;
    n|=0;
    var b0/*:number*/ = bessel0(x), b1/*:number*/ = bessel1(x);
    return _bessel_iter(x, n, b0, b1, sign);
  };
}
