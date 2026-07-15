import mongoose from 'mongoose'

export default defineNitroPlugin(async (nitroApp) => {
  const config = useRuntimeConfig()

  if (!config.mongoUri) {
    console.warn('MongoDB URI is not defined in runtime config.')
    return
  }

  try {
    await mongoose.connect(config.mongoUri)
    console.log('🟢 MongoDB Connected (Mongoose)')
  } catch (error) {
    console.error('🔴 MongoDB Connection Error (Mongoose):', error)
  }

  nitroApp.hooks.hook('close', async () => {
    await mongoose.connection.close()
    console.log('🔴 MongoDB Connection Closed (Mongoose)')
  })
})
