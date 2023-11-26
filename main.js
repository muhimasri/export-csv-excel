import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

export const exportTable = (format) => {
  const table = document.querySelector('table');
  const rows = document.querySelectorAll('table tr');

  if (format === 'csv') {
    let csv = [];
    for (const row of rows) {
      const cells = row.querySelectorAll('td, th');
      const rowText = Array.from(cells).map((cell) => cell.innerText);
      csv.push(rowText.join(','));
    }
    const csvFile = new Blob([csv.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    saveAs(csvFile, 'data.csv');
  } else if (format === 'excel') {
    const workbook = XLSX.utils.table_to_book(table);
    const options = { bookType: 'xlsx', bookSST: false, type: 'array' };
    const output = XLSX.write(workbook, options);
    saveAs(
      new Blob([output], { type: 'application/octet-stream' }),
      'data.xlsx'
    );
  } else {
    throw new Error('Unsupported format');
  }
};
