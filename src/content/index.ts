


import { message } from "antd";

import { Print, StartPrint } from "../types";

export enum PlatformCode {
    "淘系及其他平台订单模板" = 0,
    "拼多多订单模板" = 1,
    "京东订单模板" = 2
}

type Params = {
    waybillNo: string // 运单号
    platform: PlatformCode,
    wayCompanyId: string
} & {
    orderNo: string// 订单号
    wayCompanyId: string// 快递公司的Id
    platform: PlatformCode,// 平台编码，淘系及其他平台订单模板的为0，拼多多订单的为1，京东订单的为2
}

interface Response {
    data: {
        action: "StartPrint",
        value: Params
    }
}
window.addEventListener("message", function (res: Response) {

    if (res.data.action === "StartPrint") {
        chrome.storage?.local.get({ list: [] }, function (storage) {
            // @ts-ignore
            if (storage.list.length == 0 || !storage.list[0].wayCompanyId || !storage.list[0].waybillTemplateList.some(item => item)) {
                alert("请选择快递模板")
                return;
            }
            const { wayCompanyId, waybillNo, orderNo, platform } = res.data.value
            if (!waybillNo && (!wayCompanyId || !orderNo || ![0, 1, 2].includes(Number(platform)))) {
                alert("参数传递错误")
                return;
            }
            chrome.runtime.sendMessage({ action: StartPrint, value: res.data.value }, function (response) {

            })
        })

    }
})
enum SelectOptions {
    "waybillNo" = "waybillNo",
    "orderOriginalId" = "orderOriginalId"
}
// fahuoyi.com
interface Message {
    action: "Print",
    value: Params
}
const printWayBillByOld = function (waybillNo: string, wayCompanyId: string) {
    chrome.storage.local.get({ list: [], isAutoEmit: false }, function (res) {
        // 选择使用旧单号打印
        let oldOptionDom = document.querySelectorAll(".form-group.mr20>.radio-inline")[1] as HTMLLabelElement
        let waybillNoBtn = document.querySelector(".form-group>.form-control.original-id-input-label>option[value=waybillNo]") as HTMLOptionElement
        let selectDom = document.querySelector("select.form-control.original-id-input-label") as HTMLSelectElement
        let inputDom = document.querySelector(".form-group>.form-control.original-id-input") as HTMLInputElement
        let serachBtn = document.querySelector(".form-group>.btn.btn-primary[type=button]") as HTMLButtonElement
        let printDom = document.querySelector("#elContainer>div>.form-inline.panel-border.p15.search-panel>div[class]>.form-group.mr20[style]>select.form-control") as HTMLSelectElement
        let autoDom = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[1] as HTMLSelectElement
        // 默认参数写死
        let hiddenInputDom = document.querySelector("#forcePrintMergerOrderInput") as HTMLInputElement

        let printId: string
        // @ts-ignore
        res.list.forEach(item => {

            if (item.wayCompanyId === wayCompanyId) {
                printId = item.printId === "仅获取电子面单号不打印面单" ? "isGenerateWaybillNoOnly" : item.printId
                // printId = item.printId
            }

        })

        // 1.选择旧单号打印
        oldOptionDom.click()

        // 2.选择打单模板
        waybillNoBtn.selected = true
        selectDom.value = SelectOptions.waybillNo
        // @ts-ignore
        selectDom.dispatchEvent(new Event("change", { bubbles: true }))
        // 3.选择打印机
        printDom.value = printId!
        printDom.dispatchEvent(new Event("change", { bubbles: true }))
        // 4.自动发货
        autoDom.value = "true"
        autoDom.dispatchEvent(new Event("change", { bubbles: true }))
        // 5.自己联系快递公司
        let bySelf = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[2] as HTMLSelectElement
        bySelf.value = "OFFLINE"
        bySelf.dispatchEvent(new Event("change", { bubbles: true }))
        // 6.输入运单号
        // selectDom.__reactEventHandlers$8wsw7c8olk.onChange({ target: { value: SelectOptions.waybillNo } })
        inputDom.value = waybillNo

        // 7.默认参数写死
        hiddenInputDom.value = "true"

        serachBtn.click()
    })

}

const printWayBillByNew = function ({ orderNo, wayCompanyId, platform }: Pick<Params, "orderNo" | "wayCompanyId" | "platform">) {
    // console.log(orderNo, wayCompanyId, platform)
    // 根据快递公司的companyId选择相应的配置
    chrome.storage.local.get({ list: [], isAutoEmit: false }, function (res) {
        // console.log(res, 'res') //res:{isAutoEmit:boolean,list:[{waybillCompanyId:"",waybillTemplateList:[x,x,x]}]}
        let waybillTemplate: string;

        let printId: string;

        // @ts-ignore
        res.list.forEach(item => {

            if (item.wayCompanyId === wayCompanyId) {
                waybillTemplate = item.waybillTemplateList[platform]
                printId = item.printId === "仅获取电子面单号不打印面单" ? "isGenerateWaybillNoOnly" : item.printId
                // printId = item.printId
            }

        })

        let newOrderBtn = document.querySelector(".form-group.mr20>.radio-inline.mr10") as HTMLLabelElement


        let wayTemplateSelect = document.querySelector(".form-group.mr20>.form-control.waybill-template-select") as HTMLSelectElement

        // let orderBtn = document.querySelector(".form-group>.form-control.original-id-input-label>option[value=orderOriginalId]") as HTMLOptionElement
        let selectDom = document.querySelector("select.form-control.original-id-input-label") as HTMLSelectElement
        let inputDom = document.querySelector(".form-group>.form-control.original-id-input") as HTMLInputElement

        let searchDom = document.querySelector(".form-group>.btn.btn-primary") as HTMLButtonElement

        let printDom = document.querySelector("#elContainer>div>.form-inline.panel-border.p15.search-panel>div[class]>.form-group.mr20[style]>select.form-control") as HTMLSelectElement
        let autoDom = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[1] as HTMLSelectElement

        // 默认参数写死
        let hiddenInputDom = document.querySelector("#forcePrintMergerOrderInput") as HTMLInputElement

        //1.点击 获取新单号打印
        newOrderBtn.click()
        //2.选择快递单模板
        wayTemplateSelect.value = waybillTemplate! + ""
        wayTemplateSelect.dispatchEvent(new Event("change", { bubbles: true }))

        //3.点击订单编号
        selectDom.value = SelectOptions.orderOriginalId
        // @ts-ignore
        selectDom.dispatchEvent(new Event("change", { bubbles: true }))

        // 4. 选择打印机
        printDom!.value = printId!

        printDom.dispatchEvent(new Event("change", { bubbles: true }))
        // orderBtn.click()

        // 5.自动发货
        autoDom.value = "true"
        autoDom.dispatchEvent(new Event("change", { bubbles: true }))
        // 6.自己联系快递公司
        let bySelf = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div.mt10>div.form-group.mr20>select.form-control")[2] as HTMLSelectElement
        bySelf.value = "OFFLINE"
        bySelf.dispatchEvent(new Event("change", { bubbles: true }))
        //7.输入订单编号
        inputDom.value = orderNo

        // 8.默认参数写死
        hiddenInputDom.value = "true"

        //9.点击搜索并打印
        searchDom.click()

    })
}

//发货易页面

chrome.runtime.onMessage.addListener(function (message: Message, sender, response) {

    if (message.action === Print) {
        if (message.value.waybillNo) {
            printWayBillByOld(message.value.waybillNo, message.value.wayCompanyId)
        } else {
            const { orderNo, wayCompanyId, platform } = message.value

            printWayBillByNew({ orderNo, wayCompanyId, platform })
        }
    }


})

// 拿到打印机
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "getPrinter") {
        port.onMessage.addListener(function (msg) {

            if (msg.action === "getPrint") {

                // @ts-ignore
                let options: HTMLOptionElement[] = document.querySelectorAll("#elContainer>div>.form-inline.panel-border.p15.search-panel>div[class]>.form-group.mr20[style]>select.form-control>option")
                // console.log(2)
                // console.log(options, options[0].value, '3')

                let arr = []
                for (let i = 0; i < options.length; i++) {

                    arr.push(options[i].textContent)
                    // arr.push(options[i].value)
                }

                port.postMessage(arr)

            }
        })
    }
})

// 厂家content.js页面
// chrome.runtime.onMessage.addListener(function (message, sender, response) {
//     if (message.action === "newWaybillNo") {
//         window.postMessage(message, "*")
//     }
// })
// let FactoryPost = chrome.runtime.connect({ name: "getMessage" })
// FactoryPost.onMessage.addListener(function (msg) {
//     if (msg.action === "newWaybillNo") {
//         window.postMessage(msg, "*")
//     }
// })
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "sendNewWaybillNo") {

        // console.log(port, 'port')
        port.onMessage.addListener(function (msg) {
            // console.log(msg, 'msg')

            if (msg.action === "sendNewWaybillNo") {

                port.postMessage({ action: "answer" })


                window.postMessage({ action: "newWaybillNo", value: msg.value, result: msg.result }, '*')
            }
        })
    }

})

// inject.js

const startPrintWayBill = function (params: Params) {

    // 通知content.js触发事件
    window.postMessage({ action: "StartPrint", value: params }, "*")
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        window.onmessage = function (res) {
            if (res.data.action === "newWaybillNo") {
                res.data.value.includes("失败") ? reject(res.data) : resolve(res.data)

            }
        }
    })



};

/**
 * 发货易content
 */

window.addEventListener("message", function (msg) {

    if (msg.data.action === "sendNewWaybillNo") {

        // chrome.runtime.onConnect.addListener(function (port) {
        //     console.log(port, 'port')
        //     port.postMessage(msg.data)
        // })
        chrome.runtime.sendMessage(msg.data)
    }

})

function injectCustomjs() {

    let temp = document.createElement("script")
    temp.innerHTML = `window.startPrintWayBill=${startPrintWayBill}`
    document.body.appendChild(temp)


    let tbodyDom = document.querySelector("#elContainer>div>table>tbody")

    if (tbodyDom) {
        let observe = new MutationObserver(function (mutations, observe) {

            let td = mutations[0].addedNodes[0].childNodes[3]


            if (!td) return;
            let tdObserve = new MutationObserver(function (mutations, observe) {
                // console.log(mutations, 'mutations')
                mutations.forEach(item => {
                    item.addedNodes.forEach(node => {


                        // @ts-ignore
                        if (node.nodeType == 3 && node.parentElement?.className.includes("text-danger")) {

                            // @ts-ignore
                            return window.postMessage({ action: "sendNewWaybillNo", value: node?.wholeText, result: false }, "*")
                        }
                        if (node.nodeName == "DIV") {
                            let text = node.childNodes[2].textContent;

                            window.postMessage({ action: "sendNewWaybillNo", value: text, result: true }, "*")
                            // 从发货易页面发消息给bg
                            // chrome.runtime.sendMessage({ action: "newWaybillNo", value: text }, function (res) {

                            // })
                            // console.log("fahuoyi")
                            // let fahuoyiPort = chrome.runtime.connect({ name: "sendMessage" })
                            // fahuoyiPort.postMessage({ action: "newWaybillNo", value: text })
                            // chrome.runtime.onConnect.addListener(function (port) {
                            //     console.log(port, 'port')
                            //     port.postMessage({ action: "newWaybillNo", value: text })
                            // })

                        }
                    })
                })
            })
            tdObserve.observe(td, {
                childList: true,
                characterData: true,
                subtree: true,
                attributes: true
            })



        })


        observe.observe(tbodyDom!, {
            childList: true,

        })
    }

}



injectCustomjs()


