import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './ticksheet.css';

const Ticksheet = () => {
  const [samples, setSamples] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);
  const [manuallySelectedParameters, setManuallySelectedParameters] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const sample = location.state;
  const sampleId = location.state?.name || '';

  useEffect(() => {
    const storedSamples = JSON.parse(localStorage.getItem('samplesData')) || [];
    setSamples(storedSamples);

    const storedManuallySelectedParameters = JSON.parse(localStorage.getItem('manuallySelectedParameters')) || [];
    setManuallySelectedParameters(storedManuallySelectedParameters);

    const storedSelectedParameters = JSON.parse(localStorage.getItem('selectedParameters')) || [];
    setSelectedParameters(storedSelectedParameters);

    const sampleId = localStorage.getItem('selectedSampleId');
    if (sampleId) {
      selectWaterBasedOnSampleId(sampleId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedParameters', JSON.stringify(selectedParameters));
  }, [selectedParameters]);

  const handleCheckboxChange = (parameterId) => {
    setSelectedParameters((prev) => {
      if (prev.includes(parameterId)) {
        return prev.filter((p) => p !== parameterId);
      } else {
        return [...prev, parameterId];
      }
    });
  };

  const selectWaterBasedOnSampleId = (sampleId) => {
    switch (sampleId) {
      case 'WasteWaterPremium':
        selectWastePremium();
        break;
      case 'WasteWaterComplete':
        selectWasteComplete();
        break;
      case 'ConstructionWater':
        selectConstruction();
        break;
      case 'DrinkingWaterPremium':
        selectDrinkingPremium();
        break;
      case 'DrinkingWaterComplete':
        selectDrinkingComplete();
        break;
      case 'GroundWaterPremium':
        selectGroundWaterPremium();
        break;
      case 'GroundWaterComplete':
        selectGroundWaterComplete();
        break;
      case 'IrrigationWater':
        selectIrrigation();
        break;
      case 'SurfaceWater':
        selectSurface();
        break;
      default:
        break;
    }
  };

  const selectWastePremium = () => {
    const wasteParameters = [
      'Acidity as CaCO3', 'Boron as B', 'Calcium as Ca', 'Chemical Oxygen Demand (COD)', 
      'Chloride as Cl', 'Conductivity @25°C', 'Dissolved Oxygen', 'Fluoride as F', 
      'Free CO2', 'Hardness as CaCO3', 'Nitrate as NO3-N', 'Oil and Grease', 
      'pH', 'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2'
    ];
    setSelectedParameters(wasteParameters);
  };

  const selectWasteComplete = () => {
    const wasteParameters = [
      'Acidity as CaCO3', 'Bicarbonates as HCO3', 'Biochemical Oxygen demand (BOD) for 3days @27°C', 
      'Boron as B', 'Calcium as Ca', 'Carbonates as CO2', 'Chemical Oxygen Demand (COD)', 
      'Chloride as Cl', 'Chlorine Residual', 'Color, Hazen', 'Conductivity @25°C', 
      'Dissolved Oxygen', 'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 
      'Magnesium as Mg', 'Nitrate as NO3-N', 'Oil and Grease', 'pH', 
      'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2', 'Sulphate as SO4', 
      'Total Alkalinity as CaCO3', 'Total Dissolved Solids', 'Total Kjeldahl Nitrogen (TKN)', 
      'Total Organic Carbon (TOC)', 'Total Solids', 'Total Suspended Solids'
    ];
    setSelectedParameters(wasteParameters);
  };

  const selectConstruction = () => {
    const constructionParameters = [
      'Chemical Oxygen Demand (COD)', 'Dissolved Oxygen', 'pH', 'Total Dissolved Solids', 'Total Suspended Solids'
    ];
    setSelectedParameters(constructionParameters);
  };

  const selectDrinkingPremium = () => {
    const drinkingParameters = [
      'Biochemical Oxygen demand (BOD) for 3days @27°C', 'Chemical Oxygen Demand (COD)', 
      'Chloride as Cl', 'Color, Hazen', 'Conductivity @25°C', 'Dissolved Oxygen', 
      'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 'Magnesium as Mg', 'Nitrate as NO3-N', 
      'Oil and Grease', 'pH', 'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2'
    ];
    setSelectedParameters(drinkingParameters);
  };

  const selectDrinkingComplete = () => {
    const drinkingParameters = [
      'Acidity as CaCO3', 'Bicarbonates as HCO3', 'Biochemical Oxygen demand (BOD) for 3days @27°C', 
      'Boron as B', 'Calcium as Ca', 'Carbonates as CO2', 'Chemical Oxygen Demand (COD)', 
      'Chloride as Cl', 'Chlorine Residual', 'Color, Hazen', 'Conductivity @25°C', 
      'Dissolved Oxygen', 'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 
      'Magnesium as Mg', 'Nitrate as NO3-N', 'Oil and Grease', 'pH', 
      'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2', 'Sulphate as SO4', 
      'Total Alkalinity as CaCO3', 'Total Dissolved Solids', 'Total Kjeldahl Nitrogen (TKN)', 
      'Total Organic Carbon (TOC)', 'Total Solids', 'Total Suspended Solids'
    ];
    setSelectedParameters(drinkingParameters);
  };

  const selectGroundWaterPremium = () => {
    const groundWaterParameters = [
      'Acidity as CaCO3', 'Bicarbonates as HCO3', 'Calcium as Ca', 'Carbonates as CO2', 
      'Chemical Oxygen Demand (COD)', 'Chloride as Cl', 'Conductivity @25°C', 
      'Dissolved Oxygen', 'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 
      'Magnesium as Mg', 'Nitrate as NO3-N', 'Oil and Grease', 'pH', 
      'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2', 'Sulphate as SO4', 
      'Total Alkalinity as CaCO3', 'Total Dissolved Solids', 'Total Organic Carbon (TOC)'
    ];
    setSelectedParameters(groundWaterParameters);
  };

  const selectGroundWaterComplete = () => {
    const groundWaterParameters = [
      'Acidity as CaCO3', 'Bicarbonates as HCO3', 'Biochemical Oxygen demand (BOD) for 3days @27°C', 
      'Boron as B', 'Calcium as Ca', 'Carbonates as CO2', 'Chemical Oxygen Demand (COD)', 
      'Chloride as Cl', 'Chlorine Residual', 'Color, Hazen', 'Conductivity @25°C', 
      'Dissolved Oxygen', 'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 
      'Magnesium as Mg', 'Nitrate as NO3-N', 'Oil and Grease', 'pH', 
      'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2', 'Sulphate as SO4', 
      'Total Alkalinity as CaCO3', 'Total Dissolved Solids', 'Total Kjeldahl Nitrogen (TKN)', 
      'Total Organic Carbon (TOC)', 'Total Solids', 'Total Suspended Solids'
    ];
    setSelectedParameters(groundWaterParameters);
  };

  const selectIrrigation = () => {
    const irrigationParameters = [
      'Acidity as CaCO3', 'Bicarbonates as HCO3', 'Calcium as Ca', 'Carbonates as CO2', 
      'Chemical Oxygen Demand (COD)', 'Chloride as Cl', 'Conductivity @25°C', 
      'Dissolved Oxygen', 'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 
      'Magnesium as Mg', 'Nitrate as NO3-N', 'Oil and Grease', 'pH', 
      'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2', 'Sulphate as SO4', 
      'Total Alkalinity as CaCO3', 'Total Dissolved Solids', 'Total Organic Carbon (TOC)'
    ];
    setSelectedParameters(irrigationParameters);
  };

  const selectSurface = () => {
    const surfaceParameters = [
      'Acidity as CaCO3', 'Bicarbonates as HCO3', 'Biochemical Oxygen demand (BOD) for 3days @27°C', 
      'Boron as B', 'Calcium as Ca', 'Carbonates as CO2', 'Chemical Oxygen Demand (COD)', 
      'Chloride as Cl', 'Chlorine Residual', 'Color, Hazen', 'Conductivity @25°C', 
      'Dissolved Oxygen', 'Fluoride as F', 'Free CO2', 'Hardness as CaCO3', 
      'Magnesium as Mg', 'Nitrate as NO3-N', 'Oil and Grease', 'pH', 
      'Phosphate as PO4-P', 'Potassium as K', 'Silica as SiO2', 'Sulphate as SO4', 
      'Total Alkalinity as CaCO3', 'Total Dissolved Solids', 'Total Kjeldahl Nitrogen (TKN)', 
      'Total Organic Carbon (TOC)', 'Total Solids', 'Total Suspended Solids'
    ];
    setSelectedParameters(surfaceParameters);
  };

  const navigateToSamplePage = () => {
    navigate('/samplePage', { state: { name: sample && sample.name } });
  };

  const handleCalculate = () => {
    const selectedParams = manuallySelectedParameters.filter(param =>
      selectedParameters.includes(param)
    );
    navigate('/calculation', { state: { selectedParameters: selectedParams } });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const selectedDetails = selectedParameters.map(param => {
      const index = sampleData.findIndex(item => item.parameter === param);
      return sampleData[index];
    });

    doc.text('Selected Parameters', 20, 10);
    doc.autoTable({
      head: [['Sl.no', 'Parameters', 'Test Method']],
      body: selectedDetails.map((param, index) => [index + 1, param.parameter, param.method])
    });

    doc.save('selected_parameters.pdf');
  };

  const sampleData = [
    { parameter: 'Acidity as CaCO3', method: 'APHA 24th Edition 2310-B' },
    { parameter: 'Bicarbonates as HCO3', method: 'APHA 24th Edition 2320-B' },
    { parameter: 'Biochemical Oxygen demand (BOD) for 3days @27°C', method: 'IS 3025:Part 44:2023' },
    { parameter: 'Boron as B', method: 'APHA 24th Edition 4500-B' },
    { parameter: 'Calcium as Ca', method: 'APHA 24th Edition 3500-Ca,B' },
    { parameter: 'Carbonates as CO2', method: 'APHA 24th Edition 2320-B' },
    { parameter: 'Chemical Oxygen Demand (COD)', method: 'APHA 24th Edition 5220-B' },
    { parameter: 'Chloride as Cl', method: 'APHA 24th Edition 4500-Cl,B' },
    { parameter: 'Chlorine Residual', method: 'APHA 24th Edition 4500-Cl-B' },
    { parameter: 'Color, Hazen', method: 'APHA 24th Edition 2120-B' },
    { parameter: 'Conductivity @25°C', method: 'APHA 24th Edition 2510-B' },
    { parameter: 'Dissolved Oxygen', method: 'APHA 24th Edition 4500-O,B' },
    { parameter: 'Fluoride as F', method: 'APHA 24th Edition 4500-F,D' },
    { parameter: 'Free CO2', method: 'APHA 24th Edition 4500-CO2' },
    { parameter: 'Hardness as CaCO3', method: 'APHA 24th Edition 2340-C' },
    { parameter: 'Magnesium as Mg', method: 'APHA 24th Edition 3500-Mg,B' },
    { parameter: 'Nitrate as NO3-N', method: 'APHA 24th Edition 4500-NO3,B' },
    { parameter: 'Oil and Grease', method: 'APHA 24th Edition 5520-B' },
    { parameter: 'pH', method: 'APHA 24th Edition 4500-H,B' },
    { parameter: 'Phosphate as PO4-P', method: 'APHA 24th Edition 4500-P,E' },
    { parameter: 'Potassium as K', method: 'APHA 24th Edition 3500-K' },
    { parameter: 'Silica as SiO2', method: 'APHA 24th Edition 4500-SiO2,C' },
    { parameter: 'Sulphate as SO4', method: 'APHA 24th Edition 4500-SO4-E' },
    { parameter: 'Total Alkalinity as CaCO3', method: 'APHA 24th Edition 2320-B' },
    { parameter: 'Total Dissolved Solids', method: 'APHA 24th Edition 2540-C' },
    { parameter: 'Total Kjeldahl Nitrogen (TKN)', method: 'APHA 24th Edition 4500-Norg,B' },
    { parameter: 'Total Organic Carbon (TOC)', method: 'APHA 24th Edition 5310-B' },
    { parameter: 'Total Solids', method: 'APHA 24th Edition 2540-B' },
    { parameter: 'Total Suspended Solids', method: 'APHA 24th Edition 2540-D' }
  ];

  return (
    <div className="container">
      <div className="text-center">
        <h4>Sample ID: {localStorage.getItem('selectedSampleId')}</h4>
        <h4>Selected LabCode: {localStorage.getItem('selectedLabCode')}</h4>
        <h3>TEST REPORT</h3>
      </div>

      <div className="buttons-container">
        <button className="btn btn-primary" onClick={navigateToSamplePage}>Go Back to Sample Page</button>
        <button className="btn btn-primary" onClick={handleCalculate}>Calculate</button>
        <button className="btn btn-primary" onClick={generatePDF}>Download PDF</button>
      </div>
      <table className="table table-bordered table-responsive table-condensed">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Parameters</th>
            <th>Test Method</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.parameter}</td>
              <td>{item.method}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedParameters.includes(item.parameter)}
                  onChange={() => handleCheckboxChange(item.parameter)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Ticksheet;

