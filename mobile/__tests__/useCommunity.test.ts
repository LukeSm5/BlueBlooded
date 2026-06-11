/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react';
import { useCommunity } from '../hooks/useCommunity';
import { supabase } from '../services/supabaseClient';
import { useCommunityContext } from '../context/communityContext';

jest.mock('../services/supabaseClient', () => ({
  supabase: {
    from: jest.fn(),
  },
}));

const mockInsert = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (supabase.from as jest.Mock).mockReturnValue({ insert: mockInsert });
});

describe('createDiscussion', () => {

  it('inserts a thread into supabase with correct fields', async () => {
    mockInsert.mockResolvedValue({ data: [{ id: 'abc' }], error: null });

    const { result } = renderHook(() => useCommunityContext());

    act(() => {
      result.current.setTitle('Test Title');
      result.current.setContent('Test Content');
      result.current.toggleCategory('NBA');
    });

    await act(async () => {
      await result.current.createDiscussion();
    });

    expect(supabase.from).toHaveBeenCalledWith('threads');
    expect(mockInsert).toHaveBeenCalledWith({
      title: 'Test Title',
      body: 'Test Content',
      category: ['NBA'],
      pinned: false,
      is_deleted: false,
    });
  });

  it('trims whitespace from title and body before inserting', async () => {
    mockInsert.mockResolvedValue({ data: [{ id: 'abc' }], error: null });

    const { result } = renderHook(() => useCommunityContext());

    act(() => {
      result.current.setTitle('  Spaced Title  ');
      result.current.setContent('  Spaced Content  ');
    });

    await act(async () => {
      await result.current.createDiscussion();
    });

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Spaced Title',
        body: 'Spaced Content',
      })
    );
  });

  it('sets error state when supabase returns an error', async () => {
    mockInsert.mockResolvedValue({ data: null, error: { message: 'Insert failed' } });

    const { result } = renderHook(() => useCommunityContext());

    await act(async () => {
      await result.current.createDiscussion();
    });

    expect(result.current.error).toBe('Insert failed');
  });

  it('clears error on a successful insert', async () => {
    mockInsert.mockResolvedValue({ data: [{ id: 'abc' }], error: null });

    const { result } = renderHook(() => useCommunityContext());

    // set a prior error first
    act(() => result.current.setError('old error'));

    await act(async () => {
      await result.current.createDiscussion();
    });

    expect(result.current.error).toBe('');
  });

});