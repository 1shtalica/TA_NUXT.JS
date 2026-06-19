export const useApiClient = () => {
  const config = useRuntimeConfig()
  
  return $fetch.create({
    baseURL: config.public.apiBaseUrl as string,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}