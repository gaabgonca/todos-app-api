const { encode, decode } = require('node-base64-image')

const options = {
  string: true,
  // headers: {
  //   "User-Agent": "my-app"
  // }
}

module.exports.toBase64 = async (imgPath) => {
  return await encode(imgPath, options)
}

module.exports.base64toJpg = async (imgString, fname) => {
  return await decode(imgString, {
    fname,
    ext: 'jpg',
  })
}
