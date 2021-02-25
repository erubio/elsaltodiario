const fetch = require("node-fetch");
const xml2js = require("xml2js");
const texts = require("../../resources/texts");
const urls = require("./urls");
const parser = new xml2js.Parser({ attrkey: "type" });
const feedCache = {};
const CACHE_TIME = 10 * 60 * 1000; //10 minutes


const processContent = (entryContent) => {
  return entryContent.replace(/<.*$/, "");
};

const processFeed = (data) => {
  const entries = data.feed.entry;
  return entries.map((entry) => {
    return {
      author: entry.author[0].name,
      category: entry.category[0].type.term,
      content: processContent(entry.content[0]._),
      title: entry.title[0],
    };
  });
};

const generateFeedSpeach = (processedEntries) => {
  const speachParts = processedEntries.map((procesedEntity, index) => {
    return `${procesedEntity.title}. ${texts.shortPause} ${procesedEntity.content} ${procesedEntity.category} ${texts.of} ${procesedEntity.author} ${index < 5 ? texts.transition : texts.longPause}`;
  });
  return speachParts.join('');
};

const getFeedData = (url, callback) => {
  fetch(url)
    .then((res) => res.text())
    .then((body) => {
      parser.parseString(body, function (error, result) {
        if (error === null) {
          callback(null, processFeed(result));
        } else {
          callback(error);
        }
      });
    })
    .catch((err) => {
      callback(err);
    });
};

const getFeed = (url, callback) => {
  getFeedData(url, (err, data) => {
    callback(err, !err ? generateFeedSpeach(data) : "");
  });
};

const getFeeds = () => {
  getFeed(urls.breaking, (err, speechText) => {
    if (!err) {
      feedCache.breaking = `${speechText} ${texts.breakingEnd} ${texts.otherSections}`;
    }
  });
  getFeed(urls.radical, (err, speechText) => {
    if (!err) {
      feedCache.radical = `${speechText} ${texts.radicalEnd} ${texts.otherSections}`;
    }
  });
  getFeed(urls.salmon, (err, speechText) => {
    if (!err) {
      feedCache.salmon = `${speechText} ${texts.salmonEnd} ${texts.otherSections}`;
    }
  });
};

module.exports.loadAndRefreshFeedCache = () => {
  getFeeds();
  setInterval(() => getFeeds(), CACHE_TIME);
};

module.exports.getSpeechBySection = (section) => {
  if (/actualidad/i.test(section)) {
    return feedCache.breaking;
  } else if (/(magazine|radical)/i.test(section)) {
    return feedCache.radical;
  } else if (/(salmon|contracorriente)/i.test(section)) {
    return feedCache.salmon;
  }
};
