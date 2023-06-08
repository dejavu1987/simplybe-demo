import React from "react";
import Truck from "../../images/truck.svg"
import Infinity from "../../images/infinity.png"
import Parcel from "../../images/parcel.svg"

const SecondTab = () => {
  return (
    <div className="SecondTab">
      <div className="delivery-returns tab-content">
        <div className="delivery">
          <h3><img src={Truck} alt="Delivery" />Delivery</h3>
          <div className="annual">
            <img src={Infinity} />
            <div className="unlimited">
              <p>Be unlimited - £10.99</p>
              <p className="tagline">Get unlimited delivery for a whole year!</p>
              <a className="info" href="#">Find out more</a>
            </div>
          </div>
          <div className="shipping-type standard">
            <h4>Standard Delivery - £3.99</h4>
            <p>Delivered within 3 to 5 working days</p>
          </div>
          <div className="shipping-type next-day">
            <h4>Next Day Delivery - £5.99</h4>
            <p>Delivered next day if ordered before 11pm (exc. Sundays/Bank holidays)</p>
          </div>
          <div className="shipping-type click-collect">
            <h4>Click & Collect - FREE</h4>
            <p>Available to collect within 3 to 5 working days</p>
          </div>
          <div className="delivery-info">
            <p>Choose your delivery method at checkout.</p>
            <p>These options are only available if you live in an area covered by our courier.
              For full details see our <a href="#" className="info">delivery policy</a>.</p>
          </div>
        </div>
        <div className="returns">
          <h3><img src={Parcel} alt="Returns" />Returns</h3>
          <div className="">
            <h4>Easy, free returns</h4>
            <p>If for any reason you want to return an item simply send it back in new condition within 28 days using
              one of our flexible options. For full details please visit our <a href="#" className="info">returns policy</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SecondTab;