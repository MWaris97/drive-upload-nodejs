const createReadStream = require('fs').createReadStream;
const createWriteStream = require('fs').createWriteStream;
const path = require('path');
const process = require('process');
const { google } = require('googleapis');

// Downloaded from while creating credentials of service account
const pkey = require('./pk.json');

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

/**
 * Authorize with service account and get jwt client
 *
 */
async function authorize() {
  const jwtClient = new google.auth.JWT(
    pkey.client_email,
    null,
    pkey.private_key,
    SCOPES
  )
  await jwtClient.authorize();
  return jwtClient;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function listFiles(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return;
  }

  console.log('Files:');
  files.map((file) => {
    console.log(`${file.name} (${file.id})`);
  });
}

/**
 * Create a new file on google drive.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function uploadFile(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileName = process.argv[3];
  if (fileName) {
    const file = await drive.files.create({
      media: {
        body: createReadStream(fileName)
      },
      fields: 'id',
      requestBody: {
        name: path.basename(fileName),
      },
    });
    console.log(file.data.id)
  }
  else
    console.log("Please specify a file name")

}

/**
 * Update contents of existing file.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function updateFile(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileName = process.argv[3], fileId = process.argv[4];

  if (fileName && fileId) {
    const file = await drive.files.update({
      media: {
        body: createReadStream(fileName),
      },
      fileId: fileId,
    });

    console.log(file.data.id)
  }
  else
    console.log("Please specify file name/file id")

}

/**
 * Download contents of existing file.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
async function downloadFile(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });

  const fileName = process.argv[3], fileId = process.argv[4];

  if (fileName && fileId) {
    let dest = createWriteStream(fileName);
    drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" },
      (err, { data }) => {
        if (err) {
          console.log(err);
          return;
        }
        data
          .on("end", () => console.log("Done."))
          .on("error", (err) => {
            console.log(err);
            return process.exit();
          })
          .pipe(dest);
      }
    );
  }
  else
    console.log("Please specify file name/file id")
}

const action = process.argv[2];

switch (action) {
  case 'list':
    authorize().then(listFiles).catch(console.error);
    break;
  case 'upload':
    authorize().then(uploadFile).catch(console.error);
    break;
  case 'update':
    authorize().then(updateFile).catch(console.error);
    break;
  case 'download':
    authorize().then(downloadFile).catch(console.error);
    break;

  default:
    console.log(`Please specify action from one of these
1. list: view all the files
2. upload: upload a file e.g. node loco.js upload <filename>
3. update: update the file e.g. node loco.js update <filename> <file_id>
4. download: download the file e.g. node loco.js update <filename> <file_id>`);
}