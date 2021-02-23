const express = require("express");
const { ExpressAdapter } = require("ask-sdk-express-adapter");
const Alexa = require("ask-sdk-core");
const app = express();
const skillBuilder = Alexa.SkillBuilders.custom();
const handlers = require("./src/handlers");
const { loadAndRefreshFeedCache } = require("./src/feed");
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);
const PORT = 8080;

app.use(express.static("public"));

skillBuilder.addRequestHandlers(
  handlers.HelpRequestHandler,
  handlers.IntentRequestHandler,
  handlers.LaunchRequestHandler,
  handlers.SessionEndedRequestHandler,
  handlers.StopRequestHandler,
  handlers.ErrorHandler
);

loadAndRefreshFeedCache();

app.post("/elsaltodiario", adapter.getRequestHandlers());

app.listen(PORT);
