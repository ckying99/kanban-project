import { useQuery } from '@tanstack/react-query'

export default function useCardById(id){
    return useQuery({
            queryKey: ['cards', id],
            queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/cards/${id}`).then(r => r.json())
    })
}