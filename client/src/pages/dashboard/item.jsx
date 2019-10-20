import React, { Component } from 'react';

class Item extends Component {
  // countRenualDate = (date) => {
  //   //   const currentDate = new Date();
  //   //   if (currentDate < date) {
  //   //     return date - currentDate.getDate();
  //   //   } else {
  //   //     return (new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0)).getDate() -currentDate.getDate() + date;
  //   //   }
  //   // };

  dataFormat = (date) => {
    const result = date.split('T');

    return result[0];
  };

  numberWithCommas = (number) => {
    return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    const {logoURI, name, price, paymentDate} = this.props.data;
    const paymentDateFormat = this.dataFormat(paymentDate); // YYYY-MM-DD

    return (
      <>
        <div className="container w-100" id="inner-element">
          <div className="row">
            <div className="col">
              <img className="categories-inner-item-image" src={`${process.env.REACT_APP_IMAGE_URI}`+ logoURI} alt={name}/>
            </div>
            <div className="col">
                  ₩ {this.numberWithCommas(price)}
            </div>
            <div className="col">
              {paymentDateFormat}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Item;