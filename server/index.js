const JsonServer = require('json-server')

const server = JsonServer.create();
const router = JsonServer.router('db/db.json');
const middlewares = JsonServer.defaults([]);
server.use(middlewares);
server.use(JsonServer.bodyParser);
server.use(JsonServer.rewriter({
    '/api/*': '/$1'
}));
server.use((req, res, next) => {
    setTimeout(() => next(), 750);
})
server.use(router);
server.listen(3001, () => console.log('Server is running'));
