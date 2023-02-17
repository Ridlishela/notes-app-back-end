/* InvariantError (estends dari ClientError) : Custom error yg mengindikasikan error karna kesalahan bisnis logic pada data yg dikirimkan oleh client.
Kesalahan validasi data merupakan salah satu InvariantError
*/
const ClientError = require('./ClientError') // Impor nilai ClientError

class InvariantError extends ClientError { // inheritance OOP (InvariantError mewarisi class ClientError)
    constructor(message) {
        super(message)
        this.name = 'InvariantError'
    /* statusCode InvariantError adalah 400 maka tidak perlu menetapkan statusCode karne
    secara default turunan ClientError akan memiliki nilai status code 400
    */
    }
}

module.exports = InvariantError // Ekspor nilai InvariantError agar dapat diakses di berkas Javascript lainnya