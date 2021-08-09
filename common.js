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

export const Arrays =
{

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

