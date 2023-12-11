import { useEffect, useState } from "react";

export default function InputError({ message }: { message?: string }) {
  const [show, setShow] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    if (message) {
      setShow(true);
      setDisplayMessage(message);
    }
    return () => {
      setShow(false);
    };
  }, [message]);
  return <p className={`error-msg ${show ? "show" : ""}`}>{displayMessage}</p>;
}
