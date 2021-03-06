(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["api"] = factory();
	else
		root["api"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'local') {
  __webpack_require__(2).config();
}

var ArticleSchema = new _mongoose2.default.Schema({
  id: _mongoose2.default.Schema.Types.ObjectId,
  summary_title: String,
  summary_points: Array,
  site_name: String,
  site_url: String,
  article_url: String,
  original_text: String,
  original_header: String,
  summarized: Boolean,
  project: String,
  date_written: String
});

var connection = _mongoose2.default.createConnection(process.env.MONGO_URL);
var Article = connection.model('Article', ArticleSchema);

exports.default = Article;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose-float");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

var _Agolo = __webpack_require__(18);

var _Agolo2 = _interopRequireDefault(_Agolo);

var _cheerio = __webpack_require__(19);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _colors = __webpack_require__(8);

var _colors2 = _interopRequireDefault(_colors);

var _momentTimezone = __webpack_require__(0);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _underscore = __webpack_require__(20);

var _puppeteer = __webpack_require__(21);

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _article = __webpack_require__(3);

var _article2 = _interopRequireDefault(_article);

var _constants = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Types for Flow


// Similar to agolo.js, TOOD: Refactor to type.js file in constant
function crawler() {
  var _this = this;

  this.articles = {
    /**
     * @description Gets all articleUrls from a open news web page
     */
    getUrls: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, articleListSelector) {
        var browser, page, html, $, articles, _articleUrls, i;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                console.log(_colors2.default.yellow('> [Crawling] for article Urls ' + url));
                // const browser = await puppeteer.launch({ args: ['--no-sandbox, --disable-setuid-sandbox'], headless: true, ignoreHTTPSErrors: true });
                _context.next = 4;
                return _puppeteer2.default.launch({ headless: true });

              case 4:
                browser = _context.sent;
                _context.next = 7;
                return browser.newPage();

              case 7:
                page = _context.sent;
                _context.next = 10;
                return page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 60000 });

              case 10:
                _context.next = 12;
                return page.content();

              case 12:
                html = _context.sent;
                $ = _cheerio2.default.load(html);
                articles = $(articleListSelector);
                _articleUrls = [];

                // Push all articles into array

                for (i = 0; i < articles.length; i++) {
                  _articleUrls.push('' + articles[i].attribs.href);
                }

                // Clean articles to remove duplicate links if any
                _articleUrls = (0, _underscore.uniq)(_articleUrls);
                console.log(_colors2.default.green.bold('> Found ' + _articleUrls.length + ' unique article links'));
                _context.next = 21;
                return browser.close();

              case 21:
                return _context.abrupt('return', _articleUrls);

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](0);

                console.log('> Error in crawling for article urls: ', _context.t0.message);

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 24]]);
      }));

      function getUrls(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getUrls;
    }(),
    /**
     * @description Gets article content from an article web page
     */
    getContent: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(crawlParams) {
        var articleUrls, articlePrependUrl, articleHeaderSelector, articleDateSelector, articleTextSelector, hasWriter, hasHeader, hasDate, siteArticles, browser, i, articleUrl, page, html, $, articleHeader, articleWriter, articleDate, articleText, article;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                articleUrls = crawlParams.articleUrls, articlePrependUrl = crawlParams.articlePrependUrl, articleHeaderSelector = crawlParams.articleHeaderSelector, articleDateSelector = crawlParams.articleDateSelector, articleTextSelector = crawlParams.articleTextSelector, hasWriter = crawlParams.hasWriter, hasHeader = crawlParams.hasHeader, hasDate = crawlParams.hasDate;
                siteArticles = [];
                _context2.next = 4;
                return _puppeteer2.default.launch({ headless: true });

              case 4:
                browser = _context2.sent;
                i = 0;

              case 6:
                if (!(i < articleUrls.length)) {
                  _context2.next = 33;
                  break;
                }

                _context2.prev = 7;
                articleUrl = articleUrls[i];

                console.log(_colors2.default.bold.green('> [Scraping] article url for content: ' + articlePrependUrl + articleUrl));
                // const browser = await puppeteer.launch({ args: ['--no-sandbox, --disable-setuid-sandbox'], headless: true, ignoreHTTPSErrors: true });
                _context2.next = 12;
                return browser.newPage();

              case 12:
                page = _context2.sent;
                _context2.next = 15;
                return page.goto('' + articlePrependUrl + articleUrl, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 60000 });

              case 15:
                _context2.next = 17;
                return page.content();

              case 17:
                html = _context2.sent;
                $ = _cheerio2.default.load(html);
                articleHeader = hasHeader ? $(articleHeaderSelector).text() : '';
                articleWriter = hasWriter ? $(articleHeaderSelector).text() : '';
                articleDate = hasDate ? $(articleDateSelector).text() : '';
                articleText = $(articleTextSelector).text();
                article = {
                  date: articleDate,
                  header: articleHeader,
                  text: articleText,
                  writer: articleWriter,
                  url: '' + articlePrependUrl + articleUrl
                  // TODO: Do not push all article that are written more than 24 hours ago.
                };
                siteArticles.push(article);
                _context2.next = 30;
                break;

              case 27:
                _context2.prev = 27;
                _context2.t0 = _context2['catch'](7);

                console.log('Error scraping url: ' + articleUrls[i] + ': \n ' + _context2.t0.message);

              case 30:
                i++;
                _context2.next = 6;
                break;

              case 33:
                _context2.next = 35;
                return browser.close();

              case 35:
                return _context2.abrupt('return', siteArticles);

              case 36:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this, [[7, 27]]);
      }));

      function getContent(_x3) {
        return _ref2.apply(this, arguments);
      }

      return getContent;
    }(),
    /**
     * @description Crawl all article urls from a list of company sites and subsequently crawl all their contents
     */
    getAll: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(companies) {
        var allSitesArticles, i, company, _articleUrls2, _siteArticles, siteArticlesWithInfo;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                allSitesArticles = [];
                i = 0;

              case 2:
                if (!(i < companies.length)) {
                  _context3.next = 21;
                  break;
                }

                _context3.prev = 3;
                company = companies[i];
                _context3.next = 7;
                return _this.articles.getUrls(company.url, company.articleListSelector);

              case 7:
                _articleUrls2 = _context3.sent;
                _context3.next = 10;
                return _this.articles.getContent({
                  articleUrls: _articleUrls2,
                  articlePrependUrl: company.articlePrependUrl,
                  articleHeaderSelector: company.articleHeaderSelector,
                  articleDateSelector: company.articleDateSelector,
                  articleTextSelector: company.articleTextSelector,
                  hasWriter: company.hasWriter,
                  hasHeader: company.hasHeader,
                  hasDate: company.hasDate
                });

              case 10:
                _siteArticles = _context3.sent;
                siteArticlesWithInfo = {
                  siteArticles: _siteArticles,
                  name: company.name,
                  url: company.url
                };

                allSitesArticles.push(siteArticlesWithInfo);
                _context3.next = 18;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3['catch'](3);

                console.log('> Error in getAll: ', _context3.t0.message);

              case 18:
                i++;
                _context3.next = 2;
                break;

              case 21:
                return _context3.abrupt('return', allSitesArticles);

              case 22:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this, [[3, 15]]);
      }));

      function getAll(_x4) {
        return _ref3.apply(this, arguments);
      }

      return getAll;
    }(),
    /**
     * @description save each article from each
     */
    saveAndSummarizeToDb: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var allSitesArticles, i, siteArticlesWithInfo, _name, _url, _siteArticles2, j;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _this.articles.getAll(_constants.COMPANY_SITES);

              case 2:
                allSitesArticles = _context5.sent;
                i = 0;

              case 4:
                if (!(i < allSitesArticles.length)) {
                  _context5.next = 22;
                  break;
                }

                siteArticlesWithInfo = allSitesArticles[i];
                _name = siteArticlesWithInfo.name, _url = siteArticlesWithInfo.url, _siteArticles2 = siteArticlesWithInfo.siteArticles;
                j = 0;

              case 8:
                if (!(j < _siteArticles2.length)) {
                  _context5.next = 19;
                  break;
                }

                _context5.prev = 9;
                return _context5.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                  var article, originalText, originalHeader, options, _ref5, summary_title, summary_points, summarizedArticle, query;

                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          article = _siteArticles2[j];
                          originalText = article.text;
                          originalHeader = article.header;
                          options = {
                            title: article.header,
                            text: article.text,
                            summary_length: 10,
                            coref: false,
                            sort_by_salience: true,
                            include_all_sentences: false
                          };
                          _context4.next = 6;
                          return _Agolo2.default.summarizer.summarize(options);

                        case 6:
                          _ref5 = _context4.sent;
                          summary_title = _ref5.summary_title;
                          summary_points = _ref5.summary_points;
                          summarizedArticle = {
                            summary_title: summary_title,
                            summary_points: summary_points,
                            site_name: _name,
                            site_url: _url,
                            article_url: article.url,
                            original_text: originalText,
                            original_header: originalHeader,
                            summarized: true,
                            project: 'IB-III',
                            date_written: article.date
                          };
                          query = { article_url: summarizedArticle.article_url };
                          // Only save articles of unique article urls

                          _context4.next = 13;
                          return _article2.default.findOneAndUpdate(query, summarizedArticle, { upsert: true }, function (error) {
                            if (error) {
                              console.log('> Error saving article:', error.message);
                            }
                            console.log(_colors2.default.bold.cyan('> [Saving] Summarized Article to Db: ' + summarizedArticle.article_url));
                          });

                        case 13:
                        case 'end':
                          return _context4.stop();
                      }
                    }
                  }, _callee4, _this);
                })(), 't0', 11);

              case 11:
                _context5.next = 16;
                break;

              case 13:
                _context5.prev = 13;
                _context5.t1 = _context5['catch'](9);

                console.log('Error in summarizing article:: \n' + _context5.t1.message);

              case 16:
                j++;
                _context5.next = 8;
                break;

              case 19:
                i++;
                _context5.next = 4;
                break;

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this, [[9, 13]]);
      }));

      function saveAndSummarizeToDb() {
        return _ref4.apply(this, arguments);
      }

      return saveAndSummarizeToDb;
    }(),
    getPage: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var browser, page, url, html;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _puppeteer2.default.launch({ headless: true });

              case 2:
                browser = _context6.sent;
                _context6.next = 5;
                return browser.newPage();

              case 5:
                page = _context6.sent;
                url = 'http://localhost:3000/';
                _context6.next = 9;
                return page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 60000 });

              case 9:
                _context6.next = 11;
                return page.content();

              case 11:
                html = _context6.sent;
                _context6.next = 14;
                return browser.close;

              case 14:
                return _context6.abrupt('return', html);

              case 15:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, _this);
      }));

      function getPage() {
        return _ref6.apply(this, arguments);
      }

      return getPage;
    }()
  };
}

var Crawler = new crawler();
exports.default = Crawler;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

var _articleRouter = __webpack_require__(11);

var _articleRouter2 = _interopRequireDefault(_articleRouter);

var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _http = __webpack_require__(23);

var _http2 = _interopRequireDefault(_http);

var _connectToMongo = __webpack_require__(24);

var _connectToMongo2 = _interopRequireDefault(_connectToMongo);

var _cron = __webpack_require__(25);

var _cron2 = _interopRequireDefault(_cron);

var _websiteScraper = __webpack_require__(27);

var _websiteScraper2 = _interopRequireDefault(_websiteScraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (process.env.NODE_ENV === 'local') {
  __webpack_require__(2).config();
}

var app = (0, _express2.default)();

/* Creates server and web socket */
var server = _http2.default.createServer(app);

/* Set up apps with routers and their root URLs here */
app.use('/article', _articleRouter2.default);

/* Initialize server locally */
server.listen(process.env.PORT, function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (error) {
              console.log('Error initializing server: ' + error);
            }
            if (process.env.NODE_ENV === 'local') {
              console.log('> Server is ready on http://localhost:' + process.env.PORT);
            } else {
              console.log('> Server is ready!');
            }
            // await connectToMongo();
            // Run cronjob to update DB
            // initCronJob();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

// To keep Heroku App alive
setInterval(function () {
  https.get("https://moody-api-poc.herokuapp.com/");
}, 300000); // every 5 minutes (300000)

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _article = __webpack_require__(12);

var _article2 = _interopRequireDefault(_article);

var _express = __webpack_require__(5);

var _express2 = _interopRequireDefault(_express);

var _crawler = __webpack_require__(6);

var _crawler2 = _interopRequireDefault(_crawler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// For test

var articleRouter = _express2.default.Router();

/* Fetches the summarized articles in the last 24/7 given a project */
articleRouter.get('/project/:projectId', function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var projectId, articles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            projectId = req.params.projectId;
            _context.next = 4;
            return _article2.default.projects.get(projectId);

          case 4:
            articles = _context.sent;

            res.set({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': '*'
            });
            res.status(200).send(articles);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](0);

            res.status(500).send({ error: _context.t0.message });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 9]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

articleRouter.get('/crawl/:projectId', function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var results;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _crawler2.default.articles.saveAndSummarizeToDb();

          case 3:
            results = _context2.sent;

            res.status(200).send('Crawl done!');
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            res.status(500).send({ error: _context2.t0.message });

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

articleRouter.get('/page/get', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var page;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _crawler2.default.articles.getPage();

          case 3:
            page = _context3.sent;

            res.set({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
              'Access-Control-Allow-Origin': '*'
            });
            res.status(200).send(page);
            res.status(200).send('Crawl done!');
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](0);

            res.status(500).send({ error: _context3.t0.message });

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

exports.default = articleRouter;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentTimezone = __webpack_require__(0);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _article2 = __webpack_require__(3);

var _article3 = _interopRequireDefault(_article2);

var _agoloArticle = __webpack_require__(13);

var _agoloArticle2 = _interopRequireDefault(_agoloArticle);

var _cluster = __webpack_require__(14);

var _cluster2 = _interopRequireDefault(_cluster);

var _feed = __webpack_require__(15);

var _feed2 = _interopRequireDefault(_feed);

var _trimCluster = __webpack_require__(16);

var _trimCluster2 = _interopRequireDefault(_trimCluster);

var _trimArticle = __webpack_require__(17);

var _trimArticle2 = _interopRequireDefault(_trimArticle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Mapping of Feed Ids to project
var projectToFeedId = {
  'IR-I': '5b2b989ca71f7b2ffc7401ac', // Production feed
  'IR-II': '5b2acbbb2d25a39cf00935ca', // Production feed
  'IR-III': '5b2acbec2d25a39cf00935cb', // Production feed
  'IB-I': '5b2ba0dda71f7b2ffc7401b0', // Production feed
  'IB-II': '5b2ba12ba71f7b2ffc7401b2', // Production feed
  'IB-III-feed': '5b2ba2672d25a39cf00935d1' // Production feed
};

var DUMP = [{
  articles: [{
    articleId: 'aasdma',
    site: 'Bloombergview',
    text: 'Donald Trump, in an interview...',
    title: 'Nixon failed',
    url: 'www.google.com',
    publishedAt: 'June 19 2018'
  }, {
    articleId: 'aasdma',
    site: 'Bloombergview',
    text: 'Donald Trump, in an interview...',
    title: 'Nixon failed',
    url: 'www.google.com',
    publishedAt: 'June 18 2018'
  }],
  cluster: {
    clusterId: 'a;sdmas;d',
    points: ['Hello', 'world'],
    summary_title: 'Donald Trump!',
    score: 5.00,
    date_written: 'June 20, 2018'
  }
}];

var SCRAPED_PROJECTS = ['IB-III'];

function article() {
  var _this = this;

  this.projects = {
    getAll: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      function getAll() {
        return _ref.apply(this, arguments);
      }

      return getAll;
    }(),
    get: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projectId) {
        var articles, feedId, startDate, clusters, fullClusters, i, _articles, cluster, articleIds, j, articleId, _article, trimmedCluster, fullCluster;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('> Fetching articles for project:', projectId);
                // Check if project is manually scraped. If it is, use main DB

                if (!SCRAPED_PROJECTS.includes(projectId)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 4;
                return _article3.default.find({ project: projectId });

              case 4:
                articles = _context2.sent;
                return _context2.abrupt('return', articles);

              case 6:

                // If project is a feed on Agolo webapp, use Agolo DB to get cluster
                feedId = projectToFeedId[projectId];

                if (feedId) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt('return', []);

              case 9:
                console.log('> Project ' + projectId + ' belongs to Feed: "' + feedId + '"');
                startDate = new Date();

                startDate.setHours(0, 0, 0, 0);
                startDate.setDate(startDate.getDate() - 1);
                _context2.next = 15;
                return _cluster2.default.find({
                  feed_id: feedId,
                  'timestamps.article_timestamps.first_article_published': { $gte: startDate, $exists: true }, // Only get clusters joined last 48 hours
                  // 'timestamps.article_timestamps.latest_article_published': { $gte: startDate, $exists: true },
                  summary: { $exists: true, $ne: null, $not: { $size: 0 } },
                  articles: { $exists: true, $ne: null, $not: { $size: 0 } },
                  deleted: { $ne: true }
                }, 'title summary articles score _id last_updated_at');

              case 15:
                clusters = _context2.sent;
                fullClusters = [];

                console.log('Found ' + clusters.length + ' for project ' + projectId);
                // Naively look for all articles belonging to a cluster, an improvement would be to query for all articles matching the feed and then matching it with the cluster of interest
                i = 0;

              case 19:
                if (!(i < clusters.length)) {
                  _context2.next = 39;
                  break;
                }

                _articles = [];
                cluster = clusters[i];
                articleIds = cluster.articles;
                j = 0;

              case 24:
                if (!(j < articleIds.length)) {
                  _context2.next = 33;
                  break;
                }

                articleId = articleIds[j];
                _context2.next = 28;
                return _agoloArticle2.default.findOne({ _id: articleId }, 'url text sources title _id published_at');

              case 28:
                _article = _context2.sent;

                // Save articles that make up the cluster
                _articles.push((0, _trimArticle2.default)(_article));

              case 30:
                j++;
                _context2.next = 24;
                break;

              case 33:
                // Do not pass down fields we are not interested in
                trimmedCluster = (0, _trimCluster2.default)(cluster);
                fullCluster = {
                  articles: _articles,
                  cluster: trimmedCluster
                };

                fullClusters.push(fullCluster);

              case 36:
                i++;
                _context2.next = 19;
                break;

              case 39:
                return _context2.abrupt('return', fullClusters);

              case 40:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      function get(_x) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()
  };
}

var ArticleService = new article();
exports.default = ArticleService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFloat = __webpack_require__(4);

var _mongooseFloat2 = _interopRequireDefault(_mongooseFloat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Float = _mongooseFloat2.default.loadType(_mongoose2.default); // Work around package since Mongoose do not natively support Float

if (process.env.NODE_ENV === 'local') {
  __webpack_require__(2).config();
}

var ArticleSchema = new _mongoose2.default.Schema({
  _id: _mongoose2.default.Schema.Types.ObjectId,
  original_id: String,
  text: String,
  sources: Array,
  published_at: Date,
  retrieved_at: Date,
  title: String,
  url: String,
  feed_ids: Array
});

var connection = _mongoose2.default.createConnection(process.env.AGOLO_MONGO_URL);
var AgoloArticle = connection.model('articles', ArticleSchema);

exports.default = AgoloArticle;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseFloat = __webpack_require__(4);

var _mongooseFloat2 = _interopRequireDefault(_mongooseFloat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Float = _mongooseFloat2.default.loadType(_mongoose2.default); // Work around package since Mongoose do not natively support Float

if (process.env.NODE_ENV === 'local') {
  __webpack_require__(2).config();
}

var ClusterSchema = new _mongoose2.default.Schema({
  _id: _mongoose2.default.Schema.Types.ObjectId,
  _text_index: Array,
  _title_index: Array,
  active: Number,
  articles: Array,
  created_at: Date,
  dates: Array,
  feed_id: String,
  last_updated_at: Date,
  photos: Array,
  score: Float,
  scores: Array,
  size: Number,
  sources: Array,
  summary: Array,
  summary_uptodate: Boolean,
  timestamps: Object,
  title: String
});

var connection = _mongoose2.default.createConnection(process.env.AGOLO_MONGO_URL);
var Cluster = connection.model('clusters', ClusterSchema);

exports.default = Cluster;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.env.NODE_ENV === 'local') {
  __webpack_require__(2).config();
}

var FeedSchema = new _mongoose2.default.Schema({
  _id: String,
  name: String,
  paused: Boolean,
  deleted: Boolean,
  created_at: Date,
  start_time: Date,
  end_time: Date,
  query: String,
  suggestedKeywords: Array,
  user_id: String,
  users: Array,
  selectedSources: Array,
  sources: Object,
  kafka_partition_id: Number,
  percolatorQuery: Object,
  historical_query: Object
});

var connection = _mongoose2.default.createConnection(process.env.AGOLO_MONGO_URL);
var Feed = connection.model('feeds', FeedSchema);

exports.default = Feed;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentTimezone = __webpack_require__(0);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trimCluster = function trimCluster(cluster) {
  // Parse sentences
  var summaries = cluster.summary;
  var points = [];
  for (var i = 0; i < summaries.length; i++) {
    var summary = summaries[i];
    for (var j = 0; j < summary.sentences.length; j++) {
      points.push(summary.sentences[j]);
    }
  }
  return {
    clusterId: cluster._id,
    points: points,
    summary_title: cluster.title,
    score: cluster.score,
    date_written: (0, _momentTimezone2.default)().tz('America/New_York').format('LL') // June 20, 2018
  };
};

exports.default = trimCluster;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentTimezone = __webpack_require__(0);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trimArticle = function trimArticle(article) {
  return {
    articleId: article._id,
    site: article.sources[0].name,
    text: article.text,
    title: article.title,
    url: article.url,
    publishedAt: (0, _momentTimezone2.default)(article.published_at).tz('America/New_York').format('LL') // June 20, 2018
  };
};

exports.default = trimArticle;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(7);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Connect to DB

// Types for flow
function agolo() {
  var _this = this;

  this.summarizer = {
    summarize: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var title, text, summary_length, coref, sort_by_salience, include_all_sentences, article, summarizer_options, AgoloAxios, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Prepare options for summarizing
                title = options.title, text = options.text, summary_length = options.summary_length, coref = options.coref, sort_by_salience = options.sort_by_salience, include_all_sentences = options.include_all_sentences;
                article = { title: title, text: text };
                summarizer_options = {
                  summary_length: summary_length,
                  articles: [article],
                  coref: coref,
                  sort_by_salience: sort_by_salience,
                  include_all_sentences: include_all_sentences
                };
                // Request for Agolo's API

                AgoloAxios = _axios2.default.create({
                  baseURL: process.env.AGOLO_URL,
                  headers: {
                    'Content-Type': 'application/json',
                    'Ocp-Apim-Subscription-Key': process.env.AGOLO_API_KEY
                  }
                });
                // Make request to Agolo Summarizer API & return

                _context.next = 6;
                return AgoloAxios.post('/', summarizer_options);

              case 6:
                response = _context.sent;
                return _context.abrupt('return', { summary_title: response.data.title, summary_points: response.data.summary[0].sentences });

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      function summarize(_x) {
        return _ref.apply(this, arguments);
      }

      return summarize;
    }()
  };
}

var Agolo = new agolo();
exports.default = Agolo;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COMPANY_SITES = exports.COMPANY_SITES = [{
  name: 'Dubai Holding',
  url: 'https://dubaiholding.com/en/media-hub/press-releases/',
  articlePrependUrl: '',
  articleListSelector: 'div.summary-wrap > h4 > a',
  articleHeaderSelector: 'div.container > h2',
  articleDateSelector: 'div.container > strong',
  articleTextSelector: 'div.container > p',
  articleWriterSelector: '',
  hasWriter: false,
  hasHeader: true,
  hasDate: true
}, {
  name: 'Dubai Duty Free',
  url: 'https://www.dubaidutyfree.com/media_center/news',
  articlePrependUrl: 'https://www.dubaidutyfree.com/', // Some hrefs need to be prepended
  articleListSelector: 'div.col-md-6.awards-blk > a.item-title',
  articleHeaderSelector: 'span.item-title',
  articleDateSelector: 'span.date',
  articleTextSelector: 'div.col-md-12.awards-details > p',
  articleWriterSelector: '',
  hasWriter: false,
  hasHeader: true,
  hasDate: true
}, {
  name: 'du',
  url: 'http://www.du.ae/about-us/media-centre/news',
  articlePrependUrl: '',
  articleListSelector: 'div.media-content > p > a.press-release-title',
  articleHeaderSelector: 'h1.title.news-title',
  articleDateSelector: 'p.news-date',
  articleTextSelector: 'div.contentIn div:nth-child(6)',
  articleWriterSelector: '',
  hasWriter: false,
  hasHeader: true,
  hasDate: true
}, {
  name: 'Al Futtaim',
  url: 'http://www.alfuttaim.com/home/mediacentre/News?className=AllNews&brandSelector=News&newscategory=AFGCorporate_design/MediaCentre/News/AllNews',
  articlePrependUrl: 'http://www.alfuttaim.com',
  articleListSelector: 'div.col-md-4.col-sm-6.col-xs-12 > a',
  articleHeaderSelector: 'h2.news-video-details__title',
  articleDateSelector: 'div.news-video-details__content__header',
  articleTextSelector: 'div.news-video-details__content__detail.Description > p',
  articleWriterSelector: '',
  hasWriter: false,
  hasHeader: true,
  hasDate: true
}, {
  name: 'Dubai Electricity and Water Authority',
  url: 'https://www.dewa.gov.ae/en/about-dewa/news-and-media/press-and-news/latest-news',
  articlePrependUrl: 'https://www.dewa.gov.ae/',
  articleListSelector: 'div.m8-teaser > a',
  articleHeaderSelector: 'h1.text__page-title',
  articleDateSelector: 'div.text__content-subcopy',
  articleTextSelector: 'div.m14-richtext > p',
  articleWriterSelector: '',
  hasWriter: false,
  hasHeader: true,
  hasDate: true
  // USING RSS FROM GOOGLE NEWS ALERT - The article sites have routing problem.
  // {
  //   url: 'http://www.empower.ae/news.php',
  //   articlePrependUrl: 'http://www.empower.ae/',
  //   articleListSelector: '#news > p > a',
  //   articleHeaderSelector: 'h3',
  //   articleDateSelector: 'i',
  //   articleTextSelector: 'div.col-lg-8.col-md-8.col-sm-8 p:nth-child(5)',
  //   articleWriterSelector: '',
  //   hasWriter: false,
  //   hasHeader: true,
  //   hasDate: true,
  // },
}];

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _article = __webpack_require__(3);

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function connectToMongo() {
  _mongoose2.default.connect(process.env.MONGO_URL, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, client) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (err) {
                console.log('> Error connecting to DB:', err.message);
              }
              console.log('> Successfully connected to mongoDB');

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}

exports.default = connectToMongo;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var initCronJob = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var crawlContentTimes, companyCrawlJob;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /* Seconds, minutes, hours, day of month, months, day of week */
            crawlContentTimes = '00 00 07 * * *';
            // let crawlContentJob = new CronJob(crawlContentTimes, () => crawler.articles.saveAndSummarizeToDb(), null, true, 'America/New_York');
            // const companyCrawlJob = new cron.CronJob({
            //   cronTime: '00 00 07 * * *',
            //   onTick: () => crawler.articles.saveAndSummarizeToDb(),
            //   start: true,
            //   timeZone: 'America/New_York'
            // });
            // companyCrawlJob.start();
            // console.log('> Company crawl job status:', companyCrawlJob.running);

            companyCrawlJob = _nodeCron2.default.schedule('* * 07 * *', function () {
              console.log('> Starting daily crawl at: ' + (0, _momentTimezone2.default)().tz('America/New_York').format('LLLL'));
              _crawler2.default.articles.saveAndSummarizeToDb();
            }, false);

            companyCrawlJob.start();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function initCronJob() {
    return _ref.apply(this, arguments);
  };
}();

var _colors = __webpack_require__(8);

var _colors2 = _interopRequireDefault(_colors);

var _crawler = __webpack_require__(6);

var _crawler2 = _interopRequireDefault(_crawler);

var _nodeCron = __webpack_require__(26);

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _momentTimezone = __webpack_require__(0);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Cronjob for crawling and summarizing articles


exports.default = initCronJob;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("node-cron");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("website-scraper");

/***/ })
/******/ ]);
});
//# sourceMappingURL=moodyApi.js.map