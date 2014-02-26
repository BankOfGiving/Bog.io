var _base = require('./bog.data.repositories._base');
var EventTypeModel = require('../models/bog.data.models.event.type');

EventTypeRepository = function () {

    var All = function (callback) {
        // localization root
        var loc_root = 'data.lookup.event_types.';

        var typesCollection = [];
        var foodType = new EventTypeModel();
        foodType.value = 'food';
        foodType.key = loc_root + 'food';
        foodType.label = 'Food Distribution';
        foodType.description = '';
        typesCollection.push(foodType);
        var jobType = new EventTypeModel();
        jobType.value = 'career_assist';
        jobType.key = loc_root + 'career_assist';
        jobType.label = 'Career Assistance';
        jobType.description = '';
        typesCollection.push(jobType);
        var healthType = new EventTypeModel();
        healthType.value = 'health';
        healthType.key = loc_root + 'health';
        healthType.label = 'Health & Wellness';
        healthType.description = '';
        typesCollection.push(healthType);
        var trainingType = new EventTypeModel();
        trainingType.value = 'training';
        trainingType.key = loc_root + 'training';
        trainingType.label = 'Training & Education';
        trainingType.description = '';
        typesCollection.push(trainingType);
        var otherType = new EventTypeModel();
        otherType.value = 'other';
        otherType.key = loc_root + 'other';
        otherType.label = 'Other';
        otherType.description = '';
        typesCollection.push(otherType);

        callback(null, typesCollection);
    };

    return {
        all: All
    };
};

EventTypeRepository.prototype = new _base();

module.exports = EventTypeRepository;