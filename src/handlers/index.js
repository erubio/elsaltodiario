const texts = require("../../resources/texts");
const feed = require("../feed");

module.exports.LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(texts.welcomeText)
      .reprompt(texts.welcomeText)
      .withSimpleCard(texts.title, texts.welcomeText)
      .getResponse();
  },
};

module.exports.ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(texts.errorText)
      .reprompt(texts.errorText)
      .getResponse();
  },
};

const getSectionResponse = (handlerInput) => {
  const section =
    handlerInput.requestEnvelope.request.intent.slots &&
    handlerInput.requestEnvelope.request.intent.slots.Sections &&
    handlerInput.requestEnvelope.request.intent.slots.Sections.value;
  return handlerInput.responseBuilder
    .speak(feed.getSpeechBySection(section || "breaking"))
    .reprompt(texts.sectionReprompt)
    .withSimpleCard(texts.title, texts.helpTextCard)
    .getResponse();
};

const getStopResponse = (handlerInput) =>
  handlerInput.responseBuilder
    .speak(texts.byeText)
    .withShouldEndSession(true)
    .getResponse();

const getHelpResponse = (handlerInput) =>
  handlerInput.responseBuilder
    .speak(texts.sectionReprompt)
    .reprompt(texts.sectionReprompt)
    .withSimpleCard(texts.title, texts.helpTextCard)
    .getResponse();

module.exports.IntentRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest";
  },
  handle(handlerInput) {
    switch (handlerInput.requestEnvelope.request.intent.name) {
      case "GetSection":
        return getSectionResponse(handlerInput);
      case "AMAZON.CancelIntent":
      case "AMAZON.StopIntent":
        return getStopResponse(handlerInput);
      case "SessionEndedRequest":
        return handlerInput.responseBuilder.getResponse();
      default:
        return getHelpResponse(handlerInput);
    }
  },
};
