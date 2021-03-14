import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import {
  getAssignments,
  deleteAssignmnet,
  editAssignments,
} from 'g_actions/member';
import Input from 'components/Input';
import Modal from 'components/Modal';
import { axiosInstance } from 'helpers';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import Confirm from 'components/Confirm';
import ProgressBar from 'components/ProgressBar';
import class_icon from 'assets/icons/class_icon.png';
import Files from 'components/Files';
// import Button from 'components/Button';
// import Drag from 'components/Drag';
import './style.scss';
import Button from 'components/Button';

const AddAssignment = ({ title, course, currentClass, gapi, folderId }) => {
  const submitBtn = useRef();
  const dispatch = useDispatch();
  const progressDialog = useRef();
  const deleteDialog = useRef();
  const [progress, setProgress] = useState(0);
  const { addToast } = useToasts();
  const { classResources } = useSelector((state) => state.member);
  const assignment = currentClass?.ClassResources?.filter(
    (res) => res.type === 'assignment'
  );

  const resourceAssignment = classResources[title].assignment;

  //

  useBreadcrumbs(
    [
      {
        name: course?.Course?.name,
        link: `/courses/classroom/${course?.courseCohortId}`,
      },
      {
        name: `${title}`,
        link: `/courses/classroom/${course?.courseCohortId}/${currentClass?.id}`,
      },
      {
        name:
          classResources[title]?.assignment?.length === 0
            ? 'Add Assignment'
            : 'Edit Assignment',
        link: '#',
      },
    ],
    true
  );

  const [assData, setAssData] = useState({
    dueDate: '',
    title: '',
    description: '',
    point: '',
  });

  useEffect(() => {
    if (!resourceAssignment) return;
    if (!resourceAssignment[0]) return;

    const n_data = Object.keys(assData).reduce(
      (acc, input) => ({
        ...acc,
        [input]: resourceAssignment[0][input]
          ? resourceAssignment[0][input]
          : '',
      }),
      {}
    );

    //update state
    setAssData(n_data);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceAssignment]);

  const getFiles = useCallback(
    async (id) => {
      if (!gapi) return;
      return await gapi.gapi.get(
        null,
        id,
        'id, name, iconLink, webContentLink, size, webViewLink, parents'
      );
    },
    [gapi]
  );

  const handleChange = ({ target: { name, value } }) => {
    setAssData({ ...assData, [name]: value });
  };

  useEffect(() => {
    if (!resourceAssignment) {
      if (assignment.length === 0) {
        dispatch(getAssignments(title, null));
      }

      assignment.forEach(async (resource) => {
        const file = await getFiles(resource.link);

        dispatch(
          getAssignments(title, {
            ...resource,
            resourceId: resource.id,
            ...file,
            comments: null,
          })
        );
      });
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upload = async (files) => {
    progressDialog.current.open();
    let file;

    try {
      file = await gapi.gapi.upload(files, setProgress, folderId);

      const res = await axiosInstance.post(
        `class/assignment/${currentClass.id}`,
        {
          link: file.id,
        }
      );

      if (res) {
        file = await getFiles(file.id);
        file.resourceId = res.data.data.id;
        setProgress(100);
        dispatch(getAssignments(title, { ...file, ...assData }));

        setTimeout(function () {
          progressDialog.current.close();
        }, 2000);
      }
    } catch (err) {
      progressDialog.current.close();

      addToast('Error Uploding File', {
        appearance: 'error',
        autoDismiss: true,
      });

      file && (await gapi.gapi.deleteFile(file.id));
    }
  };

  const deleteFile = async () => {
    const file = resourceAssignment[0];

    const resourceId = file.resourceId;

    try {
      const res = await axiosInstance.delete(`class/assignment/${resourceId}`);
      if (res) {
        dispatch(deleteAssignmnet(title, file.id));
        await gapi.gapi.deleteFile(file.id);
        return true;
      }
    } catch (err) {
      addToast('Error Deleting file', {
        appearance: 'error',
        autoDismiss: true,
      });
      return false;
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!resourceAssignment[0]) {
      addToast('Please upload a file', {
        appearance: 'error',
        autoDismiss: true,
      });

      return;
    }

    submitBtn.current.children[0].innerHTML = 'Assigning...';
    submitBtn.current.classList.add('loader');

    const newData = Object.keys(assData).reduce((acc, cur) => {
      if (assData[cur] === '') {
        return { ...acc };
      }
      return { ...acc, [cur]: assData[cur] };
    }, []);

    try {
      await axiosInstance.patch(
        `class/assignment/edit/${resourceAssignment[0].resourceId}`,
        {
          ...newData,
          link: resourceAssignment[0].link,
        }
      );

      dispatch(
        editAssignments(
          title,
          { ...resourceAssignment[0], ...newData },
          resourceAssignment[0].id
        )
      );

      submitBtn.current.children[0].innerHTML = 'Assign';
      submitBtn.current.classList.remove('loader');

      addToast('Successfully Edited', {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch (err) {
      submitBtn.current.children[0].innerHTML = 'Assign';
      submitBtn.current.classList.remove('loader');
      addToast('Unable to create assignment', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="add_ass cx_listnx_con">
      <h2 className="h_con flex-row j-start">
        <img src={class_icon} alt="class" />
        <span>{title}</span>
      </h2>

      <form className="flex-row j-start al-start">
        <div className="desc_se">
          <div
            className={`in_sec ${
              classResources[title]?.assignment?.length === 0 ? 'emp-fil' : ''
            }`}
          >
            <label>Title</label>
            <Input
              placeHolder=""
              handleChange={handleChange}
              value={assData.title}
              shouldValidate={false}
              name="title"
            />

            <label>Text</label>
            <Input
              type="textarea"
              placeHolder=""
              handleChange={handleChange}
              value={assData.description}
              shouldValidate={false}
              name="description"
            />

            <Files
              useErrorMessage={false}
              files={resourceAssignment}
              showdrag={classResources[title]?.assignment?.length === 0}
              deleteFile={() => deleteDialog.current.open()}
              handleImage={upload}
            >
              <Button text="Upload assignment" className="upbtn flex-row" />
            </Files>
          </div>
        </div>

        <div className="cx-specs box-shade">
          <div className="pl_sec flex-row">
            <dt>For</dt>
            <Input
              attr={{ disabled: true }}
              value={`${course.Cohort.cohort} Cohort`}
            />
          </div>
          <div className="pl_sec flex-row">
            <dt>Due Date</dt>
            <Input
              type="date"
              placeHolder="Due Date"
              value={
                moment(assData.dueDate).format(
                  'YYYY-MM-DD'
                ) /**moment(time, 'HH:mm').format('hh:mm A') */
              }
              handleChange={handleChange}
              shouldValidate={false}
              name="dueDate"
              attr={{ min: moment().format('YYYY-MM-DD') }}
            />
          </div>
          <div className="pl_sec flex-row">
            <dt>Point</dt>
            <Input
              placeHolder="Point"
              value={assData.point}
              handleChange={handleChange}
              shouldValidate={false}
              name="point"
            />
          </div>
          <div className="pl_sec flex-row">
            <dt></dt>
            <Button
              text="Assign"
              className="flex-row"
              onClick={submit}
              btnRef={submitBtn}
            />
          </div>
        </div>
      </form>
      <Modal ref={deleteDialog}>
        <Confirm
          text="Are you sure?"
          onClick={deleteFile}
          close={() => deleteDialog.current.close()}
          closeText="Successfuly Deleted"
        />
      </Modal>

      <Modal ref={progressDialog}>
        <ProgressBar progress={progress * 0.95} />
      </Modal>
    </div>
  );
};

export default AddAssignment;
