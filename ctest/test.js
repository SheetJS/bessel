/* vim: set ts=2: */
var X;
if(typeof require !== 'undefined') {
  assert = require('assert');
  describe('source',function(){
    it('should load',function(){X=require('./');});
    it('all bessel functions', function() {
      assert.equal(typeof X.besseli, 'function');
      assert.equal(typeof X.besselj, 'function');
      assert.equal(typeof X.besselk, 'function');
      assert.equal(typeof X.bessely, 'function');
    });
  });
} else { X = BESSEL; }

function approx(a, b, t) { return Math.abs((a - b) / (Math.abs(a) + Math.abs(b))) <= t; }

function chk(func, x, n, v, F, t) {
  var V = func(x,n);
  if(!approx(V, v, t) && v != V && !(isNaN(v) && isNaN(V))) throw new Error(F + "(" + x + "," + n + ") = " + V + " !~ " + v);
}

var funcs = ['besseli', 'besselj', 'besselk', 'bessely'];

var tests = {
'besseli': [
  [1.5, 1, 0.981666],
  [1.9, 2, 0.603272435],
  [2.5, 1, 2.516716242]
],
'besselj': [
  [1.5, 1, 0.557936508],
  [1.9, 2, 0.329925829],
  [2.5, 1, 0.497094103]
],
'besselk': [
  [1.5, 1, 0.277388],
  [1.9, 2, 0.296909301],
  [2.5, 1, 0.073890816]
],
'bessely': [
  [1.5, 1, -0.412308627],
  [1.9, 2, -0.669878674],
  [2.5, 1, 0.14591814]
] };

describe('correctness', function() {
  funcs.forEach(function(F) { it(F, function() {
    tests[F].forEach(function(t) { chk(X[F], t[0], t[1], t[2], F, 1e-6); });
  });});

  if(typeof require != 'undefined') {
    var fs = require('fs');
    it('excel', function() {
      var xl = fs.readFileSync("test_files/excel.tsv", 'ascii').split("\n").map(function(l) { return l.split("\t");});
      xl.forEach(function(l) { if(l.length < 6) return;
        var x=Number(l[0]), n=Number(l[1]);
        var i=Number(l[2]), j=Number(l[3]), k=Number(l[4]), y=Number(l[5]);
        chk(X.besseli, x, n, i, 'besseli', 1e-4);
        chk(X.besselj, x, n, j, 'besselj', 1e-4);
        chk(X.besselk, x, n, k, 'besselk', 1e-4);
        chk(X.bessely, x, n, y, 'bessely', 1e-4);
      });
    });
    it('mma', function() {
      var mma = fs.readFileSync("test_files/mma.tsv", 'ascii').split("\n").map(function(l) { return l.split("\t");});
      mma.forEach(function(l) { if(l.length < 6) return;
        var x=Number(l[0]), n=Number(l[1]);
        var i=Number(l[2]), j=Number(l[3]), k=Number(l[4]), y=Number(l[5]);
        chk(X.besseli, x, n, i, 'besseli', 1e-5);
        chk(X.besselj, x, n, j, 'besselj', 1e-5);
        chk(X.besselk, x, n, k, 'besselk', 1e-5);
        chk(X.bessely, x, n, y, 'bessely', 1e-5);
      });
    });
  }
});

var rand = [
	0.3946086812775882,  3.946086812775882,  39.46086812775882,
	0.03119419917289612, 0.3119419917289612,  3.119419917289612,
	0.18311903629136062, 1.8311903629136062, 18.311903629136062,
	0.5317681126599452,  5.317681126599452,  53.17681126599452,
	0.37724541457032235, 3.7724541457032235, 37.724541457032235,
	0.8287802926845655,  8.287802926845655,  82.87802926845655,
	0.7197724866379658,  7.197724866379658,  71.97724866379658
];

describe('properties', function() {
	var t = 1e-4;
	it('limiting behavior', function() {
		chk(X.besselj, 0, 0, 1, 'besselj', 1e-6);
		chk(X.besseli, 0, 0, 1, 'besseli', 1e-6);
		chk(X.besselk, 0, 0, Infinity, 'besselk', 1e-6);
		chk(X.bessely, 0, 0, -Infinity, 'bessely', 1e-6);
		for(var i = 1; i < 20; ++i) {
			chk(X.besselj, 0, i, 0, 'besselj', 1e-6);
			chk(X.besseli, 0, i, 0, 'besseli', 1e-6);
		}
	});
	it('besselj', function() {
		var F = "BESSELJ", f = X.besselj;
		rand.forEach(function(r) {
			for(var n = 0; n < 20; ++n) {
				var pp = f( r,  n), pn = f( r, -n), np = f(-r,  n), nn = f(-r, -n);
				if((n%2)) {
					/* besselj odd if n is odd */
					if(!approx(np, -pp, t)) throw new Error(F + " np[" + np + "] != -pp[" + (-pp) + "] (" + r + "," + n + ")");
					if(!approx(nn, -pn, t)) throw new Error(F + " nn[" + nn + "] != -pn[" + (-pn) + "] (" + r + "," + n + ")");
					/* asymmetric in n */
					if(!approx(pn, -pp, t)) throw new Error(F + " pn[" + pn + "] != -pp[" + (-pp) + "] (" + r + "," + n + ")");
					if(!approx(nn, -np, t)) throw new Error(F + " nn[" + nn + "] != -pn[" + (-pn) + "] (" + r + "," + n + ")");
				} else {
					/* besselj even if n is even */
					if(!approx(np, pp, t)) throw new Error(F + " np[" + np + "] != pp[" + (pp) + "] (" + r + "," + n + ")");
					if(!approx(nn, pn, t)) throw new Error(F + " nn[" + nn + "] != pn[" + (pn) + "] (" + r + "," + n + ")");
					/* symmetric in n */
					if(!approx(pn, pp, t)) throw new Error(F + " pn[" + pn + "] != pp[" + (pp) + "] (" + r + "," + n + ")");
					if(!approx(nn, np, t)) throw new Error(F + " nn[" + nn + "] != pn[" + (pn) + "] (" + r + "," + n + ")");
				}
			}
		});
	});
});
