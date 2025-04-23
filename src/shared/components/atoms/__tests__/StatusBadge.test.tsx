import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge', () => {
  it('renders with correct color classes for completed status', () => {
    render(<StatusBadge status="completed">Completed</StatusBadge>);
    
    const badge = screen.getByText('Completed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100');
    expect(badge).toHaveClass('text-green-800');
  });
  
  it('renders with correct color classes for in-progress status', () => {
    render(<StatusBadge status="in-progress">In Progress</StatusBadge>);
    
    const badge = screen.getByText('In Progress');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100');
    expect(badge).toHaveClass('text-blue-800');
  });
  
  it('renders with correct color classes for open status', () => {
    render(<StatusBadge status="open">Open</StatusBadge>);
    
    const badge = screen.getByText('Open');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-purple-100');
    expect(badge).toHaveClass('text-purple-800');
  });
  
  it('renders with correct color classes for cancelled status', () => {
    render(<StatusBadge status="cancelled">Cancelled</StatusBadge>);
    
    const badge = screen.getByText('Cancelled');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100');
    expect(badge).toHaveClass('text-red-800');
  });
  
  it('applies additional className if provided', () => {
    render(<StatusBadge status="completed" className="test-class">Completed</StatusBadge>);
    
    const badge = screen.getByText('Completed');
    expect(badge).toHaveClass('test-class');
  });
});