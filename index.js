const express = require("express");
const { ExpressAdapter } = require("ask-sdk-express-adapter");
const Alexa = require("ask-sdk-core");
const app = express();
const skillBuilder = Alexa.SkillBuilders.custom();
const handlers = require("./src/handlers");
const { initCache } = require ("./src/feed");
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);
const PORT = 8080;

app.use(express.static('public'));

skillBuilder.addRequestHandlers(
  handlers.LaunchRequestHandler,
  handlers.IntentRequestHandler,
);

initCache();

app.post("/elsaltodiario", adapter.getRequestHandlers());

app.listen(PORT);
