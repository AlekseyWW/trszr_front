const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const withReactSvg = require("next-react-svg");
const path = require("path");
module.exports = (phase) =>
  withReactSvg({
    env: {
      api:
        PHASE_PRODUCTION_BUILD === phase
          ? "http://trszr.ru/api"
          : "http://localhost:8000",
      prdod: phase,
    },
    include: path.resolve(__dirname, "assets"),
    webpack(config, options) {
      return config;
    },
  });