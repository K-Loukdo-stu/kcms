import { ApolloClient, InMemoryCache } from '@apollo/client/core/core.cjs';
import { HttpLink } from '@apollo/client/link/http/http.cjs';
import { ApolloLink } from '@apollo/client/link/core/core.cjs';
import { browser } from '$app/environment';

class Client {
	constructor() {
		if (Client._instance) {
			return Client._instance
		}
		Client._instance = this;

		this.client = (URIs, request, accessToken) => this.setupClient(URIs, request, accessToken)
	}

	setupClient(URIs, request, accessToken) {
		request.headers['accept'] = '*/*'
		request.headers['content-type'] = 'application/json'
		// request.headers['host'] = based_url
		request.headers['cookie'] = request.headers.get('cookie');

		let tmp_link = {
			uri: browser ? URIs.csr_uri : URIs.ssr_uri,
			// credentials: 'include',
			method: 'POST',
			...request,
			headers: request.headers,
		}

		const link = new HttpLink(tmp_link);
		const addHeaderLink = new ApolloLink((operation, forward) => {
			return forward(operation).map(res => {
				const { response } = operation.getContext();
				let resInfo = (({ type, url, status, statusText }) => ({ type, url, status, statusText }))(response)
				let headers = Object.fromEntries(response.headers.entries());
				delete headers['content-length']
				resInfo['headers'] = headers;
				// response success 
				if (!(res?.errors?.length))
					return {
						data: {
							...resInfo,
							body: { success: true, data: res.data }
						}
					};

				// response error msg
				return res;
			});
		});

		const client = new ApolloClient({
			link: addHeaderLink.concat(link),
			cache: new InMemoryCache({ resultCaching: true }),
		});
		return client;
	}
}

export const client = (new Client()).client;