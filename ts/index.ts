import objectArrayTools, {IObjectArrayTools} from "object-arrarify";
import ModifyObjectRecursively from "modify-object-recursively";

const toNormalObject = "toNormalObject";
const possibleObjectMethods = [
    "filter"
    , "find"
    , "findKey"
    , "map"
    , "mapKeys"
    , "forEach"
    , toNormalObject
];
const objectArrayDeepTools = (input: any): IObjectArrayTools<any> => {
    return ModifyObjectRecursively({...input}, (o => {
            possibleObjectMethods.forEach((key) => {
                Object.defineProperty(o, key, {
                    enumerable: false,
                    value: (func?: any) => {
                        return ModifyObjectRecursively(o, (oo) => {
                            if (key === toNormalObject)
                                return oo;
                            return objectArrayDeepTools(objectArrayTools({...oo})[key](func));
                        });
                    },
                });
            });
            return o;
        }
    ));
};
export default objectArrayDeepTools;