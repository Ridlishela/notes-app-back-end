/* ClientError (extends dari Error) : custom error yg mengindikasikan error karna masalah yg terjadi pada client.
ClientError ini bersifat abstrak karna clent error bersifat lebih spesifik. 
Sehingga, sebaiknya anda tidak membangkitkan error dengan menggunakan class ini secara langsung, tapi gunakan turunannya.
*/

class ClientError extends Error { // inheritance OOP (ClientError mewarisi class Error)
    constructor(message, statusCode = 400) {
        super(message) 
        this.statusCode = statusCode
        this.name = 'ClientError'
    }
}

module.exports = ClientError  // Ekspor nilai ClientError agar dapat diakses di berkas Javascript lainnya