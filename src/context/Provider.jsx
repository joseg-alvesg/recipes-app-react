import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  return <Context.Provider value={ value }>{children}</Context.Provider>;
}
