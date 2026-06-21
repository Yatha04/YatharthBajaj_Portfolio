import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HonorsPortfolio } from './HonorsPortfolio'

// Smoke test for the honors page: the new self-designed experience shows up,
// and expanding it reveals the interactive LogixLens widget that replaces the
// [[logixlens]] token in the prose.
describe('HonorsPortfolio', () => {
    const renderPage = () =>
        render(
            <MemoryRouter>
                <HonorsPortfolio />
            </MemoryRouter>,
        )

    it('lists the Learning Out Loud experience', () => {
        renderPage()
        expect(
            screen.getByText('Learning Out Loud: My Journey into AI'),
        ).toBeInTheDocument()
    })

    it('reveals the interactive LogixLens widget when the card is expanded', () => {
        renderPage()
        fireEvent.click(screen.getByText('Learning Out Loud: My Journey into AI'))

        // The interactive widget (not a static image) is now in the prose.
        expect(
            screen.getByText('Try it: ask the factory floor a question'),
        ).toBeInTheDocument()
        expect(screen.getByText('Why did Line 3 stop?')).toBeInTheDocument()

        // The raw [[logixlens]] token must never leak into the rendered text.
        expect(screen.queryByText(/\[\[logixlens\]\]/)).toBeNull()
    })

    it('answers a question through the pipeline when LogixLens is off', () => {
        renderPage()
        fireEvent.click(screen.getByText('Learning Out Loud: My Journey into AI'))

        // Turn LogixLens off, then ask — the blocked path resolves synchronously.
        const widget = screen
            .getByText('Try it: ask the factory floor a question')
            .closest('figure') as HTMLElement
        fireEvent.click(within(widget).getByRole('button', { name: 'off' }))
        fireEvent.click(screen.getByText('Why did Line 3 stop?'))

        expect(screen.getByText(/No LogixLens:/)).toBeInTheDocument()
    })
})
