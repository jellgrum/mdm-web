interface HttpTransportConstructor {
    apiRoot: string;
    headers?: HeadersInit;
}

type Queries = Record<string, string | number>;

export class HttpTransport {
    private readonly apiRoot;
    private readonly extraHeaders;

    constructor({
        apiRoot,
        headers,
    }: HttpTransportConstructor) {
        this.apiRoot = apiRoot;
        this.extraHeaders = headers;
    }

    public get = (pathname: string, queries: Queries) => {
        const search = this.createSearch(queries);
        return fetch(`${this.apiRoot}${pathname}${search}`, {
            headers: {
                ...this.extraHeaders,
            },
        });
    }

    public post = (pathname: string, queries: Queries, body: string) => {
        const search = this.createSearch(queries);
        return fetch(`${this.apiRoot}${pathname}${search}`, {
            method: 'POST',
            headers: {
                ...this.extraHeaders,
            },
            body,
        });
    }

    public delete = (pathname: string, queries: Queries) => {
        const search = this.createSearch(queries);
        return fetch(`${this.apiRoot}${pathname}${search}`, {
            method: 'DELETE',
            headers: {
                ...this.extraHeaders,
            },
        });
    }

    public put = (pathname: string, queries: Queries, body: string) => {
        const search = this.createSearch(queries);
        return fetch(`${this.apiRoot}${pathname}${search}`, {
            method: 'PUT',
            headers: {
                ...this.extraHeaders,
            },
            body,
        });
    }

    public patch = (pathname: string, queries: Queries, body: string) => {
        const search = this.createSearch(queries);
        return fetch(`${this.apiRoot}${pathname}${search}`, {
            method: 'PATCH',
            headers: {
                ...this.extraHeaders,
            },
            body,
        });
    }

    private createSearch = (queries: Queries) => {
        const keys = Object.keys(queries);

        if (keys.length === 0) return '';

        const params = keys.map(key => `${key}=${queries[key]}`).join('&');
        return `?${params}`;
    }
}
