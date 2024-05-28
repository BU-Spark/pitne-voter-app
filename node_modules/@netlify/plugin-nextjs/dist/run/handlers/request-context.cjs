"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/run/handlers/request-context.cts
var request_context_exports = {};
__export(request_context_exports, {
  createRequestContext: () => createRequestContext,
  getRequestContext: () => getRequestContext,
  runWithRequestContext: () => runWithRequestContext
});
module.exports = __toCommonJS(request_context_exports);
var import_node_async_hooks = require("node:async_hooks");
function createRequestContext(debug = false) {
  const backgroundWorkPromises = [];
  return {
    debug,
    trackBackgroundWork: (promise) => {
      backgroundWorkPromises.push(promise);
    },
    get backgroundWorkPromise() {
      return Promise.allSettled(backgroundWorkPromises);
    }
  };
}
var REQUEST_CONTEXT_GLOBAL_KEY = Symbol.for("nf-request-context-async-local-storage");
var requestContextAsyncLocalStorage;
function getRequestContextAsyncLocalStorage() {
  if (requestContextAsyncLocalStorage) {
    return requestContextAsyncLocalStorage;
  }
  const extendedGlobalThis = globalThis;
  if (extendedGlobalThis[REQUEST_CONTEXT_GLOBAL_KEY]) {
    return extendedGlobalThis[REQUEST_CONTEXT_GLOBAL_KEY];
  }
  const storage = new import_node_async_hooks.AsyncLocalStorage();
  requestContextAsyncLocalStorage = storage;
  extendedGlobalThis[REQUEST_CONTEXT_GLOBAL_KEY] = storage;
  return storage;
}
var getRequestContext = () => getRequestContextAsyncLocalStorage().getStore();
function runWithRequestContext(requestContext, fn) {
  return getRequestContextAsyncLocalStorage().run(requestContext, fn);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRequestContext,
  getRequestContext,
  runWithRequestContext
});
