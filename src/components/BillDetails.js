
import React from 'react';

function BillDetails({ billFrom, setBillFrom, billTo, setBillTo }) {
  const handleChange = (event, type, key) => {
    if (type === 'from') {
      setBillFrom({ ...billFrom, [key]: event.target.value });
    } else {
      setBillTo({ ...billTo, [key]: event.target.value });
    }
  };

  return (
    <section className="billing-info">
      <div className="bill-from">
        <h3>Bill from:</h3>
        <input
          placeholder="Bill From"
          value={billFrom.name}
          onChange={(e) => handleChange(e, 'from', 'name')}
        />
        <input
          placeholder="Email address"
          value={billFrom.email}
          onChange={(e) => handleChange(e, 'from', 'email')}
        />
        <input
          placeholder="Billing address"
          value={billFrom.address}
          onChange={(e) => handleChange(e, 'from', 'address')}
        />
      </div>
      <div className="bill-to">
        <h3>Bill to:</h3>
        <input
          placeholder="Bill To"
          value={billTo.name}
          onChange={(e) => handleChange(e, 'to', 'name')}
        />
        <input
          placeholder="Email address"
          value={billTo.email}
          onChange={(e) => handleChange(e, 'to', 'email')}
        />
        <input
          placeholder="Billing address"
          value={billTo.address}
          onChange={(e) => handleChange(e, 'to', 'address')}
        />
      </div>
    </section>
  );
}

export default BillDetails;
