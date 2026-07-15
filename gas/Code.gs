// ==================================================
// サイトデータ API — Google Sheets → JSON
// ==================================================
// スクリプトプロパティ:
//   NETLIFY_BUILD_HOOK — Netlify Build Hook URL
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

function publishSite() {
  var hookUrl = PropertiesService.getScriptProperties().getProperty('NETLIFY_BUILD_HOOK');
  if (!hookUrl) {
    SpreadsheetApp.getUi().alert('NETLIFY_BUILD_HOOK が設定されていません。\nスクリプトプロパティに設定してください。');
    return;
  }
  UrlFetchApp.fetch(hookUrl, { method: 'post' });
  SpreadsheetApp.getUi().alert('サイトのビルドを開始しました。\n数分後に反映されます。');
}
