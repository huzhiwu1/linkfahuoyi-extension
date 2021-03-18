import React from "react";
import WayBillModel from "./components/WayBillModel";
import IsAutoEmit from "./components/IsAutoEmit";

import "./popup.scss"


const Popup = function () {

    return (
        <div className="popup-page">
            <span className="popup-page-title">打单设置</span>
            <div className="waybill-panel">
                <span className="waybill-panel-title">电子面单模板</span>
                <div className="waybill-model-wrap">
                    <WayBillModel />
                </div>
            </div>
            <div className="waybill-panel">

                {/* <IsAutoEmit /> */ }
            </div>
        </div>
    )
}

export default Popup;