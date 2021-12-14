import React from 'react';
import Button from '../Button/Button';

const SectionTitle = ({title, withButton, buttonTitle, buttonAction}) => (
  <div className="pb-4 mb-4 flex items-center justify-between border-b">
    <h3 className="text-2xl font-bold">{title}</h3>
    {withButton && (
      <Button type="button" onClick={buttonAction}>
        {buttonTitle}
      </Button>
    )}
  </div>
);

export default SectionTitle;
