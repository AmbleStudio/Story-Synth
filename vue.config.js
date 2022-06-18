module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/Games/Green-Hollow',
        '/Games/Green-Hollow-Test',
        '/Games/Arriba-Town/',
        '/Games/Umberdred-Institute',
        // '/Gallery/',
        // '/Shuffled/1N5eeyKTVWo5QeGcUV_zYtwtR0DikJCcvcj6w69UkC1w/',
        // '/Shuffled/1N2N8URSswhmxLalPOkzi5d4kdeFiGrsobEmM_ojk0ow/',
        // '/Timed/1yq2AKwaYL1uZrCnEfwgSpC0SPkQAZqnCdjNxH_pm018/',
        // '/Monster/1NgNHy7Qe1R8KhGR2cOmJwL2aOl2tocBemW2HIAKjrvI/',
        // '/SlotMachine/1t5LRUQG9DzMJ3kd8E9DZV7_EbE8J5-Gqhz7TWQ4Y-uU/',
        // '/Phases/1HataDfV2lrA4hfzmLgDjXH09dEMLQV6OT10tVH9G52A/',
        // '/SecretCards/1JwMF02DSxNKtjHp6u-wyznSs-iEG_3DpOobgc17I16o/',
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}