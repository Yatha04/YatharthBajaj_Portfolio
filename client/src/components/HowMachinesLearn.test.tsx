import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DarkModeProvider } from '../context/DarkModeContext'
import { HowMachinesLearn } from './HowMachinesLearn'

// Smoke test: the page mounts all 14 interactive visualizations without
// throwing. Canvas in AnimatedBackground is tolerated under jsdom (getContext
// returns null and the component bails out gracefully).
describe('HowMachinesLearn page', () => {
  it('renders the hero and every chapter heading', () => {
    render(
      <DarkModeProvider>
        <MemoryRouter>
          <HowMachinesLearn />
        </MemoryRouter>
      </DarkModeProvider>,
    )

    expect(screen.getByRole('heading', { name: 'How Machines Learn' })).toBeInTheDocument()
    for (const title of [
      'The Perceptron',
      'ADALINE & the Delta Rule',
      'Bayesian Decision Theory',
      'The Bayes Optimal Classifier',
      'Naive Bayes',
      'k-Nearest Neighbors',
      'Principal Component Analysis',
      'Support Vector Machines',
      'The Hopfield Network',
      'The Universal Approximation Theorem',
      'Backpropagation',
      'The Neocognitron',
      'Convolutional Neural Networks',
    ]) {
      expect(screen.getByRole('heading', { name: title, level: 3 })).toBeInTheDocument()
    }
  })
})
