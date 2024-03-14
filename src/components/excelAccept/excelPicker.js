import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelReader() {
    const [excelData, setExcelData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setExcelData(jsonData);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <table>
                <thead>
                    <tr>
                        {excelData.length > 0 &&
                            excelData[0].map((cell, index) => <th key={index}>{cell}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {excelData.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ExcelReader;
