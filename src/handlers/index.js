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

module.exports.StopRequestHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "StopIntent" ||
      handlerInput.requestEnvelope.request.type === "CancelIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(texts.byeText)
      .reprompt(texts.byeText)
      .withShouldEndSession(true)
      .withSimpleCard(texts.title, texts.byeText)
      .getResponse();
  },
};

module.exports.HelpRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "HelpIntent";
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(texts.helpText)
      .reprompt(texts.helpText)
      .withSimpleCard(texts.title, texts.helpTextCard)
      .getResponse();
  },
};

module.exports.IntentRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest";
  },
  handle(handlerInput) {
    let text;
    const section =
      handlerInput.requestEnvelope.request.intent.slots &&
      handlerInput.requestEnvelope.request.intent.slots.Sections &&
      handlerInput.requestEnvelope.request.intent.slots.Sections.value;
    switch (handlerInput.requestEnvelope.request.intent.name) {
      case "GetSection":
        text = feed.getSpeechBySection(section);
        break;

      default:
        text = feed.getSpeechBySection("general");
        break;
    }
    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(texts.sectionReprompt)
      .withSimpleCard(texts.title, texts.helpTextCard)
      .getResponse();
  },
};
