export const getuserInfo = async () => {
  const res = await fetch(`/.auth/me`);
  const payload = await res.json();
  const { clientPrincipal } = payload || {};
  return clientPrincipal;
};
