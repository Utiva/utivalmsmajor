import React, { useRef } from 'react';
import './style.scss';

const RevielDrop = ({
  header,
  children,
  open = false,
  revielType = 'click',
  className = '',
  containerClassName = '',
  openClassName = '',
  showArrow = true,
  closeOthers = true,
  style = {},
  runOnOpen = () => {},
  runOnClose = () => {},
}) => {
  const mainRef = useRef();
  const headRef = useRef();

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    function findMainParent(e) {
      const newparent = e?.target?.parentElement || e?.parentElement;

      if (
        e?.className?.includes('rx_header') ||
        e?.target?.className?.includes('rx_header')
      )
        return e;

      if (newparent) {
        return findMainParent(newparent);
      }
    }

    e = findMainParent(e);

    if (closeOthers) {
      const elements = document.querySelectorAll('.rx_header ');

      elements.forEach((element) => {
        if (headRef.current === element) return;
        element.classList.remove('active');

        element.nextElementSibling.classList.remove('open');
        openClassName &&
          element.nextElementSibling.classList.remove(openClassName);
      });
    }

    headRef.current.classList.toggle('active');
    mainRef.current.classList.toggle('open');
    openClassName && mainRef.current.classList.toggle(openClassName);

    if (
      e?.className?.includes('active') ||
      e?.target?.className?.includes('active')
    )
      runOnOpen();
    else runOnClose();
  }

  const openDrop = (e) => {
    // e.target.classList.add("active");
    mainRef.current.classList.add('open');
    openClassName && mainRef.current.classList.add(openClassName);
  };

  const close = (e) => {
    // e.target.classList.remove("remove");
    mainRef.current.classList.remove('open');
    openClassName && mainRef.current.classList.remove(openClassName);
  };

  const functionToUse =
    revielType === 'click'
      ? {
          onClick: handleClick,
        }
      : {
          onMouseOver: openDrop,
          onMouseLeave: close,
        };

  return (
    <div className={`drop-rev ${containerClassName}`}>
      {header && (
        <div
          // style={{ display: 'contents' }}
          {...functionToUse}
          className={`rx_header ${showArrow ? ' showArrow' : ''}`}
          ref={headRef}
        >
          {header}
        </div>
      )}

      <div
        ref={mainRef}
        style={style}
        className={`${className}${
          revielType === 'click' ? ' click-type' : ''
        } drop-open${open ? ' open' : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default RevielDrop;
