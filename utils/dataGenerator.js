const path = require('path')
const fs = require('fs')
const colors = require('colors')
const { toBase64, base64toJpg } = require('./base64')
const { assert } = require('console')

const titles = [
  'Cute Cat',
  'Beautiful Kitten',
  'Nice Feline',
  'Adorable Puss',
  'Charming Pet',
  'Attractive Cat',
  'Pretty Kitten',
  'Elegant Feline',
  'Lovely Puss',
  'Neat Pet',
]

// Get path to _data directory
const dataDirectory = path.join(__dirname, '..', '_data')

// Get path to the cats directory
const catsDirectory = path.join(__dirname, '..', 'cats')

//Get files in the cats directory
const catFiles = fs
  .readdirSync(catsDirectory)
  .filter((file) => path.basename(file).startsWith('cat'))

//Generate payload
const catStringsArray = catFiles.map((file, index) => {
  const catFilePath = path.join(catsDirectory, file)
  const catFileString = fs.readFileSync(catFilePath, {
    encoding: 'base64',
  })
  return {
    title: titles[index],
    originalBase64: catFileString,
  }
})

//Create cats.json path
const catsJsonPath = path.join(dataDirectory, 'cats.json')

//Write cats.json file to _data directory
const data = JSON.stringify(catStringsArray)
fs.writeFileSync(catsJsonPath, data)
console.log('Data written to _data directory'.green.inverse)

//Test for a random file

//Get Random index
const index = Math.floor(Math.random() * titles.length)
assert(index < titles.length)

//Read cats.json
const catsJson = JSON.parse(fs.readFileSync(catsJsonPath))

//Get base64 test string
const testImageString = catsJson[index].originalBase64

// Decode image into test_out.jpg
const testOutPath = path.join(dataDirectory, 'test_out')
;(async () => {
  try {
    await base64toJpg(testImageString, testOutPath)
  } catch (error) {
    throw error
  }
})()
