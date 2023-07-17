import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
} from "react";

const Toast = ({ timeout }, ref) => {
  const [show, setShow] = useState(false);
  const [progressWidth, setProgressWidth] = useState("100%");
  const [toastMessage, setToastMessage] = useState("Toast Message");
  const progressBarAnimationRef = useRef(null);

  useEffect(() => {
    if (show) {
      setProgressWidth("100%"); // Reset the progress width when showing the toast

      const widthDecrement = 100 / (timeout / 100); // Calculate the width decrement

      progressBarAnimationRef.current = setInterval(() => {
        setProgressWidth((prevWidth) => {
          const newWidth = parseFloat(prevWidth) - widthDecrement;
          return `${newWidth}%`;
        });
      }, 100);
    } else {
      clearInterval(progressBarAnimationRef.current); // Clear the interval when hiding the toast
    }

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(progressBarAnimationRef.current);
    };
  }, [show, timeout]);

  useImperativeHandle(ref, () => ({
    showToast(msg = "") {
      setShow(true);
      setToastMessage(msg);

      setTimeout(() => {
        setShow(false);
      }, timeout);
    },
  }));

  return (
    <div className={`toast-container ${show ? "show" : ""}`}>
      <p className="toast-message">{toastMessage}</p>
      <div className="progress-bar" style={{ width: progressWidth }}></div>
    </div>
  );
};

export default forwardRef(Toast);
