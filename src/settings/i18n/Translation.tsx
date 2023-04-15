import { forEach, reduce } from "lodash";

let translate: (id: string, param?: any) => string;

if (__PRODUCTION__) {
    translate = Homey.__;
} else {
    // tslint:disable-next-line: no-var-requires
    const lang = require(`../../../locales/${__HOMEY_LANG}.json`);

    translate = (id: string, param?: any) => {
        let value = reduce(id.split("."), (r, v, _k) => {
            return r != null ? r[v] : null;
        }, lang);

        if (value == null) { throw new Error(`Resource ${id} not found.`); }

        if (param != null) {
            forEach(Object.keys(param), (k) => {
                value = value.replace(`__${k}__`, param[k]);
            });
        }

        return value;
    };
}

export default translate;
