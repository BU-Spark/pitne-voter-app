
      var require = await (async () => {
        var { createRequire } = await import("node:module");
        return createRequire(import.meta.url);
      })();
    
import "../esm-chunks/chunk-OEQOKJGE.js";

// src/run/revalidate.ts
var nextResponseProxy = (res, requestContext) => {
  return new Proxy(res, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(target, key) {
      const originalValue = target[key];
      if (key === "revalidate") {
        return async function newRevalidate(...args) {
          requestContext.didPagesRouterOnDemandRevalidate = true;
          return originalValue?.apply(target, args);
        };
      }
      return originalValue;
    }
  });
};
export {
  nextResponseProxy
};
