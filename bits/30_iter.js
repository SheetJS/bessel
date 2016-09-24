function _bessel_iter(x/*:number*/, n/*:number*/, f0/*:number*/, f1/*:number*/, sign/*:number*/)/*:number*/ {
  if(n === 0) return f0;
  if(n === 1) return f1;
  var tdx = 2 / x, f2 = f1;
  for(var o = 1; o < n; ++o) {
    f2 = f1 * o * tdx + sign * f0;
    f0 = f1; f1 = f2;
  }
  return f2;
}
