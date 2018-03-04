import type { KeyboardEvent } from 'react';

// https://stackoverflow.com/questions/42998927/accessibility-react-ensure-click-events-have-key-events
const buttonize = (onClick: (_: any) => void) => {
  return {
    tabIndex: 0,
    role: 'button',
    onClick,
    onKeyDown: (event: KeyboardEvent) => {
      const { key } = event;
      if (key === 'Enter') onClick(event);
    },
  };
};

export default buttonize;
