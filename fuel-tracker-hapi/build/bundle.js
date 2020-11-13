/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/database.json":
/*!******************************!*\
  !*** ./config/database.json ***!
  \******************************/
/*! exports provided: development, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"development\\\":{\\\"client\\\":\\\"mysql\\\",\\\"connection\\\":{\\\"host\\\":\\\"fuel-tracker-db\\\",\\\"user\\\":\\\"root\\\",\\\"password\\\":\\\"toor\\\",\\\"database\\\":\\\"database\\\"},\\\"migrations\\\":{\\\"tableName\\\":\\\"migrations\\\",\\\"directory\\\":\\\"../migrations\\\"},\\\"seeds\\\":{\\\"directory\\\":\\\"../seeds\\\"}}}\");\n\n//# sourceURL=webpack:///./config/database.json?");

/***/ }),

/***/ "./src/app/serializers/track.ts":
/*!**************************************!*\
  !*** ./src/app/serializers/track.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar show = function (track) {\n    return {\n        id: track.id,\n        date: track.date,\n        tripState: track.tripState,\n        roadType: track.roadType,\n        gasType: track.gasType,\n        amountFilled: track.amountFilled\n    };\n};\nvar index = function (tracks) {\n    return tracks.map(function (track) { return show(track); });\n};\nexports[\"default\"] = {\n    show: show,\n    index: index\n};\n\n\n//# sourceURL=webpack:///./src/app/serializers/track.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nexports.__esModule = true;\nvar database_1 = __webpack_require__(/*! ./lib/database */ \"./src/lib/database.ts\");\nvar table_1 = __webpack_require__(/*! ./lib/table */ \"./src/lib/table.ts\");\nvar Hapi = __webpack_require__(/*! @hapi/hapi */ \"@hapi/hapi\");\nvar track_1 = __webpack_require__(/*! ../src/app/serializers/track */ \"./src/app/serializers/track.ts\");\nvar Boom = __webpack_require__(/*! @hapi/boom */ \"@hapi/boom\");\nvar logger_1 = __webpack_require__(/*! ./lib/logger */ \"./src/lib/logger.ts\");\nvar init = function () { return __awaiter(void 0, void 0, void 0, function () {\n    var server;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                server = Hapi.server({\n                    port: 3010,\n                    host: '0.0.0.0'\n                });\n                server.route({\n                    method: 'GET',\n                    path: '/track',\n                    handler: function (request, h) { return __awaiter(void 0, void 0, void 0, function () {\n                        var tracks, error_1;\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0:\n                                    _a.trys.push([0, 2, , 3]);\n                                    return [4 /*yield*/, database_1.database(table_1.Table.track).orderBy('id', 'desc')];\n                                case 1:\n                                    tracks = _a.sent();\n                                    return [2 /*return*/, track_1[\"default\"].index(tracks)];\n                                case 2:\n                                    error_1 = _a.sent();\n                                    logger_1[\"default\"].error(error_1);\n                                    throw Boom.unauthorized();\n                                case 3: return [2 /*return*/];\n                            }\n                        });\n                    }); }\n                });\n                server.route({\n                    method: 'GET',\n                    path: '/track/{id}',\n                    handler: function (request, h) { return __awaiter(void 0, void 0, void 0, function () {\n                        var id, track, error_2;\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0:\n                                    id = request.params.id;\n                                    _a.label = 1;\n                                case 1:\n                                    _a.trys.push([1, 3, , 4]);\n                                    return [4 /*yield*/, database_1.database(table_1.Table.track).where({ id: request.params.id }).first()];\n                                case 2:\n                                    track = _a.sent();\n                                    return [2 /*return*/, track_1[\"default\"].show(track)];\n                                case 3:\n                                    error_2 = _a.sent();\n                                    logger_1[\"default\"].error(error_2);\n                                    throw Boom.notFound();\n                                case 4: return [2 /*return*/];\n                            }\n                        });\n                    }); }\n                });\n                server.route({\n                    method: 'POST',\n                    path: '/track',\n                    handler: function (request, h) { return __awaiter(void 0, void 0, void 0, function () {\n                        var payload, track, error_3;\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0:\n                                    _a.trys.push([0, 2, , 3]);\n                                    payload = request.payload;\n                                    track = {\n                                        tripState: payload.tripState,\n                                        roadType: payload.roadType,\n                                        gasType: payload.gasType,\n                                        amountFilled: payload.amountFilled\n                                    };\n                                    return [4 /*yield*/, database_1.database(table_1.Table.track).insert(track)];\n                                case 1:\n                                    _a.sent();\n                                    return [2 /*return*/, h.response(track)];\n                                case 2:\n                                    error_3 = _a.sent();\n                                    logger_1[\"default\"].error(error_3);\n                                    throw Boom.notFound();\n                                case 3: return [2 /*return*/];\n                            }\n                        });\n                    }); }\n                });\n                server.route({\n                    method: 'POST',\n                    path: '/track/{id}',\n                    handler: function (request, h) { return __awaiter(void 0, void 0, void 0, function () {\n                        var track, payload, updatedTrack, error_4;\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0:\n                                    _a.trys.push([0, 5, , 6]);\n                                    return [4 /*yield*/, database_1.database(table_1.Table.track).where({ id: request.params.id }).first()];\n                                case 1:\n                                    track = _a.sent();\n                                    if (!(track !== null)) return [3 /*break*/, 3];\n                                    payload = request.payload;\n                                    updatedTrack = {\n                                        tripState: payload.tripState,\n                                        roadType: payload['roadType'],\n                                        gasType: payload['gasType'],\n                                        amountFilled: payload['amountFilled']\n                                    };\n                                    return [4 /*yield*/, database_1.database(table_1.Table.track)\n                                            .where({ id: request.params.id })\n                                            .update(updatedTrack)];\n                                case 2:\n                                    _a.sent();\n                                    return [2 /*return*/, h.response(updatedTrack)];\n                                case 3: throw Boom.notFound();\n                                case 4: return [3 /*break*/, 6];\n                                case 5:\n                                    error_4 = _a.sent();\n                                    logger_1[\"default\"].error(error_4);\n                                    throw Boom.badRequest();\n                                case 6: return [2 /*return*/];\n                            }\n                        });\n                    }); }\n                });\n                return [4 /*yield*/, server.start()];\n            case 1:\n                _a.sent();\n                console.log('Server running on %s', server.info.uri);\n                return [2 /*return*/];\n        }\n    });\n}); };\nprocess.on('unhandledRejection', function (err) {\n    console.log(err);\n    process.exit(1);\n});\ninit();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/lib/database.ts":
/*!*****************************!*\
  !*** ./src/lib/database.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar Knex = __webpack_require__(/*! knex */ \"knex\");\nvar configs = __webpack_require__(/*! ../../config/database.json */ \"./config/database.json\");\nvar config = configs[\"development\" || false];\nexports.database = Knex(config);\n\n\n//# sourceURL=webpack:///./src/lib/database.ts?");

/***/ }),

/***/ "./src/lib/logger.ts":
/*!***************************!*\
  !*** ./src/lib/logger.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar logger = function () {\n    return {\n        info: function (message) { return console.info(\"\" + message); },\n        warn: function (message) { return console.warn(\"\" + message); },\n        error: function (error) { return console.error(\"\" + (error && error.stack ? error.stack : (error || ''))); },\n    };\n};\nexports[\"default\"] = logger();\n\n\n//# sourceURL=webpack:///./src/lib/logger.ts?");

/***/ }),

/***/ "./src/lib/table.ts":
/*!**************************!*\
  !*** ./src/lib/table.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.__esModule = true;\nvar Table;\n(function (Table) {\n    Table[\"track\"] = \"track\";\n})(Table = exports.Table || (exports.Table = {}));\n\n\n//# sourceURL=webpack:///./src/lib/table.ts?");

/***/ }),

/***/ "@hapi/boom":
/*!*****************************!*\
  !*** external "@hapi/boom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@hapi/boom\");\n\n//# sourceURL=webpack:///external_%22@hapi/boom%22?");

/***/ }),

/***/ "@hapi/hapi":
/*!*****************************!*\
  !*** external "@hapi/hapi" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@hapi/hapi\");\n\n//# sourceURL=webpack:///external_%22@hapi/hapi%22?");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"knex\");\n\n//# sourceURL=webpack:///external_%22knex%22?");

/***/ })

/******/ });