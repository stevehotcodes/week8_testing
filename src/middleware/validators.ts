import joi from 'joi'

export const registrationSchema =joi.object({
    fullName:joi.string().required().min(3),
    email:joi.string().email().min(3).required(),
    password:joi.string().min(8).required(),
    cohortNumber:joi.number().required()

})