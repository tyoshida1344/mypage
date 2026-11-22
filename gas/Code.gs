// ==================================================
// サイトデータ API — Google Sheets → JSON
// ==================================================
// スクリプトプロパティ:
//   NETLIFY_BUILD_HOOK   — Netlify Build Hook URL
//   NETLIFY_ACCESS_TOKEN — Netlify Personal access token（環境変数の同期に使用）
//   NETLIFY_SITE_ID      — Netlify のサイト ID
// ==================================================

/** シートの全行をオブジェクト配列として返す */
function getSheetRows(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  var headers = data[0].map(function (h) { return String(h).trim(); });
  return data.slice(1)
    .filter(function (row) { return row.some(function (cell) { return cell !== ''; }); })
    .map(function (row) {
      var obj = {};
      headers.forEach(function (h, i) {
        if (h) obj[h] = row[i] !== undefined && row[i] !== null ? row[i] : '';
      });
      return obj;
    });
}

/** profile タブから単一オブジェクトを取得 */
function getProfile(ss) {
  var rows = getSheetRows(ss, 'profile');
  if (!rows.length) return { name: '', title: '', email: '', lead: '', about: '' };
  var r = rows[0];
  return {
    name: String(r.name || ''),
    title: String(r.title || ''),
    email: String(r.email || ''),
    lead: String(r.lead || ''),
    about: String(r.about || ''),
  };
}

/** profile タブから siteUrl を取得 */
function getSiteUrl(ss) {
  var rows = getSheetRows(ss, 'profile');
  if (!rows.length) return '';
  return String(rows[0].siteUrl || '');
}

/** skills タブ */
function getSkills(ss) {
  return getSheetRows(ss, 'skills').map(function (r) {
    return { label: String(r.label || ''), items: String(r.items || '') };
  });
}

/** services タブ — image1〜image4 を images 配列にまとめる */
function getServices(ss) {
  return getSheetRows(ss, 'services').map(function (r) {
    var images = [];
    for (var i = 1; i <= 4; i++) {
      var url = r['image' + i];
      if (url && String(url).trim()) images.push(String(url).trim());
    }
    return {
      type: String(r.type || ''),
      name: String(r.name || ''),
      description: String(r.description || ''),
      tech: String(r.tech || ''),
      images: images,
      link: String(r.link || ''),
      linkLabel: String(r.linkLabel || ''),
      note: String(r.note || ''),
      status: String(r.status || ''),
    };
  });
}

/** works タブ */
function getWorks(ss) {
  return getSheetRows(ss, 'works').map(function (r) {
    return {
      title: String(r.title || ''),
      description: String(r.description || ''),
      tech: String(r.tech || ''),
      thumb: String(r.thumb || ''),
      link: String(r.link || ''),
      status: String(r.status || ''),
    };
  });
}

/** career タブ — 同じ company の行をグループ化 */
function getCareer(ss) {
  var rows = getSheetRows(ss, 'career');
  var phases = [];
  var currentCompany = null;
  var currentPhase = null;

  rows.forEach(function (r) {
    var company = String(r.company || '').trim();
    var period = String(r.period || '').trim();

    if (company && company !== currentCompany) {
      currentPhase = { company: company, period: period, items: [] };
      phases.push(currentPhase);
      currentCompany = company;
    }

    if (currentPhase) {
      currentPhase.items.push({
        period: String(r.item_period || ''),
        title: String(r.item_title || ''),
        tech: String(r.item_tech || ''),
      });
    }
  });

  return phases;
}

/** contact タブ — 1行目の description + 各行の detail */
function getContact(ss) {
  var rows = getSheetRows(ss, 'contact');
  var description = rows.length ? String(rows[0].description || '') : '';
  var details = rows
    .filter(function (r) { return r.detail_label; })
    .map(function (r) {
      return {
        label: String(r.detail_label || ''),
        value: String(r.detail_value || ''),
      };
    });
  return { description: description, details: details };
}

/** links タブ */
function getLinks(ss) {
  var rows = getSheetRows(ss, 'links');
  if (!rows.length) return { github: '' };
  return { github: String(rows[0].github || '') };
}

// ==================================================
// Web App エンドポイント
// ==================================================

function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var data = {
    siteUrl: getSiteUrl(ss),
    profile: getProfile(ss),
    skills: getSkills(ss),
    services: getServices(ss),
    works: getWorks(ss),
    career: getCareer(ss),
    contact: getContact(ss),
    links: getLinks(ss),
  };
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================================================
// 手動公開（カスタムメニューから呼び出し）
// ==================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('サイト管理')
    .addItem('公開する', 'publishSite')
    .addToUi();
}

var GAS_API_URL_ENV_KEY = 'NUXT_GAS_API_URL';
var NETLIFY_API = 'https://api.netlify.com/api/v1';

function publishSite() {
  var ui = SpreadsheetApp.getUi();
  var props = PropertiesService.getScriptProperties();
  var hookUrl = props.getProperty('NETLIFY_BUILD_HOOK');
  var token = props.getProperty('NETLIFY_ACCESS_TOKEN');
  var siteId = props.getProperty('NETLIFY_SITE_ID');
  var missing = [
    ['NETLIFY_BUILD_HOOK', hookUrl],
    ['NETLIFY_ACCESS_TOKEN', token],
    ['NETLIFY_SITE_ID', siteId],
  ].filter(function (p) { return !p[1]; }).map(function (p) { return p[0]; });
  if (missing.length) {
    ui.alert(missing.join(', ') + ' が設定されていません。\nスクリプトプロパティに設定してください。');
    return;
  }

  var apiUrl;
  try {
    apiUrl = getLatestWebAppUrl();
    syncNetlifyEnv(token, siteId, GAS_API_URL_ENV_KEY, apiUrl);
  } catch (e) {
    ui.alert('Netlify の環境変数 ' + GAS_API_URL_ENV_KEY + ' を同期できなかったため、公開を中止しました。\n\n' + e.message);
    return;
  }

  var hookCode = UrlFetchApp.fetch(hookUrl, { method: 'post', muteHttpExceptions: true }).getResponseCode();
  if (hookCode < 200 || hookCode >= 300) {
    ui.alert('ビルドを開始できませんでした（HTTP ' + hookCode + '）。\nNETLIFY_BUILD_HOOK を確認してください。');
    return;
  }
  ui.alert('サイトのビルドを開始しました。\n数分後に反映されます。\n\nAPI URL: ' + apiUrl);
}

/** JSON API を呼び出し、2xx 以外は例外にする。404 は null を返す */
function fetchJson(url, options) {
  var res = UrlFetchApp.fetch(url, Object.assign({ muteHttpExceptions: true }, options));
  var code = res.getResponseCode();
  if (code === 404) return null;
  if (code < 200 || code >= 300) {
    throw new Error(code + ' ' + url.split('?')[0] + '\n' + res.getContentText().slice(0, 300));
  }
  var text = res.getContentText();
  return text ? JSON.parse(text) : {};
}

/** Apps Script API で、更新日時が最新のウェブアプリ版デプロイの /exec URL を取得する */
function getLatestWebAppUrl() {
  var url = 'https://script.googleapis.com/v1/projects/' + ScriptApp.getScriptId() + '/deployments';
  var res;
  try {
    res = fetchJson(url, { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() } });
  } catch (e) {
    throw new Error('デプロイ一覧を取得できませんでした。Apps Script API が有効か確認してください（https://script.google.com/home/usersettings）。\n' + e.message);
  }
  var latest = ((res && res.deployments) || [])
    // HEAD デプロイ（versionNumber なし・/dev URL）は除外
    .filter(function (d) { return d.deploymentConfig && d.deploymentConfig.versionNumber; })
    .map(function (d) {
      var webApp = (d.entryPoints || []).filter(function (e) { return e.entryPointType === 'WEB_APP'; })[0];
      return { url: webApp && webApp.webApp.url, updateTime: d.updateTime };
    })
    .filter(function (d) { return d.url; })
    .sort(function (a, b) { return a.updateTime < b.updateTime ? 1 : -1; })[0];
  if (!latest) throw new Error('ウェブアプリとしてのデプロイが見つかりません。');
  return latest.url;
}

/** Netlify のサイト環境変数を value に揃える（同じ値なら何もしない、無ければ作成） */
function syncNetlifyEnv(token, siteId, key, value) {
  var headers = { Authorization: 'Bearer ' + token };
  var site = fetchJson(NETLIFY_API + '/sites/' + siteId, { headers: headers });
  if (!site) throw new Error('Netlify のサイトが見つかりません（NETLIFY_SITE_ID を確認してください）。');

  var envUrl = NETLIFY_API + '/accounts/' + site.account_id + '/env';
  var query = '?site_id=' + encodeURIComponent(siteId);
  var current = fetchJson(envUrl + '/' + key + query, { headers: headers });
  var values = [{ context: 'all', value: value }];

  if (!current) {
    fetchJson(envUrl + query, {
      method: 'post',
      headers: headers,
      contentType: 'application/json',
      // scopes 省略時は全スコープ（スコープ指定は Netlify のプランによって使えないため指定しない）
      payload: JSON.stringify([{ key: key, values: values }]),
    });
    return;
  }

  var upToDate = current.values.length > 0 && current.values.every(function (v) { return v.value === value; });
  if (upToDate) return;

  fetchJson(envUrl + '/' + key + query, {
    method: 'put',
    headers: headers,
    contentType: 'application/json',
    payload: JSON.stringify({ key: key, scopes: current.scopes, values: values }),
  });
}
