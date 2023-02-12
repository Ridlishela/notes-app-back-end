
class NotesHandler {
  constructor(service) {
    this._service = service; //penggunaan underscore(_) dipertimbangkan sebagai lingkup privat secara konvensi.

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
      const { title = "untitled", body, tags } = request.payload; //untuk mendapatkan nilai dari rquest yg dikirim client

      const noteId = this._service.addNote({ title, body, tags }); //pemanggilan fungsi this._service.addNote(untuk proses memasukan catatan baru) mengembalikan id catatan yg disimpan dan nilainya ditampung dalam variable noteId

      const response = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  //=========================================================================================
  getNotesHandler() {
    const notes = this._service.getNotes(); //pemanggilan fungsi this._service.getNote() untuk dapatkan nilai
    return {
      status: "success",
      data: {
        notes,
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
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  //=========================================================================================
  putNoteByIdHandler(request,h) {
    try {
      const { id } = request.params; //untuk mendapatkan nilai id note yg dikirim client melalui path paramaeter
      this._service.editNoteById(id, request.payload); //pemanggilan fungsi this._service.editNoteById dengan parameter id dan request.payload yg akan menyediakan title,body, tags untuk objek note baru.

      return {
        status: "success",
        message: "Catatan berhasil diperbarui",
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(404);
      return response;
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
      const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler; //Ekspor nilai NotesHandler agar dapat digunakan di berkas Javascript lain
