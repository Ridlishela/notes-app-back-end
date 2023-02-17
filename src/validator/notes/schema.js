const Joi = require('joi') // tools for data validation javascript

// objek schema data notes
const NotePayloadSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
})

module.exports = { NotePayloadSchema } //Ekspor nilai NotePayloadSchema agar dapat digunakan di berkas Javascript lain
