import React,{ useCallback, useContext, useEffect, useState } from "react";
import { Checkbox } from "antd";
const IsAutoEmit = function () {
     const [checked, setChecked] = useState<boolean>(false)
    

    const changeRadio = useCallback((e) => {
        setChecked(e.target.checked)
    }, [])
    
    useEffect(() => {
        chrome.storage.local.get({ isAutoEmit: false }, function (res) {
   
            setChecked(res.isAutoEmit)
        })
    }, [])
    useEffect(() => {
        chrome.storage.local.set({isAutoEmit:checked})
    },[checked])
    return <>
        <span className="waybill-panel-title">自动发货</span>
        <Checkbox checked={ checked } onChange={ changeRadio } style={ { marginLeft: "13px" } }>打印成功后自动发货</Checkbox>
    </>
}

export default IsAutoEmit