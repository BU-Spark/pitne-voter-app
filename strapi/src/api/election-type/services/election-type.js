'use strict';

/**
 * election-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::election-type.election-type');
