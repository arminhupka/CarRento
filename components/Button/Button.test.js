import React from 'react';
import {render, screen} from '@testing-library/react';

// Components
import Button from './Button';

it('check Button rendering', () => {
  render(<Button>test</Button>);
  const tester = screen.getByText(/test/i);
  expect(tester).toBeInTheDocument();
});

it('check does button is bordered', () => {
  render(<Button>test</Button>);

  const button = screen.getByText('test');

  expect(button).toHaveStyle({borderWidth: '2px'});
});
