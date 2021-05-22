import { axiosInstance } from '../helpers';

export const getAllcourses = () => async (dispatch) => {
  const courses = await axiosInstance.get('/admin/courses');

  dispatch({
    type: 'GET_ALL_ORIGINAL_COURSES',
    payload: courses.data.data,
  });
};

export const addCourse = (course) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE',
    payload: course,
  });
};

export const editCourse = (course) => async (dispatch) => {
  dispatch({
    type: 'EDIT_COURSE',
    payload: course,
  });
};

export const deleteCourse = (course) => async (dispatch) => {
  dispatch({
    type: 'DELETE_COURSE',
    payload: course,
  });
};

export const getCurrentCourse = (course, id) => async (dispatch) => {
  const currCourse = course
    ? course
    : await axiosInstance.get(`/admin/course/${id}`);

  dispatch({
    type: 'GET_CURRENT_COURSE_ADMIN',
    payload: course ? currCourse : currCourse.data.data,
  });
};

export const getAllCourseCohorts = (id, name) => async (dispatch) => {
  const cohorts = await axiosInstance.get(`/admin/course-cohorts/${id}`);

  dispatch({
    type: 'GET_ALL_COURSE_COHORTS',
    payload: { cohort: cohorts.data.data, name },
  });
};

export const addCourseCohort = (course, name) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE_COHORT',
    payload: { cohort: course, name },
  });
};

export const editCourseCohort = (course, name) => async (dispatch) => {
  dispatch({
    type: 'EDIT_COURSE_COHORT',
    payload: { editedCohort: course, name },
  });
};

export const addClass = (newClass, name) => async (dispatch) => {
  dispatch({
    type: 'ADD_CLASS',
    payload: { newClass, name },
  });
};

export const addPrevVideoFn =
  (link, courseName, classId, courseCohortId) => async (dispatch) => {
    let video;

    try {
      video = await axiosInstance.post('admin/add-prev-videos', {
        link,
        classId,
        courseCohortId,
      });

      dispatch({
        type: courseName ? 'ADD_NEW_VIDEO' : 'MEMBER_ADD_NEW_VIDEO',
        payload: { video: video.data.data, courseName, classId },
      });
    } catch (err) {}
  };

export const removePrevVideoFn =
  (courseName, classId, videoId) => async (dispatch) => {
    await axiosInstance.delete(`admin/prev-videos/${videoId}`);

    dispatch({
      type: courseName ? 'REMOVE_VIDEO' : 'MEMBER_REMOVE_VIDEO',
      payload: { courseName, classId, videoId },
    });
  };

export const editClass = (newClass, name) => async (dispatch) => {
  dispatch({
    type: 'EDIT_CLASS',
    payload: { newClass, name },
  });
};

export const addCourseDescription = (data, name) => async (dispatch) => {
  dispatch({
    type: 'ADD_COURSE_DESCRIPTION',
    payload: { courseDescription: data, name },
  });
};

export const updateCourseDescription = (data, name) => async (dispatch) => {
  dispatch({
    type: 'UPDATE_COURSE_DESCRIPTION',
    payload: { courseDescription: data, name },
  });
};

export const deleteCourseDescription = (data, name) => async (dispatch) => {
  await axiosInstance.delete(`/course/description/${data.id}`);

  dispatch({
    type: 'DELETE_COURSE_DESCRIPTION',
    payload: { courseDescription: data, name },
  });
};

export const getCurrentCourseCohort =
  (courseCohortId, name) => async (dispatch) => {
    let courses;

    courses = await axiosInstance.get(`/admin/course-cohort/${courseCohortId}`);

    const useObject = courses.data.data;

    const matArray = await Promise.all(
      useObject.Course.Classes.map(async (cls) => {
        const resources = await axiosInstance.get(
          `/file?key=${encodeURIComponent(
            `Courses/${useObject.Course.name}/classes/${cls.title}/resources/`
          )}`
        );

        const assignments = await axiosInstance.get(
          `/file?key=${encodeURIComponent(
            `Courses/${useObject.Course.name}/classes/${cls.title}/assignments/`
          )}`
        );

        return {
          [cls.title]: {
            resources: resources.data.data,
            assignments: assignments.data.data,
            submittedAssignment: null,
            allSubmittedAssignment: null,
          },
        };

        //
      })
    );

    const r_arr = await matArray.reduce((acc, cur) => ({ ...acc, ...cur }), {});

    dispatch({
      type: 'CREATE_CLASS_RESOURCES',
      payload: r_arr,
    });

    // create a list of the class name so we can add the class resources
    dispatch({
      type: 'ADD_CURRENT_COHORT',
      payload: { courseCohort: courses.data.data, name },
    });
  };

export const deleteClass = (name, id) => async (dispatch) => {
  dispatch({
    type: 'DELETE_CLASS',
    payload: { name, id },
  });
};
