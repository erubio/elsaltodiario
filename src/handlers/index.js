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
        text = feed.getFeedSection(section);
        break;

      default:
        text = feed.getFeedSection("general");
        break;
    }
    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)//recuerda que puedes pedirme otras secciones como Actualidad...
      .withSimpleCard()
      .getResponse();
  },
};
