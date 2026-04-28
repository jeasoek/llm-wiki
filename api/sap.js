export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST')    { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { sapUrl, sapClient, sapUser, sapPass, params = {} } = req.body || {};

  const baseUrl = sapUrl  || process.env.SAP_URL;
  const client  = sapClient || process.env.SAP_CLIENT || '100';
  const user    = sapUser || process.env.SAP_USER;
  const pass    = sapPass || process.env.SAP_PASS;

  if (!baseUrl || !user || !pass) {
    res.status(400).json({ error: 'SAP 설정(URL·사용자·비밀번호)이 누락되었습니다.' });
    return;
  }

  const PARAM_KEYS = ['GPID','BUPAK','BUKRS','GSBER','CUNIT','GJAHR','MONAT','TOCDE','TTEXT'];
  const filters = PARAM_KEYS
    .filter(k => params[k])
    .map(k => `${k} eq '${String(params[k]).replace(/'/g, "''")}'`);

  const filterStr = filters.length ? `$filter=${encodeURIComponent(filters.join(' and '))}&` : '';
  const url = `${baseUrl}/sap/opu/odata/sap/ZGWPAC_MAIN_SRV/PID_SEARCHSET_GET_ENTITYSET?${filterStr}$format=json&sap-client=${client}`;

  const credentials = Buffer.from(`${user}:${pass}`).toString('base64');

  try {
    const sapRes = await fetch(url, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Accept': 'application/json',
      },
    });

    const body = await sapRes.text();

    if (!sapRes.ok) {
      res.status(sapRes.status).json({ error: `SAP 오류 ${sapRes.status}`, detail: body.slice(0, 500) });
      return;
    }

    res.status(200).json(JSON.parse(body));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
