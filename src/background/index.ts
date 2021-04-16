
import { factoryContentUrls } from "../config";
import { StartPrint, Print } from "../types";

//     platform: PlatformCode,// 平台编码，淘系及其他平台订单模板的为0，拼多多订单的为1，京东订单的为2
const PlatfromsMap = new Map([
    [0, /.+:\/\/a.*\.fahuoyi.com\/scanPrinting\/index/],
    [1, /.+:\/\/pdd.*\.fahuoyi.com\/scanPrinting\/index/],
    [2, /.+:\/\/jd.*\.fahuoyi.com\/scanPrinting\/index/]
])
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.action === StartPrint) {
        console.log("startPrint")
        // 通知fahuoyi的content开始点击
        chrome.tabs.query({
            url: "*://*.fahuoyi.com/scanPrinting/index"
        }, function (tabs) {
            let exp = new RegExp(PlatfromsMap.get(message.value.platform)!, 'i')

            tabs && tabs.forEach(tab => {
                if (exp.test(tab.url!)) {
                    chrome.tabs.sendMessage(tab.id!, { action: Print, value: message.value })
                }
            })
            // console.log(tabs, 'tabs')
            // // sendResponse("")
            // if (tabs[0]) {
            //     chrome.tabs.sendMessage(tabs[0].id!, { action: Print, value: message.value })
            // }
        })
    } else if (message.action === "sendNewWaybillNo") {

        // 从bg页面转发给厂家页面的content.js
        chrome.tabs.query({
            url: factoryContentUrls
        }, function (tabs) {
            tabs && tabs.forEach(tab => {
                // chrome.tabs.sendMessage(tab.id!, message)
                const port = chrome.tabs.connect(tab.id!, { name: "sendNewWaybillNo" })
                port.onMessage.addListener(function (msg, port) {
                    if (msg.action === "answer") {
                        console.log(msg, port, 'bg')
                        port.disconnect()
                    }
                })
                port.postMessage(message)

            })
        })
        // let port = chrome.runtime.connect({ name: "bgSendMessage" })
        // port.postMessage(message)
    }
})
// chrome.runtime.onConnect.addListener(function (msg) {
//     console.log(msg, 'msgbg')
// })