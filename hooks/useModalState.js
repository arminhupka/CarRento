import {useState} from 'react';

const useModalState = (initial = false) => {
  const [isVisible, setIsVisible] = useState(initial);

  const onToggle = () => setIsVisible(!isVisible);
  const onOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);

  return {isVisible, onToggle, onOpen, onClose};
};

export default useModalState;
