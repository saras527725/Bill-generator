import React from 'react';
const ReviewSection = ({ currency, setCurrency, taxRate, setTaxRate, discountRate, setDiscountRate }) => {
  return (
    <div className="review-invoice">
      <h3>Billing Summary</h3>
      <div className='container'>
        Currency: 
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD (United States Dollar)</option>
          <option value="EUR">EUR (Euro)</option>
          <option value="INR">INR (Indian Rupee)</option>
          {/* Add more currencies as needed */}
        </select>
      <div>
        Tax Rate (%): 
        <input 
          type="number" 
          value={taxRate} 
          onChange={(e) => setTaxRate(e.target.value)} 
          min="0" 
        />
      </div>

      <div>
        Discount Rate (%): 
        <input 
          type="number" 
          value={discountRate} 
          onChange={(e) => setDiscountRate(e.target.value)} 
          min="0" 
        />
      </div>
      </div>
      
      {/* <div className='a'>
      display=flex;
      </div> */}
    </div>
  );
};

export default ReviewSection;
