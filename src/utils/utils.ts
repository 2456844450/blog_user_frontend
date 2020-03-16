export function throttle(fn: Function, delay: number) {
  let last = 0,
      timer: any = null
  
  return function () {
    let context = this;

    let args = arguments

    let now = +new Date()

    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args)
      }, delay)
    } else {
      last = now
      fn.apply(context, args)
    }
  }
}

export function setCookie(cName: string, value: any, expiredays: any) {
  if (expiredays > 0 && expiredays !== "100") {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = 
      cName + "=" + escape(value) + 
      (expiredays == null ? "" : ";expires=" + exdate.toUTCString())
  }
  if (expiredays === "100") {
    let exdate = new Date("2120-01-01 00:00:00")
    document.cookie = 
      cName + "=" + escape(value) + 
      (expiredays == null ? "" : ";expires=" + exdate.toUTCString())
  }
}

export function getCookie(cName: string) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(cName + "=")
    if (cStart !== -1) {
      cStart = cStart + cName.length + 1;
      let cEnd = document.cookie.indexOf(";", cStart)
      if (cEnd === -1) cEnd = document.cookie.length
      return unescape(document.cookie.substring(cStart, cEnd)) 
    }
  }
  return ""
}

export function delCookie(name: string) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString()
  }
}

export function clearCookie(name: string) {
  setCookie(name, "", -1)
}

export function getQueryString() {
  let result = window.location.search.match(
    new RegExp("[?&][^?&]+=[^?&]+", "g")
  )
  if (result == null) {
    return ""
  }
  for (let i = 0; i < result.length; i++ ) {
    result[i] = result[i].substring(1)
  }
  return result
}

export function getQueryStringByName(name: string) {
  let result = window.location.search.match(
    new RegExp("[?&]" + name + "=([^&]+)", "i")
  );
  if (result == null || result.length < 1) {
    return ""
  }
  return result[1]
}

export function getScrollTop() {
  return Math.max(
    //chrome
    document.body.scrollTop,
    //firefox/IE
    document.documentElement.scrollTop
  );
}

export function getDocumentHeight() {
  //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );
}

export function getWindowHeight() {
  return document.compatMode === "CSS1Compat"
    ? document.documentElement.clientHeight
    : document.body.clientHeight;
}

export function timestampToTime(timestamp: Date | any, dayMinSecFlag: boolean) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}

export function isMobileOrPc() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}