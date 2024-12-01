
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import BillDetails from './BillDetails';
import ItemList from './ItemList';
import TotalBillGenerator from './TotalBillGenerator';
import ReviewSection from './ReviewSection';
import Bill from './Bill';
function InvoiceForm() {
  const [items, setItems] = useState([{ name: '', description: '', quantity: '', rate: '' }]);
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [billFrom, setBillFrom] = useState({ name: '', email: '', address: '' });
  const [billTo, setBillTo] = useState({ name: '', email: '', address: '' });
  const [currency, setCurrency] = useState('USD');

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    let yPos = 20; // Initial vertical position

    // Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Bill', 105, yPos, { align: 'center' });
  
    yPos += 20;
  
    // Dates and bill Number
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Current Date: ${new Date().toLocaleDateString()}`, 10, yPos);
    doc.text(`Due Date: ${document.querySelector('input[type="date"]')?.value || 'N/A'}`, 10, yPos + 10);
    doc.text(`Bill Number: ${document.querySelector('input[type="number"]')?.value || '1'}`, 10, yPos + 20);
  
    yPos += 30;
  
    // Bill From
    doc.setFont('helvetica', 'bold');
    doc.text('Bill From:', 10, yPos); // Left side
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${billFrom.name || 'N/A'}`, 10, yPos + 10);
    doc.text(`Email: ${billFrom.email || 'N/A'}`, 10, yPos + 20);
    doc.text(`Address: ${billFrom.address || 'N/A'}`, 10, yPos + 30);
  
    // Bill To
    const rightAlignX = 120; // Adjust the X position to align "Bill To" to the right
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', rightAlignX, yPos); // Right side
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${billTo.name || 'N/A'}`, rightAlignX, yPos + 10);
    doc.text(`Email: ${billTo.email || 'N/A'}`, rightAlignX, yPos + 20);
    doc.text(`Address: ${billTo.address || 'N/A'}`, rightAlignX, yPos + 30);
  
    yPos += 40;
  
    // Items
    doc.setFont('helvetica', 'bold');
    doc.text('Items:', 10, yPos);
    yPos += 10;
  
    doc.setFont('helvetica', 'normal');
    items.forEach((item, index) => {
      // Add a new page if the content overflows
      if (yPos + 10 > pageHeight - 20) {
        doc.addPage();
        yPos = 20; // Reset vertical position
      }
  
      doc.text(`${index + 1}. ${item.name}`, 10, yPos);
      doc.text(`Description: ${item.description}`, 40, yPos);
      doc.text(`Quantity: ${item.quantity}`, 120, yPos);
      doc.text(`Rate: ${currency} ${item.rate.toFixed(2)}`, 150, yPos);
      yPos += 10;
    });
  
    // Totals
    if (yPos + 40 > pageHeight - 20) {
      doc.addPage();
      yPos = 20;
    }
  
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const discount = (subtotal * discountRate) / 100;
    const tax = ((subtotal - discount) * taxRate) / 100;
    const total = subtotal - discount + tax;
  
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Total Summary:', 10, yPos);
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal: ${currency} ${subtotal.toFixed(2)}`, 10, yPos);
    yPos += 10;
    doc.text(`Discount (${discountRate}%): -${currency} ${discount.toFixed(2)}`, 10, yPos);
    yPos += 10;
    doc.text(`Tax (${taxRate}%): +${currency} ${tax.toFixed(2)}`, 10, yPos);
    yPos += 10;
    doc.text(`Total: ${currency} ${total.toFixed(2)}`, 10, yPos);
  
    doc.save('Bill.pdf');
  };
  
  return (
    <div className="invoice-form">
      <header>
        <h2>SwiftBill</h2>
        <div>
          <label>
            Current Date: <input type="text" value={new Date().toLocaleDateString()} readOnly />
          </label>
          <label>
            Due Date: <input type="date" />
          </label>
          <label>
            Bill Number: <input type="number" defaultValue={1} />
          </label>
        </div>
      </header>

      <BillDetails
        billFrom={billFrom}
        setBillFrom={setBillFrom}
        billTo={billTo}
        setBillTo={setBillTo}
      />

      {/* Items Section */}
      <ItemList items={items} setItems={setItems} />

      <ReviewSection
        currency={currency}
        setCurrency={setCurrency}
        taxRate={taxRate}
        setTaxRate={setTaxRate}
        discountRate={discountRate}
        setDiscountRate={setDiscountRate}
      />

      <TotalBillGenerator
        items={items}
        taxRate={taxRate}
        setTaxRate={setTaxRate}
        discountRate={discountRate}
        setDiscountRate={setDiscountRate}
      />

      <Bill 
        billFrom={billFrom}
        billTo={billTo}
        currency={currency}
        taxRate={taxRate}
        discountRate={discountRate}
        items={items}
      />
      <button className="generate-pdf-btn" onClick={generatePDF}>
        Generate PDF
      </button>
    </div>
  );
}

export default InvoiceForm;
