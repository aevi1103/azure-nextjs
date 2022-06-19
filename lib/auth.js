export const getuserInfo = async () => {
  const res = await fetch(
    `https://icy-flower-0005dea0f.1.azurestaticapps.net/.auth/me`
  );
  const payload = await res.json();
  const { clientPrincipal } = payload || {};
  return clientPrincipal;
};
