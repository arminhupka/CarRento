import React from 'react';
import {FaUser} from 'react-icons/fa';
import {render, screen} from '@testing-library/react';

// Components
import FeatureCard from './FeatureCard';

it('check component render', () => {
  render(<FeatureCard icon={<FaUser />} title="Title" description="Description" />);

  const title = screen.getByText('Title');

  expect(title).toBeInTheDocument();
});
