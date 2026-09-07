import { useQuery } from '@tanstack/react-query'

export function useCards() {
  return useQuery({
    queryKey: ['cards'],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/cards`).then(r => r.json()),
  })
}

export default useCards