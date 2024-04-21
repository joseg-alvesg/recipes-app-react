import copy from "clipboard-copy";
import React, { useCallback, useState } from "react";
import shareIcon from "../../images/shareIcon.svg";

export default function ShareButton({ type, id, dataTestid }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const shareRecipe = useCallback(() => {
    const route = window.location.href;
    if (route.includes("in-progress")) {
      const url = window.location.href.replace("/in-progress", "");
      copu(url);
      const TWO_SECONDS = 2000;
      setLinkCopied(true);
      setTimeout(() => {
        setLinkCopied(false);
      }, TWO_SECONDS);
    }
    if (route.includes("done-recipes") || route.includes("favorite-recipes")) {
      console.log("shareRecipe", type, id);
      const url = route
        .replace("done-recipes", `${type}s/${id}`)
        .replace("favorite-recipes", `${type}s/${id}`);
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
      <img
        data-testid={dataTestid}
        onClick={shareRecipe}
        src={shareIcon}
        className="btn"
      />
      {linkCopied && <span>Link copied!</span>}
    </div>
  );
}
