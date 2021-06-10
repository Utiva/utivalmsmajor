import React, { useEffect } from 'react';
import Sekeleton from 'react-skeleton-loader';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getNextClasses } from 'views/Dashboard/Home/action';
import calender from 'assets/dashboard/calendar.png';
import clock from 'assets/dashboard/clock.png';
import no_course from 'assets/dashboard/no_course.png';
import './style.scss';

const ClassesSec = ({ data }) => (
  <a href={data?.link} className="next_class" target="_">
    <h2>{data?.name}</h2>
    <div className="class_sec flex-row j-space">
      <img src={data?.thumbnail} alt="" className="main_img" />
      <div className="text-sec flex-col j-space al-start">
        <div className="info_sec ">
          <strong>
            <small>Next class</small>
          </strong>
          <div className="info flex-row j-start">
            <img src={calender} alt="" />{' '}
            <p>
              <Moment format="Do MMMM YYYY">{data?.date}</Moment>
            </p>
          </div>
          <div className="info flex-row j-start">
            <img src={clock} alt="" />{' '}
            <p>
              <time>{moment(data?.time, 'HH:mm').format('hh:mm A')}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  </a>
);

const Loader = () => (
  <div className="next_class" style={{ height: '100px', marginRight: '30px' }}>
    <Sekeleton width="120%" height="100%" />
  </div>
);

const NoClass = () => (
  <div className="next_class flex-row ">
    <img src={no_course} alt="" className="" />
    <div className="text-sec flex-col">
      <h2>You have no new classes</h2>
    </div>
  </div>
);

const Classes = () => {
  const dispatch = useDispatch();
  const nextclasses = useSelector((state) => state.home.nextclasses);

  useEffect(() => {
    if (!nextclasses) {
      (async () => {
        await dispatch(getNextClasses('student'));
      })();
    }
    return () => {};
  }, [nextclasses, dispatch]);

  return (
    <div className="p_sec_class flex-row j-start">
      {!nextclasses ? (
        [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
      ) : nextclasses.length === 0 ? (
        <NoClass />
      ) : (
        nextclasses.map((nextclass, i) => {
          return (
            !!nextclass && (
              <ClassesSec key={`next_classes_${i}`} data={nextclass} />
            )
          );
        })
      )}
    </div>
  );
};

export default Classes;
