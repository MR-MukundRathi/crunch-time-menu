const { SPREADSHEET_ID, SHEET_NAME, getSheet } = require('../_sheet');

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
  if (req.method === 'GET') {
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
      res.status(200).json(items);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch menu' });
    }
  } else if (req.method === 'POST') {
    try {
      const item = await parseBody(req);
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
