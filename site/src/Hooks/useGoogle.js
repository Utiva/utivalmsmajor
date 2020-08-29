import { useEffect, useState } from 'react';
import cred from './credentials.json';
import axios from 'axios';

const Google = ({ updateSignInStatus = () => {} }) => {
  const [g_api, setG_api] = useState();

  useEffect(() => {
    (async () => {
      const gapi_str = await axios.get('https://apis.google.com/js/api.js');
      const gapi = new Function(`${gapi_str.data} return gapi`)();

      gapi.load('client:auth2', () => {
        gapi.client
          .init({
            // apiKey: API_KEY,
            clientId: cred.installed.client_id,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/drive',
          })
          .then(function () {
            setG_api(gapi);
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          });
      });
    })();
  }, [updateSignInStatus]);

  const signIn = async () => {
    const response = await g_api.auth2.getAuthInstance().signIn();
    return !!response.rt;
  };

  async function upload(file) {
    const fileSize = file.size;

    const response = await g_api.client.drive.files.create(
      {
        request: {
          name: file.name,
          mimeType: file.type,
          // parents: ['1RExy32fq9fIAx--lKTlOcEVrTjyHm5WJ'],
        },
        media: {
          body: file,
          mimeType: file.type,
        },
      },
      {
        // Use the `onUploadProgress` event from Axios to track the
        // number of bytes uploaded to this point.
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / fileSize) * 100;
          console.log(progress);
        },
      }
    );
    // log the result
    console.log(response.data);
    console.log(
      `\nstatus: ${response.status}, text status: ${response.statusText}`
    );
  }

  const deleteFile = () => {};

  const get = async (id, folderId) => {
    let res;

    if (!id) {
      res = await g_api.client.drive.files.list({
        q: "parents = '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp'",
        pageSize: 20,
        folderId: '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp',
        // files: '*',
        fields:
          'nextPageToken, files(name, iconLink, webContentLink, size, webViewLink, parents)',
      });
    } else {
      res = await g_api.client.drive.files.get({ fileId: id });
    }
    return res.result;
  };

  return {
    gapi: { api: g_api, deleteFile, get, upload },
    signIn,
  };
};

export default Google;