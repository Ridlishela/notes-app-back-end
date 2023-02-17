const ClientError = require("../../exceptions/ClientError");

class NotesHandler {
  constructor(service, validator) {
    this._service = service; //penggunaan underscore(_) dipertimbangkan sebagai lingkup privat secara konvensi.
    this._validator = validator
    
    //Mengikat konteks this agar tetap bernilai instance dari NotesHandler(binding) dan tidak menjadi objek dari routes
    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }
  //=========================================================================================
  postNoteHandler(request, h) {
    try {
      this._validator.validateNotePayload(request.payload) // pemanggilan fungsi this._validator karna fungsi postNoteHandler mendapatkan data dari client dalam bentuk payload
      const { title = "untitled", body, tags } = request.payload; //untuk mendapatkan nilai dari rquest yg dikirim client

      const noteId = this._service.addNote({ title, body, tags }); //pemanggilan fungsi this._service.addNote(untuk proses memasukan catatan baru) mengembalikan id catatan yg disimpan dan nilainya ditampung dalam variable noteId

      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId, // Data yg direturn/dikembalikan
        },
      });
      response.code(201); // statusCode 201 request client berhasil terkirim dan server telah membuat resource baru yg akan dikirim kembali dalam isi response
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
      const response = h.response({
        status: "fail",
        message: error.message, // error message default dari instances ClientError
      });
      response.code(error.statusCode); // error statusCode default 404 dari instances ClientError
      return response;
    }

    //Server Error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.'
    })
    response.code(500) // statusCode 500 ada kesalahan di dalam server
    console.error(error)
    return response
    }
  }

  //=========================================================================================
  getNotesHandler() {
    const notes = this._service.getNotes(); //pemanggilan fungsi this._service.getNote() untuk dapatkan nilai
    return {
      status: "success",
      data: {
        notes,// data yg direturn/dikembalikan
      },
    };
  }

  //=========================================================================================
  getNoteByIdHandler(request, h) {
    try {
      const { id } = request.params; //untuk mendapatkan nilai id note yg dikirim client melalui path paramaeter
      const note = this._service.getNoteById(id); //memanggil fungsi this._service.getNoteById dengan parameter id untuk mendapatkan objek note sesuai id yg diberikan client
      return {
        status: "success",
        data: {
          note, // Data yg direturn/dikembalikan
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message, // error message default dari instances ClientError
        });
        response.code(error.statusCode); // error statusCode default 404 dari instances ClientError
        return response;
      }

      //Server Error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.'
    })
    response.code(500) // statusCode 500 ada kesalahan di dalam server
    console.error(error)
    return response
    }
  }

  //=========================================================================================
  putNoteByIdHandler(request,h) {
    try {
      this._validator.validateNotePayload(request.payload) // pemanggilan fungsi this._validator karna fungsi putNoteByIdHandler mendapatkan data dari client dalam bentuk payload
      const { id } = request.params; //untuk mendapatkan nilai id note yg dikirim client melalui path paramaeter
      this._service.editNoteById(id, request.payload); //pemanggilan fungsi this._service.editNoteById dengan parameter id dan request.payload yg akan menyediakan title,body, tags untuk objek note baru.

      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message, // error message default dari instances ClientError
        });
        response.code(error.statusCode); // error statusCode default 404 dari instances ClientError
        return response;
      }

      //Server Error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.'
    })
    response.code(500) // statusCode 500 ada kesalahan di dalam server
    console.error(error)
    return response
    }
  }

  //=========================================================================================
  deleteNoteByIdHandler(request, h) {
    try {
      const { id } = request.params; //untuk mendapatkan nilai id note yg dikirim client melalui path paramaeter
      this._service.deleteNoteById(id); //pemanggilang fungsi this._service.deleteNoteById dengan parameter id untu mengahapus note berdasarkan id

      return {
        status: "success",
        message: "Catatan berhasil dihapus",
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: "fail",
          message: error.message, // error message default dari instances ClientError
        });
        response.code(error.statusCode); // error statusCode default 404 dari instances ClientError
        return response;
      }

      //Server Error
    const response = h.response({
      status: 'error',
      message: 'Maaf, terjadi kegagalan pada server kami.'
    })
    response.code(500) // statusCode 500 ada kesalahan di dalam server
    console.errpr(error)
    return response
    }
  }
}

module.exports = NotesHandler; //Ekspor nilai NotesHandler agar dapat digunakan di berkas Javascript lain
