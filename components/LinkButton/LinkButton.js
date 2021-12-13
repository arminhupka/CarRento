import React from 'react';
import Link from 'next/link';

const LinkButton = ({children, href, className, bordered}) => {
  const normalStyle = `flex items-center justify-center px-3 py-2 font-semibold text-white bg-red-500 rounded-md transition-colors hover:bg-red-600 ${className}`;
  const borderStyle = `flex items-center justify-center px-3 py-2 font-semibold text-red-500 bg-transparent border-2 border-red-500 rounded-md transition-colors hover:bg-red-500 hover:text-white ${className}`;

  const style = bordered ? borderStyle : normalStyle;

  return (
    <Link href={href}>
      <a className={style}>{children}</a>
    </Link>
  );
};

export default LinkButton;
