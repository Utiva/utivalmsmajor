import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import user_icon from '../../assets/user_icon.png';
import './style.scss';

const Facilitators = ({ trainers }) => {
  const [currentUser, setCurrentUser] = useState(0);
  const [trainerMap, setTrainerMap] = useState({});

  useEffect(() => {
    const mapped = trainers.reduce((acc, trainer, i) => {
      let name = trainer.Trainer.User.firstName + trainer.Trainer.User.lastName;

      if (acc.hasOwnProperty(name)) return acc;

      return { ...acc, [name]: i };
    }, {});
    setTrainerMap(mapped);

    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fac_xc">
      <TransitionGroup className="fac_xc_con flex-row j-start">
        <CSSTransition
          classNames="slide"
          key={`fac_sec_${currentUser}`}
          timeout={500}
        >
          <div className="fac_xc_sec flex-row j-start">
            <div className="img-sec">
              <img
                src={trainers[currentUser].Trainer.User.profilePic || user_icon}
                alt=""
                className="img cover"
              />
            </div>
            <div className="text_sec">
              <p>Instructors</p>
              <h2>{`${trainers[currentUser].Trainer.User.firstName} ${trainers[currentUser].Trainer.User.lastName}`}</h2>
              <h3>{trainers[currentUser].Trainer.User.occupation}</h3>
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
      <div className="dots_con flex-row">
        {Object.keys(trainerMap).map((trainer, i) => {
          return (
            <button
              className="dot_button flex-row"
              key={i}
              onClick={() => setCurrentUser(trainerMap[trainer])}
            >
              <span
                className="dot"
                data-active={
                  trainerMap[trainer] === currentUser ? 'active' : null
                }
              ></span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Facilitators;
