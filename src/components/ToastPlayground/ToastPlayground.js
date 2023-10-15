import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import { ToastContext, VARIANT_OPTIONS } from '../ToastProvider';

import styles from './ToastPlayground.module.css';

function ToastPlayground() {
  const textAreaRef = React.useRef();
  const [toastMessage, setToastMessage] = React.useState('');
  const [selectedVariant, setSelectedVariant] = React.useState(
    VARIANT_OPTIONS[0]
  );
  const { addToast } = React.useContext(ToastContext);

  const resetToastForm = () => {
    setToastMessage('');
    setSelectedVariant(VARIANT_OPTIONS[0]);
    textAreaRef.current.focus();
  };

  React.useEffect(() => {
    const handleEnter = (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        addToast(toastMessage, selectedVariant);
        resetToastForm();
      }
    };

    window.addEventListener('keydown', handleEnter);

    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [addToast, selectedVariant, toastMessage]);

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />
      <form
        id="toastStack"
        onSubmit={(e) => {
          e.preventDefault();
          addToast(toastMessage, selectedVariant);
          resetToastForm();
        }}
      >
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                className={styles.messageInput}
                value={toastMessage}
                ref={textAreaRef}
                onChange={(e) => {
                  setToastMessage(e.target.value);
                }}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((option) => {
                return (
                  <label htmlFor={`variant-${option}`} key={option}>
                    <input
                      id={`variant-${option}`}
                      type="radio"
                      name="variant"
                      value={option}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      checked={option === selectedVariant}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button type="submit" form="toastStack">
                Pop Toast!
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
