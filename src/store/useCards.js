import { useQuery } from '@tanstack/react-query'

export function useCards() {
  return useQuery({
    queryKey: ['cards'],
    queryFn: () => fetch('http://localhost:3001/cards').then(r => r.json()),
  })
}

export default useCards