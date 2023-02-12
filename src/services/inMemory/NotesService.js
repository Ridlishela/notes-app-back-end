const { nanoid } = require('nanoid'); //nano-sized unique string ID generator

class NotesService {
  //bertanggungjawab untuk mengelola resource notes yg disimpan pada memory (array)
  constructor() {
    this._notes = [];
  }

  //=========================================================================================
  addNote({ title, body, tags }) {
    //method addNote untuk menambahkan catatan dengan parameter onjek note title,body,tags
    const id = nanoid(16); //men-generate 16 char unique string
    const createdAt = new Date().toISOString(); //me-return tanggal dan waktu object saat ini(current date and time)
    const updatedAt = createdAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);
    //fungsi filter berdasarkan id catatan yg baru saja dibuat disimpan dalam variable isSuccess untuk memastikan newNote masuk kedalam this._notes
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new Error("Catatan gagal ditambahkan"); //jika false maka return error
    }
    return id; //jika true me-return id catatan baru
  }

  //=========================================================================================
  getNotes() {
    //method getNotes untuk membaca seluruh note yang disimpan
    return this._notes;
  }

  //=========================================================================================
  getNoteById(id) {
    //method getNoteById dengan parameter id untuk membaca note yang disimpan berdasarkan id yg diberikan
    const note = this._notes.filter((note) => note.id === id)[0]; //untuk mendapatkan note berdasarkan note id dengan fungsi filter, [0] me-return hasil pertama

    if (!note) {
      throw new Error("Catatan tidak ditemukan"); //jika false
    }
    return note; //jika true maka me-return note berdasarkan id
  }

  //=========================================================================================
  editNoteById(id, { title, body, tags }) {
    //method editNoteById untuk mengubah data catatan yang disimpan berdasarkan id yg diberikan
    //menerima dua parameter, id dan data note terbaru dalam bentuk objek(payload yg diambil sebagian field yaitu title,body,tags)
    const index = this._notes.findIndex((note) => note.id === id);
    //Mencari catatan dengan id tertentu berdasarkan index dengan fungsi findIndex, hasil disimpan dalam variabel index

    if (index === -1) {
      throw new Error("Gagal memperbarui catatan. Catatan tidak ditemukan");
    }

    const updatedAt = new Date().toISOString(); //Tanggal dan waktu catatan diubah(current time)

    //me-return perubahan catatan berdasarkan index id yg dituju dengan beberapa field
    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  //=========================================================================================
  deleteNoteById(id) {
    //method deleteNoteById untuk menghapuscatatan dari array this._notes berdasarkan id yg diberikan
    const index = this._notes.findIndex((note) => note.id === id);
    //Mencari catatan dengan id tertentu berdasarkan index dengan fungsi findIndex, hasil disimpan dalam variabel index

    if (index === -1) {
      throw new Error("Catatan gagal dihapus. Id tidak ditemukan"); //hika index false/tidak ditemukan me-return error
    }

    this._notes.splice(index, 1); //jika index ditemukan/true maka me-return fungsi slice/menghapus pada this._notes
  }
}

module.exports = NotesService; //ekspor nilai notesService gar dapat digunakan di berkas Javascript lain
