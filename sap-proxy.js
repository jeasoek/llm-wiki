/**
 * SAP 로컬 프록시 서버
 * 실행: node sap-proxy.js
 * 브라우저 → localhost:3001 → SAP 사내망
 */

const http  = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3001;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function sapRequest(urlStr, authHeader) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const mod = u.protocol === 'https:' ? https : http;
    const req = mod.request({
      hostname: u.hostname,
      port:     u.port || (u.protocol === 'https:' ? 443 : 80),
      path:     u.pathname + u.search,
      method:   'GET',
      headers:  { 'Authorization': authHeader, 'Accept': 'application/json' },
      rejectUnauthorized: false,
      timeout: 15000,
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error',   reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('SAP 연결 시간 초과')); });
    req.end();
  });
}

const server = http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, CORS_HEADERS);
    res.end(JSON.stringify({ error: 'POST만 지원' }));
    return;
  }

  let raw = '';
  req.on('data', c => raw += c);
  req.on('end', async () => {
    try {
      const { sapUrl, sapClient = '100', sapUser, sapPass, params = {} } = JSON.parse(raw);

      if (!sapUrl || !sapUser || !sapPass) {
        res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'sapUrl, sapUser, sapPass 필수' }));
        return;
      }

      const KEYS = ['GPID','BUPAK','BUKRS','GSBER','CUNIT','GJAHR','MONAT','TOCDE','TTEXT'];
      const filters = KEYS
        .filter(k => params[k])
        .map(k => `${k} eq '${String(params[k]).replace(/'/g,"''")}'`);
      const filterStr = filters.length ? `&$filter=${encodeURIComponent(filters.join(' and '))}` : '';
      const url = `${sapUrl}/sap/opu/odata/sap/ZGWPAC_MAIN_SRV/PID_SEARCHSET?$format=json&sap-client=${sapClient}${filterStr}`;

      console.log('[Proxy] →', url);

      const credentials = Buffer.from(`${sapUser}:${sapPass}`).toString('base64');
      const { status, body } = await sapRequest(url, `Basic ${credentials}`);

      console.log('[Proxy] ←', status, body.slice(0, 80));

      res.writeHead(status, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(body);
    } catch (e) {
      console.error('[Proxy] 오류:', e.message);
      res.writeHead(500, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`✅ SAP 프록시 실행 중: http://localhost:${PORT}`);
  console.log('   챗봇에서 SAP 조회 시 이 창을 열어두세요.');
  console.log('   종료: Ctrl+C');
});
