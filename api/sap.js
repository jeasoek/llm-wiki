import https from 'node:https';
import http  from 'node:http';
import { URL } from 'node:url';

function request(urlStr, headers) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const mod = u.protocol === 'https:' ? https : http;
    const options = {
      hostname: u.hostname,
      port: u.port || (u.protocol === 'https:' ? 443 : 80),
      path: u.pathname + u.search,
      method: 'GET',
      headers,
      rejectUnauthorized: false, // 사내 SAP 자체 서명 인증서 허용
      timeout: 15000,
    };
    const req = mod.request(options, res => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('SAP 연결 시간 초과 (15초)')); });
    req.end();
  });
}

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

  const filterStr = filters.length ? `&$filter=${encodeURIComponent(filters.join(' and '))}` : '';
  const url = `${baseUrl}/sap/opu/odata/sap/ZGWPAC_MAIN_SRV/PID_SEARCHSET?$format=json&sap-client=${client}${filterStr}`;

  const credentials = Buffer.from(`${user}:${pass}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${credentials}`,
    'Accept': 'application/json',
  };

  try {
    const { status, body } = await request(url, headers);

    if (status < 200 || status >= 300) {
      res.status(status).json({ error: `SAP 오류 ${status}`, detail: body.slice(0, 500), url });
      return;
    }

    res.status(200).json(JSON.parse(body));
  } catch (e) {
    res.status(500).json({ error: e.message, url });
  }
}
