import { sendMail } from '~/config/sendMail'
import { otpModel } from '~/model/otp.model.js'
import otpGenerator from 'otp-generator'
import { env } from '~/config/environment.js'
import bcrypt from 'bcrypt'


const generateOtp = async (reqBody) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  })
  const salt = await bcrypt.genSalt(parseInt(env.SALT))
  const hashOtp = await bcrypt.hash(otp, salt)
  const otpCreateNew = await otpModel.create({ ...reqBody, otp: hashOtp })
  await sendMail(reqBody.email, otp)
  return otpCreateNew ?
    {
      message: "Gửi OTP thành công !",
      otp: otpCreateNew
    } : { message: "Tạo OTP thất bại" }
}
const verifyOtp = async (reqBody) => {
  const targetEmail = reqBody.email
  const allOtp = await otpModel.find({ email: targetEmail })
    .sort({ 'createdOn': 'asc' })
    .lean()

  if (allOtp.length === 0) {
    return false
  }
  const targetOtp = allOtp[allOtp.length - 1]
  const isValidOTp = await bcrypt.compare(reqBody.otp, targetOtp.otp)
  return isValidOTp;
}
export const otpService = {
  generateOtp, verifyOtp
}