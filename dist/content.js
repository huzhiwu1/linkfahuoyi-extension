/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/index.ts":
/*!******************************!*\
  !*** ./src/content/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformCode = void 0;
var types_1 = __webpack_require__(/*! ../types */ "./src/types/index.ts");
var PlatformCode;
(function (PlatformCode) {
    PlatformCode[PlatformCode["\u6DD8\u7CFB\u53CA\u5176\u4ED6\u5E73\u53F0\u8BA2\u5355\u6A21\u677F"] = 0] = "\u6DD8\u7CFB\u53CA\u5176\u4ED6\u5E73\u53F0\u8BA2\u5355\u6A21\u677F";
    PlatformCode[PlatformCode["\u62FC\u591A\u591A\u8BA2\u5355\u6A21\u677F"] = 1] = "\u62FC\u591A\u591A\u8BA2\u5355\u6A21\u677F";
    PlatformCode[PlatformCode["\u4EAC\u4E1C\u8BA2\u5355\u6A21\u677F"] = 2] = "\u4EAC\u4E1C\u8BA2\u5355\u6A21\u677F";
})(PlatformCode = exports.PlatformCode || (exports.PlatformCode = {}));
window.addEventListener("message", function (res) {
    if (res.data.action === "StartPrint") {
        chrome.storage.local.get({ list: [] }, function (storage) {
            // @ts-ignore
            if (storage.list.length == 0 || !storage.list[0].wayCompanyId || !storage.list[0].waybillTemplateList.some(function (item) { return item; })) {
                alert("请选择快递模板");
                return;
            }
            var _a = res.data.value, wayCompanyId = _a.wayCompanyId, waybillNo = _a.waybillNo, orderNo = _a.orderNo, platform = _a.platform;
            if (!waybillNo && (!wayCompanyId || !orderNo || ![0, 1, 2].includes(Number(platform)))) {
                alert("参数传递错误");
                return;
            }
            chrome.runtime.sendMessage({ action: types_1.StartPrint, value: res.data.value }, function (response) {
            });
        });
    }
});
var SelectOptions;
(function (SelectOptions) {
    SelectOptions["waybillNo"] = "waybillNo";
    SelectOptions["orderOriginalId"] = "orderOriginalId";
})(SelectOptions || (SelectOptions = {}));
var printWayBillByOld = function (waybillNo, wayCompanyId) {
    chrome.storage.local.get({ list: [], isAutoEmit: false }, function (res) {
        // 选择使用旧单号打印
        var oldOptionDom = document.querySelectorAll(".form-group.mr20>.radio-inline")[1];
        var waybillNoBtn = document.querySelector(".form-group>.form-control.original-id-input-label>option[value=waybillNo]");
        var selectDom = document.querySelector("select.form-control.original-id-input-label");
        var inputDom = document.querySelector(".form-group>.form-control.original-id-input");
        var serachBtn = document.querySelector(".form-group>.btn.btn-primary[type=button]");
        var printDom = document.querySelector("#elContainer>div>.form-inline.panel-border.p15.search-panel>div[class]>.form-group.mr20[style]>select.form-control");
        var autoDom = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[1];
        var printId;
        // @ts-ignore
        res.list.forEach(function (item) {
            if (item.wayCompanyId === wayCompanyId) {
                printId = item.printId;
            }
        });
        // 1.选择旧单号打印
        oldOptionDom.click();
        // 2.选择打单模板
        waybillNoBtn.selected = true;
        selectDom.value = SelectOptions.waybillNo;
        // @ts-ignore
        selectDom.dispatchEvent(new Event("change", { bubbles: true }));
        // 3.选择打印机
        printDom.value = printId;
        printDom.dispatchEvent(new Event("change", { bubbles: true }));
        // 4.自动发货
        autoDom.value = "true";
        autoDom.dispatchEvent(new Event("change", { bubbles: true }));
        // 5.自己联系快递公司
        var bySelf = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[2];
        bySelf.value = "OFFLINE";
        bySelf.dispatchEvent(new Event("change", { bubbles: true }));
        // 6.输入运单号
        // selectDom.__reactEventHandlers$8wsw7c8olk.onChange({ target: { value: SelectOptions.waybillNo } })
        inputDom.value = waybillNo;
        serachBtn.click();
    });
};
var printWayBillByNew = function (_a) {
    var orderNo = _a.orderNo, wayCompanyId = _a.wayCompanyId, platform = _a.platform;
    // console.log(orderNo, wayCompanyId, platform)
    // 根据快递公司的companyId选择相应的配置
    chrome.storage.local.get({ list: [], isAutoEmit: false }, function (res) {
        // console.log(res, 'res') //res:{isAutoEmit:boolean,list:[{waybillCompanyId:"",waybillTemplateList:[x,x,x]}]}
        var waybillTemplate;
        var printId;
        // @ts-ignore
        res.list.forEach(function (item) {
            if (item.wayCompanyId === wayCompanyId) {
                waybillTemplate = item.waybillTemplateList[platform];
                printId = item.printId;
            }
        });
        var newOrderBtn = document.querySelector(".form-group.mr20>.radio-inline.mr10");
        var wayTemplateSelect = document.querySelector(".form-group.mr20>.form-control.waybill-template-select");
        // let orderBtn = document.querySelector(".form-group>.form-control.original-id-input-label>option[value=orderOriginalId]") as HTMLOptionElement
        var selectDom = document.querySelector("select.form-control.original-id-input-label");
        var inputDom = document.querySelector(".form-group>.form-control.original-id-input");
        var searchDom = document.querySelector(".form-group>.btn.btn-primary");
        var printDom = document.querySelector("#elContainer>div>.form-inline.panel-border.p15.search-panel>div[class]>.form-group.mr20[style]>select.form-control");
        var autoDom = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[1];
        //1.点击 获取新单号打印
        newOrderBtn.click();
        //2.选择快递单模板
        wayTemplateSelect.value = waybillTemplate + "";
        wayTemplateSelect.dispatchEvent(new Event("change", { bubbles: true }));
        //3.点击订单编号
        selectDom.value = SelectOptions.orderOriginalId;
        // @ts-ignore
        selectDom.dispatchEvent(new Event("change", { bubbles: true }));
        // 4. 选择打印机
        printDom.value = printId;
        printDom.dispatchEvent(new Event("change", { bubbles: true }));
        // orderBtn.click()
        // 5.自动发货
        autoDom.value = "true";
        autoDom.dispatchEvent(new Event("change", { bubbles: true }));
        // 6.自己联系快递公司
        var bySelf = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[2];
        bySelf.value = "OFFLINE";
        bySelf.dispatchEvent(new Event("change", { bubbles: true }));
        //7.输入订单编号
        inputDom.value = orderNo;
        //8.点击搜索并打印
        searchDom.click();
    });
};
//发货易页面
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.action === types_1.Print) {
        if (message.value.waybillNo) {
            printWayBillByOld(message.value.waybillNo, message.value.wayCompanyId);
        }
        else {
            var _a = message.value, orderNo = _a.orderNo, wayCompanyId = _a.wayCompanyId, platform = _a.platform;
            printWayBillByNew({ orderNo: orderNo, wayCompanyId: wayCompanyId, platform: platform });
        }
    }
});
// 拿到打印机
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "getPrinter") {
        port.onMessage.addListener(function (msg) {
            console.log(msg, ' contentmsg');
            if (msg.action === "getPrint") {
                console.log(1);
                // @ts-ignore
                var options = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div[class]>.form-group.mr20[style]>select.form-control>option");
                // console.log(2)
                // console.log(options, options[0].value, '3')
                var arr = [];
                for (var i = 0; i < options.length; i++) {
                    arr.push(options[i].value);
                }
                port.postMessage(arr);
            }
        });
    }
});
// 厂家content.js页面
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    if (message.action === "newWaybillNo") {
        window.postMessage(message, "*");
    }
});
// inject.js
var startPrintWayBill = function (params) {
    // 通知content.js触发事件
    window.postMessage({ action: "StartPrint", value: params }, "*");
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        window.onmessage = function (res) {
            if (res.data.action === "newWaybillNo") {
                resolve(res.data.value);
            }
        };
    });
};
function injectCustomjs() {
    var temp = document.createElement("script");
    temp.innerHTML = "window.startPrintWayBill=" + startPrintWayBill;
    document.body.appendChild(temp);
    var tbodyDom = document.querySelector("#elContainer>div>table>tbody");
    if (tbodyDom) {
        var observe = new MutationObserver(function (mutations, observe) {
            var td = mutations[0].addedNodes[0].childNodes[3];
            if (!td)
                return;
            var tdObserve = new MutationObserver(function (mutations, observe) {
                mutations.forEach(function (item) {
                    item.addedNodes.forEach(function (node) {
                        if (node.nodeName == "DIV") {
                            var text = node.childNodes[2].textContent;
                            console.log(text, 'text');
                            // window.postMessage({ action: "newWaybillNo", value: text }, "*")
                            // 从发货易页面发消息给bg
                            chrome.runtime.sendMessage({ action: "newWaybillNo", value: text }, function (res) {
                            });
                        }
                    });
                });
            });
            tdObserve.observe(td, {
                childList: true,
            });
        });
        observe.observe(tbodyDom, {
            childList: true,
        });
    }
}
injectCustomjs();


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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/content/index.ts");
/******/ })()
;
//# sourceMappingURL=content.js.map