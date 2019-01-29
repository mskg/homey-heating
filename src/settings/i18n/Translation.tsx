import { forEach, reduce } from 'lodash';
declare var Homey: any;

let translate: (id: string, param?: any) => string = null;

if (PRODUCTION) {
    translate = Homey.__;
} else 
{
    const en = require("../../../locales/en.json");
    
    translate = (id: string, param?: any) => {
        var value = reduce(id.split("."), (r, v, k) => {
            if (r == null) { throw new Error(`Resource ${id} not found.`); }
            return r[v];
        }, en);

        if (value == null) { throw new Error(`Resource ${id} not found.`); }

        if (param != null) {
            forEach(Object.keys(param), k => {
                value = value.replace(`__${k}__`, param[k]);
            });
        }

        return value;
    };
}

export default translate;
