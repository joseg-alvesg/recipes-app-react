import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as ShareIcon } from '../../images/shareIcon.svg';

export default function ShareButton({ type = '', id = '', dataTestid = '' }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const history = useHistory();

  const shareRecipe = useCallback(() => {
    const route = history.location.pathname;
    if (route.includes('done-recipes') || route.includes('favorite-recipes')) {
      const url = route
        .replace('done-recipes', `${type}s/${id}`)
        .replace('favorite-recipes', `${type}s/${id}`);
      copy(url);
      const TWO_SECONDS = 2000;
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, TWO_SECONDS);
    }
    if (route.includes('in-progress')) {
      const url = history.location.pathname.replace('/in-progress', '');
      copy(url);
      const TWO_SECONDS = 2000;
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, TWO_SECONDS);
    }
    const url = history.location.pathname;
    copy(url);
    const TWO_SECONDS = 2000;
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, TWO_SECONDS);
  }, [history.location.pathname, id, type]);

  return (
    <div className="p-3">
      <ShareIcon
        data-testid={ dataTestid }
        onClick={ shareRecipe }
        className="point w-30-p h-30-p"
        fill="#fdc500"
      />
      {linkCopied && <span>Link copied!</span>}
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  dataTestid: PropTypes.string,
};
