import { me } from "$providers/actions/kauth/auth";

export const ensureSignedOut = async (etch) => {
  try {
    await me.load();
  } catch (err) {
    if (err?.code == 'UNAUTHENTICATED') {
      return err?.success == false
    }
  }
}

export const ensureSignedIn = async () => {
  try {
    const res = await me.load();
    return res
  } catch { }
}