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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: Requires Babel \"^7.0.0-0\", but was loaded with \"6.26.3\". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention \"@babel/core\" or \"babel-core\" to see what is calling Babel.\n    at throwVersionError (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\@babel\\helper-plugin-utils\\lib\\index.js:66:11)\n    at Object.assertVersion (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\@babel\\helper-plugin-utils\\lib\\index.js:10:5)\n    at E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\@babel\\plugin-syntax-dynamic-import\\lib\\index.js:11:7\n    at E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\@babel\\helper-plugin-utils\\lib\\index.js:34:12\n    at Function.memoisePluginContainer (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:113:13)\n    at Function.normalisePlugin (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:146:32)\n    at E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:184:30\n    at Array.map (<anonymous>)\n    at Function.normalisePlugins (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:158:20)\n    at OptionManager.mergeOptions (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:234:36)\n    at OptionManager.init (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\options\\option-manager.js:368:12)\n    at File.initOptions (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:212:65)\n    at new File (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\file\\index.js:135:24)\n    at Pipeline.transform (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-core\\lib\\transformation\\pipeline.js:46:16)\n    at transpile (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-loader\\lib\\index.js:46:20)\n    at module.exports (E:\\DuolaimallProject\\project_duolaimall\\front\\project4\\node_modules\\babel-loader\\lib\\index.js:163:20)");

/***/ })
/******/ ]);