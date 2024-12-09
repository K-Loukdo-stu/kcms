/**
 * Create HTTP requests
 */
import { APIs } from '$lib/statics';
import { ME_QUERY, SIGN_IN_MUTATION, SIGN_OUT_MUTATION } from '$providers/queries/kauth';
import { adminsStore } from '$providers/stores/kauth';
import { userStore } from '$providers/stores/kauth'
import { endpointFetch } from '../utils';

export const me = {
  load: async () => {
    const res = await endpointFetch({
      query: ME_QUERY,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['me'];
      userStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const signIn = {
  load: async ({ email, password }) => {
    const res = await endpointFetch({
      mutation: SIGN_IN_MUTATION,
      variables: { email, password }
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['adminSignIn']
      userStore.reset(res['data'])
      return res;
    }

    throw res;
  }
}

export const signOut = {
  load: async () => {
    const res = await endpointFetch({
      mutation: SIGN_OUT_MUTATION,
    }, APIs.KAUTH);

    if (res?.success == true) {
      res['data'] = res['data']['signOut']
      userStore.reset({})
      return res;
    }

    throw res;
  }
}


export const signUp = {
  load: async (fetch, { username, email, firstName, lastName }) => {
    const res = await fetch('/dashboard/admin/register', {
      method: 'POST',
      headers: {
        accept: 'application/json'
      },

      body: JSON.stringify({ username, email, firstName, lastName })

    });
    let body = await res.json()
    return res;
  }
}
