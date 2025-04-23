import { renderHook, act } from '@testing-library/react';
import { useErrorHandler } from '../use-error-handler';

// Mock the toast hook
jest.mock('@/shared/hooks/useToast', () => ({
  useToast: () => ({
    error: jest.fn(),
  }),
}));

describe('useErrorHandler', () => {
  it('initializes with no error', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    expect(result.current.error).toEqual({
      hasError: false,
      message: null,
    });
    expect(result.current.isError).toBe(false);
  });
  
  it('handles Error objects', () => {
    const { result } = renderHook(() => useErrorHandler());
    const testError = new Error('Test error message');
    
    act(() => {
      result.current.handleError(testError);
    });
    
    expect(result.current.error).toEqual({
      hasError: true,
      message: 'Test error message',
      code: undefined,
      details: undefined,
    });
    expect(result.current.isError).toBe(true);
    expect(result.current.errorMessage).toBe('Test error message');
  });
  
  it('handles custom error objects with code and details', () => {
    const { result } = renderHook(() => useErrorHandler());
    const customError = {
      message: 'Custom error',
      code: 'ERR_CUSTOM',
      details: { field: 'name' },
    };
    
    act(() => {
      result.current.handleError(customError);
    });
    
    expect(result.current.error).toEqual({
      hasError: true,
      message: 'Custom error',
      code: 'ERR_CUSTOM',
      details: { field: 'name' },
    });
  });
  
  it('handles string errors', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    act(() => {
      result.current.handleError('String error message');
    });
    
    expect(result.current.error).toEqual({
      hasError: true,
      message: 'String error message',
      code: undefined,
      details: undefined,
    });
  });
  
  it('handles unknown error types', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    act(() => {
      result.current.handleError(null);
    });
    
    expect(result.current.error.hasError).toBe(true);
    expect(result.current.error.message).toBe('An unknown error occurred');
  });
  
  it('clears error state', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    // Set an error first
    act(() => {
      result.current.handleError('Test error');
    });
    
    // Then clear it
    act(() => {
      result.current.clearError();
    });
    
    expect(result.current.error).toEqual({
      hasError: false,
      message: null,
    });
    expect(result.current.isError).toBe(false);
  });
});