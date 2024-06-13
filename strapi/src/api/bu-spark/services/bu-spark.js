'use strict';

/**
 * bu-spark service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bu-spark.bu-spark');
