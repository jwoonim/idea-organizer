import * as googleCloudStorage from '@google-cloud/storage'
import stream from 'stream'

import { Secrets } from '../constants'

const projectId = 'idea-organizer-303412'
const keyFilename = 'idea-organizer-storage.json'
const storage = new googleCloudStorage.Storage({ projectId, keyFilename })

export const uploadImage = async (base64Image, userId, graphId) => {
  const file = storage
    .bucket(Secrets.GOOGLE_CLOUD_STORAGE_BUCKET)
    .file(`${userId}/${graphId}.jpg`)

  const base64EncodedString = base64Image.replace(/^data:\w+\/\w+;base64,/, '')
  const buffer = Buffer.from(base64EncodedString, 'base64')
  const fileOptions = {
    resumable: false,
    contentType: 'image/jpg',
    validation: false,
  }

  return await new Promise((resolve, reject) => {
    file
      .createWriteStream(fileOptions)
      .on('error', (err) => {
        console.log(err)
        reject(false)
      })
      .on('finish', () => {
        resolve(
          `http://storage.cloud.google.com/${Secrets.GOOGLE_CLOUD_STORAGE_BUCKET}/${userId}/${graphId}.jpg`
        )
      })
      .end(buffer)
  })
}

export const removeImage = async (userId, graphId) => {
  return await storage
    .bucket(Secrets.GOOGLE_CLOUD_STORAGE_BUCKET)
    .file(`${userId}/${graphId}.jpg`)
    .delete()
}

export const removeImages = async (userId) => {
  await storage
    .bucket(Secrets.GOOGLE_CLOUD_STORAGE_BUCKET)
    .deleteFiles({ prefix: userId })
}
