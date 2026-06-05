import { render, fireEvent, waitFor } from '@testing-library/react-native'
import Login from '../login'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('expo-router', () => {
  const replace = jest.fn()
  const push = jest.fn()
  return { router: { replace, push },
  useRouter: () => ({
    replace,
    push,
    back: jest.fn(),
  }),
}
})

jest.mock('../../../services/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: jest.fn().mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      }),
    },
  },
}))


// ─── rest of file unchanged ───────────────────────────────────────────────────

jest.mock('../../../components/shared/TextInput', () => {
  const { TextInput } = require('react-native')
  return ({ onChangeText, secureTextEntry, placeholder, testID }: any) => (
    <TextInput
      testID={testID || placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
    />
  )
})

jest.mock('../../../components/shared/Button', () => {
  const { TouchableOpacity, Text } = require('react-native')
  return ({ label, onPress }: any) => (
    <TouchableOpacity testID={label} onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
})

// ─── Helpers ─────────────────────────────────────────────────────────────────

import { router } from 'expo-router'
import { supabase } from '../../../services/supabaseClient'

const mockReplace = router.replace as jest.Mock
const mockPush = router.push as jest.Mock
const mockSignIn = supabase.auth.signInWithPassword as jest.Mock

const fillAndSubmit = (
  { getByPlaceholderText, getByTestId }: any,
  email: string,
  password: string
) => {
  fireEvent.changeText(getByPlaceholderText('you@example.com'), email)
  fireEvent.changeText(getByPlaceholderText('••••••••'), password)
  fireEvent.press(getByTestId('Log in'))
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Login Screen', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    // re-apply session mocks after clearAllMocks resets them
    ;(supabase.auth.getSession as jest.Mock).mockResolvedValue({ data: { session: null } });
    ;(supabase.auth.onAuthStateChange as jest.Mock).mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    })
  })

  // ── Rendering ──────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders the email and password inputs', () => {
      const { getByPlaceholderText } = render(<Login />)
      expect(getByPlaceholderText('you@example.com')).toBeTruthy()
      expect(getByPlaceholderText('••••••••')).toBeTruthy()
    })

    it('renders Log in, Register, and Forgot password buttons', () => {
      const { getByTestId } = render(<Login />)
      expect(getByTestId('Log in')).toBeTruthy()
      expect(getByTestId('Register')).toBeTruthy()
      expect(getByTestId('Forgot password?')).toBeTruthy()
    })

    it('does not show an error message on initial render', () => {
      const { queryByText } = render(<Login />)
      expect(queryByText(/error|invalid|required/i)).toBeNull()
    })
  })

  // ── Validation ─────────────────────────────────────────────────────────────

  describe('Validation', () => {
    it('shows an error when email is empty', async () => {
      const utils = render(<Login />)
      fillAndSubmit(utils, '', 'Password1')
      await waitFor(() => {
        expect(utils.getByText('Email is required')).toBeTruthy()
      })
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    it('shows an error when email format is invalid', async () => {
      const utils = render(<Login />)
      fillAndSubmit(utils, 'notanemail', 'Password1')
      await waitFor(() => {
        expect(utils.getByText('Please enter a valid email address')).toBeTruthy()
      })
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    it('shows an error when password is empty', async () => {
      const utils = render(<Login />)
      fillAndSubmit(utils, 'test@example.com', '')
      await waitFor(() => {
        expect(utils.getByText('Password is required')).toBeTruthy()
      })
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    it('shows an error when password is too short', async () => {
      const utils = render(<Login />)
      fillAndSubmit(utils, 'test@example.com', 'abc')
      await waitFor(() => {
        expect(utils.getByText('Password must be at least 6 characters long')).toBeTruthy()
      })
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    it('shows an error when password has no uppercase letter', async () => {
      const utils = render(<Login />)
      fillAndSubmit(utils, 'test@example.com', 'password1')
      await waitFor(() => {
        expect(utils.getByText('Password must contain at least one uppercase letter')).toBeTruthy()
      })
      expect(mockSignIn).not.toHaveBeenCalled()
    })

    it('clears the error on a new submission attempt', async () => {
      mockSignIn.mockResolvedValueOnce({ data: null, error: { message: 'Invalid credentials' } })
      const utils = render(<Login />)

      // First submit — triggers an error
      fillAndSubmit(utils, 'test@example.com', 'Password1')
      await waitFor(() => expect(utils.getByText('Invalid credentials')).toBeTruthy())

      // Second submit — error should clear before validation runs
      mockSignIn.mockResolvedValueOnce({ data: { session: {} }, error: null })
      fillAndSubmit(utils, 'test@example.com', 'Password1')
      await waitFor(() => expect(utils.queryByText('Invalid credentials')).toBeNull())
    })
  })

  // ── Supabase Integration ───────────────────────────────────────────────────

  describe('Supabase signInWithPassword', () => {
    it('calls signInWithPassword with trimmed email and password', async () => {
      mockSignIn.mockResolvedValueOnce({ data: { session: {} }, error: null })
      const utils = render(<Login />)
      fillAndSubmit(utils, '  test@example.com  ', 'Password1')
      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'Password1',
        })
      })
    })

    it('navigates to /(tabs) on successful login', async () => {
      mockSignIn.mockResolvedValueOnce({ data: { session: {} }, error: null })
      const utils = render(<Login />)
      fillAndSubmit(utils, 'test@example.com', 'Password1')
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/(tabs)')
      })
    })

    it('displays the error message returned by Supabase on failure', async () => {
      mockSignIn.mockResolvedValueOnce({ data: null, error: { message: 'Invalid login credentials' } })
      const utils = render(<Login />)
      fillAndSubmit(utils, 'test@example.com', 'Password1')
      await waitFor(() => {
        expect(utils.getByText('Invalid login credentials')).toBeTruthy()
      })
      expect(mockReplace).not.toHaveBeenCalled()
    })

    it('does not navigate when Supabase returns an error', async () => {
      mockSignIn.mockResolvedValueOnce({ data: null, error: { message: 'User not found' } })
      const utils = render(<Login />)
      fillAndSubmit(utils, 'test@example.com', 'Password1')
      await waitFor(() => expect(utils.getByText('User not found')).toBeTruthy())
      expect(mockReplace).not.toHaveBeenCalled()
    })
  })

  // ── Navigation ─────────────────────────────────────────────────────────────

  describe('Navigation', () => {
    it('navigates to /auth/register when Register is pressed', () => {
      const { getByTestId } = render(<Login />)
      fireEvent.press(getByTestId('Register'))
      expect(mockPush).toHaveBeenCalledWith('/auth/register')
    })

    it('navigates to /auth/reset when Forgot password? is pressed', () => {
      const { getByTestId } = render(<Login />)
      fireEvent.press(getByTestId('Forgot password?'))
      expect(mockPush).toHaveBeenCalledWith('/auth/reset')
    })
  })

})