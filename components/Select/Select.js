import React, {useRef} from 'react';
import {FaChevronDown} from 'react-icons/fa';
import {nanoid} from 'nanoid';

// Hooks
import useClickOutside from '../../hooks/useClickOutside';
import useModalState from '../../hooks/useModalState';

const Select = ({data, title, selected, onSelect, onClear, white}) => {
  const selectRef = useRef(null);

  const {isVisible, onClose, onOpen} = useModalState();

  useClickOutside(selectRef, () => {
    onClose();
  });

  const handleItemClick = (e) => {
    e.stopPropagation();
    onSelect(e.target.innerText);
    onClose();
  };

  return (
    <div ref={selectRef}>
      <div className="flex justify-between">
        <label className={`font-semibold ${white ? 'text-white' : 'text-gray-900'}`}>{title}</label>
        {selected && (
          <button type="button" className="text-sm hover:text-red-500" onClick={onClear}>
            wyczyść
          </button>
        )}
      </div>
      <div className="relative mt-1">
        <button
          type="button"
          className="w-full px-3 py-2 flex items-center justify-between bg-white border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
          onClick={onOpen}
        >
          <span className="truncate">{selected || 'Wybierz'}</span>
          <span>
            <FaChevronDown />
          </span>
        </button>
        {isVisible && (
          <ul className="absolute w-full max-h-56 mt-1 bg-white border rounded-md ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none z-10">
            {data.map((item) => (
              <li
                key={nanoid(24)}
                className={`truncate text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-red-500 hover:text-white ${
                  item === selected ? 'bg-red-500' : null
                }`}
                onClick={handleItemClick}
              >
                <span className={`${item === selected ? 'text-white' : null}`}>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
