import mongoose from 'mongoose'

const modelOptions = {
  existingMongoose: mongoose,
  schemaOptions: { timestamps: true, versionKey: false },
}

export default modelOptions
