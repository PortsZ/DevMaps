const { Router }= require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.get('/search', SearchController.index);




// get(info), post(create info), put(edit info), delete(info) - data managing http methods
//query params: request.query (filters, paging, order)
//route params(put and delete):request.params (identify a feature on editing or removing)
//body(post or put): request.body (data for creation or deletion of a reg)
 

module.exports = routes;