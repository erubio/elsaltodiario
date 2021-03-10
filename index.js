const express = require("express");
const { ExpressAdapter } = require("ask-sdk-express-adapter");
const Alexa = require("ask-sdk-core");
const app = express();
const skillBuilder = Alexa.SkillBuilders.custom();
const handlers = require("./src/handlers");
const { loadAndRefreshFeedCache } = require("./src/speech");
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);
const PORT = process.env.ESD_PORT || 8080;

app.use(express.static("public"));

skillBuilder
  .addRequestHandlers(
    handlers.LaunchRequestHandler,
    handlers.IntentRequestHandler,
    handlers.SessionEndRequestHandler
  )
  .addErrorHandlers(handlers.ErrorHandler);

loadAndRefreshFeedCache();

app.post("/elsaltodiario", adapter.getRequestHandlers());

app.listen(PORT);
