import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import google from 'assets/icons/google.png';
import { login } from 'g_actions/user';
// import linkedin from 'assets/icons/linkedin.png';git
import { auth, googleProvider, facebookProvider } from 'helpers/firebase';
import { axiosInstance } from 'helpers';

const socials = {
  google: googleProvider,
  facebook: facebookProvider,
};

const Social = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();
  const location = useLocation();

  //remember to add the redirect on login for v2

  const signIn = (type) => {
    (async () => {
      try {
        const social_resp = await auth.signInWithPopup(socials[type]);

        const {
          displayName,
          email,
          phoneNumber,
          photoURL,
          providerId,
          uid,
        } = social_resp.user.providerData[0];

        const response = await axiosInstance.post('/user/login?type=social', {
          firstName: displayName?.split(' ')[0],
          lastName: displayName?.split(' ')[1],
          email,
          phoneNumber: phoneNumber || 'N/A',
          profilePic: photoURL,
          providerId,
          socialUid: uid,
        });

        if (response) {
          dispatch(login(response.user));
          history.push('/');

          const redirectUrl = location?.search?.split('redirect=')[1];

          redirectUrl
            ? history.push(redirectUrl)
            : response.data.user.role === 'admin'
            ? history.push('/admin')
            : history.push('/');
        }
      } catch (error) {
        addToast(error.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    })();
  };

  return (
    <div className="social mt-2.5 mb-5">
      <div className="head flex-center relative h-12 z-0">
        <p className="z-10 bg-white p-3">Or</p>
        <span
          className="inline-block w-full absolute top-1/1 bg-gray-200 z-0"
          style={{ height: '1px' }}
        ></span>
      </div>
      <div className="btn_sec flex items-center justify-between">
        <button
          className="flex-center w-full bg-light shadow-sm py-2.5 px-5 rounded-md"
          onClick={() => signIn('google')}
        >
          <img src={google} alt="google" className="mr-2.5 md:mr-5 w-5" />
          <p className="text-txt text-sm md:text-base">Google</p>
        </button>
        {/* <button className="flex-row j-start" onClick={() => signIn('facebook')}>
          <img src={linkedin} alt="linkedin" />
          <p>LinkedIN</p>
        </button> */}
      </div>
    </div>
  );
};

export default Social;
