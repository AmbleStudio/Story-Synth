module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        "/",
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      // maxConcurrentRoutes: 1,
    },
  },
};
