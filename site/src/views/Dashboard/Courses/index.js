import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCourses } from 'g_actions/member';
import useFetch from 'Hooks/useFetch';
import Overview from 'components/OverView';
import not_found from 'assets/not_found.png';
import Loader from 'components/Loading';
import CourseList from './CoursesList';
import Classroom from 'views/Classroom';
import FullClass from 'views/FullClass';
import Assignment from 'views/Assignment';
import AllAssignments from 'views/AllAssignments/index';
import StudyPlan from '../../StudyPlan';
import Members from '../../Members';

const Courses = ({ gapi }) => {
  let { path } = useRouteMatch();
  // useBreadcrumbs({ name: 'My Courses', link: '/courses' }, true);
  const dispatch = useDispatch();
  const { isStudent } = useSelector((state) => state.auth);
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const userType = isStudent ? 'student' : 'trainer';
  const [loading, error, fetch] = useFetch(dispatch, !enrolledcourses, true);

  useEffect(() => {
    if (!enrolledcourses)
      (async () => {
        await fetch(() => getEnrolledCourses(null, null, userType));
      })();

    return () => {};
  }, [dispatch, fetch, userType, enrolledcourses]);

  return (
    <section className="flex flex-grow flex-col">
      {loading ? (
        <div className="img">
          <Loader tempLoad={true} full={false} />
        </div>
      ) : error ? (
        <div className="flex-grow flex-center flex-col text-theme">
          <p>An Error Occurred</p>
          <p>Please refresh this window</p>
        </div>
      ) : enrolledcourses.length === 0 ? (
        <div className="flex-grow flex-center flex-col text-theme">
          <img src={not_found} className="w-60 mb-5" alt="Not found" />
          {isStudent ? (
            <p>You are yet to enrol for any course</p>
          ) : (
            <p>You have not been assigned any Courses</p>
          )}
          {isStudent && (
            <a
              className="py-2 px-5 mt-2 rounded-md text-white bg-secondary text-sm"
              href="https://utiva.io"
            >
              Start Learning
            </a>
          )}
        </div>
      ) : (
        <>
          <Switch>
            <Route
              exact
              path={`${path}/overview/:courseId`}
              component={Overview}
            />
            <Route exact path={`${path}`} component={CourseList} />
            <Route exact path={`${path}/classroom/:courseId`}>
              <Classroom gapi={gapi} />
            </Route>
            <Route exact path={`${path}/classroom/:courseId/:classroom`}>
              <FullClass gapi={gapi} />
            </Route>

            <Route
              exact
              path={`${path}/classroom/:courseId/:classroom/add-assignment`}
            >
              <FullClass gapi={gapi} />
            </Route>

            <Route
              exact
              path={`${path}/assignment/:courseId/:classroom/:assignmentId?`}
            >
              <Assignment gapi={gapi} />
            </Route>
            <Route
              exact
              path={`${path}/study-plan/:courseId`}
              component={StudyPlan}
            />
            <Route
              exact
              path={`${path}/members/:courseId`}
              component={Members}
            />
            <Route exact path={`${path}/all-assignments/:courseId/:classroom?`}>
              <AllAssignments gapi={gapi} />
            </Route>
          </Switch>
        </>
      )}
    </section>
  );
};

export default Courses;
