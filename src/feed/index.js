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
  const speachParts = processedEntries.map((procesedEntity) => {
    return `${procesedEntity.title} ${texts.shortPause} ${procesedEntity.content} ${procesedEntity.category} ${texts.of} ${procesedEntity.author}`;
  });
  return speachParts.join(texts.longPause);
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
  getFeed(urls.general, (err, data) => {
    if (!err) {
      feedCache.general = data;
    }
  });
  getFeed(urls.breaking, (err, data) => {
    if (!err) {
      feedCache.breaking = data;
    }
  });
  getFeed(urls.radical, (err, data) => {
    if (!err) {
      feedCache.radical = data;
    }
  });
  getFeed(urls.salmon, (err, data) => {
    if (!err) {
      feedCache.salmon = data;
    }
  });
};

module.exports.initCache = () => {
  getFeeds();
  setInterval(() => getFeeds(), CACHE_TIME);
};

module.exports.getFeedSection = (section) => {
  if (/general/i.test(section)) {
    return feedCache.general;
  } else if (/actualidad/i.test(section)) {
    return feedCache.breaking;
  } else if (/(magazine|radical)/i.test(section)) {
    return feedCache.radical;
  } else if (/(salmon|contracorriente)/i.test(section)) {
    return feedCache.salmon;
  }
};
