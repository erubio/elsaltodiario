const fetch = require("node-fetch");
const xml2js = require("xml2js");
const texts = require("../../resources/texts");
const { BREAKING, RADICAL, SALMON } = require("../utils/constants");
const urls = require("./urls");
const parser = new xml2js.Parser({ attrkey: "type" });

const processContent = (entryContent) => {
  return entryContent.replace(/<.*$/, "");
};

const processFeed = (data, type) => {
  const entries = data.feed.entry;
  return entries.map((entry) => {
    return {
      author: entry.author ? entry.author[0].name : texts.unknownAuthor,
      category: entry.category[0].type.term,
      content: processContent(entry.content[0]._),
      title: entry.title[0],
      type,
    };
  });
};

const getFeedData = (url, type) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.text())
      .then((body) => {
        parser.parseString(body, function (error, result) {
          if (error) {
            reject(error);
          } else {
            resolve(processFeed(result, type));
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getFeed = (url, type) => {
  return new Promise((resolve, reject) => {
    getFeedData(url, type)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

module.exports.getFeeds = () => {
  const promises = [
    getFeed(urls.breaking, BREAKING),
    getFeed(urls.radical, RADICAL),
    getFeed(urls.salmon, SALMON),
  ];
  return new Promise((resolve, reject) => {
    Promise.all(promises)
      .then((values) => resolve(values))
      .catch(() => reject());
  });
};
