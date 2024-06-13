'use strict';

/**
 * chickencow service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::chickencow.chickencow');
