import { useQuery } from '@tanstack/react-query'

export default function useCardById(id){
    return useQuery({
            queryKey: ['cards', id],
            queryFn: () => fetch(`http://localhost:3001/cards/` + id).then(r => r.json())
    })
}