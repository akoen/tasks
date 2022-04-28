export const icalToJSON = function (icalString) {
  let params = icalString.split(/\n(?=\S)/);
  params = params.map((i) => i.replace(/\n\s+/, ""));

  let task = {};
  params.forEach((p) => {
    p = parseParam(p);
    task[p[0]] = p[1];
  });
  return task;
};

const parseParam = function (paramString) {
  const key = paramString.match(/^[^:;]+/)[0];
  const val = paramString.match(/(?<=:).*?$/)[0];
  let valParsed;

  switch (key) {
    case "DTSTAMP":
    case "DUE":
      valParsed = strToDate(val);
      break;
    default:
      valParsed = val;
      break;
  }

  return [key.toLowerCase(), valParsed];
};

const strToDate = function (str) {
  const dateLength = 8;
  const dateTimeLength = 16;

  // NOTE: Month is 0-based
  if (str.length === dateLength) {
    return new Date(
      str.substring(0, 4),
      parseInt(str.substring(4, 6)) - 1,
      str.substring(6, 8)
    );
  } else if (str.length === dateTimeLength) {
    return new Date(
      str.substring(0, 4),
      parseInt(str.substring(4, 6)) - 1,
      str.substring(6, 8),
      str.substring(9, 11),
      str.substring(11, 13),
      str.substring(13, 15)
    );
  } else {
    throw new Error("Date is improperly formatted");
  }
};
