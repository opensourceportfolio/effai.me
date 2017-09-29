import React from 'react';
import { cs } from 'service/class';

export const Row = ({ children, className }) => (
  <div className={cs('row', className)}>{children}</div>
);

export const Column = ({ children, className }) => (
  <div className={cs('col', className)}>{children}</div>
);

export const Column2 = ({ children, className }) => (
  <div className={cs('col col-2', className)}>{children}</div>
);
