const { SPREADSHEET_ID, SHEET_NAME, getSheet } = require('../../_sheet');

async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const data = Buffer.concat(chunks).toString();
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

module.exports = async (req, res) => {
  const { id } = req.query;
  if (req.method === 'PUT') {
    try {
      const sheets = await getSheet();
      const getResp = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A2:H`,
      });
      const rows = getResp.data.values || [];
      const rowIndex = rows.findIndex((r) => r[0] === id);
      if (rowIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }
      const rowNumber = rowIndex + 2;
      const item = await parseBody(req);
      const values = [[
        id,
        item.name,
        item.price,
        item.unit,
        item.category,
        item.image,
        item.description,
        item.available ? 'available' : 'unavailable',
      ]];
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A${rowNumber}:H${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        resource: { values },
      });
      res.status(200).json({ message: 'Item updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update item' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const sheets = await getSheet();
      const getResp = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A2:H`,
      });
      const rows = getResp.data.values || [];
      const rowIndex = rows.findIndex((r) => r[0] === id);
      if (rowIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }
      const requests = [{
        deleteDimension: {
          range: {
            sheetId: 0,
            dimension: 'ROWS',
            startIndex: rowIndex + 1,
            endIndex: rowIndex + 2,
          },
        },
      }];
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        resource: { requests },
      });
      res.status(200).json({ message: 'Item deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
