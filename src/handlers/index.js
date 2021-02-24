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

module.exports.IntentRequestHandler = {
  canHandle(handlerInput) {
    console.log("IntentHAndler: ", handlerInput.requestEnvelope.request.type);
    return handlerInput.requestEnvelope.request.type === "IntentRequest";
  },
  handle(handlerInput) {
    const section =
      handlerInput.requestEnvelope.request.intent.slots &&
      handlerInput.requestEnvelope.request.intent.slots.Sections &&
      handlerInput.requestEnvelope.request.intent.slots.Sections.value;
    switch (handlerInput.requestEnvelope.request.intent.name) {
      case "GetSection":
        return handlerInput.responseBuilder
          .speak(feed.getSpeechBySection(section || "breaking"))
          .reprompt(texts.sectionReprompt)
          .withSimpleCard(texts.title, texts.helpTextCard)
          .getResponse();
      case "AMAZON.CancelIntent":
      case "AMAZON.StopIntent":
        return handlerInput.responseBuilder
          .speak(texts.byeText)
          .withShouldEndSession(true)
          .getResponse();
      case "SessionEndedRequest":
        return handlerInput.responseBuilder.getResponse();
      default:
        return helpRequestHandler(handlerInput);
    }
  },
};
