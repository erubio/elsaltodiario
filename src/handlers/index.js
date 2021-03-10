const texts = require("../../resources/texts");
const speech = require("../speech");

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
  if (section) {
    if (/(radical|magazine|actualidad|salmon|contracorriente)/.test(section)) {
      return handlerInput.responseBuilder
        .speak(speech.getSpeechBySection(section))
        .reprompt(texts.sectionReprompt)
        .withSimpleCard(texts.title, texts.helpTextCard)
        .getResponse();
    } else {
      return getHelpResponse(handlerInput);
    }
  } else {
    return getStopResponse(handlerInput);
  }
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
      default:
        return getHelpResponse(handlerInput);
    }
  },
};
module.exports.SessionEndRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    return getStopResponse(handlerInput);
  },
};
