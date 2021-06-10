import { axiosInstance } from '../helpers';

export const getAllTrainers = () => async (dispatch) => {
  const trainers = await axiosInstance.get(`/admin/users/trainer`);

  dispatch({
    type: 'GET_ALL_TRAINERS',
    payload: trainers.data.data,
  });
};
