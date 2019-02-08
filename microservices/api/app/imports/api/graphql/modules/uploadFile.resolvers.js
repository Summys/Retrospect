import fs from 'fs'
import mkdirp from 'mkdirp'
import shortid from 'shortid'
const UPLOAD_DIR = '/Users/user/uploads'

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR)

const storeFS = ({ stream, filename }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};

const processUpload = async upload => {
  console.log('UPLOAD', upload)
    const { stream, filename, mimetype } = await upload
    const { id, path } = await storeFS({ stream, filename })
    console.log(id, path)
    return { id, path, filename, mimetype }
  }

export default {
  Mutation: {
    singleUpload: (obj, { file }) => processUpload(file)
  }
};
