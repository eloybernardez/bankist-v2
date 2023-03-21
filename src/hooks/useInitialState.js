import { useState } from "react";

const useInitialState = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return {
    submitted,
    setSubmitted,
    formatCur,
    loading,
    setLoading,
    showModal,
    setShowModal,
  };
};

export default useInitialState;
