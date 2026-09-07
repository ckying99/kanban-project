    import { useState } from 'react'
    import { useCards } from './store/useCards.js'
    import { Pencil } from 'lucide-react';
    import AddCard from './AddCard.jsx'

    export default function Kanban() {
        const { data: cards } = useCards();
        const todoCards = cards ? cards.filter(c => c.column === "to do").sort((a, b) => a.position - b.position) : []
        const inProgress = cards ? cards.filter(c => c.column === "in progress").sort((a, b) => a.position - b.position) : []
        const done = cards ? cards.filter(c => c.column === "done").sort((a, b) => a.position - b.position) : []

        return (
            <div className="min-h-screen p-8">
                <h1 className="font-[Libre_Baskerville] text-3xl text-[var(--text-primary)] mb-8 tracking-tight">
                    Kanban Board
                </h1>
                <div className="grid grid-cols-3 gap-6">
                    <Column title="To Do" accent="var(--accent-todo)" cards={todoCards} />
                    <Column title="In Progress" accent="var(--accent-progress)" cards={inProgress} />
                    <Column title="Done" accent="var(--accent-done)" cards={done} />
                </div>
            </div>
        )
    }

    function Column({ title, accent, cards }) {
        const [ editingId, setEditingId ] = useState("")
        return (
            <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--column-bg)' }}>
                <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '2px solid ' + accent }}>
                    <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: accent }}
                    />
                    <h2 className="font-[Libre_Baskerville] text-lg font-bold" style={{ color: accent }}>
                        {title}
                    </h2>
                    <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: accent + '20', color: accent }}>
                        {cards.length}
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    {cards.map(c => (c.id === editingId)? <AddCard key={c.id} mode="edit" id={c.id}></AddCard> :
                        <Card 
                        onEdit={ () => setEditingId(c.id)}
                        key={c.id} card={c} />) }
                </div>
            </div>
        )
    }


    function Card({ card, onEdit }) {
        return (
            <div
                className="rounded-lg p-4 transition-shadow duration-200 cursor-default"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    boxShadow: 'var(--card-shadow)',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--card-shadow)'}
            >
                <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                    {card.title}
                </h3>
                <button className="opacity-40 hover:opacity-100 p-1" onClick={ onEdit }>
                    <Pencil size={14}/>
                </button>
                </div>
                <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.description}
                </p>
                {(card.startDate || card.dueDate) && (
                    <div className="flex items-center gap-3 text-xs pt-2"
                        style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
                        {card.startDate && <span>Start: {card.startDate}</span>}
                        {card.dueDate && <span>Due: {card.dueDate}</span>}
                    </div>
                )}
            </div>
        )
    }
