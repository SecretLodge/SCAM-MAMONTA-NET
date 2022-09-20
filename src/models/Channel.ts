import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class ChannelScamBot {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, index: true })
  username!: string
  @prop({ required: true, default: 'ru' })
  language!: string
  @prop({ required: true })
  admin_id!: number
  @prop({ required: false })
  message_id!: number
}

const ChannelModel = getModelForClass(ChannelScamBot)

export function findChannel(id: number) {
  return ChannelModel.findOne({ id })
}

export function createChannel(optionsModel: {
  id: number
  username?: string
  admin_id?: number
}) {
  return ChannelModel.create(optionsModel)
}

export function allChannels(id: number) {
  return ChannelModel.find({ admin_id: id })
}

export function countChannels() {
  return ChannelModel.find()
}

export function findAndUpdateChannel(optionsModel: {
  id: number
  username?: string
  admin_id?: number
  message_id?: number
}) {
  return ChannelModel.findOneAndUpdate(
    { id: optionsModel.id },
    {
      username: optionsModel.username,
      admin_id: optionsModel.admin_id,
      message_id: optionsModel.message_id,
    },
    {
      upsert: true,
      new: true,
    }
  )
}
