const texts = require("../../resources/texts");
const { getFeeds } = require("../feed");
const { BREAKING, SALMON, RADICAL } = require("../utils/constants");

const speechCache = {};
const CACHE_TIME = 10 * 60 * 1000; //10 minutes

const generateFeedSpeach = (processedEntries) => {
  const speachParts = processedEntries.map((procesedEntity, index) => {
    return `${procesedEntity.title}. ${texts.shortPause} ${
      procesedEntity.content
    } ${procesedEntity.category} ${texts.of} ${procesedEntity.author} ${
      index < 5 ? texts.transition : texts.longPause
    }`;
  });
  return speachParts.join("");
};

const cacheFeeds = (feeds) => {
  feeds.forEach((feed) => {
    switch (feed[0].type) {
      case BREAKING:
        speechCache.breaking = `${generateFeedSpeach(feed)} ${
          texts.breakingEnd
        } ${texts.otherSections}`;
        break;
      case SALMON:
        speechCache.breaking = `${generateFeedSpeach(feed)} ${
          texts.salmonEnd
        } ${texts.otherSections}`;
        break;
      case RADICAL:
        speechCache.radical = `${generateFeedSpeach(feed)} ${
          texts.radicalEnd
        } ${texts.otherSections}`;
        break;
    }
  });
};

module.exports.loadAndRefreshFeedCache = () => {
  getFeeds().then((feeds) => cacheFeeds(feeds));
  setInterval(() => getFeeds().then((feeds) => cacheFeeds(feeds)), CACHE_TIME);
};

module.exports.getSpeechBySection = (section) => {
  if (/actualidad/i.test(section)) {
    return speechCache.breaking;
  } else if (/(magazine|radical)/i.test(section)) {
    return speechCache.radical;
  } else if (/(salmon|contracorriente)/i.test(section)) {
    return speechCache.salmon;
  }
};
