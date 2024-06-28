'use strict';

/**
 * ballot-initiative service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ballot-initiative.ballot-initiative');
