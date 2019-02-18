export default async function callAPI<T>(method: string, path: string, body: any = null): Promise<T> {
    if (__PRODUCTION__) {
        return await new Promise<T>((resolve, reject) => {
            Homey.api(method, path, body, (err, result) =>  {
                if (err) { reject(err); } else { resolve(result); }
            });
        });
    }

    const options: any = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    };

    if (body != null) {
        options.body = JSON.stringify(body);
    }

    // local development
    const res = await fetch(`${__HOMEY_DEV_URL}/api/app/app.mskg.homey-heating${path}`, options);
    return await res.json() as T;
}
