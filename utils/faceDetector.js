const cv = require('opencv')
const { toBase64, base64toJpg } = require('./base64')
const os = require('os')
const path = require('path')
const fs = require('fs')
const { encode } = require('querystring')

const COLOR = [0, 255, 0]
const thickness = 2

const haar_cascade_path = path.join(
  __dirname,
  '..',
  'cats',
  'haarcascade_frontalcatface.xml'
)

module.exports.detectFaces = (catPicture, next) => {
  let outFileName = Date.now().toString() + 'haar' + '.jpg'
  let outFilePath = path.join(__dirname, '..', '_temp', outFileName)

  //Decode base64 string into jpg image
  const buffer = new Buffer.from(catPicture.originalBase64, 'base64')

  //Use haar magic to detect faces
  let facesCount = 0
  cv.readImage(buffer, function (err, im) {
    im.detectObject(haar_cascade_path, {}, function (err, faces) {
      console.log(faces)
      for (var i = 0; i < faces.length; i++) {
        facesCount = faces.length
        var face = faces[i]
        im.rectangle(
          [face.x, face.y],
          [face.width, face.height],
          COLOR,
          thickness
        )
      }
      im.save(outFilePath)
      const outBase64 = im.toBuffer().toString('base64')
      catPicture.haarBase64 = outBase64
      catPicture.numberOfCats = facesCount
      next()
    })
  })
}
