'use strict';

/* ============================================================
   LLM Wiki — wiki.js
   ============================================================ */

const PAGES = {

  intro: {
    title: '소개',
    breadcrumb: '시작하기 / 소개',
    content: `
<h1>🧠 LLM Wiki란?</h1>
<p class="lead">LLM이 스스로 유지·관리하는 <strong>영구적·복리 성장형 지식 베이스</strong> 패턴입니다.<br>
Andrej Karpathy가 제안한 이 방식은 기존 RAG 시스템의 한계를 넘어, 지식이 쌓일수록 더 강해지는 구조를 만듭니다.</p>

<div class="callout callout-info">
  <div class="callout-icon">💡</div>
  <div>
    <strong>핵심 철학</strong><br>
    "인간의 역할은 소스를 큐레이션하고 좋은 질문을 던지는 것. LLM의 역할은 나머지 모든 것."
    <br><small>— Andrej Karpathy</small>
  </div>
</div>

<h2>왜 만들었나?</h2>
<p>우리는 매일 수많은 문서·논문·기사를 읽지만, 그 지식을 오래 유지하기 어렵습니다. 전통적인 위키는 인간이 직접 편집해야 해서 금세 방치됩니다. LLM Wiki는 이 문제를 해결합니다.</p>

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📚</div>
    <div class="feature-title">지식 복리 성장</div>
    <div class="feature-desc">새 소스를 추가할 때마다 기존 위키와 통합되어 지식이 쌓입니다.</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🔄</div>
    <div class="feature-title">자동 유지관리</div>
    <div class="feature-desc">참조 업데이트·모순 감지·일관성 유지를 LLM이 자동으로 처리합니다.</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">🔗</div>
    <div class="feature-title">연결된 지식</div>
    <div class="feature-desc">개별 문서가 아닌 연결된 마크다운 페이지 네트워크로 지식을 표현합니다.</div>
  </div>
  <div class="feature-card">
    <div class="feature-icon">📈</div>
    <div class="feature-title">쿼리→위키 피드백</div>
    <div class="feature-desc">질문에 대한 좋은 답변은 새 페이지로 저장되어 위키가 계속 성장합니다.</div>
  </div>
</div>

<h2>전통적 방식과의 차이</h2>
<table class="wiki-table">
  <thead>
    <tr><th>구분</th><th>기존 문서 검색</th><th>LLM Wiki</th></tr>
  </thead>
  <tbody>
    <tr><td>지식 저장</td><td>원본 문서 그대로</td><td>통합된 마크다운 위키</td></tr>
    <tr><td>연결</td><td>매 쿼리마다 재발견</td><td>이미 통합·참조 완료</td></tr>
    <tr><td>유지관리</td><td>인간이 직접</td><td>LLM이 자동</td></tr>
    <tr><td>시간 경과</td><td>변하지 않음</td><td>복리로 성장</td></tr>
    <tr><td>모순 처리</td><td>없음</td><td>Lint로 자동 감지</td></tr>
  </tbody>
</table>
`
  },

  concept: {
    title: '핵심 개념',
    breadcrumb: '시작하기 / 핵심 개념',
    content: `
<h1>📌 핵심 개념</h1>
<p class="lead">LLM Wiki를 이해하려면 세 가지 핵심 개념을 알아야 합니다.</p>

<h2>1. 영구 아티팩트 (Persistent Artifact)</h2>
<p>기존 LLM 대화는 일회성입니다. LLM Wiki는 <strong>지속적으로 남는 결과물</strong>을 만드는 게 목표입니다. 구체적으로는 상호 연결된 마크다운 파일 컬렉션입니다.</p>

<div class="callout callout-tip">
  <div class="callout-icon">✅</div>
  <div>
    <strong>핵심 원칙</strong><br>
    LLM이 생성한 내용은 반드시 파일로 저장되어야 합니다. 대화창에서 사라지는 순간 가치가 없습니다.
  </div>
</div>

<h2>2. 복리 지식 (Compounding Knowledge)</h2>
<p>새 소스를 추가할 때마다 기존 위키 전체를 참고해 통합합니다. 따라서:</p>
<ul>
  <li>위키가 클수록 새 소스 통합이 더 풍부해집니다</li>
  <li>오래될수록 지식의 밀도가 높아집니다</li>
  <li>모순·공백이 자동으로 드러납니다</li>
</ul>

<h2>3. 스키마 주도 구조 (Schema-Driven)</h2>
<p>위키의 구조와 규칙을 정의하는 설정 문서가 있습니다. LLM은 이 스키마를 따라 일관된 방식으로 위키를 유지합니다.</p>

<div class="code-block">
<div class="code-label">schema.md 예시</div>
<pre><code># Wiki Schema

## 페이지 종류
- concept/ : 핵심 개념 정의
- entity/  : 인물·기관·프로젝트
- summary/ : 소스 문서 요약
- qa/       : 질문-답변 아카이브

## 규칙
- 모든 페이지는 index.md에 등록
- 변경 시 log.md에 기록
- 상호 참조는 [[링크]] 형식 사용</code></pre>
</div>

<h2>4. index.md & log.md</h2>
<div class="two-col">
  <div class="col-card">
    <h3>📋 index.md</h3>
    <p>위키 전체의 목차. 모든 페이지가 여기에 등록됩니다. LLM이 새 페이지를 만들 때마다 자동 업데이트합니다.</p>
  </div>
  <div class="col-card">
    <h3>📝 log.md</h3>
    <p>추가 전용(Append-only) 변경 히스토리. 언제 무엇이 추가·수정됐는지 추적합니다.</p>
  </div>
</div>
`
  },

  architecture: {
    title: '3-레이어 구조',
    breadcrumb: '아키텍처 / 3-레이어 구조',
    content: `
<h1>🏗️ 3-레이어 아키텍처</h1>
<p class="lead">LLM Wiki는 세 개의 레이어로 구성됩니다. 각 레이어는 명확한 역할을 가지며, LLM은 오직 위키 레이어만 수정합니다.</p>

<div class="arch-diagram">
  <div class="arch-layer arch-layer-3">
    <div class="arch-layer-num">Layer 3</div>
    <div class="arch-layer-name">⚙️ 스키마 (Schema)</div>
    <div class="arch-layer-desc">위키의 구조·규칙·워크플로우 정의 / 인간이 설정</div>
  </div>
  <div class="arch-arrow">▼ 스키마에 따라 위키를 유지·관리</div>
  <div class="arch-layer arch-layer-2">
    <div class="arch-layer-num">Layer 2</div>
    <div class="arch-layer-name">📚 위키 (Wiki)</div>
    <div class="arch-layer-desc">LLM이 생성·유지하는 마크다운 파일 컬렉션 / 지식의 핵심</div>
  </div>
  <div class="arch-arrow">▼ 소스를 읽어 위키로 통합</div>
  <div class="arch-layer arch-layer-1">
    <div class="arch-layer-num">Layer 1</div>
    <div class="arch-layer-name">📄 원본 소스 (Raw Sources)</div>
    <div class="arch-layer-desc">논문·기사·문서 등 불변 입력 데이터 / LLM은 읽기만 함</div>
  </div>
</div>

<h2>레이어 1: 원본 소스</h2>
<p><strong>절대 수정하지 않는</strong> 불변(immutable) 입력 데이터입니다.</p>
<ul>
  <li>PDF 논문, 웹 기사, 코드베이스</li>
  <li>데이터셋, 실험 결과</li>
  <li>이메일, 슬랙 스레드</li>
</ul>
<div class="callout callout-warning">
  <div class="callout-icon">⚠️</div>
  <div>원본 소스는 절대 수정하지 않습니다. LLM은 읽기만 합니다.</div>
</div>

<h2>레이어 2: 위키</h2>
<p>LLM이 자유롭게 생성·수정·삭제할 수 있는 마크다운 파일들입니다.</p>
<div class="code-block">
<div class="code-label">위키 디렉토리 구조 예시</div>
<pre><code>wiki/
├── index.md          # 전체 목차 (자동 관리)
├── log.md            # 변경 히스토리 (추가 전용)
├── concept/
│   ├── transformer.md
│   ├── attention.md
│   └── tokenization.md
├── entity/
│   ├── openai.md
│   └── karpathy-andrej.md
├── summary/
│   ├── attention-is-all-you-need.md
│   └── gpt4-report.md
└── qa/
    └── 2024-01-why-scaling-works.md</code></pre>
</div>

<h2>레이어 3: 스키마</h2>
<p>위키가 따라야 할 규칙·구조·워크플로우를 정의합니다. 이 파일을 변경하면 LLM의 위키 관리 방식이 바뀝니다.</p>
`
  },

  operations: {
    title: '주요 오퍼레이션',
    breadcrumb: '아키텍처 / 주요 오퍼레이션',
    content: `
<h1>⚙️ 주요 오퍼레이션</h1>
<p class="lead">LLM Wiki는 세 가지 핵심 오퍼레이션으로 작동합니다.</p>

<div class="op-cards">
  <div class="op-card op-ingest">
    <div class="op-header">
      <span class="op-icon">📥</span>
      <span class="op-name">Ingest</span>
      <span class="op-badge">소스 통합</span>
    </div>
    <p>새 소스 문서를 위키에 통합합니다. 단순 인덱싱이 아니라 <strong>지식을 추출·합성</strong>합니다.</p>
    <ol>
      <li>소스 문서 전체를 읽음</li>
      <li>관련된 기존 위키 페이지 10~15개 동시 업데이트</li>
      <li>새 개념이면 새 페이지 생성</li>
      <li>index.md, log.md 업데이트</li>
    </ol>
    <div class="op-example">
      <strong>예시 프롬프트:</strong><br>
      <em>"다음 논문을 읽고 위키에 통합해줘. 기존 개념 페이지는 업데이트하고, 새 개념은 새 페이지를 만들어."</em>
    </div>
  </div>

  <div class="op-card op-query">
    <div class="op-header">
      <span class="op-icon">🔍</span>
      <span class="op-name">Query</span>
      <span class="op-badge">질문 & 답변</span>
    </div>
    <p>위키를 기반으로 질문에 답하고, <strong>좋은 답변은 새 페이지로 저장</strong>합니다.</p>
    <ol>
      <li>관련 위키 페이지 검색</li>
      <li>통합된 지식으로 답변 생성</li>
      <li>가치 있는 답변 → qa/ 에 저장</li>
      <li>위키가 점점 더 Q&A 친화적으로 성장</li>
    </ol>
    <div class="op-example">
      <strong>예시 프롬프트:</strong><br>
      <em>"Transformer의 Attention이 RNN보다 나은 이유를 설명해줘. 좋은 답이면 qa/에 저장해."</em>
    </div>
  </div>

  <div class="op-card op-lint">
    <div class="op-header">
      <span class="op-icon">🔧</span>
      <span class="op-name">Lint</span>
      <span class="op-badge">건강 검진</span>
    </div>
    <p>위키 전체를 주기적으로 점검해 <strong>품질을 유지</strong>합니다.</p>
    <ol>
      <li>모순된 내용 감지 및 해결</li>
      <li>고아 페이지(참조 없는 페이지) 확인</li>
      <li>지식 공백(gap) 발견</li>
      <li>오래된 정보 플래깅</li>
    </ol>
    <div class="op-example">
      <strong>예시 프롬프트:</strong><br>
      <em>"위키 전체를 검토해서 모순된 내용을 찾고, 보완이 필요한 페이지 목록을 만들어줘."</em>
    </div>
  </div>
</div>
`
  },

  'vs-rag': {
    title: 'LLM Wiki vs RAG',
    breadcrumb: '심화 / LLM Wiki vs RAG',
    content: `
<h1>⚔️ LLM Wiki vs RAG</h1>
<p class="lead">두 방식은 목적이 다릅니다. 상황에 따라 선택하거나 함께 사용할 수 있습니다.</p>

<h2>RAG (Retrieval-Augmented Generation)</h2>
<p>질문 시점에 원본 문서에서 관련 청크를 검색해 LLM에게 제공합니다.</p>

<div class="callout callout-info">
  <div class="callout-icon">📡</div>
  <div>
    <strong>RAG의 방식</strong><br>
    사용자 질문 → 벡터 검색 → 원본 문서 청크 추출 → LLM이 답변 생성
  </div>
</div>

<h2>LLM Wiki</h2>
<p>소스를 추가할 때 LLM이 미리 지식을 통합해 위키를 만들어 둡니다. 질문 시에는 이미 정제된 위키를 참조합니다.</p>

<div class="callout callout-tip">
  <div class="callout-icon">🧠</div>
  <div>
    <strong>LLM Wiki의 방식</strong><br>
    소스 추가 → LLM이 위키 업데이트 → 사용자 질문 → 위키에서 답변
  </div>
</div>

<table class="wiki-table">
  <thead>
    <tr><th>항목</th><th>RAG</th><th>LLM Wiki</th></tr>
  </thead>
  <tbody>
    <tr><td>처리 시점</td><td>쿼리 시점 (실시간)</td><td>인제스트 시점 (사전)</td></tr>
    <tr><td>지식 통합</td><td>매번 재발견</td><td>미리 통합·합성</td></tr>
    <tr><td>맥락 연결</td><td>청크 단위 (단편적)</td><td>전체 위키 참조 (풍부)</td></tr>
    <tr><td>응답 속도</td><td>빠름</td><td>빠름 (이미 정제됨)</td></tr>
    <tr><td>지식 성장</td><td>없음</td><td>복리 성장</td></tr>
    <tr><td>설정 복잡도</td><td>중간 (벡터 DB 필요)</td><td>낮음 (파일만 필요)</td></tr>
    <tr><td>최신 문서</td><td>즉시 반영</td><td>인제스트 필요</td></tr>
    <tr><td>대규모 문서</td><td>유리</td><td>불리 (토큰 한계)</td></tr>
  </tbody>
</table>

<h2>언제 무엇을 선택할까?</h2>
<div class="two-col">
  <div class="col-card">
    <h3>RAG가 유리한 경우</h3>
    <ul>
      <li>수만 개 이상의 대용량 문서</li>
      <li>실시간 업데이트가 필요한 경우</li>
      <li>원본 문서를 그대로 제공해야 할 때</li>
      <li>법적 근거(출처)가 중요한 경우</li>
    </ul>
  </div>
  <div class="col-card">
    <h3>LLM Wiki가 유리한 경우</h3>
    <ul>
      <li>개인/팀 지식 베이스 구축</li>
      <li>연구 논문·기술 문서 정리</li>
      <li>지식 간 연결이 중요한 경우</li>
      <li>장기간 축적이 목적인 경우</li>
    </ul>
  </div>
</div>
`
  },

  workflow: {
    title: '실전 워크플로우',
    breadcrumb: '심화 / 실전 워크플로우',
    content: `
<h1>🚀 실전 워크플로우</h1>
<p class="lead">LLM Wiki를 처음 구축하고 운영하는 단계별 가이드입니다.</p>

<h2>Step 1: 초기 설정</h2>
<div class="step-block">
  <div class="step-num">1</div>
  <div class="step-content">
    <h3>디렉토리 구조 생성</h3>
<div class="code-block">
<pre><code>mkdir wiki
cd wiki
mkdir concept entity summary qa
touch index.md log.md schema.md</code></pre>
</div>
  </div>
</div>

<div class="step-block">
  <div class="step-num">2</div>
  <div class="step-content">
    <h3>schema.md 작성</h3>
    <p>위키의 규칙을 정의합니다. 나중에 수정할 수 있습니다.</p>
<div class="code-block">
<pre><code># 위키 스키마

## 디렉토리 규칙
- concept/ : 핵심 개념 1페이지로 정의
- entity/  : 인물·프로젝트·기관
- summary/ : 소스 문서 요약 (소스명.md)
- qa/      : 날짜-질문제목.md 형식

## 페이지 형식
- 제목: H1 하나만
- 내부 링크: [[페이지명]] 형식
- 마지막 줄: 업데이트 날짜

## 변경 규칙
- 새 페이지 → index.md 추가
- 모든 변경 → log.md에 한 줄 기록</code></pre>
</div>
  </div>
</div>

<h2>Step 2: 첫 Ingest</h2>
<div class="step-block">
  <div class="step-num">3</div>
  <div class="step-content">
    <h3>소스 문서 추가 + LLM에 프롬프트</h3>
<div class="code-block">
<pre><code># LLM에게 전달할 프롬프트 예시
---
현재 위키 상태: [index.md 내용]
스키마: [schema.md 내용]
추가할 소스: [문서 내용]

위 소스를 읽고 위키에 통합해줘:
1. 새 개념이 있으면 concept/ 에 새 파일 생성
2. 기존 페이지가 있으면 업데이트
3. summary/ 에 소스 요약 저장
4. index.md, log.md 업데이트
---</code></pre>
</div>
  </div>
</div>

<h2>Step 3: 일상 운영</h2>
<div class="two-col">
  <div class="col-card">
    <h3>📥 소스 추가 시</h3>
    <ol>
      <li>sources/ 폴더에 파일 저장</li>
      <li>Ingest 프롬프트 실행</li>
      <li>LLM 출력을 파일로 저장</li>
    </ol>
  </div>
  <div class="col-card">
    <h3>🔍 질문할 때</h3>
    <ol>
      <li>관련 위키 페이지 첨부</li>
      <li>Query 프롬프트 실행</li>
      <li>좋은 답변은 qa/ 에 저장</li>
    </ol>
  </div>
</div>

<div class="callout callout-tip">
  <div class="callout-icon">💡</div>
  <div>
    <strong>도구 추천</strong><br>
    <strong>Obsidian</strong>으로 위키를 열면 [[링크]] 참조·그래프 뷰·검색이 자동으로 됩니다. LLM은 파일을 관리하고, 인간은 Obsidian으로 탐색합니다.
  </div>
</div>
`
  },

  tips: {
    title: '운영 팁',
    breadcrumb: '심화 / 운영 팁',
    content: `
<h1>💎 운영 팁</h1>
<p class="lead">LLM Wiki를 효과적으로 운영하기 위한 실전 팁입니다.</p>

<h2>프롬프트 최적화</h2>

<div class="tip-card">
  <div class="tip-title">✅ 항상 index.md를 먼저 제공하라</div>
  <p>LLM이 위키 전체 구조를 파악할 수 있도록 매 프롬프트에 index.md를 포함합니다. 위키가 커지면 압축된 버전을 사용하세요.</p>
</div>

<div class="tip-card">
  <div class="tip-title">✅ 변경 범위를 명확히 지시하라</div>
  <p>"최대 5개 파일만 수정해줘"처럼 범위를 제한하면 LLM이 더 집중적인 통합을 수행합니다.</p>
</div>

<div class="tip-card">
  <div class="tip-title">✅ log.md로 컨텍스트를 유지하라</div>
  <p>최근 log.md 내용을 프롬프트에 포함하면 LLM이 최근 변경 흐름을 파악하고 더 일관성 있게 작업합니다.</p>
</div>

<h2>토큰 효율화</h2>

<div class="tip-card">
  <div class="tip-title">💡 위키 페이지 크기를 제한하라</div>
  <p>각 페이지를 500~1000 토큰 이내로 유지합니다. 길어지면 분할하고 index에서 참조합니다.</p>
</div>

<div class="tip-card">
  <div class="tip-title">💡 관련 페이지만 선택적으로 제공하라</div>
  <p>모든 위키를 매번 넣지 말고, 소스와 관련된 페이지만 선별해서 제공합니다. index.md가 이 선별을 도와줍니다.</p>
</div>

<h2>품질 관리</h2>

<div class="tip-card">
  <div class="tip-title">🔧 월 1회 Lint를 실행하라</div>
  <p>주기적으로 위키 전체를 검토해 모순·공백·오래된 정보를 정리합니다. 위키가 신뢰할 수 있어야 가치가 있습니다.</p>
</div>

<div class="tip-card">
  <div class="tip-title">🔧 소스 출처를 항상 기록하라</div>
  <p>각 위키 페이지에 어느 소스에서 나온 정보인지 기록합니다. 나중에 검증이 필요할 때 추적할 수 있습니다.</p>
</div>

<h2>확장 아이디어</h2>
<ul>
  <li><strong>멀티 에이전트:</strong> Ingest·Query·Lint를 각각 다른 LLM 에이전트에 할당</li>
  <li><strong>자동화:</strong> 새 논문이 arXiv에 올라오면 자동으로 Ingest 실행</li>
  <li><strong>팀 위키:</strong> Git으로 위키를 관리하면 여러 명이 공동 운영 가능</li>
  <li><strong>RAG 혼합:</strong> 위키는 LLM Wiki로, 대용량 원본은 RAG로 보완</li>
</ul>

<div class="callout callout-info">
  <div class="callout-icon">🔗</div>
  <div>
    <strong>참고 자료</strong><br>
    원본 Gist: <a href="https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f" target="_blank">Andrej Karpathy — LLM Wiki Pattern</a><br>
    Obsidian: <a href="https://obsidian.md" target="_blank">obsidian.md</a>
  </div>
</div>
`
  }
};

/* ──────────────────────────────
   라우팅
   ────────────────────────────── */
let currentPage = 'intro';

function navigate(pageId) {
  const page = PAGES[pageId];
  if (!page) return;

  currentPage = pageId;

  const rawContent = page.content || '';
  const looksLikeMarkdown = /^#{1,3} |^\*\*|^---/m.test(rawContent) && !/<[a-z]/i.test(rawContent);
  document.getElementById('content').innerHTML =
    (looksLikeMarkdown && typeof marked !== 'undefined') ? marked.parse(rawContent) : rawContent;
  document.getElementById('breadcrumb').textContent = page.breadcrumb;
  document.title = `${page.title} — LLM Wiki`;

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === pageId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ──────────────────────────────
   검색
   ────────────────────────────── */
function performSearch(q) {
  const nav = document.getElementById('nav');
  if (!q.trim()) {
    nav.querySelectorAll('.nav-item').forEach(el => { el.style.display = ''; });
    nav.querySelectorAll('.nav-section-label').forEach(el => { el.style.display = ''; });
    return;
  }

  const lower = q.toLowerCase();
  nav.querySelectorAll('.nav-item').forEach(el => {
    const pageId = el.dataset.page;
    const page = PAGES[pageId];
    const match = page && (
      page.title.toLowerCase().includes(lower) ||
      page.content.toLowerCase().includes(lower)
    );
    const target = el.closest('.nav-item-row') || el;
    target.style.display = match ? '' : 'none';
  });
  nav.querySelectorAll('.nav-section-label').forEach(el => { el.style.display = 'none'; });
}

/* ──────────────────────────────
   사이드바 토글
   ────────────────────────────── */
function initSidebar() {
  const sidebar    = document.getElementById('sidebar');
  const toggle     = document.getElementById('sidebarToggle');
  const expandBtn  = document.getElementById('sidebarExpandBtn');
  const main       = document.getElementById('main');
  const mobile     = document.getElementById('mobileMenuBtn');

  function applySidebarState(collapsed) {
    sidebar.classList.toggle('collapsed', collapsed);
    main.classList.toggle('full', collapsed);
    toggle.textContent = collapsed ? '›' : '‹';
    expandBtn.classList.toggle('visible', collapsed);
    localStorage.setItem('wikiSidebarCollapsed', collapsed ? '1' : '0');
  }

  applySidebarState(localStorage.getItem('wikiSidebarCollapsed') === '1');

  toggle.addEventListener('click', () => {
    applySidebarState(!sidebar.classList.contains('collapsed'));
  });

  expandBtn.addEventListener('click', () => {
    applySidebarState(false);
  });

  mobile.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });

  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !mobile.contains(e.target)) {
      sidebar.classList.remove('mobile-open');
    }
  });
}

/* ──────────────────────────────
   GitHub API
   ────────────────────────────── */
const GH_FILE = 'user-pages.json';
const userPageIds = new Set();

function makeUserNavItem(id, title) {
  const wrap = document.createElement('div');
  wrap.className = 'nav-item-row';
  const a = document.createElement('a');
  a.className = 'nav-item'; a.href = '#';
  a.dataset.page = id; a.textContent = title;
  const del = document.createElement('button');
  del.className = 'nav-del-btn'; del.title = '삭제'; del.textContent = '✕'; del.dataset.id = id;
  wrap.appendChild(a); wrap.appendChild(del);
  return wrap;
}

async function handleDeletePage(pageId, delBtn) {
  if (delBtn.dataset.confirm !== '1') {
    delBtn.dataset.confirm = '1';
    delBtn.textContent = '삭제?';
    setTimeout(() => {
      if (delBtn.dataset.confirm === '1') { delBtn.dataset.confirm = '0'; delBtn.textContent = '✕'; }
    }, 2500);
    return;
  }
  if (!ghConfig().token) { delBtn.dataset.confirm = '0'; delBtn.textContent = '✕'; alert('⚙️ 설정에서 GitHub 토큰을 입력해 주세요.'); return; }
  delBtn.textContent = '…'; delBtn.disabled = true;
  try {
    const f = await ghGetFile(GH_FILE);
    const current = JSON.parse(f.text);
    delete current.pages[pageId];
    current.nav.forEach(sec => { sec.items = sec.items.filter(i => i.id !== pageId); });
    current.nav = current.nav.filter(sec => sec.items.length > 0);
    const ok = await ghPutFile(GH_FILE, JSON.stringify(current, null, 2), f.sha, `페이지 삭제: ${PAGES[pageId]?.title || pageId}`);
    if (ok) {
      delete PAGES[pageId]; userPageIds.delete(pageId);
      delBtn.closest('.nav-item-row').remove();
      if (currentPage === pageId) navigate('intro');
    } else { delBtn.textContent = '✕'; delBtn.disabled = false; delBtn.dataset.confirm = '0'; }
  } catch(e) { delBtn.textContent = '✕'; delBtn.disabled = false; delBtn.dataset.confirm = '0'; }
}

function ghConfig() {
  return {
    token: localStorage.getItem('gh_token') || '',
    owner: localStorage.getItem('gh_owner') || 'jeasoek',
    repo:  localStorage.getItem('gh_repo')  || 'llm-wiki',
  };
}

async function ghGetFile(path) {
  const c = ghConfig();
  const r = await fetch(
    `https://api.github.com/repos/${c.owner}/${c.repo}/contents/${path}`,
    { headers: { Authorization: `token ${c.token}` } }
  );
  if (!r.ok) throw new Error(r.status);
  const d = await r.json();
  return { sha: d.sha, text: decodeURIComponent(escape(atob(d.content.replace(/\s/g, '')))) };
}

async function ghPutFile(path, text, sha, message) {
  const c = ghConfig();
  const body = { message, content: btoa(unescape(encodeURIComponent(text))) };
  if (sha) body.sha = sha;
  const r = await fetch(
    `https://api.github.com/repos/${c.owner}/${c.repo}/contents/${path}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${c.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  return r.ok;
}

async function loadUserPages() {
  const c = ghConfig();
  try {
    const url = `https://raw.githubusercontent.com/${c.owner}/${c.repo}/main/${GH_FILE}?_=${Date.now()}`;
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    Object.assign(PAGES, data.pages || {});
    const nav = document.getElementById('nav');
    (data.nav || []).forEach(sec => {
      if (!sec.items || sec.items.length === 0) return;
      const label = document.createElement('div');
      label.className = 'nav-section-label';
      label.textContent = sec.section;
      nav.appendChild(label);
      sec.items.forEach(item => {
        userPageIds.add(item.id);
        nav.appendChild(makeUserNavItem(item.id, item.title));
      });
    });
  } catch(e) {
    console.warn('user-pages 로드 실패:', e);
  }
}

async function saveUserPage(pageData, navSection) {
  let current = { nav: [], pages: {} };
  let sha = null;
  try {
    const f = await ghGetFile(GH_FILE);
    sha = f.sha;
    current = JSON.parse(f.text);
  } catch(e) { /* 파일 없음 — 새로 생성 */ }

  current.pages[pageData.id] = {
    title:      pageData.title,
    breadcrumb: pageData.breadcrumb,
    content:    pageData.content,
  };

  let sec = current.nav.find(s => s.section === navSection);
  if (!sec) {
    sec = { section: navSection, items: [] };
    current.nav.push(sec);
  }
  if (!sec.items.find(i => i.id === pageData.id)) {
    sec.items.push({ id: pageData.id, title: pageData.title });
  }

  return ghPutFile(GH_FILE, JSON.stringify(current, null, 2), sha, `페이지 추가: ${pageData.title}`);
}

function toSlug(str) {
  return str.trim().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-가-힣]/g, '')
    .replace(/--+/g, '-') || `page-${Date.now()}`;
}

/* ──────────────────────────────
   Gemini API
   ────────────────────────────── */
async function callGemini(documentText) {
  const key = localStorage.getItem('gemini_key') || '';
  if (!key) throw new Error('Gemini API 키가 설정되지 않았습니다. ⚙️ 설정에서 입력해 주세요.');

  const prompt = `당신은 LLM Wiki 관리자입니다. 아래 문서를 분석해서 위키 페이지로 정리해주세요.

반드시 다음 JSON 형식으로만 응답하세요 (코드 블록 없이 순수 JSON):
{
  "title": "페이지 제목 (한국어, 간결하게)",
  "section": "카테고리 (예: 개념, 아키텍처, 튜토리얼, 심화, 레퍼런스 등)",
  "content": "HTML 형식의 페이지 내용"
}

content HTML 작성 규칙:
- <h2>대제목</h2>, <h3>소제목</h3>
- <p>단락</p>
- <ul><li>항목</li></ul> 또는 <ol><li>항목</li></ol>
- <strong>강조</strong>
- 핵심 개념은 <div class="callout callout-info"><div class="callout-icon">💡</div><div>내용</div></div> 사용
- 비교/정리표는 <table class="wiki-table"><thead><tr><th>...</th></tr></thead><tbody>...</tbody></table> 사용
- 코드는 <div class="code-block"><pre><code>...</code></pre></div> 사용
- 내용은 충실하고 상세하게 작성

문서 내용:
${documentText}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 8192 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API 오류 (${res.status})`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Gemini 응답을 파싱할 수 없습니다.');
  return JSON.parse(jsonMatch[0]);
}

/* ──────────────────────────────
   Gemini 공통 헬퍼
   ────────────────────────────── */
async function callGeminiRaw(prompt, maxTokens) {
  const key = localStorage.getItem('gemini_key') || '';
  if (!key) throw new Error('Gemini API 키가 설정되지 않았습니다. ⚙️ 설정에서 입력해 주세요.');
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: maxTokens || 4096 },
      }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `API 오류 (${res.status})`);
  }
  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('응답을 파싱할 수 없습니다.');
  return JSON.parse(m[0]);
}

function buildWikiContext() {
  return Object.entries(PAGES).map(([id, page]) => {
    const text = (page.content || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 2000);
    return `### ${page.title}\n${text}`;
  }).join('\n\n---\n\n');
}

async function callGeminiQuery(question) {
  const ctx = buildWikiContext();
  return callGeminiRaw(
    `당신은 LLM Wiki 전문가입니다. 아래 위키 내용을 참고해서 질문에 상세히 답해주세요.

위키 내용:
${ctx}

질문: ${question}

반드시 다음 JSON만 응답하세요 (코드 블록 없이):
{
  "answer": "HTML 형식 답변 (<h2>,<h3>,<p>,<ul><li>,<strong>,callout div 사용)",
  "save_title": "이 답변을 저장할 페이지 제목",
  "save_section": "저장할 섹션명"
}`, 4096
  );
}

async function callGeminiLint() {
  const ctx = buildWikiContext();
  return callGeminiRaw(
    `당신은 LLM Wiki 품질 관리자입니다. 아래 위키 전체를 검토해 품질 이슈를 찾아주세요.

위키 내용:
${ctx}

검사 항목:
1. 모순: 서로 다른 페이지에서 상충되는 내용
2. 공백: 언급되었지만 페이지가 없는 중요 개념
3. 보완필요: 내용이 부족하거나 더 상세히 다뤄야 할 페이지
4. 오래됨: 업데이트가 필요할 수 있는 정보

반드시 다음 JSON만 응답하세요 (코드 블록 없이):
{
  "issues": [
    {
      "type": "모순|공백|보완필요|오래됨",
      "severity": "high|medium|low",
      "title": "이슈 제목",
      "pages": ["관련 페이지 제목들"],
      "description": "이슈 상세 설명",
      "suggestion": "개선 방향"
    }
  ],
  "summary": "전체 위키 품질 요약 (2-3문장)"
}`, 4096
  );
}

/* ──────────────────────────────
   Query UI
   ────────────────────────────── */
function initQueryUI() {
  const queryModal     = document.getElementById('queryModal');
  const queryInput     = document.getElementById('queryInput');
  const queryAnswerArea = document.getElementById('queryAnswerArea');
  const queryAnswer    = document.getElementById('queryAnswer');
  const queryStatus    = document.getElementById('queryStatus');
  const queryAskBtn    = document.getElementById('queryAskBtn');
  const querySaveBtn   = document.getElementById('querySaveBtn');
  let lastResult = null;

  function setStatus(msg, type) { queryStatus.textContent = msg; queryStatus.className = `add-page-status ${type}`; }

  document.getElementById('queryBtn').addEventListener('click', () => {
    queryInput.value = ''; queryAnswer.innerHTML = '';
    queryAnswerArea.classList.add('hidden'); querySaveBtn.classList.add('hidden');
    setStatus('', ''); queryModal.classList.remove('hidden'); queryInput.focus();
  });
  document.getElementById('closeQuery').addEventListener('click', () => queryModal.classList.add('hidden'));
  queryModal.addEventListener('click', e => { if (e.target === queryModal) queryModal.classList.add('hidden'); });

  queryInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); queryAskBtn.click(); }
  });

  queryAskBtn.addEventListener('click', async () => {
    const q = queryInput.value.trim();
    if (!q) { setStatus('질문을 입력해 주세요.', 'err'); return; }
    if (!localStorage.getItem('gemini_key')) { setStatus('⚙️ 설정에서 Gemini API 키를 입력해 주세요.', 'err'); return; }
    setStatus('Gemini가 위키를 검색 중...', ''); queryAskBtn.disabled = true;
    queryAnswerArea.classList.add('hidden'); querySaveBtn.classList.add('hidden');
    try {
      lastResult = await callGeminiQuery(q);
      queryAnswer.innerHTML = lastResult.answer;
      queryAnswerArea.classList.remove('hidden'); querySaveBtn.classList.remove('hidden');
      setStatus('', '');
    } catch(e) { setStatus(`오류: ${e.message}`, 'err'); }
    finally { queryAskBtn.disabled = false; }
  });

  querySaveBtn.addEventListener('click', async () => {
    if (!lastResult) return;
    if (!ghConfig().token) { setStatus('⚙️ 설정에서 GitHub 토큰을 입력해 주세요.', 'err'); return; }
    const title = lastResult.save_title || '새 Q&A';
    const section = lastResult.save_section || 'Q&A';
    const id = toSlug(title);
    setStatus('GitHub에 저장 중...', ''); querySaveBtn.disabled = true;
    const ok = await saveUserPage({ id, title, breadcrumb: `${section} / ${title}`, content: lastResult.answer }, section);
    querySaveBtn.disabled = false;
    if (ok) {
      setStatus('✓ 저장됨! Vercel 배포 중...', 'ok');
      PAGES[id] = { title, breadcrumb: `${section} / ${title}`, content: lastResult.answer };
      userPageIds.add(id);
      const nav = document.getElementById('nav');
      let secEl = Array.from(nav.querySelectorAll('.nav-section-label')).find(el => el.textContent === section);
      if (!secEl) { secEl = document.createElement('div'); secEl.className = 'nav-section-label'; secEl.textContent = section; nav.appendChild(secEl); }
      nav.appendChild(makeUserNavItem(id, title));
      setTimeout(() => { queryModal.classList.add('hidden'); navigate(id); }, 2000);
    } else { setStatus('저장 실패.', 'err'); }
  });
}

/* ──────────────────────────────
   Lint UI
   ────────────────────────────── */
function initLintUI() {
  const lintModal    = document.getElementById('lintModal');
  const lintStatus   = document.getElementById('lintStatus');
  const lintResults  = document.getElementById('lintResults');
  const lintStartBtn = document.getElementById('lintStartBtn');

  function setStatus(msg, type) { lintStatus.textContent = msg; lintStatus.className = `add-page-status ${type}`; }

  document.getElementById('lintBtn').addEventListener('click', () => {
    lintResults.innerHTML = ''; setStatus('', '');
    lintStartBtn.disabled = false; lintStartBtn.textContent = '🔧 검사 시작';
    lintModal.classList.remove('hidden');
  });
  document.getElementById('closeLint').addEventListener('click', () => lintModal.classList.add('hidden'));
  lintModal.addEventListener('click', e => { if (e.target === lintModal) lintModal.classList.add('hidden'); });

  lintStartBtn.addEventListener('click', async () => {
    if (!localStorage.getItem('gemini_key')) { setStatus('⚙️ 설정에서 Gemini API 키를 입력해 주세요.', 'err'); return; }
    setStatus('Gemini가 위키 전체를 검토 중... (30초~1분 소요)', '');
    lintStartBtn.disabled = true; lintStartBtn.textContent = '검사 중...'; lintResults.innerHTML = '';
    try {
      const result = await callGeminiLint();
      renderLintResults(result);
      setStatus('', '');
    } catch(e) {
      setStatus(`오류: ${e.message}`, 'err');
      lintStartBtn.disabled = false; lintStartBtn.textContent = '🔧 다시 검사';
    }
  });

  function renderLintResults(result) {
    const sevLabel = { high: '높음', medium: '중간', low: '낮음' };
    const typeIcon = { '모순': '⚠️', '공백': '🔲', '보완필요': '📝', '오래됨': '🕐' };
    const issues = result.issues || [];
    let html = '';
    if (result.summary) html += `<div class="lint-summary">${result.summary}</div>`;
    if (issues.length === 0) {
      html += `<div class="lint-empty">✅ 이슈가 없습니다. 위키 품질이 양호합니다!</div>`;
    } else {
      html += `<div class="lint-count">${issues.length}개 이슈 발견</div>`;
      issues.forEach(issue => {
        html += `<div class="lint-issue lint-${issue.severity}">
          <div class="lint-issue-hdr">
            <span class="lint-type">${typeIcon[issue.type] || '•'} ${issue.type}</span>
            <span class="lint-sev lint-sev-${issue.severity}">${sevLabel[issue.severity] || issue.severity}</span>
          </div>
          <div class="lint-issue-title">${issue.title || ''}</div>
          ${issue.pages?.length ? `<div class="lint-pages">관련 페이지: ${issue.pages.join(', ')}</div>` : ''}
          <div class="lint-desc">${issue.description}</div>
          ${issue.suggestion ? `<div class="lint-suggestion">💡 ${issue.suggestion}</div>` : ''}
        </div>`;
      });
    }
    lintResults.innerHTML = html;
    lintStartBtn.textContent = '🔧 다시 검사'; lintStartBtn.disabled = false;
  }
}

/* ──────────────────────────────
   Ingest UI
   ────────────────────────────── */
function initIngestUI() {
  const ingestModal      = document.getElementById('ingestModal');
  const ingestInputArea  = document.getElementById('ingestInputArea');
  const ingestPreviewArea = document.getElementById('ingestPreviewArea');
  const ingestAnalyzeBtn = document.getElementById('ingestAnalyzeBtn');
  const ingestSaveBtn    = document.getElementById('ingestSaveBtn');
  const ingestBackBtn    = document.getElementById('ingestBackBtn');
  const ingestStatus     = document.getElementById('ingestStatus');

  function setIngestStatus(msg, type) {
    ingestStatus.textContent = msg;
    ingestStatus.className = `add-page-status ${type}`;
  }

  function showInputState() {
    ingestInputArea.classList.remove('hidden');
    ingestPreviewArea.classList.add('hidden');
    ingestAnalyzeBtn.classList.remove('hidden');
    ingestSaveBtn.classList.add('hidden');
    ingestBackBtn.classList.add('hidden');
    setIngestStatus('', '');
  }

  /* 열기/닫기 */
  document.getElementById('ingestBtn').addEventListener('click', () => {
    showInputState();
    document.getElementById('ingestText').value = '';
    document.getElementById('ingestFileName').textContent = '';
    ingestModal.classList.remove('hidden');
    document.getElementById('ingestText').focus();
  });
  document.getElementById('closeIngest').addEventListener('click', () => ingestModal.classList.add('hidden'));
  ingestModal.addEventListener('click', e => { if (e.target === ingestModal) ingestModal.classList.add('hidden'); });
  ingestBackBtn.addEventListener('click', showInputState);

  /* 파일 선택 */
  const fileInput = document.getElementById('ingestFileInput');
  document.getElementById('ingestFileBtn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    document.getElementById('ingestFileName').textContent = file.name;
    const reader = new FileReader();
    reader.onload = ev => { document.getElementById('ingestText').value = ev.target.result; };
    reader.readAsText(file, 'UTF-8');
    fileInput.value = '';
  });

  /* Gemini 분석 */
  ingestAnalyzeBtn.addEventListener('click', async () => {
    const text = document.getElementById('ingestText').value.trim();
    if (!text) { setIngestStatus('문서 내용을 입력해 주세요.', 'err'); return; }
    if (!localStorage.getItem('gemini_key')) {
      setIngestStatus('⚙️ 설정에서 Gemini API 키를 먼저 입력해 주세요.', 'err'); return;
    }

    setIngestStatus('Gemini가 분석 중입니다...', '');
    ingestAnalyzeBtn.disabled = true;

    try {
      const result = await callGemini(text);
      document.getElementById('ingestTitle').value   = result.title   || '';
      document.getElementById('ingestSection').value = result.section || '';
      document.getElementById('ingestPreview').innerHTML = result.content || '';

      ingestInputArea.classList.add('hidden');
      ingestPreviewArea.classList.remove('hidden');
      ingestAnalyzeBtn.classList.add('hidden');
      ingestSaveBtn.classList.remove('hidden');
      ingestBackBtn.classList.remove('hidden');
      setIngestStatus('분석 완료! 내용을 확인 후 저장하세요.', 'ok');
    } catch(e) {
      setIngestStatus(`오류: ${e.message}`, 'err');
    } finally {
      ingestAnalyzeBtn.disabled = false;
    }
  });

  /* GitHub 저장 */
  ingestSaveBtn.addEventListener('click', async () => {
    const title   = document.getElementById('ingestTitle').value.trim();
    const section = document.getElementById('ingestSection').value.trim();
    const content = document.getElementById('ingestPreview').innerHTML.trim();

    if (!title || !section) { setIngestStatus('제목과 섹션을 입력해 주세요.', 'err'); return; }
    if (!ghConfig().token)  { setIngestStatus('⚙️ 설정에서 GitHub 토큰을 입력해 주세요.', 'err'); return; }

    setIngestStatus('GitHub에 저장 중...', '');
    ingestSaveBtn.disabled = true;

    const id         = toSlug(title);
    const breadcrumb = `${section} / ${title}`;
    const ok         = await saveUserPage({ id, title, breadcrumb, content }, section);
    ingestSaveBtn.disabled = false;

    if (ok) {
      setIngestStatus('✓ 저장됨! Vercel 배포 중... (약 30초 후 반영)', 'ok');
      PAGES[id] = { title, breadcrumb, content };
      const nav = document.getElementById('nav');
      let secEl = Array.from(nav.querySelectorAll('.nav-section-label')).find(el => el.textContent === section);
      if (!secEl) {
        secEl = document.createElement('div');
        secEl.className = 'nav-section-label';
        secEl.textContent = section;
        nav.appendChild(secEl);
      }
      userPageIds.add(id);
      nav.appendChild(makeUserNavItem(id, title));
      setTimeout(() => { ingestModal.classList.add('hidden'); navigate(id); }, 2500);
    } else {
      setIngestStatus('저장 실패. GitHub 토큰을 확인해 주세요.', 'err');
    }
  });
}

/* ──────────────────────────────
   관리자 UI
   ────────────────────────────── */
function initAdminUI() {
  /* 설정 모달 */
  const settingsModal = document.getElementById('settingsModal');
  document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('geminiKey').value = localStorage.getItem('gemini_key') || '';
    document.getElementById('ghToken').value   = localStorage.getItem('gh_token')   || '';
    document.getElementById('ghOwner').value   = localStorage.getItem('gh_owner')   || 'jeasoek';
    document.getElementById('ghRepo').value    = localStorage.getItem('gh_repo')    || 'llm-wiki';
    settingsModal.classList.remove('hidden');
  });
  document.getElementById('closeSettings').addEventListener('click', () => settingsModal.classList.add('hidden'));
  settingsModal.addEventListener('click', e => { if (e.target === settingsModal) settingsModal.classList.add('hidden'); });
  document.getElementById('saveSettings').addEventListener('click', () => {
    localStorage.setItem('gemini_key', document.getElementById('geminiKey').value.trim());
    localStorage.setItem('gh_token',   document.getElementById('ghToken').value.trim());
    localStorage.setItem('gh_owner',   document.getElementById('ghOwner').value.trim() || 'jeasoek');
    localStorage.setItem('gh_repo',    document.getElementById('ghRepo').value.trim()  || 'llm-wiki');
    settingsModal.classList.add('hidden');
  });

  /* 페이지 추가 모달 */
  const addPageModal = document.getElementById('addPageModal');
  const sectionSel   = document.getElementById('newPageSection');
  const newSecRow    = document.getElementById('newSectionRow');

  document.getElementById('addPageBtn').addEventListener('click', () => {
    sectionSel.innerHTML = '';
    document.querySelectorAll('.nav-section-label').forEach(el => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = el.textContent;
      sectionSel.appendChild(opt);
    });
    const newOpt = document.createElement('option');
    newOpt.value = '__new__'; newOpt.textContent = '＋ 새 섹션 만들기';
    sectionSel.appendChild(newOpt);
    newSecRow.classList.add('hidden');
    document.getElementById('newPageTitle').value = '';
    document.getElementById('newPageContent').innerHTML = '';
    document.getElementById('newSectionName').value = '';
    setStatus('', '');
    addPageModal.classList.remove('hidden');
    document.getElementById('newPageTitle').focus();
  });

  sectionSel.addEventListener('change', () => {
    newSecRow.classList.toggle('hidden', sectionSel.value !== '__new__');
  });
  document.getElementById('closeAddPage').addEventListener('click', () => addPageModal.classList.add('hidden'));
  addPageModal.addEventListener('click', e => { if (e.target === addPageModal) addPageModal.classList.add('hidden'); });

  /* 에디터 툴바 */
  document.querySelectorAll('.page-editor-toolbar [data-cmd]').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      e.preventDefault();
      document.getElementById('newPageContent').focus();
      document.execCommand(btn.dataset.cmd, false, null);
    });
  });
  document.querySelectorAll('.page-editor-toolbar [data-tag]').forEach(btn => {
    btn.addEventListener('mousedown', e => {
      e.preventDefault();
      document.getElementById('newPageContent').focus();
      document.execCommand('formatBlock', false, btn.dataset.tag);
    });
  });

  /* 첨부 — 이미지 */
  const attachImgInput = document.getElementById('attachImgInput');
  document.getElementById('attachImgBtn').addEventListener('click', () => attachImgInput.click());
  attachImgInput.addEventListener('change', () => {
    const file = attachImgInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById('newPageContent').focus();
      document.execCommand('insertHTML', false,
        `<img src="${ev.target.result}" alt="${file.name}" style="max-width:100%;border-radius:8px;margin:8px 0">`
      );
    };
    reader.readAsDataURL(file);
    attachImgInput.value = '';
  });

  /* 첨부 — 텍스트 파일 */
  const attachFileInput = document.getElementById('attachFileInput');
  document.getElementById('attachFileBtn').addEventListener('click', () => attachFileInput.click());
  attachFileInput.addEventListener('change', () => {
    const file = attachFileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target.result;
      const editor = document.getElementById('newPageContent');
      editor.focus();
      const isMarkdown = file.name.endsWith('.md') || file.name.endsWith('.markdown');
      if (isMarkdown && typeof marked !== 'undefined') {
        document.execCommand('insertHTML', false, marked.parse(text));
      } else {
        const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        document.execCommand('insertHTML', false,
          `<pre style="background:#f1f5f9;border-radius:8px;padding:12px 14px;font-size:13px;overflow-x:auto;white-space:pre-wrap"><code>${escaped}</code></pre>`
        );
      }
    };
    reader.readAsText(file, 'UTF-8');
    attachFileInput.value = '';
  });

  /* 저장 */
  document.getElementById('saveNewPage').addEventListener('click', async () => {
    const title   = document.getElementById('newPageTitle').value.trim();
    const content = document.getElementById('newPageContent').innerHTML.trim();
    let   section = sectionSel.value;
    if (section === '__new__') section = document.getElementById('newSectionName').value.trim();

    const saveBtn = document.getElementById('saveNewPage');

    if (!title)   { setStatus('제목을 입력해 주세요.', 'err'); return; }
    if (!content || content === '<br>') { setStatus('내용을 입력해 주세요.', 'err'); return; }
    if (!section) { setStatus('섹션을 선택하거나 입력해 주세요.', 'err'); return; }
    if (!ghConfig().token) { setStatus('⚙️ 설정에서 GitHub 토큰을 먼저 입력해 주세요.', 'err'); return; }

    setStatus('저장 중...', '');
    saveBtn.disabled = true;

    const id         = toSlug(title);
    const breadcrumb = `${section} / ${title}`;
    const ok         = await saveUserPage({ id, title, breadcrumb, content }, section);
    saveBtn.disabled = false;

    if (ok) {
      setStatus('✓ 저장됨! Vercel이 배포 중입니다. (약 30초 후 반영)', 'ok');
      PAGES[id] = { title, breadcrumb, content };
      const nav = document.getElementById('nav');
      let secEl = Array.from(nav.querySelectorAll('.nav-section-label')).find(el => el.textContent === section);
      if (!secEl) {
        secEl = document.createElement('div');
        secEl.className = 'nav-section-label';
        secEl.textContent = section;
        nav.appendChild(secEl);
      }
      userPageIds.add(id);
      nav.appendChild(makeUserNavItem(id, title));
      setTimeout(() => addPageModal.classList.add('hidden'), 2500);
    } else {
      setStatus('저장 실패. 토큰과 저장소 설정을 확인해 주세요.', 'err');
    }
  });

  function setStatus(msg, type) {
    const el = document.getElementById('addPageStatus');
    el.textContent = msg;
    el.className = `add-page-status ${type}`;
  }
}

/* ──────────────────────────────
   초기화
   ────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadUserPages();
  navigate('intro');
  initSidebar();
  initAdminUI();
  initIngestUI();
  initQueryUI();
  initLintUI();

  document.getElementById('nav').addEventListener('click', e => {
    const delBtn = e.target.closest('.nav-del-btn');
    if (delBtn) { e.stopPropagation(); handleDeletePage(delBtn.dataset.id, delBtn); return; }
    const item = e.target.closest('.nav-item');
    if (!item) return;
    e.preventDefault();
    navigate(item.dataset.page);
    document.getElementById('sidebar').classList.remove('mobile-open');
  });

  let searchTimer;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => performSearch(e.target.value), 200);
  });
});
