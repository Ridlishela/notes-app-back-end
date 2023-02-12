const Hapi = require("@hapi/hapi");
const notes = require('./api/notes')//import notes plugin
const NotesService = require('./services/inMemory/NotesService')

const init = async () => {
  const notesService = new NotesService() //Instance dari NotesService ditampung dalam variabel notesService

  const server = Hapi.server({
    port: 5500,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,//mendaftarkan plugin notes dengan option service
    options: {
      service: notesService,
    }
  })

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
