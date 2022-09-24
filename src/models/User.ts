import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserWarningBot {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: 'ru' })
  language!: string
  @prop({ required: false })
  status!: string
  @prop({ required: false })
  username!: string
}

const UserModel = getModelForClass(UserWarningBot)

export function findOrCreateUser(id: number, status?: string) {
  const result = UserModel.findOneAndUpdate(
    { id },
    { status },
    {
      upsert: true,
      new: true,
    }
  )
  if (!result) return UserModel.create({ id })
  return result
}

export function countUsers() {
  return UserModel.find()
}

export function findUserById(id: number) {
  return UserModel.findOne({ id })
}
