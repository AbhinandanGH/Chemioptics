import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./SamplePage.css";




const SamplePage = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const storedSamples = JSON.parse(localStorage.getItem("samplesData")) || [];
    setSamples(storedSamples);

    // Fetch the most recently stored name from the server
    fetch('/api/getName')
      .then(response => response.json())
      .then(data => {
        if (data.name) {
          setName(data.name);
        } else {
          console.error('Error: Name not found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching name:', error);
      });
  }, []);


  const handleSampleClick = (sampleId, labCode) => {
    localStorage.setItem("selectedSampleId", sampleId);
    localStorage.setItem("selectedLabCode", labCode);
    setName(sampleId); // Set the selected sample ID as the name
  };
  
  const handleGenerateBill = () => {
    const pdf = new jsPDF({ // Creating a new instance of jsPDF
      orientation: "landscape", // Setting orientation to landscape
      unit: "mm", // Setting unit to millimeter
      format: [297, 210], // Setting page format to A4
    });

    const companyName = "CHEMIOPTICS LABS"; // Setting company name
    const companyAddress =
      "R.H.KULKARNI COMPLEX, BVB COLLEGE CAMPUS\nVIDYANAGAR, HUBLI DHARWAD, KARNATAKA 580031"; // Setting company address

    const billDate = new Date().toLocaleDateString("en-IN", { // Getting current date in Indian English format
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const customerName = "To, " + name; // Setting customer name using fetched name
    const cin = "CIN: UBSIDOTG2019PTC138544"; // Setting CIN
    const gstin = "GSTIN: 29AAICC4517DIZS"; // Setting GSTIN
    const customerNo = "CUSTOMER No: 1025"; // Setting customer number
    const invoiceNo = "TAX INVOICE NO: CHPL"; // Setting invoice number

    pdf.setFontSize(14); // Setting font size
    pdf.text(`DATE: ${billDate}`, 270, 10, { align: "right" }); // Adding bill date to PDF

    pdf.setFont("helvetica", "normal"); // Setting font to normal
    pdf.text(customerName, 10, 30); // Adding customer name to PDF

    // Setting the font size for additional information
    const smallFontSize = 10;
    pdf.setFontSize(smallFontSize);

    // Adding additional information to PDF
    pdf.text(cin, 250, 35, { align: "right" });
    pdf.text(gstin, 250, 40, { align: "right" });
    pdf.text(customerNo, 250, 45, { align: "right" });
    pdf.text(invoiceNo, 250, 50, { align: "right" });

    const centerPosX = pdf.internal.pageSize.getWidth() / 2; // Calculating center position of page

    pdf.setFontSize(14); // Setting font size for company name
    pdf.setFont("helvetica", "bold"); // Setting font to bold for company name
    const companyNameY = 10;
    pdf.text(companyName, centerPosX, companyNameY, { align: "center" }); // Adding company name to PDF

    pdf.setFontSize(10); // Setting font size for company address
    const lines = pdf.splitTextToSize(companyAddress, pdf.internal.pageSize.getWidth() - 20); // Splitting address lines
    const addressHeight = lines.length * 5;
    const addressY = companyNameY + 5;
    pdf.text(lines, centerPosX, addressY, { align: "center" }); // Adding company address to PDF

    const tableHeaders = ["S.No", "DESCRIPTION", "AMOUNT (In Rs)"]; // Defining table headers
    const tableHeaderXOffsets = [10, 40, 140]; // Defining table header X offsets
    const tableHeaderYOffset = 60; // Defining table header Y offset

    pdf.setFontSize(10); // Setting font size for table headers
    pdf.setFont("helvetica", "bold"); // Setting font to bold for table headers
    tableHeaders.forEach((header, index) => { // Adding table headers to PDF
      pdf.text(header, tableHeaderXOffsets[index], tableHeaderYOffset);
    });

    let tableRowYOffset = tableHeaderYOffset + 5; // Initializing table row Y offset
    samples.forEach((sample, rowIndex) => { // Iterating over samples
      const slNo = rowIndex + 1; // Calculating serial number
      const description = ` ${sample.sampleId}`; // Generating sample description
      const amount = GetTestPrice(sample.sampleId); // Getting test price

      pdf.setFont("helvetica", "normal"); // Setting font to normal for table content
      pdf.text(slNo.toString(), tableHeaderXOffsets[0], tableRowYOffset); // Adding serial number to PDF
      pdf.text(description, tableHeaderXOffsets[1], tableRowYOffset, { // Adding description to PDF
        width: 80,
        align: "left",
      });
      pdf.text(amount.toString(), tableHeaderXOffsets[2], tableRowYOffset); // Adding amount to PDF
      tableRowYOffset += 7; // Incrementing table row Y offset
    });

    const tableFooterYOffset = tableRowYOffset + 10; // Calculating table footer Y offset
    const rightAlignedXPosition = pdf.internal.pageSize.getWidth() - 10; // Calculating right-aligned X position

    // Adding total (before tax) to PDF
    pdf.text("Total (Before Tax):", rightAlignedXPosition - 150, tableFooterYOffset);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset);
    pdf.text(`${total.toFixed(2)}`, rightAlignedXPosition - 92, tableFooterYOffset);

    // Adding CGST to PDF
    pdf.text("CGST (9%)", rightAlignedXPosition - 150, tableFooterYOffset + 10);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset + 10);
    pdf.text(`${cgst}`, rightAlignedXPosition - 92, tableFooterYOffset + 10);

    // Adding SGST to PDF
    pdf.text("SGST (9%)", rightAlignedXPosition - 150, tableFooterYOffset + 20);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset + 20);
    pdf.text(`${sgst}`, rightAlignedXPosition - 92, tableFooterYOffset + 20);

    pdf.setFont("helvetica", "bold"); // Setting font to bold for grand total
    // Adding grand total to PDF
    pdf.text("Grand Total:", rightAlignedXPosition - 150, tableFooterYOffset + 30);
    pdf.text("INR", rightAlignedXPosition - 100, tableFooterYOffset + 30);
    pdf.text(`${totalaftertax}`, rightAlignedXPosition - 92, tableFooterYOffset + 30);

    const fileName = `bill_${name}.pdf`; // Generating file name
    pdf.save(fileName); // Saving PDF with the given file name
  };

  const GetTestPrice = (sampleId) => { // Function to get test price based on sample ID
    switch (sampleId) {
      // Define test prices for different sample IDs
      case "WasteWaterPremium":
        return 2000;
      case "WasteWaterComplete":
        return 2500;
      case "ConstructionWater":
        return 1500;
      case "DrinkingWaterPremium":
        return 850;
      case "DrinkingWaterComplete":
        return 1500;
      case "GroundWaterPremium":
        return 1200;
      case "GroundWaterComplete":
        return 1500;
      case "IrrigationWater":
        return 1200;
      case "SurfaceWater":
        return 1500;
      default:
        break;
    }
  };

  const total = samples.reduce((acc, sample) => { // Calculating total price
    const samplePrice = GetTestPrice(sample.sampleId);
    return acc + samplePrice;
  }, 0);

  // Calculating CGST and SGST
  const cgst = (total * 0.09).toFixed(2);
  const sgst = (total * 0.09).toFixed(2);
  const totalaftertax = (parseFloat(total) + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

  return (
    <div className="samplePage">
      <h1>CHEMIOPTICS LABS</h1>
      <div className="sample-page-title">
        <p>Samples</p>
      </div>

      <ul>
        {samples.map((sample, index) => ( // Mapping over samples to display each sample
          <Link
          key={index}
          to={{
            pathname: `/ticksheet/${index}`,
            state: { sample, name }, // Pass the name as part of the state
          }}
        >
          <li onClick={() => handleSampleClick(sample.sampleId, sample.labCode)}>
            <div className="sampleDescription">
              <div>
                Sample ID {index + 1}: <p>{sample.sampleId}</p>
              </div>
              <div>
                Lab Code: <p id="labcode">{sample.labCode}</p>
              </div>
              <p id="testPrice">INR: {GetTestPrice(sample.sampleId)}</p>
            </div>
          </li>
        </Link>
        ))}
      </ul>
      <div className="sampleTotal">
        <div id="total">Total: INR {total}</div>
        <div id="cgst">CGST (9%): INR {cgst}</div>
        <div id="sgst">SGST (9%): INR {sgst}</div>
        <div id="totalaftertax">Grand Total: INR {totalaftertax}</div>
      </div>
      <div className="billButton">
      <button onClick={handleGenerateBill}>Generate Bill</button> {/* Button to generate bill */}
      </div>
      
    </div>
  );
};

export default SamplePage;

