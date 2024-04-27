import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as ShareIcon } from '../../images/shareIcon.svg';
import AlertCard from '../AlertCard';
import SearchContext from '../../context/SearchContext';

const SUCCESS_CALL = { success: 'Link copied!' };

export default function ShareButton({ type = '', id = '', dataTestid = '' }) {
  const { setAlertCall } = useContext(SearchContext);
  const history = useHistory();

  const shareRecipe = useCallback(() => {
    const route = history.location.pathname;
    if (route.includes('done-recipes') || route.includes('favorite-recipes')) {
      const url = route
        .replace('done-recipes', `${type}s/${id}`)
        .replace('favorite-recipes', `${type}s/${id}`);
      copy(url);
      return setAlertCall(SUCCESS_CALL);
    }
    if (route.includes('in-progress')) {
      const url = history.location.pathname.replace('/in-progress', '');
      copy(url);
      return setAlertCall(SUCCESS_CALL);
    }
    const url = history.location.pathname;
    copy(url);
    setAlertCall(SUCCESS_CALL);
  }, [history.location.pathname, id, type, setAlertCall]);

  return (
    <div className="p-3">
      <ShareIcon
        data-testid={ dataTestid }
        onClick={ shareRecipe }
        className="point w-30-p h-30-p"
        fill="#fdc500"
      />
      <AlertCard />
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  dataTestid: PropTypes.string,
};
