var detail = function () {

    var model = {
        entity: 'donation', //ObjectId
        id: '', //ObjectId
        title: '', //{ type: String }
        description: '', //{ type: String }
        type: '', //{ type: String }
        beginAt: '', //{ type: Date},
        endAt: '', // { type: Date},
        status: '', // { type: String, default: 'private', enum: ['private', 'unlisted', 'public', 'deleted'] },
        tags: [], // [Tag.schema],

        // Location Information
        locations_virtual: [], /*[
         {
         name: {type: String },
         uri: {type: String },
         description: {type: String }
         }
         ],*/
        locations_physical: [], /*[
         {
         primary: { type: Boolean, Default: false },
         street: '', //{ type: String }
         city: '', //{ type: String }
         state: '', //{ type: String }
         postal_code: '', //{ type: String }
         country: '', //{ type: String }
         latitude: '', //{ type: String }
         longitude: '', //{ type: String }

         geocoding_result: {},
         geospacial_index: {
         type: { type: String, Default: "Point" },
         coordinates: [] // longitude, latitude
         },
         validated: { type: Boolean, Default: false}
         }
         ],*/
        contacts: [], // [Contact.schema],
        votes: {}, /*{
         up: { type: Number, Default: 0},
         down: { type: Number, Default: 0},
         detail: [Vote.schema]
         },*/
        comments: {} /*{
         total: { type: Number, Default: 0},
         latest: { type: Date },
         detail: [Comment.schema]
         }*/
    };

    var fromRaw = function (raw) {
        model.id = raw._id;
        model.title = raw.title;
        model.description = raw.description;
        model.type = raw.type;
        model.beginAt = raw.beginAt;
        model.endAt = raw.endAt;
        model.status = raw.status;
        return model;
    };

    return{
        fromRaw: fromRaw
    };
};

module.exports = detail;