'use strict';

/**
 * candidate service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::candidate.candidate');
