/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/index.ts":
/*!*********************************!*\
  !*** ./src/background/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var config_1 = __webpack_require__(/*! ../config */ "./src/config.ts");
var types_1 = __webpack_require__(/*! ../types */ "./src/types/index.ts");
//     platform: PlatformCode,// 平台编码，淘系及其他平台订单模板的为0，拼多多订单的为1，京东订单的为2
var PlatfromsMap = new Map([
    [0, /.+:\/\/a.*\.fahuoyi.com\/scanPrinting\/index/],
    [1, /.+:\/\/pdd.*\.fahuoyi.com\/scanPrinting\/index/],
    [2, /.+:\/\/jd.*\.fahuoyi.com\/scanPrinting\/index/]
]);
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === types_1.StartPrint) {
        console.log("startPrint");
        // 通知fahuoyi的content开始点击
        chrome.tabs.query({
            url: "*://*.fahuoyi.com/scanPrinting/index"
        }, function (tabs) {
            var exp = new RegExp(PlatfromsMap.get(message.value.platform), 'i');
            tabs && tabs.forEach(function (tab) {
                if (exp.test(tab.url)) {
                    chrome.tabs.sendMessage(tab.id, { action: types_1.Print, value: message.value });
                }
            });
            // console.log(tabs, 'tabs')
            // // sendResponse("")
            // if (tabs[0]) {
            //     chrome.tabs.sendMessage(tabs[0].id!, { action: Print, value: message.value })
            // }
        });
    }
    else if (message.action === "newWaybillNo") {
        // 从bg页面转发给厂家页面的content.js
        chrome.tabs.query({
            url: config_1.factoryContentUrls
        }, function (tabs) {
            tabs && tabs.forEach(function (tab) {
                chrome.tabs.sendMessage(tab.id, message);
            });
        });
    }
});


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.factoryContentUrls = void 0;
exports.factoryContentUrls = ["http://admin.phonecase.dankal.cn/*", "*://*.fahuoyi.com/*", "http://localhost:8083/*", "http://admin.test.rtxmdz.com/*", "http://admin.rtxmdz.com/*"];


/***/ }),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


// //  快递模板列表下载是否完成
// export const WaybillTemplateComplete = "waybillTemplateComplete"
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Print = exports.StartPrint = void 0;
// // 让popup获取waybillTemplate
// export const GetWaybillTemplate = "getWaybillTemplate"
exports.StartPrint = "StartPrint";
exports.Print = "Print";


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/background/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=background.js.map