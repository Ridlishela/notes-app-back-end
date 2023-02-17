/* NotFoundError (extebds dari error)n : Custom error yg mengindikasikan error karna resource yg diminta client tidak ditemukan.
*/
const ClientError = require('./ClientError') //Pemanggilan atau impor nilai ClientError

class NotFoundError extends ClientError {
    constructor(message) {
        super(message, 400)
        this.name = 'NotFoundError'
    }
}

module.exports = NotFoundError // Ekspor nilai NotFoundError agar bisa diakses di berkas javascript lainnya