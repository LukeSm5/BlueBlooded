import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Register from '../register'

// Mock expo-router
jest.mock('expo-router', () => ({
  router: { replace: jest.fn(), push: jest.fn() },
}))

// Mock supabase
jest.mock('../../../services/supabase', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}))

describe('Register screen', () => {
  it('shows error when fields are empty', async () => {
    const { getByText } = render(<Register />)
    
    fireEvent.press(getByText('Register'))
    
    await waitFor(() => {
      expect(getByText('Please fill in all fields')).toBeTruthy()
    })
  })

  it('shows error when password is too short', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />)

    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'test@test.com')
    fireEvent.changeText(getByPlaceholderText('you123'), 'testuser')
    fireEvent.changeText(getByPlaceholderText('••••••••'), '123') // too short

    fireEvent.press(getByText('Register'))

    await waitFor(() => {
      expect(getByText('Password must be at least 6 characters long')).toBeTruthy()
    })
  })

  it('navigates to tabs on successful register', async () => {
    const { supabase } = require('../../../services/supabase')
    const { router } = require('expo-router')

    supabase.auth.signUp.mockResolvedValueOnce({
      data: { user: { id: '123' }, session: { token: 'abc' } },
      error: null,
    })

    const { getByPlaceholderText, getByText } = render(<Register />)

    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'test@test.com')
    fireEvent.changeText(getByPlaceholderText('you123'), 'testuser')
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123')

    fireEvent.press(getByText('Register'))

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith('/(tabs)')
    })
  })

  it('shows supabase error message on failure', async () => {
    const { supabase } = require('../../../services/supabase')

    supabase.auth.signUp.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'Email already registered' },
    })

    const { getByPlaceholderText, getByText } = render(<Register />)

    fireEvent.changeText(getByPlaceholderText('you@example.com'), 'test@test.com')
    fireEvent.changeText(getByPlaceholderText('you123'), 'testuser')
    fireEvent.changeText(getByPlaceholderText('••••••••'), 'password123')

    fireEvent.press(getByText('Register'))

    await waitFor(() => {
      expect(getByText('Email already registered')).toBeTruthy()
    })
  })
})