import { App as HomeyApp } from "homey";
import { ApiBase, IAPIParams, UnkownParameters } from "./types";

type Parameters = {
    homey: HomeyApp,
    body: object,
    params: { [id: string]: string; }
    query: { [id: string]: string; },
};

export function CompatibilityWrapper<B = any, P = UnkownParameters, Q = UnkownParameters>(c: ApiBase<B, P, Q>): (p: Parameters) => Promise<any> {
    return ({ body, params, query }: Parameters): Promise<any> => {
        return new Promise((resolve, reject) => {
            c.fn({ body, params, query } as IAPIParams<B, P, Q>, (e: any, v: any) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(v);
                }
            });
        });
    };
}
