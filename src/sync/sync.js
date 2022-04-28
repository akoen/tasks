const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const { icalToJSON } = require("../parse/ical-parse");

let token = null;

const reqGetToken = `
<d:propfind xmlns:d="DAV:" xmlns:cs="http://calendarserver.org/ns/">
    <d:prop>
        <d:displayname />
        <cs:getctag />
        <d:sync-token />
    </d:prop>
</d:propfind>`;

async function getSyncToken() {
  const parser = new XMLParser();

  const xml = await axios.request({
    url: global.calendarURL,
    method: "PROPFIND",
    data: reqGetToken,
  });

  const data = parser.parse(xml.data);
  return data.multistatus.response.propstat.prop["sync-token"];
}

const reqAllTasks = `
<c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
    <d:prop>
        <d:getetag />
        <c:calendar-data />
    </d:prop>
    <c:filter>
        <c:comp-filter name="VCALENDAR">
            <c:comp-filter name="VTODO" />
        </c:comp-filter>
    </c:filter>
</c:calendar-query>`;

const reqSync = (token) => `
<d:sync-collection xmlns:d="DAV:">
  <d:sync-token>${token}</d:sync-token>
  <d:sync-level>1</d:sync-level>
  <d:prop>
    <d:getetag/>
  </d:prop>
</d:sync-collection>
`;

// TODO: Implement caldav sync https://sabre.io/dav/building-a-caldav-client/
async function getAllTasks() {
  const parser = new XMLParser();

  const res = await axios
    .request({
      url: global.calendarURL,
      method: "REPORT",
      data: reqAllTasks,
    })
    .then((i) => i.data)
    .then((i) => parser.parse(i));

  return res.multistatus.response.map((i) => {
    const data = i.propstat.prop;
    return {
      url: i.href,
      etag: data.getetag,
      data: icalToJSON(data["C:calendar-data"]),
    };
  });
}

module.exports = { getSyncToken, getAllTasks };
