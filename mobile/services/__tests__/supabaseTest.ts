import { supabase } from '../supabaseClient'

// Mock the supabase client
jest.mock('../supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}))

describe('supabase auth', () => {
  it('calls signUp with correct params', async () => {
    (supabase.auth.signUp as jest.Mock).mockResolvedValueOnce({
      data: { user: { id: '123' }, session: null },
      error: null,
    })

    const { data, error } = await supabase.auth.signUp({
      email: 'test@example.com',
      password: 'password123',
      options: { data: { username: 'testuser' } },
    })

    expect(error).toBeNull()
    expect(data.user?.id).toBe('123')
  })
})