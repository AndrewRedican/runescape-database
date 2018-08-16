let logify = {
    '&&'   : function (x, y) { return x && y  },
    '||'   : function (x, y) { return x || y  },
    '<'    : function (x, y) { return x < y   },
    '>'    : function (x, y) { return x > y   },
    '>='   : function (x, y) { return x >= y  },
    '<='   : function (x, y) { return x <= y  },
    '=='   : function (x, y) { return x == y  },
    '!='   : function (x, y) { return x != y  },
    '==='  : function (x, y) { return x === y },
    '!=='  : function (x, y) { return x !== y }
}

export default logify