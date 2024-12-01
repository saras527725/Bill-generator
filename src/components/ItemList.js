
import React from 'react';

function ItemList({ items, setItems }) {
  const addItem = () => {
    setItems([...items, { name: '', description: '', quantity: '', rate: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
};

  return (
    <section className="items">
      <h3>Items</h3>
      {items.map((item, index) => (
        <div key={index} className="item-row">
          <input className='data'
            placeholder="Item name"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
          />
          <input className='data'
            placeholder="Item description"
            value={item.description}
            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
          />
          <input className='num' 
          placeholder='quantity'
          type="number" 
          value={item.quantity} 
          onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
          min="0" 
        />

          <input className='num'
            placeholder='rate'
            type="number"
            value={item.rate}
            onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
            min="0"
          />
          <button className='remove' onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}
      <button className='add' onClick={addItem}>Add Item</button>
    </section>
  );
}

export default ItemList;
