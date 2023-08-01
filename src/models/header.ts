import React from 'react';

export interface HeaderProps {
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  search: string;
};