import { useMutation, useQueryClient } from '@tanstack/react-query'

const useAddCards = () => {
  const queryClient = useQueryClient()

  return useMutation({
      mutationFn: async (newCard) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cards`)
      const existing = await res.json()
      const nextId = existing.length > 0 ? Math.max(...existing.map(c => Number(c.id))) + 1 : 1
      const nextPosition = existing.length > 0 ? Math.max(...existing.map(c => Number(c.position))) + 1000 : 1000
      const postRes = await fetch(`${import.meta.env.VITE_API_URL}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newCard, position: nextPosition }),
      })
      if (!postRes.ok) throw new Error('Failed to add Card')
      return postRes.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards'] })
    },
  })
}

export default useAddCards