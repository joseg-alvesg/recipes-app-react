import copy from "clipboard-copy";
import React, { useCallback, useState } from "react";
import shareIcon from "../../images/shareIcon.svg";

export default function ShareButton({ type, id, dataTestid }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const shareRecipe = useCallback(() => {
    if (window.location.href.includes("in-progress")) {
      const url = window.location.href.replace("/in-progress", "");
      copu(url);
      const TWO_SECONDS = 2000;
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, TWO_SECONDS);
    }
    if (window.location.href.includes("done-recipes")) {
      const url = window.location.href.replace(
        "/done-recipes",
        `/${type}s/${id}`,
      );
      copy(url);
      const TWO_SECONDS = 2000;
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, TWO_SECONDS);
    }
  }, []);
  return (
    <div>
      <img data-testid={dataTestid} onClick={shareRecipe} src={shareIcon} />
      {linkCopied && <span>Link copied!</span>}
    </div>
  );
}
