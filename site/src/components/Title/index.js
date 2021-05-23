import { useRef, useState, useEffect } from 'react';
import BreadCrumb from 'components/BreadCrumbs';

const WithBreadCrumbs = ({ crumbs = true, text, bold = true, spx = true }) => {
  const [slided, setSlided] = useState();
  const currentScroll = useRef();
  const headRef = useRef();

  useEffect(() => {
    let reqId;

    const scroll =
      window.requestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    const loop = () => {
      if (currentScroll.current !== window.scrollY) {
        currentScroll.current = window.scrollY;

        const navPosition = headRef.current?.getBoundingClientRect().y;

        if (currentScroll.current > 80) {
          if (navPosition < 60) {
            setSlided(true);
          }
        } else {
          setSlided(false);
        }
      }

      reqId = scroll(loop);
    };

    loop();

    return () => {
      window.cancelAnimationFrame(reqId);
    };
  }, [currentScroll]);

  return (
    <div className={`${spx ? 'mb-5' : ''}`}>
      <div className="h-10">
        <h3
          className={`text-theme text-2xl mb-2 transition-all duration-300 whitespace-pre-wrap ${
            slided
              ? 'static sm:fixed container top-0 z-50 p-0 h-20 flex items-center animate-fade ml-14 lg:ml-0'
              : 'static mr-2.5'
          }`}
          ref={headRef}
        >
          {bold ? <strong>{text}</strong> : text}
        </h3>
      </div>

      {crumbs && <BreadCrumb />}
    </div>
  );
};

export default WithBreadCrumbs;
