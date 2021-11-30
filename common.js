export function assertTrue(x)
{
  if (x !== true)
  {
    throw new Error("expected true, got: " + x);
  }
}

export function assertFalse(x)
{
  if (x !== false)
  {
    throw new Error("expected false, got: " + x);
  }
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function sfc32(a, b, c, d)
{
  return function()
  {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    let t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}

export function createRandom(seed = 1337 ^ 0xDEADBEEF)
{
  return sfc32(0x9E3779B9, 0x243F6A88, 0xB7E15162, seed);
}

export const Arrays =
{
  // equals(x, y) // atom, array
  // {
  //   if (x.length !== y.length)
  //   {
  //     return false;
  //   }
  //   for (let i = 0; i < x.length; i++)
  //   {
  //     if (x[i] === y[i])
  //     {
  //       return true;
  //     }
  //     if (Array.isArray(x[i]))
  //     {
  //       if (Array.isArray(y[i]))
  //       {
  //         return Arrays.equals(x[i], y[i]);
  //       }
  //     }
  //     return false;      
  //   }
  //   return true;
  // },

  push(array, x)
  {
    const array2 = array.slice(0);
    array2.push(x);
    return array2;
  },

  range(length)
  {
    return Array.from({length}, (_, i) => i);
  }

}

// export class ArrayRegistry
// {
//   constructor()
//   {
//     this.arrays = [];
//   }

//   addGet(a)
//   {
//     outer: for (let i = 0; i < this.arrays.length; i++)
//     {
//       const x = this.arrays[i];
//       if (x === a)
//       {
//         return x;
//       }
//       if (x.length !== a.length)
//       {
//         continue;
//       }
//       for (let j = 0; j < x.length; j++)
//       {
//         if (x[j] !== a[j])
//         {
//           continue outer;
//         }
//       }
//       return x;
//     }
//     this.arrays.push(a);
//     return a;
//   }

//   values()
//   {
//     return this.arrays.values();  
//   }
// }

export const MutableArrays =
{
  pushUnique(array, x)
  {
    const index = array.indexOf(x);
    if (index === -1)
    {
      array.push(x);
      return x;
    }
    return array[index];
  },
  pushUniqueEq(array, x, eqfun)
  {
    const existing = array.find(el => eqfun(el, x));
    if (existing === undefined)
    {
      array.push(x);
      return x;
    }
    return existing;
  }
}

export const Sets = 
{
  equals(x, y)
  {
    if (x === y)
    {
      return true;
    }
    if (x.size !== y.size)
    {
      return false;
    }
    for (const xvalue of x)
    {
      if (!y.has(xvalue))
      {
        return false;
      }
    }
    return true;
  },

  union(x, y)
  {
    const union = new Set(x);
    for (const elem of y)
    {
      union.add(elem);
    }
    return union;
  },

  difference(x, y)
  {
    const difference = new Set(x)
    for (const elem of y)
    {
      difference.delete(elem);
    }
    return difference;
  }
}

export const MutableSets =
{
  addAll(x, y)
  {
    for (const elem of y)
    {
      x.add(elem);
    }
  }
}

export const Maps =
{
  // fromMergedEntries(entries, mergeFun)
  // {
  //   const m = new Map();
  //   for ([key, value] of entries)
  //   {
  //     const current = m.get(key);
  //     if (current === undefined)
  //     {
  //       m.set(key, value);
  //     }
  //     else
  //     {
  //       m.set(key, mergeFun(current, value));
  //     }
  //   }
  //   return m;
  // },

  put(map, key, value)
  {
    const map2 = new Map(map);
    map2.set(key, value);
    return map2;
  }

}

export const MutableMaps =
{
  putPushArray(map, key, value)
  {
    const current = map.get(key);
    if (current === undefined)
    {
      map.set(key, [value]);
    }
    else
    {
      current.push(value);
    }
  },

  putAddSet(map, key, value)
  {
    const current = map.get(key);
    if (current === undefined)
    {
      map.set(key, new Set([value]));
    }
    else
    {
      current.add(value);
    }
  }

}

export const Strings = {};

Strings.hashCode =
    function (x)
    {
      var l = x.length;
      if (l === 0)
      {
        return 0;
      }
      var result = 1;
      for (var i = 0; i < l; i++)
      {
        result = (31 * result + x.charCodeAt(i)) >> 0;
      }
      return result;
    }

Strings.smartTrim =
    function (s, l = 30)
    {
      const ss = String(s);
      if (ss.length <= l)
      {
        return ss;
      }
      const cut1 = ss.length - l + 10;
      const cut2 = ss.length - 10;
      return ss.substring(0, cut1) + "..." + ss.substring(cut2);
    }

export const Characters = {};

Characters.isWhitespace =
  function (x)
  {
    return x === " " || x === "\n" || x === "\t" || x === "\r";
  }
  
Characters.isDigit =
  function (x)
  {
    return x === "0" || x === "1" || x === "2" || x === "3" || x === "4" || x === "5" || x === "6" || x === "7" || x === "8" || x === "9";
  }


  // const r = new ArrayRegistry();
  // const a1 = r.addGet(['hey' , r.addGet(['ho', 123])]);
  // const a2 = r.addGet(['hey' , r.addGet(['ho', 123])]);
  // console.log(a1 === a2);