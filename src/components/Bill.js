import React from 'react';

const Bill = ({ billFrom, billTo, currency, taxRate, discountRate, items }) => {
  const calculateTotal = () => {
    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.quantity * item.rate;
    });
    const discountAmount = (subtotal * discountRate) / 100;
    const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
    const total = subtotal - discountAmount + taxAmount;
    return { subtotal, discountAmount, taxAmount, total };
  };
  const { subtotal, discountAmount, taxAmount, total } = calculateTotal();
  return (
    <div className="bill-section">
     <div className='x'>
       <h3>Preview</h3>
  </div>

      <div className="bill-info">
        <div className="bill-from">
          <h4>Bill From:</h4>
          <p>{billFrom.name}</p>
          <p>{billFrom.email}</p>
          <p>{billFrom.address}</p>
        </div>

        <div className="bill-to">
          <h4>Bill To:</h4>
          <p>{billTo.name}</p>
          <p>{billTo.email}</p>
          <p>{billTo.address}</p>
        </div>
      </div>

      <div className="bill-details">
        <p>Currency: {currency}</p>
        <p>Tax Rate: {taxRate}%</p>
        <p>Discount Rate: {discountRate}%</p>
        <p>Subtotal: {subtotal.toFixed(2)}</p>
        <p>Discount: -{discountAmount.toFixed(2)}</p>
        <p>Tax: +{taxAmount.toFixed(2)}</p>
        <p>Total: {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Bill;
