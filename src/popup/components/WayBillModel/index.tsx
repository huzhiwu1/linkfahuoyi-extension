import React, { useState, useCallback, useEffect } from "react";
import { Select, Button } from "antd";
import "./index.scss";

const { Option } = Select
export interface IwaybillTemplate {
    name: string,
    value: string
}
interface Item {
    wayCompanyId: string | undefined,
    waybillTemplateList: (string | undefined)[]
    printId: string | undefined
}
type List = Item[]

//
const AllWayCompany = [
    { name: "圆通速递", value: "YTO" }
    , { name: "申通快递", value: "STO" }
    , { name: "中通快递", value: "ZTO" }
    , { name: "韵达快递", value: "YUNDA" }
    , { name: "顺丰速运", value: "SF" }
    , { name: "百世快递", value: "HTKY" }
    , { name: "EMS", value: "EMS" }
    , { name: "EMS经济快递", value: "EYB" }
    , { name: "邮政标准快递", value: "DISTRIBUTOR_1715055" }
    , { name: "邮政快递包裹", value: "POSTB" }
    , { name: "中国邮政", value: "POST" }
    , { name: "京东快递", value: "EX_JD_EXPRESS" }
    , { name: "天天快递", value: "TTKDEX" }
    , { name: "国通快递", value: "GTO" }
    , { name: "安能快递(小包)", value: "DISTRIBUTOR_12017865" }
    , { name: "安能物流", value: "ANE56" }
    , { name: "全峰快递", value: "QFKD" }
    , { name: "联邦快递", value: "FEDEX" }
    , { name: "德邦快递", value: "DBKD" }
    , { name: "德邦物流", value: "DBL" }
    , { name: "宅急送", value: "ZJS" }
    , { name: "优速快递", value: "UC" }
    , { name: "龙邦速递", value: "LB" }
    , { name: "亚风", value: "AIR" }
    , { name: "天地华宇", value: "HOAU" }
    , { name: "速尔快运", value: "SURE" }
    , { name: "大田", value: "DTW" }
    , { name: "保宏物流", value: "BHWL" }
    , { name: "发网", value: "UNIPS" }
    , { name: "长发", value: "YUD" }
    , { name: "长宇", value: "CYEXP" }
    , { name: "远长", value: "YC" }
    , { name: "东方汇", value: "DFH" }
    , { name: "飞远配送 ", value: "GZLT" }
    , { name: "派易国际物流77", value: "PKGJWL" }
    , { name: "信丰物流", value: "XFWL" }
    , { name: "飞远(爱彼西)配送", value: "HZABC" }
    , { name: "华强物流", value: "SHQ" }
    , { name: "百世物流", value: "BEST" }
    , { name: "新邦物流", value: "XB" }
    , { name: "美国速递", value: "MGSD" }
    , { name: "远成快运", value: "YCKY" }
    , { name: "品骏快递", value: "PJBEST" }
    , { name: "苏宁物流", value: "DISTRIBUTOR_13452378" }
    , { name: "WnDirect", value: "WND" }
    , { name: "能达速递", value: "NEDA" }
    , { name: "黑猫宅急便", value: "YCT" }
    , { name: "D速物流", value: "DISTRIBUTOR_13460212" }
    , { name: "联昊通", value: "LTS" }
    , { name: "E速宝", value: "ESB" }
    , { name: "佳吉快递", value: "CNEX" }
    , { name: "广东EMS", value: "GDEMS" }
    , { name: "增益速递", value: "QRT" }
    , { name: "全一快递", value: "UAPEX" }
    , { name: "快捷快递", value: "FAST" }
    , { name: "中铁快运", value: "CRE" }
    , { name: "速通物流", value: "EX_SUT56" }
    , { name: "顺丰快运", value: "EX_SFKY" }
    , { name: "速腾快递", value: "EX_STE56" }
    , { name: "顺心捷达", value: "DISTRIBUTOR_13484485" }
    , { name: "宽昊物流", value: "EX_KHWL" }
    , { name: "都市节奏", value: "EX_DSJZ" }
    , { name: "众邮快递", value: "EX_ZYKD" }
    , { name: "京东快运", value: "EX_JDKY" }
    , { name: "DN快递", value: "EX_TOPSPEED_DN" }
    , { name: "九曳供应链", value: "DISTRIBUTOR_13323734" }
    , { name: "重庆华宇物流", value: "EX_CQHY" }
    , { name: "极兔速递", value: "EX_JTSD" }
    , { name: "丹鸟", value: "DISTRIBUTOR_13503931" }
    , { name: "如风达配送", value: "BJRFD-001" }
    , { name: "韵达点通达", value: "EX_YUNDA_DTD" }
    , { name: "壹米滴答", value: "YMDD" }
    , { name: "百世国际", value: "DISTRIBUTOR_13433751" }
    , { name: "安迅物流", value: "DISTRIBUTOR_13365751" }
    , { name: "承诺达特快", value: "DISTRIBUTOR_13469985" }
    , { name: "沃埃家", value: "EX_WOWVIP" }
    , { name: "京广速递", value: "EX_SZKKE" }
    , { name: "鸿昌物流", value: "EX_HC" }
    , { name: "华企快运", value: "EX_HUAQIEX" }
    , { name: "中骅物流", value: "EX_CHUNGHWA56" }
    , { name: "百世快运", value: "BESTQJT" }
    , { name: "运通速运", value: "WTO" }
    , { name: "中通快运", value: "DISTRIBUTOR_13222803" }
    , { name: "菜鸟大件-日日顺配", value: "DISTRIBUTOR_13159132" }
    , { name: "安世通快递", value: "DISTRIBUTOR_13415300" }
    , { name: "百世云配", value: "DISTRIBUTOR_13468073" }
    , { name: "韵达快运", value: "DISTRIBUTOR_13421750" }
    , { name: "中通国际直邮", value: "DISTRIBUTOR_13196453" }
    , { name: "京东大件开放承运商", value: "EX_JD_HPCP" }
    , { name: "加运美速递", value: "DISTRIBUTOR_13468074" }
    , { name: "中运全速", value: "EX_TOPSPEED" }
    , { name: "其他", value: "OTHER" }
    , { name: "跨越速运", value: "DISTRIBUTOR_13211725" }
    , { name: "菜鸟大件-中铁配", value: "DISTRIBUTOR_13148625" }
]

const PlatformsMap = new Map([
    [0, /.+:\/\/a.*\.fahuoyi.com\//],
    [1, /.+:\/\/pdd.*\.fahuoyi.com\//],
    [2, /.+:\/\/jd.*\.fahuoyi.com\//]
])
const WayBillModel = function () {

    const [list, setList] = useState<List>([])
    const [AWaybillTemplate, setAWaybillTemplate] = useState<IwaybillTemplate[]>([])
    const [PDDWaybillTemplate, setPDDWaybillTemplate] = useState<IwaybillTemplate[]>([])
    const [JDWaybillTemplate, setJDWaybillTemplate] = useState<IwaybillTemplate[]>([])

    const [printList, setPrintList] = useState<string[]>([])


    const setMap = new Map([
        [0, setAWaybillTemplate],
        [1, setPDDWaybillTemplate],
        [2, setJDWaybillTemplate]
    ])
    const getMap = new Map([
        [0, AWaybillTemplate],
        [1, PDDWaybillTemplate],
        [2, JDWaybillTemplate]
    ])
    // 获取发货易快递模板列表
    const getWaybillTemplate = useCallback(async () => {
        chrome.tabs.query({
            url: "*://*.fahuoyi.com/scanPrinting/index"
        }, async function (tabs) {


            let platformUrls: string[] = []
            for (let value of PlatformsMap.values()) {

                let prefixUrl: string;
                tabs.forEach(tab => {
                    console.log(value.test(tab.url!))
                    if (tab.url && value.test(tab.url!)) {
                        prefixUrl = tab.url.match(value)![0]
                        console.log(prefixUrl, 'url')
                    }
                })

                platformUrls.push(prefixUrl!)

                console.log(platformUrls, 'platformUrls')
            }
            for (let index in platformUrls) {
                let prefix = platformUrls[index]
                console.log(prefix, 'prefix')
                let data = prefix ? await fetch(prefix + "waybillTemplate/listRest?_=" + new Date().getTime(), { method: "GET" }).then(res => {
                    console.log("2")
                    return res.json()

                }) : []
                console.log("3")
                console.log(data, 'data')
                setMap.get(Number(index))!(pre => {
                    // @ts-ignore
                    return data.map(dataItem => ({
                        name: dataItem.name,
                        value: dataItem.id
                    }))
                })
            }



        })

    }, [])

    const getPrintList = useCallback(async () => {
        chrome.tabs.query({
            url: "*://*.fahuoyi.com/scanPrinting/index"
        }, async function (tabs) {

            if (tabs.length >= 1) {
                let port = chrome.tabs.connect(tabs[0].id!, { name: "getPrinter" });
                port.postMessage({ action: "getPrint" })
                port.onMessage.addListener(function (msg) {
                    setPrintList(msg)
                })


            }

        })

    }, [])

    useEffect(() => {
        getWaybillTemplate()
        getPrintList()
        chrome.storage.local.get({ list: [{ wayCompanyId: undefined, waybillTemplateList: [undefined, undefined, undefined], printId: undefined }] }, function (res) {
            if (res.list.length === 0) {
                chrome.storage.local.set({ list: [{ wayCompanyId: undefined, waybillTemplateList: [undefined, undefined, undefined], printId: undefined }] }, function () {
                    setList([{ wayCompanyId: undefined, waybillTemplateList: [undefined, undefined, undefined], printId: undefined }])
                })
            } else {
                setList(res.list as List)
            }

        })
    }, [])

    useEffect(() => {
        chrome.storage.local.set({ list: list })
    }, [list])
    const onChangeWayCompany = useCallback((value: string, wayIndex: number) => {
        setList(pre => {
            const newList = [...pre]
            newList[wayIndex].wayCompanyId = value
            return newList;
        })
    }, [])

    const onChangeWayTemplate = useCallback((e: string, wayIndex: number, tempIndex: number) => {
        setList(pre => {
            const newList = [...pre]
            newList[wayIndex].waybillTemplateList[tempIndex] = e;
            return newList
        })
    }, [])

    const onChangePrint = useCallback((e: string, wayIndex: number) => {
        setList(pre => {
            const newList = [...pre]
            newList[wayIndex].printId = e;
            return newList;
        })
    }, [])

    // 新增快递
    const handleAddWay = useCallback(() => {
        setList(pre => {
            const newState = [...pre]
            newState.push({ wayCompanyId: undefined, waybillTemplateList: [undefined, undefined, undefined], printId: undefined })
            return newState;
        })
    }, [])

    // 删除
    const remove = useCallback((index: number) => {
        setList(pre => {
            const newState = [...pre]
            newState.splice(index, 1)
            return newState
        })
    }, [])

    return (
        <>
            <div className="waybill-model">
                <span className="waybill-model-title" key="one">选择快递</span>
                <span className="waybill-model-title" key="two">选择淘系及其他平台订单模板</span>
                <span className="waybill-model-title" key="three">选择拼多多订单模板</span>
                <span className="waybill-model-title" key="four">选择京东订单模板</span>
                <span className="waybill-model-print" key="seven">打印机</span>
                <span className="waybill-model-title" key="five">操作</span>
                {
                    list.map((item, wayIndex) => {
                        return <>
                            <Select
                                showSearch
                                key={ wayIndex + "wayCompany" }
                                style={ { width: 150 } }
                                placeholder="请选择快递"
                                optionFilterProp="children"
                                onChange={ (value) => onChangeWayCompany(value, wayIndex) }
                                value={ item.wayCompanyId }
                            >
                                {
                                    AllWayCompany.map((item, index) => {
                                        return <Option key={ index } value={ item.value }>{ item.name }</Option>
                                    })
                                }
                            </Select>
                            {
                                item.waybillTemplateList.map((item, tempIndex) => {
                                    return <Select
                                        key={ tempIndex + "wayTemplate" }
                                        showSearch
                                        style={ { width: 150 } }
                                        placeholder="选择快递模板"
                                        optionFilterProp="children"
                                        onChange={ (value) => onChangeWayTemplate(value, wayIndex, tempIndex) }
                                        value={ item }
                                    >
                                        {
                                            getMap.get(tempIndex)!.map((item, index) => {
                                                return <Option key={ index } value={ item.value }>{ item.name }</Option>
                                            })
                                        }
                                    </Select>
                                })
                            }
                            <Select
                                key={ item.printId + 'print' }
                                showSearch
                                style={ { width: 150 } }
                                placeholder="选择打印机"
                                optionFilterProp="children"
                                onChange={ (value) => onChangePrint(value, wayIndex) }
                                value={ item.printId }
                            >
                                {
                                    printList.map((item, index) => {
                                        return <Option key={ index } value={ item }>{ item }</Option>
                                    })
                                }
                            </Select>
                            <Button type="default" key={ item.printId + "btn" } style={ { padding: "0 5px" } } onClick={ () => remove(wayIndex) }>删除</Button>
                        </>
                    })
                }
            </div>
            <Button type="link" onClick={ handleAddWay }>新增快递</Button>
        </>
    )
}

export default WayBillModel