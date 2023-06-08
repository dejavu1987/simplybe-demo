import React, { useState } from "react";
import FirstTab from "./FirstTab"
import SecondTab from "./SecondTab"

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  return (
    <div className="tabs">
      <ul className="nav">
        <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>
          <div className="wrapper">
            <p className="title">Product Details</p>
            <p>Description, fabric details, care instructions</p>
          </div>
        </li>
        <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>
          <div className="wrapper">
            <p className="title">Delivery & Returns</p>
            <p>Free Click and Collect on orders over £40</p>
          </div>
        </li>
      </ul>
      <div className="tab-holder">
        {activeTab === "tab1" ? <FirstTab /> : <SecondTab />}
      </div>
    </div>
  );
};
export default Tabs;