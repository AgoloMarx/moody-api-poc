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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = __webpack_require__(1);

var ArticleSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
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

var Article = mongoose.model('Article', ArticleSchema);

exports.default = Article;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _Agolo = __webpack_require__(11);

var _Agolo2 = _interopRequireDefault(_Agolo);

var _cheerio = __webpack_require__(12);

var _cheerio2 = _interopRequireDefault(_cheerio);

var _colors = __webpack_require__(5);

var _colors2 = _interopRequireDefault(_colors);

var _momentTimezone = __webpack_require__(6);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _underscore = __webpack_require__(13);

var _puppeteer = __webpack_require__(14);

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _article = __webpack_require__(0);

var _article2 = _interopRequireDefault(_article);

var _constants = __webpack_require__(15);

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
                _context.next = 4;
                return _puppeteer2.default.launch({ headless: true });

              case 4:
                browser = _context.sent;
                _context.next = 7;
                return browser.newPage();

              case 7:
                page = _context.sent;
                _context.next = 10;
                return page.goto(url, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 0 });

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
                return _context.abrupt('return', _articleUrls);

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](0);

                console.log('> Error in crawling for article urls: ', _context.t0.message);

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[0, 22]]);
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
        var articleUrls, articlePrependUrl, articleHeaderSelector, articleDateSelector, articleTextSelector, hasWriter, hasHeader, hasDate, siteArticles, i, articleUrl, browser, page, html, $, articleHeader, articleWriter, articleDate, articleText, article;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                articleUrls = crawlParams.articleUrls, articlePrependUrl = crawlParams.articlePrependUrl, articleHeaderSelector = crawlParams.articleHeaderSelector, articleDateSelector = crawlParams.articleDateSelector, articleTextSelector = crawlParams.articleTextSelector, hasWriter = crawlParams.hasWriter, hasHeader = crawlParams.hasHeader, hasDate = crawlParams.hasDate;
                siteArticles = [];
                i = 0;

              case 3:
                if (!(i < articleUrls.length)) {
                  _context2.next = 33;
                  break;
                }

                _context2.prev = 4;
                articleUrl = articleUrls[i];

                console.log(_colors2.default.bold.green('> [Scraping] article url for content: ' + articlePrependUrl + articleUrl));
                _context2.next = 9;
                return _puppeteer2.default.launch({ headless: true });

              case 9:
                browser = _context2.sent;
                _context2.next = 12;
                return browser.newPage();

              case 12:
                page = _context2.sent;
                _context2.next = 15;
                return page.goto('' + articlePrependUrl + articleUrl, { waitUntil: ['load', 'domcontentloaded', 'networkidle2'], timeout: 0 });

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
                _context2.t0 = _context2['catch'](4);

                console.log('Error scraping url: ' + articleUrls[i] + ': \n ' + _context2.t0.message);

              case 30:
                i++;
                _context2.next = 3;
                break;

              case 33:
                return _context2.abrupt('return', siteArticles);

              case 34:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this, [[4, 27]]);
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var allSitesArticles, i, siteArticlesWithInfo, _name, _url, _siteArticles2, _loop, j;

        return regeneratorRuntime.wrap(function _callee4$(_context5) {
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
                  _context5.next = 17;
                  break;
                }

                siteArticlesWithInfo = allSitesArticles[i];
                _name = siteArticlesWithInfo.name, _url = siteArticlesWithInfo.url, _siteArticles2 = siteArticlesWithInfo.siteArticles;
                _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(j) {
                  var article, originalText, originalHeader, options, _ref5, summary_title, summary_points, summarizedArticle, query;

                  return regeneratorRuntime.wrap(function _loop$(_context4) {
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
                  }, _loop, _this);
                });
                j = 0;

              case 9:
                if (!(j < _siteArticles2.length)) {
                  _context5.next = 14;
                  break;
                }

                return _context5.delegateYield(_loop(j), 't0', 11);

              case 11:
                j++;
                _context5.next = 9;
                break;

              case 14:
                i++;
                _context5.next = 4;
                break;

              case 17:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, _this);
      }));

      function saveAndSummarizeToDb() {
        return _ref4.apply(this, arguments);
      }

      return saveAndSummarizeToDb;
    }()
  };
}

var Crawler = new crawler();
exports.default = Crawler;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("moment-timezone");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(8);

var _articleRouter = __webpack_require__(9);

var _articleRouter2 = _interopRequireDefault(_articleRouter);

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _http = __webpack_require__(16);

var _http2 = _interopRequireDefault(_http);

var _connectToMongo = __webpack_require__(17);

var _connectToMongo2 = _interopRequireDefault(_connectToMongo);

var _cron = __webpack_require__(18);

var _cron2 = _interopRequireDefault(_cron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (process.env.NODE_ENV === 'local') {
  __webpack_require__(20).config();
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
            }
            console.log('> Server is ready!');
            _context.next = 5;
            return (0, _connectToMongo2.default)();

          case 5:
            // Run cronjob to update DB
            (0, _cron2.default)();

          case 6:
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
  _http2.default.get("https://moody-api-poc.herokuapp.com/");
}, 300000); // every 5 minutes (300000)

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _article = __webpack_require__(10);

var _article2 = _interopRequireDefault(_article);

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _crawler = __webpack_require__(3);

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

exports.default = articleRouter;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _article = __webpack_require__(0);

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
        var articles;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log('> Fetching articles for project:', projectId);
                _context2.next = 3;
                return _article2.default.find({ project: projectId });

              case 3:
                articles = _context2.sent;
                return _context2.abrupt('return', articles);

              case 5:
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(4);

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
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("underscore");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(1);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _article = __webpack_require__(0);

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
/* 18 */
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

var _colors = __webpack_require__(5);

var _colors2 = _interopRequireDefault(_colors);

var _crawler = __webpack_require__(3);

var _crawler2 = _interopRequireDefault(_crawler);

var _nodeCron = __webpack_require__(19);

var _nodeCron2 = _interopRequireDefault(_nodeCron);

var _momentTimezone = __webpack_require__(6);

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // Cronjob for crawling and summarizing articles


exports.default = initCronJob;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("node-cron");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ })
/******/ ]);
});
//# sourceMappingURL=moodyApi.js.map