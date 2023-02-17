const InvariantError = require("../../exceptions/InvariantError") // Impor nilai InvariantError
const { NotePayloadSchema } = require("./schema") // Impor nilai NotePayloadSchema dengan destructuring agar memudahkan bila nantinya memanggil lebih dari satu fungsi

// fungsi validator yan menggunakan schema dari schema.js
const NotesValidator = {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload)
        if(validationResult.error) {
            // Menggunakan custom error InvariantError karna dilakukan validasi data dari data yg diberikan client
            throw new InvariantError(validationResult.error.message)
        }
    }
}

module.exports = NotesValidator // Ekspor nilai NotesValidator agar dapat digunakan di berkas Javascript lain
