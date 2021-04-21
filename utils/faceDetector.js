const cv = require('opencv')
const { toBase64, base64toJpg } = require('./base64')
const os = require('os')
const path = require('path')
const fs = require('fs')

const COLOR = [0, 255, 0]
const thickness = 2

const haar_cascade_path = path.join(
  __dirname,
  '..',
  'cats',
  'haarcascade_frontalcatface.xml'
)

module.exports.detectFaces = async (originalBase64) => {
  let tempFileName = Date.now().toString()
  let tempFilePath = path.join(__dirname, '..', '_temp', tempFileName)

  let outFileName = tempFileName + 'haar' + '.jpg'
  let outFilePath = path.join(__dirname, '..', '_temp', outFileName)
  //Decode base64 string into jpg image
  tempFilePath = await base64toJpg(originalBase64, tempFilePath)
  let facesCount = 0
  cv.readImage(tempFilePath, function (err, im) {
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
    })
  })
}
