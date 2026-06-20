export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') ?? '';
  const query = getQuery(event);
  const config = useRuntimeConfig();

  const queryString = new URLSearchParams(
    Object.entries(query).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null) acc[k] = String(v);
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const targetUrl = queryString
    ? `${config.public.apiBaseUrl}/${path}?${queryString}`
    : `${config.public.apiBaseUrl}/${path}`;

  return proxyRequest(event, targetUrl);
});
