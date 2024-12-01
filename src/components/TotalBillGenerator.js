
import React from 'react';

const TotalBillGenerator = ({ items, taxRate, setTaxRate, discountRate, setDiscountRate }) => {
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
    <div className="total-bill-generator">
      <h3>Total</h3>
      <div>
        <p>Subtotal: {subtotal.toFixed(2)}</p>
        <p>Discount: -{discountAmount.toFixed(2)}</p>
        <p>Tax: +{taxAmount.toFixed(2)}</p>
        <p>Total: {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default TotalBillGenerator;

