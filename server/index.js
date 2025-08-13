const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || 'Crunch Time';

async function getSheet() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT || '{}');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

app.get('/api/menu', async (_req, res) => {
  try {
    const sheets = await getSheet();
    const range = `${SHEET_NAME}!A2:H`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    const rows = response.data.values || [];
    const items = rows.map((row) => ({
      id: row[0],
      name: row[1],
      price: Number(row[2]),
      unit: row[3],
      category: row[4],
      image: row[5],
      description: row[6],
      available: row[7] === 'available',
    }));
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

app.post('/api/menu', async (req, res) => {
  try {
    const item = req.body;
    const sheets = await getSheet();
    const values = [[
      item.id,
      item.name,
      item.price,
      item.unit,
      item.category,
      item.image,
      item.description,
      item.available ? 'available' : 'unavailable',
    ]];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });
    res.status(201).json({ message: 'Item added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

app.put('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
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
    const rowNumber = rowIndex + 2; // account for header row
    const item = req.body;
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
    res.json({ message: 'Item updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;
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
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

