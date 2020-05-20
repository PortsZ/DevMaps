const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(request, response){ //search for all devs on a 10km radius. Filter by tech
        const { latitude, longitude, techs } =request.query;
        
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, 
            },
            location: {
                $near : {
                  $geometry: {
                    type : 'Point',
                    coordinates: [longitude, latitude],
                  },
                  $maxDistance: 100000,
                },
            },
        });


        console.log(techsArray);
        return response.json({devs});
    }
}