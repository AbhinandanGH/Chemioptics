import React, { useState } from 'react';

const ParametersTable = () => {
  // State variables for Acidity as CaCO3
  const [sampleTaken1, setSampleTaken1] = useState('');
  const [BR1, setBR1] = useState('');
  const [result1, setResult1] = useState('');

  // State variables for Bicarbonates as HCO3
  const [sampleTaken2, setSampleTaken2] = useState('');
  const [BR2, setBR2] = useState('');
  const [result2, setResult2] = useState('');

  // State variables for BOD
  const [D1, setD1] = useState('');
  const [D2, setD2] = useState('');
  const [B1, setB1] = useState('');
  const [B2, setB2] = useState('');
  const [volumeOfSeed, setVolumeOfSeed] = useState('');
  const [volumeOfSample, setVolumeOfSample] = useState('');
  const [result3, setResult3] = useState('');

  // State variables for Boron as B
  const [absorbance, setAbsorbance] = useState('');
  const [concentration, setConcentration] = useState('');
  const [result4, setResult4] = useState('');

  // State variables for Calcium as Ca
  const [sampleTaken3, setSampleTaken3] = useState('');
  const [BR3, setBR3] = useState('');
  const [M3, setM3] = useState('');
  const [result5, setResult5] = useState('');

  // State variables for Calcium Hardness
  const [sampleTaken4, setSampleTaken4] = useState('');
  const [BR4, setBR4] = useState('');
  const [M4, setM4] = useState('');
  const [result6, setResult6] = useState('');

  // State variables for Carbonates as CO3
  const [Carbonates, setCarbonates] = useState('');
  const [result7, setResult7] = useState('');

  // State variables for Chemical Oxygen Demand (COD)
  const [sampleTaken6, setSampleTaken6] = useState('');
  const [blankBR, setBlankBR] = useState('');
  const [sampleBR, setSampleBR] = useState('');
  const [dilutionFactor, setDilutionFactor] = useState('');
  const [result8, setResult8] = useState('');

  // State variables for Chloride as Cl
  const [sampleTaken7, setSampleTaken7] = useState('');
  const [BR7, setBR7] = useState('');
  const [result9, setResult9] = useState('');

  // State variables for Chlorine Residual
  const [sampleTaken8, setSampleTaken8] = useState('');
  const [BR8, setBR8] = useState('');
  const [normality8, setNormality8] = useState('');
  const [DO8, setDO8] = useState('');
  const [result10, setResult10] = useState('');

  // State variables for Color
  const [units10, setUnits10] = useState('');
  const [result11, setResult11] = useState('');

  // State variables for Conductivity
  const [calibrationBuffer, setCalibrationBuffer] = useState('');
  const [conductivity, setConductivity] = useState('');
  const [sampleConductivity, setSampleConductivity] = useState('');
  const [result12, setResult12] = useState('');

  // States for Dissolved Oxygen inputs and result
  const [sampleTakenDO] = useState(10); // Since the sample taken is a constant value of 10 ml
  const [BR_DO, setBR_DO] = useState('');
  const [normalityDO, setNormalityDO] = useState('');
  const [resultDO, setResultDO] = useState('');

  // States for Fluoride inputs and result
  const [absorbanceF, setAbsorbanceF] = useState('');
  const [concentrationF, setConcentrationF] = useState('');
  const [resultF, setResultF] = useState('');

  // States for Iron inputs and result
  const [absorbanceFe, setAbsorbanceFe] = useState('');
  const [concentrationFe, setConcentrationFe] = useState('');
  const [resultFe, setResultFe] = useState('');

  const calculateAcidity = (sampleTaken, BR) => {
    const normality = 10 * 0.05 / BR;
    const calculatedResult = (BR * normality * 50 * 1000) / sampleTaken;
    return `Result: ${calculatedResult.toFixed(2)} mg/L`;
  };

  const calculateBOD = (D1, D2, B1, B2, volumeOfSeed, volumeOfSample) => {
    const calculatedResult = ((D1 - D2) - (B1 - B2) * volumeOfSeed * 1000) / volumeOfSample;
    return `BOD: ${calculatedResult.toFixed(2)} mg/L`;
  };

  const handleCalculate = (parameter) => {
    if (parameter === 'acidity') {
      setResult1(calculateAcidity(parseFloat(sampleTaken1), parseFloat(BR1)));
      setResult2(calculateAcidity(parseFloat(sampleTaken2), parseFloat(BR2)));
    } else if (parameter === 'bod') {
      setResult3(calculateBOD(parseFloat(D1), parseFloat(D2), parseFloat(B1), parseFloat(B2), parseFloat(volumeOfSeed), parseFloat(volumeOfSample)));
    } else if (parameter === 'boron') {
      setResult4(`Absorbance: ${absorbance}, Concentration: ${concentration}`);
    } else if (parameter === 'calcium') {
      const calculatedResult = (parseFloat(BR3) * parseFloat(M3) * 400.8 * 1000) / parseFloat(sampleTaken3);
      setResult5(`Result: ${calculatedResult.toFixed(2)} mg/L`);
    } else if (parameter === 'calciumHardness') {
      const calculatedResult = (parseFloat(BR4)* parseFloat(M4) * 100 * 1000) / parseFloat(sampleTaken4);
setResult6(`Result: ${calculatedResult.toFixed(2)} mg/L`);
} else if (parameter === 'carbonates') {
// Placeholder formula for Carbonates
setResult7(`Carbonates: ${Carbonates}`);
} else if (parameter === 'cod') {
const normality = 10 * 0.25 / parseFloat(sampleTaken6);
const COD = ((parseFloat(blankBR) - parseFloat(sampleBR)) * normality * 8000 * parseFloat(dilutionFactor)) / parseFloat(sampleTaken6);
setResult8(`COD: ${COD.toFixed(2)} mg/L`);
} else if (parameter === 'chloride') {
const normality = 10 * 0.0141 / parseFloat(BR7);
setResult9(`Normality: ${normality.toFixed(2)}`);
} else if (parameter === 'chlorineResidual') {
const normality = 10 * 0.25 / parseFloat(BR8);
const DO = parseFloat(BR8) * normality * 35.45 / parseFloat(sampleTaken8);
setResult10(`DO: ${DO.toFixed(2)} mg/L`);
} else if (parameter === 'color') {
// Placeholder formula for Color
setResult11(`Units: ${units10}`);
} else if (parameter === 'conductivity') {
const conductivityValue = parseFloat(calibrationBuffer) * parseFloat(conductivity) / parseFloat(sampleConductivity);
setResult12(`Conductivity: ${conductivityValue.toFixed(2)} µS/cm`);
}
else if (parameter === 'dissolvedOxygen') {
  const doResult = (10 * normalityDO) / BR_DO;
  setResultDO(doResult.toFixed(2));
} else if (parameter === 'fluoride') {
  // Assuming concentration is directly proportional to absorbance
  setResultF(`Absorbance: ${absorbanceF}, Concentration: ${concentrationF}`);
} else if (parameter === 'iron') {
  // Assuming concentration is directly proportional to absorbance
  setResultFe(`Absorbance: ${absorbanceFe}, Concentration: ${concentrationFe}`);
}
};


  return (
    <div className="ticksheet">
      <h1>Calculations</h1>
    <table>
      <thead>
        <tr>
          <th>Sl.no</th>
          <th>Parameters</th>
          <th>Test Method</th>
          <th>Calculation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Acidity as CaCO3, mg/L</td>
          <td>APHA 24th Edition 2310-B</td>
          <td>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="number"
                value={sampleTaken1}
                onChange={(e) => setSampleTaken1(e.target.value)}
                placeholder="Sample Taken (ml)"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={BR1}
                onChange={(e) => setBR1(e.target.value)}
                placeholder="BR Reading"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <button onClick={() => handleCalculate('acidity')}>Calculate</button>
              <span style={{ display: 'block', marginTop: '10px' }}>{result1}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Bicarbonates as HCO3, mg/L</td>
          <td>APHA 24th Edition 2320-B</td>
          <td>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="number"
                value={sampleTaken2}
                onChange={(e) => setSampleTaken2(e.target.value)}
                placeholder="Sample Taken (ml)"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={BR2}
                onChange={(e) => setBR2(e.target.value)}
                placeholder="BR Reading"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <button onClick={() => handleCalculate('acidity')}>Calculate</button>
              <span style={{ display: 'block', marginTop: '10px' }}>{result2}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Biochemical Oxygen Demand (BOD) for 3 days @27°C, mg/L</td>
          <td>IS 3025:Part 44:2023</td>
          <td>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="number"
                value={D1}
                onChange={(e) => setD1(e.target.value)}
                placeholder="1st Day DO of sample"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={D2}
                onChange={(e) => setD2(e.target.value)}
                placeholder="3rd Day DO of sample"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={B1}
                onChange={(e) => setB1(e.target.value)}
                placeholder="1st Day DO of blank"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={B2}
                onChange={(e) => setB2(e.target.value)}
                placeholder="3rd Day DO of blank"
                style={{ display: 'block', marginBottom:'10px' }}
                />
                <input
                  type="number"
                  value={volumeOfSeed}
                  onChange={(e) => setVolumeOfSeed(e.target.value)}
                  placeholder="Volume of seed in seed control"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={volumeOfSample}
                  onChange={(e) => setVolumeOfSample(e.target.value)}
                  placeholder="Volume of sample"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('bod')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result3}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Boron as B, mg/L</td>
            <td>APHA 24th Edition 4500-B</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={absorbance}
                  onChange={(e) => setAbsorbance(e.target.value)}
                  placeholder="Absorbance"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={concentration}
                  onChange={(e) => setConcentration(e.target.value)}
                  placeholder="Concentration"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('boron')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result4}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>5</td>
            <td>Calcium as Ca, mg/L</td>
            <td>APHA 24th Edition 3500-Ca,B</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={sampleTaken3}
                  onChange={(e) => setSampleTaken3(e.target.value)}
                  placeholder="Sample Taken (ml)"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={BR3}
                  onChange={(e) => setBR3(e.target.value)}
                  placeholder="BR"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={M3}
                  onChange={(e) => setM3(e.target.value)}
                  placeholder="M"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('calcium')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result5}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>6</td>
            <td>Calcium Hardness, mg/L</td>
            <td>APHA 24th Edition 3500-Ca,B</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={sampleTaken4}
                  onChange={(e) => setSampleTaken4(e.target.value)}
                  placeholder="Sample Taken (ml)"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={BR4}
                  onChange={(e) => setBR4(e.target.value)}
                  placeholder="BR"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={M4}
                  onChange={(e) => setM4(e.target.value)}
                  placeholder="M"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('calciumHardness')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result6}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>Carbonates as CO3, mg/L</td>
            <td>APHA 24th Edition 3500-CO3</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={Carbonates}
                  onChange={(e) => setCarbonates(e.target.value)}
                  placeholder="Carbonates"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                
                <button onClick={() => handleCalculate('carbonates')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result7}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>8</td>
            <td>Chemical Oxygen Demand (COD), mg/L</td>
            <td>IS 3025:Part 44:2023</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={sampleTaken6}
                  onChange={(e) => setSampleTaken6(e.target.value)}
                  placeholder="Sample Taken (ml)"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={blankBR}
                  onChange={(e) => setBlankBR(e.target.value)}
                  placeholder="Blank BR"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={sampleBR}
                  onChange={(e) => setSampleBR(e.target.value)}
                  placeholder="Sample BR"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={dilutionFactor}
                  onChange={(e) => setDilutionFactor(e.target.value)}
                  placeholder="Dilution factor"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('cod')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result8}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>9</td>
            <td>Chloride as Cl, mg/L</td>
            <td>APHA 24th Edition 4500-Cl</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"               
                  value={sampleTaken7}
                  onChange={(e) => setSampleTaken7(e.target.value)}
                  placeholder="Sample Taken (ml)"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={BR7}
                  onChange={(e) => setBR7(e.target.value)}
                  placeholder="BR"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('chloride')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{result9}</span>
              </div>
            </td>
          </tr>
          <tr>
          <td>10</td>
          <td>Chlorine Residual, mg/L</td>
          <td>APHA 24th Edition 4500-Cl</td>
          <td>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="number"
                value={sampleTaken8}
                onChange={(e) => setSampleTaken8(e.target.value)}
                placeholder="Sample Taken (ml)"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={BR8}
                onChange={(e) => setBR8(e.target.value)}
                placeholder="BR"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <button onClick={() => handleCalculate('chlorineResidual')}>Calculate</button>
              <span style={{ display: 'block', marginTop: '10px' }}>{result10}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>11</td>
          <td>Color</td>
          <td>APHA 24th Edition 2120-B</td>
          <td>
          <input
                type="number"
                value={units10}
                onChange={(e) => setUnits10(e.target.value)}
                placeholder="Units"
                style={{ display: 'block', marginBottom: '10px' }}
              />
            <div style={{ marginBottom: '10px' }}>
              {/* No input fields needed for color calculation */}
              <button onClick={() => handleCalculate('color')}>Calculate</button>
              <span style={{ display: 'block', marginTop: '10px' }}>{result11}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>12</td>
          <td>Conductivity @25°C, µS/cm</td>
          <td>APHA 24th Edition 2510-B</td>
          <td>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="number"
                value={calibrationBuffer}
                onChange={(e) => setCalibrationBuffer(e.target.value)}
                placeholder="Calibration Buffer with Cell Constant"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={conductivity}
                onChange={(e) => setConductivity(e.target.value)}
                placeholder="Conductivity"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="number"
                value={sampleConductivity}
                onChange={(e) => setSampleConductivity(e.target.value)}
                placeholder="Sample Conductivity"
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <button onClick={() => handleCalculate('conductivity')}>Calculate</button>
              <span style={{ display: 'block', marginTop: '10px' }}>{result12}</span>
            </div>
          </td>
        </tr>
        <tr>
            <td>14</td>
            <td>Fluoride as F, mg/L</td>
            <td>APHA 24th Edition 4500-F,D</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={absorbanceF}
                  onChange={(e) => setAbsorbanceF(e.target.value)}
                  placeholder="Absorbance"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={concentrationF}
                  onChange={(e) => setConcentrationF(e.target.value)}
                  placeholder="Concentration"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('fluoride')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{resultF}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>15</td>
            <td>Iron as Fe, mg/L</td>
            <td>APHA 24thth Edition 3500 Fe-B</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={absorbanceFe}
                  onChange={(e) => setAbsorbanceFe(e.target.value)}
                  placeholder="Absorbance"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={concentrationFe}
                  onChange={(e) => setConcentrationFe(e.target.value)}
                  placeholder="Concentration"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('iron')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{resultFe}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>16</td>
            <td>Dissolved Oxygen, mg/L</td>
            <td>APHA 24th Edition 4500-O,B</td>
            <td>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="number"
                  value={BR_DO}
                  onChange={(e) => setBR_DO(e.target.value)}
                  placeholder="BR (ml)"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <input
                  type="number"
                  value={normalityDO}
                  onChange={(e) => setNormalityDO(e.target.value)}
                  placeholder="Normality"
                  style={{ display: 'block', marginBottom: '10px' }}
                />
                <button onClick={() => handleCalculate('dissolvedOxygen')}>Calculate</button>
                <span style={{ display: 'block', marginTop: '10px' }}>{resultDO}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    );
  };
  
  export default ParametersTable;
  
  
