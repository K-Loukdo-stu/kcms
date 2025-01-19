export const endpointFetch = async ({ query, mutation, variables = {} }, URLs) => {
  const res = await fetch('/graphql-endpoint', {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      mutation,
      variables,
      URLs,
    })
  });


  let apiRes = await res.json();

  // Return body of successful request
  if (apiRes?.success !== false) {
    return apiRes.body
  }

  // Handle error of failed request
  throw apiRes;
}

export const restEndpointFetch = async ({ method, url, body = {}, headers = {} }) => {
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: method !== 'GET' ? JSON.stringify(body) : null,
  });

  const apiRes = await res.json();
  // console.log("level 1:" + res)
  // console.log("level 1:" + apiRes)
  // console.log("level 1:" + apiRes.body)
  // Return body of successful request
  if (apiRes?.success !== false) {
    return apiRes;
  }

  // Handle error of failed request
  throw apiRes;
}
