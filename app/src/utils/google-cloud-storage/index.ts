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
        resolve(`${userId}/${graphId}.jpg`)
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

export const getSignedUrls = async (ideas) => {
  const urls = []
  for await (let i of ideas) {
    if (i.picture)
      urls.push(generateV4ReadSignedUrl(i))
  }
  return await Promise.all(urls)
}

const generateV4ReadSignedUrl = async (idea) => {
  return await new Promise((resolve, reject) => {
    storage
      .bucket(Secrets.GOOGLE_CLOUD_STORAGE_BUCKET)
      .file(idea.picture)
      .getSignedUrl({
        version: 'v4',
        action: 'read',
        expires: Date.now() + 1 * 60 * 1000, // 1 minute
      })
      .then((res) => {
        const [url] = res
        idea.picture = url
        resolve(idea)
      })
      .catch((e) => {
        console.log(e)
        reject(false)
      })
  })
}
