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

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, author, license, version, description, scripts, devDependencies, dependencies, main, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"fuel-tracker\\\",\\\"author\\\":\\\"Javier Furus\\\",\\\"license\\\":\\\"ISC\\\",\\\"version\\\":\\\"1.0.0\\\",\\\"description\\\":\\\"\\\",\\\"scripts\\\":{\\\"build\\\":\\\"webpack\\\",\\\"dev\\\":\\\"concurrently \\\\\\\"webpack -w\\\\\\\" \\\\\\\"nodemon build/bundle.js\\\\\\\"\\\",\\\"start\\\":\\\"node build/bundle.js\\\",\\\"db:migrate\\\":\\\"node ./node_modules/.bin/knex migrate:up --knexfile=config/database.json\\\",\\\"db:rollback\\\":\\\"node ./node_modules/.bin/knex migrate:rollback --knexfile=config/database.json\\\",\\\"db:seed\\\":\\\"node ./node_modules/.bin/knex seed:run --knexfile=config/database.json\\\"},\\\"devDependencies\\\":{\\\"@types/boom\\\":\\\"^7.3.0\\\",\\\"@types/express\\\":\\\"^4.17.2\\\",\\\"@types/hapi__hapi\\\":\\\"^20.0.2\\\",\\\"@types/joi\\\":\\\"^14.3.4\\\",\\\"@types/node\\\":\\\"^12.12.27\\\",\\\"concurrently\\\":\\\"^4.1.2\\\",\\\"ts-loader\\\":\\\"^6.2.1\\\",\\\"typescript\\\":\\\"^3.7.5\\\",\\\"webpack\\\":\\\"^4.41.6\\\",\\\"webpack-cli\\\":\\\"^3.3.11\\\"},\\\"dependencies\\\":{\\\"@hapi/boom\\\":\\\"^9.1.0\\\",\\\"@hapi/hapi\\\":\\\"^20.0.2\\\",\\\"@hapi/inert\\\":\\\"^6.0.3\\\",\\\"@hapi/vision\\\":\\\"^6.0.1\\\",\\\"@types/knex\\\":\\\"^0.16.1\\\",\\\"@types/swagger-express-middleware\\\":\\\"^1.0.10\\\",\\\"blipp\\\":\\\"^4.0.2\\\",\\\"express\\\":\\\"^4.17.1\\\",\\\"hapi-swagger\\\":\\\"^14.0.0\\\",\\\"joi\\\":\\\"^17.3.0\\\",\\\"knex\\\":\\\"^0.20.10\\\",\\\"mysql\\\":\\\"^2.18.1\\\",\\\"nodemon\\\":\\\"^2.0.2\\\",\\\"swagger-express-middleware\\\":\\\"^2.0.5\\\",\\\"ts-node\\\":\\\"^9.0.0\\\",\\\"webpack-node-externals\\\":\\\"^1.7.2\\\"},\\\"main\\\":\\\"src/index.ts\\\"}\");\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/app/routes/track.ts":
/*!*********************************!*\
  !*** ./src/app/routes/track.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst database_1 = __webpack_require__(/*! ../../lib/database */ \"./src/lib/database.ts\");\nconst table_1 = __webpack_require__(/*! ../../lib/table */ \"./src/lib/table.ts\");\nconst track_1 = __importDefault(__webpack_require__(/*! ../serializers/track */ \"./src/app/serializers/track.ts\"));\nconst logger_1 = __importDefault(__webpack_require__(/*! ../../lib/logger */ \"./src/lib/logger.ts\"));\nconst Boom = __importStar(__webpack_require__(/*! @hapi/boom */ \"@hapi/boom\"));\nconst road_1 = __webpack_require__(/*! ../../lib/road */ \"./src/lib/road.ts\");\nexports.plugin = {\n    name: \"TrackRoutes\",\n    register: async function (server, options) {\n        server.route({\n            method: 'GET',\n            path: '/',\n            handler: async (request, h) => {\n                try {\n                    const tracks = await database_1.database(table_1.Table.track).orderBy('id', 'desc');\n                    return track_1.default.index(tracks);\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.unauthorized();\n                }\n            }\n        });\n        server.route({\n            method: 'GET',\n            path: '/latest',\n            handler: async (request, h) => {\n                try {\n                    const tracks = await database_1.database(table_1.Table.track).orderBy('id', 'desc').limit(5).offset(0);\n                    return track_1.default.index(tracks);\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.unauthorized();\n                }\n            }\n        });\n        server.route({\n            method: 'GET',\n            path: '/totalTrip',\n            handler: async (request, h) => {\n                try {\n                    const lastTrip = await database_1.database.select('tripState').table(table_1.Table.track).orderBy('id', 'desc').first();\n                    if (lastTrip) {\n                        return h.response(lastTrip.tripState);\n                    }\n                    else {\n                        return h.response(0);\n                    }\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.unauthorized();\n                }\n            }\n        });\n        server.route({\n            method: 'GET',\n            path: '/tripLeft',\n            handler: async (request, h) => {\n                try {\n                    const lastTrip = await database_1.database(table_1.Table.track).orderBy('id', 'desc').first();\n                    if (lastTrip) {\n                        const averageConsumption = (lastTrip.roadType === road_1.Road.City) ? 0.084 : 0.055;\n                        const tripLeft = (lastTrip.amountFilled / averageConsumption).toFixed(2);\n                        const roadType = lastTrip.roadType;\n                        return h.response({ tripLeft, roadType });\n                    }\n                    else {\n                        return h.response({ tripLeft: 0, roadType: 'No trip' });\n                    }\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.unauthorized();\n                }\n            }\n        });\n        server.route({\n            method: 'GET',\n            path: '/{id}',\n            handler: async (request, h) => {\n                const id = request.params.id;\n                try {\n                    const track = await database_1.database(table_1.Table.track).where({ id: request.params.id }).first();\n                    return track_1.default.show(track);\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.notFound();\n                }\n            }\n        });\n        server.route({\n            method: 'DELETE',\n            path: '/{id}',\n            handler: async (request, h) => {\n                const track = await database_1.database(table_1.Table.track).where({ id: request.params.id }).first();\n                try {\n                    if (track) {\n                        await database_1.database(table_1.Table.track)\n                            .where({ id: request.params.id })\n                            .delete();\n                        return h.response(track);\n                    }\n                    else {\n                        throw Boom.notFound();\n                    }\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.notFound();\n                }\n            }\n        });\n        server.route({\n            method: 'POST',\n            path: '/',\n            handler: async (request, h) => {\n                try {\n                    const lastTrip = await database_1.database.select('tripState').from(table_1.Table.track).orderBy('id', 'desc').first();\n                    const lastFill = await database_1.database.select('amountFilled').from(table_1.Table.track).orderBy('id', 'desc').first();\n                    const payload = request.payload;\n                    const track = {};\n                    if (lastTrip) {\n                        const averageConsumption = (payload.roadType === road_1.Road.City) ? 0.084 : 0.055;\n                        track.tripState = lastTrip.tripState + payload.tripState,\n                            track.roadType = payload.roadType,\n                            track.gasType = payload.gasType,\n                            track.amountFilled = (lastFill.amountFilled + payload.amountFilled) - (averageConsumption * (lastTrip.tripState + payload.tripState));\n                    }\n                    else {\n                        track.tripState = payload.tripState,\n                            track.roadType = payload.roadType,\n                            track.gasType = payload.gasType,\n                            track.amountFilled = payload.amountFilled;\n                    }\n                    ;\n                    await database_1.database(table_1.Table.track).insert(track);\n                    return h.response(track);\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.notFound();\n                }\n            }\n        });\n        server.route({\n            method: 'PUT',\n            path: '/{id}',\n            handler: async (request, h) => {\n                try {\n                    const track = await database_1.database(table_1.Table.track).where({ id: request.params.id }).first();\n                    if (track !== null) {\n                        const payload = request.payload;\n                        const updatedTrack = {\n                            tripState: payload.tripState,\n                            roadType: payload.roadType,\n                            gasType: payload.gasType,\n                            amountFilled: payload.amountFilled\n                        };\n                        await database_1.database(table_1.Table.track)\n                            .where({ id: request.params.id })\n                            .update(updatedTrack);\n                        return h.response(updatedTrack);\n                    }\n                    else {\n                        throw Boom.notFound();\n                    }\n                }\n                catch (error) {\n                    logger_1.default.error(error);\n                    throw Boom.badRequest();\n                }\n            }\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/app/routes/track.ts?");

/***/ }),

/***/ "./src/app/serializers/track.ts":
/*!**************************************!*\
  !*** ./src/app/serializers/track.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst show = (track) => {\n    return {\n        id: track.id,\n        date: track.date,\n        tripState: track.tripState,\n        roadType: track.roadType,\n        gasType: track.gasType,\n        amountFilled: track.amountFilled\n    };\n};\nconst index = (tracks) => {\n    return tracks.map(track => show(track));\n};\nexports.default = {\n    show,\n    index\n};\n\n\n//# sourceURL=webpack:///./src/app/serializers/track.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst hapi_1 = __importDefault(__webpack_require__(/*! @hapi/hapi */ \"@hapi/hapi\"));\nconst inert_1 = __importDefault(__webpack_require__(/*! @hapi/inert */ \"@hapi/inert\"));\nconst vision_1 = __importDefault(__webpack_require__(/*! @hapi/vision */ \"@hapi/vision\"));\nconst blipp_1 = __importDefault(__webpack_require__(/*! blipp */ \"blipp\"));\nconst package_json_1 = __importDefault(__webpack_require__(/*! ../package.json */ \"./package.json\"));\nconst hapi_swagger_1 = __importDefault(__webpack_require__(/*! hapi-swagger */ \"hapi-swagger\"));\nconst server = hapi_1.default.server({\n    port: 3001,\n    host: '0.0.0.0',\n    routes: {\n        cors: {\n            origin: ['*'],\n            additionalHeaders: ['*']\n        }\n    }\n});\n(async () => {\n    const swaggerOptions = {\n        info: {\n            title: 'Fuel Tracker API',\n            description: 'Fuel Tracker API documentation',\n            version: package_json_1.default.version\n        },\n        tags: [\n            { name: 'track', description: 'Track the fuel state' },\n        ],\n        grouping: 'tags',\n        sortEndpoints: 'ordered'\n    };\n    await server.register([\n        inert_1.default,\n        vision_1.default,\n        blipp_1.default,\n        {\n            plugin: hapi_swagger_1.default,\n            options: swaggerOptions\n        }\n    ]);\n    await server.register(__webpack_require__(/*! ./app/routes/track */ \"./src/app/routes/track.ts\"), { routes: { prefix: '/track' } });\n    await server.start();\n    console.log('Server running at:', server.info.uri);\n})();\nprocess.on('unhandledRejection', (err) => {\n    console.log(err);\n    process.exit(1);\n});\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/lib/database.ts":
/*!*****************************!*\
  !*** ./src/lib/database.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst knex_1 = __importDefault(__webpack_require__(/*! knex */ \"knex\"));\nconst configs = __importStar(__webpack_require__(/*! ../../config/database.json */ \"./config/database.json\"));\nconst config = configs[\"development\" || false];\nexports.database = knex_1.default(config);\n\n\n//# sourceURL=webpack:///./src/lib/database.ts?");

/***/ }),

/***/ "./src/lib/logger.ts":
/*!***************************!*\
  !*** ./src/lib/logger.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst logger = () => {\n    return {\n        info: (message) => console.info(`${message}`),\n        warn: (message) => console.warn(`${message}`),\n        error: (error) => console.error(`${error && error.stack ? error.stack : (error || '')}`),\n    };\n};\nexports.default = logger();\n\n\n//# sourceURL=webpack:///./src/lib/logger.ts?");

/***/ }),

/***/ "./src/lib/road.ts":
/*!*************************!*\
  !*** ./src/lib/road.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Road;\n(function (Road) {\n    Road[\"City\"] = \"City\";\n    Road[\"Highway\"] = \"Highway\";\n    Road[\"Motorway\"] = \"Motorway\";\n})(Road = exports.Road || (exports.Road = {}));\n\n\n//# sourceURL=webpack:///./src/lib/road.ts?");

/***/ }),

/***/ "./src/lib/table.ts":
/*!**************************!*\
  !*** ./src/lib/table.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Table;\n(function (Table) {\n    Table[\"track\"] = \"track\";\n})(Table = exports.Table || (exports.Table = {}));\n\n\n//# sourceURL=webpack:///./src/lib/table.ts?");

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

/***/ "@hapi/inert":
/*!******************************!*\
  !*** external "@hapi/inert" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@hapi/inert\");\n\n//# sourceURL=webpack:///external_%22@hapi/inert%22?");

/***/ }),

/***/ "@hapi/vision":
/*!*******************************!*\
  !*** external "@hapi/vision" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@hapi/vision\");\n\n//# sourceURL=webpack:///external_%22@hapi/vision%22?");

/***/ }),

/***/ "blipp":
/*!************************!*\
  !*** external "blipp" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"blipp\");\n\n//# sourceURL=webpack:///external_%22blipp%22?");

/***/ }),

/***/ "hapi-swagger":
/*!*******************************!*\
  !*** external "hapi-swagger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"hapi-swagger\");\n\n//# sourceURL=webpack:///external_%22hapi-swagger%22?");

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