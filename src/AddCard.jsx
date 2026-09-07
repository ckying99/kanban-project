import { useState } from 'react'
import { useEffect } from 'react'

import useAddCard from './store/useAddCards.js'
import useCardById from './store/useCardById.js'

const emptyForm = () => ({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    startDate: new Date().toISOString().split('T')[0],
    column: '',
})

const AddCard = ({ mode, id }) => {
    const [formData, setFormData] = useState(emptyForm)
    const [error, setError] = useState('')
    const { mutate, isPending } = useAddCard()

    const { data: existingCard } = useCardById(id)
    useEffect(() => {
        if (mode === "edit" && existingCard ) {
            setFormData(existingCard)
        }

    }, [existingCard])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.title.trim()) {
            setError('Title is required')
            return
        }
        if (!formData.column.trim()) {
            setError('Column is required')
            return
        }
        mutate(
            {
                ...formData, title: formData.title.trim(), description: formData.description.trim(),
                startDate: formData.startDate.trim(), dueDate: formData.dueDate.trim(),
                column: formData.column
            },
            { onSuccess: () => setFormData(emptyForm) }
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end mb-6">
            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Description</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Start Date</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="border border-gray-300 rounded px-2 py-1 text-sm w-28"
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1">Column</label>
                <select
                    name="column"
                    value={formData.column}
                    onChange={handleChange} >
                    <option value="">Select column</option>
                    <option value="to do">To Do</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

            </div>

            <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? 'Adding...' : 'Add'}
            </button>

            {error && <p className="w-full text-red-500 text-xs">{error}</p>}
        </form>
    )
}

export default AddCard
