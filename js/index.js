"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_arrarify_1 = require("object-arrarify");
var modify_object_recursively_1 = require("modify-object-recursively");
var toNormalObject = "toNormalObject";
var possibleObjectMethods = [
    "filter",
    "find",
    "findKey",
    "map",
    "forEach",
    toNormalObject
];
var objectArrayDeepTools = function (input) {
    return modify_object_recursively_1.default(__assign({}, input), (function (o) {
        possibleObjectMethods.forEach(function (key) {
            Object.defineProperty(o, key, {
                enumerable: false,
                value: function (func) {
                    return modify_object_recursively_1.default(o, function (oo) {
                        if (key === toNormalObject)
                            return oo;
                        return objectArrayDeepTools(object_arrarify_1.default(__assign({}, oo))[key](func));
                    });
                },
            });
        });
        return o;
    }));
};
exports.default = objectArrayDeepTools;
//# sourceMappingURL=index.js.map