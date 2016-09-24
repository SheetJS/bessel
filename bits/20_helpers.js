function _horner(arr/*:Array<number>*/, v/*:number*/)/*:number*/ { for(var i = 0, z = 0; i < arr.length; ++i) z = v * z + arr[i]; return z; }
