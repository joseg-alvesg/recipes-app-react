import React, { useContext, useEffect } from "react";
import SearchContext from "../../context/SearchContext";

export default function AlertCard() {
  const { alertCall, setAlertCall } = useContext(SearchContext);
  const alerts = Object.entries(alertCall);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertCall({});
    }, 5000);
    return () => clearTimeout(timer);
  }, [alertCall, setAlertCall]);

  return (
    <div className="fixed-top m-5" style={{ zIndex: "1000", left: "50%" }}>
      {alertCall.error && (
        <div className="alert alert-danger" role="alert">
          {alertCall.error}
        </div>
      )}
      {alertCall.success && (
        <div className="alert alert-success" role="alert">
          {alertCall.success}
        </div>
      )}
      {alertCall.notification && (
        <div className="alert alert-info" role="alert">
          {alertCall.notification}
        </div>
      )}
    </div>
  );
}
