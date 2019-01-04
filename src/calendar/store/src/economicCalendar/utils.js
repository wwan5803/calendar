import { oneDayInMS, oneWeekInMS } from "utils";
export function getEconomicDataListFromSource(source) {
  return source.data;
}

function reduceEconomicDataFiled(dataList) {
  return dataList.map(data => {
    const {
      EventId,
      ActualValue,
      ExpectedValue,
      PriorValue,
      StartDateTime,
      Country,
      CountryCode,
      EventNameEn,
      EventNameZh,
      EventName,
      EventType,
      Period,
      Scale,
      Importance,
      Unit
    } = data;
    return {
      EventId,
      ActualValue,
      ExpectedValue,
      PriorValue,
      StartDateTime,
      Country,
      CountryCode,
      EventNameEn,
      EventNameZh,
      EventName,
      EventType,
      Period,
      Scale,
      Importance,
      Unit
    };
  });
}

export function reduceEconomicFiledFromSource(source) {
  return reduceEconomicDataFiled(getEconomicDataListFromSource(source));
}

export function sourceDateStringToTime(string) {
  const str = /\d\d:\d\d:\d\d/.exec(string)[0];
  const hours = +str.substr(0, 2);
  const mins = +str.substr(3, 2);
  const seconds = +str.substr(6, 2);
  const y = +string.substr(0, 4);
  const m = +string.substr(5, 2);
  const d = +string.substr(8, 2);
  return Date.UTC(y, m - 1, d, hours, mins, seconds);
}

export function addStartTimeInUTCMSField(dataList) {
  return dataList.map(data => {
    data.startTimeInUTCMS = sourceDateStringToTime(data.StartDateTime);
    return data;
  });
}

export function filterEconomicCalendarByTime({ map, start, end, timezone }) {
  return map.filter(entity => {
    const adjustedTime =
      entity.get("startTimeInUTCMS");
      
    if ((adjustedTime >= start - timezone * 3600 * 1000 && adjustedTime <= end + timezone * 3600 * 1000) || (!end && adjustedTime >= start - timezone * 3600 * 1000)) {
      return !!1;
    }
    return !!0;
  });
}

export function sortEconomicDataByTime({ map }) {
  return map.sort((entityA, entityB) => {
    const startTimeInUTCMSA = entityA.get("startTimeInUTCMS");
    const startTimeInUTCMSB = entityB.get("startTimeInUTCMS");
    if (startTimeInUTCMSA < startTimeInUTCMSB) return -1;
    else if (startTimeInUTCMSA === startTimeInUTCMSB) return 0;
    return 1;
  });
}

export function mapToIdArray({ map }) {
  return map.keySeq().toArray();
}

/***
 * list should be sorted news data list
 * 当result.push(aGroup)后，往aGroup里push东西，result里的aGroup也会更新；
 * 当aGroup = [] 之后，这个时候再往aGroup里push东西，result里的aGroup不会再更新；
 * 因为当aGroup = []之后， aGroup 和 result里的 aGroup 不再指向同一个地址
 * @param list
 * @param start
 * @param timezone
 */
export function groupEconomicDataListByDay({ map, idArray, start, timezone }) {
  const result = [];
  let index = start;
  let iteratingDayGroup = [];
  result.push(iteratingDayGroup);
  idArray.forEach(id => {
    const data = map.get(id);
    if (!data) return;
    const adjustedTime = data.get("startTimeInUTCMS") + timezone * 3600 * 1000;
    if (adjustedTime >= index && adjustedTime < index + oneDayInMS) {
      iteratingDayGroup.push(id);
    } else if (adjustedTime >= index) {
      while (adjustedTime > index + oneDayInMS) {
        iteratingDayGroup = [];
        result.push(iteratingDayGroup);
        index += oneDayInMS;
      }
      iteratingDayGroup.push(id);
    }
  });
  
  return result;
}

export function groupEconomicDataListByTime({ map, idArray }) {
  const result = [];
  if (idArray && idArray.length && map) {
    const firstId = idArray[0];
    const firstEntity = map.get(firstId);
    if (!firstEntity) return result;

    let index = firstEntity.get("startTimeInUTCMS");

    let group = [];
    result.push(group);
    idArray.forEach(id => {
      const data = map.get(id);
      if (!data) return;
      if (data.get("startTimeInUTCMS") !== index) {
        index = data.get("startTimeInUTCMS");
        group = [];
        result.push(group);
      }
      group.push(id);
    });
  }

  return result;
}

export function groupEconomicDataListByCountry({ idArray, map }) {
  if (idArray.length === 0) return idArray;
  const result = [];

  const countryMap = {};
  idArray.forEach(id => {
    const data = map.get(id);
    if (!data) return;
    const code = data.get("CountryCode");
    countryMap[code] = countryMap[code] || [];
    countryMap[code].push(id);
  });

  for (let key in countryMap) {
    result.push(countryMap[key]);
  }

  return result;
}

export function utcTimeToEconomicDataDateFormat(time) {
    const date = new Date(time);
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const d = date.getUTCDate();
    return `${y}-${m + 1}-${d}`;
}

export function generateEcoValueString({ language, value, unit, scale }) {
  if (!value) {
    return;
  }

  if (unit) {
    return `${value} ${unit}`;
  }

  let number;
  if (scale) {
    switch (language) {
      case "en":
        return `${value} ${scale}`;
      case "zh":
        switch (scale) {
          case "K":
            return (value / 10).toFixed(2) + " 万";
          case "M":
            number = value * 100;
            return number >= 10000
              ? (number / 10000).toFixed(2) + " 亿"
              : number.toFixed(2) + " 万";
          case "B":
            number = value * 10;
            return number >= 10000
              ? (number / 10000).toFixed(2) + " 万亿"
              : number.toFixed(2) + " 亿";
          case "T":
            return `${value} 万亿`;

          default:
            console.log("invalid scale : ", scale);
            return;
        }
      default:
        return `${value} ${scale}`;
    }
  }

  return value;
}

export function generateEcoPeriodString({ language, period }) {
  if (!period) return;
  period = period
    .replace("w/o ", "")
    .replace(/, \d\d\d\d/, "")
    .replace(/ \d\d\d\d/, "");

  if (language === "en") {
    return period;
  }

  if (language === "zh") {
    period = period.replace(/Jan\./i, "1月");
    period = period.replace(/Feb\./i, "2月");
    period = period.replace(/Mar\./i, "3月");
    period = period.replace(/Apr\./i, "4月");
    period = period.replace(/May\./i, "5月");
    period = period.replace(/Jun\./i, "6月");
    period = period.replace(/Jul\./i, "7月");
    period = period.replace(/Aug\./i, "8月");
    period = period.replace(/Sep\./i, "9月");
    period = period.replace(/Oct\./i, "10月");
    period = period.replace(/Nov\./i, "11月");
    period = period.replace(/Dec\./i, "12月");
    if (/\d\d*\s*$/.test(period)) {
      period += "日";
    }
  }

  return period;
}

export function sliceOutdateInfo(data) {
  for (let i = 0; i < data.length - 1; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (
        data[i]["EventNameEn"] === data[j]["EventNameEn"] &&
        data[i]["Country"] === data[j]["Country"] &&
        data[i]["RIC"] === data[j]["RIC"]
      ) {
        if (data[i]["startTimeInUTCMS"] > data[j]["startTimeInUTCMS"]) {
          data.splice(j, 1);
        } else if (data[i]["startTimeInUTCMS"] < data[j]["startTimeInUTCMS"]) {
          data.splice(i, 1);
        } else {
          if (
            !!data[i]["ActualValue"] &&
            !!data[i]["ExpectedValue"] &&
            !!data[i]["startTimeInUTCMS"]
          ) {
            data.splice(j, 1);
          }
          if (
            !!data[j]["ActualValue"] &&
            !!data[j]["ExpectedValue"] &&
            !!data[j]["startTimeInUTCMS"]
          ) {
            data.splice(i, 1);
          }
        }
      }
    }
  }
  return data;
}
