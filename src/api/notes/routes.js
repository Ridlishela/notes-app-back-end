//routes me-return array dalam fungsi karna agar handler akan digunakan sebagai parameter fungsi/tidak menggunakan fungsi-fungsi dan hasil handler secara langsung
//routes sebagai pure functionkarena tidak terikat objct secara langsung
//routes tidak perlu tahu darimana handler berasal
//standar penamaan fungsi handler dari kombinasi method-path(singular/plural berdasarkan data yg diproses)-parameter(bila ada)-(diakhiri)Handler

const routes = (handler) => [
  {
    method: "POST",
    path: "/notes",
    handler: handler.postNoteHandler, //postNoteHandler hanya menerima dan menyimpan "satu" note
  },
  {
    method: "GET",
    path: "/notes",
    handler: handler.getNotesHandler, //getNotesHandler mengembalikan banyak note.
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: handler.getNoteByIdHandler, //getNoteByIdHandler mengembalikan "satu" note
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: handler.putNoteByIdHandler, //putNoteByHandler hanya menerima dan mengubah "satu" note.
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: handler.deleteNoteByIdHandler, //deleteNoteByIdHandler hanya menerima dan menghapus "satu" note.
  },
];

module.exports = routes; //Ekspor nilai routes agar dapat digunakan di berkas Javascript lain
