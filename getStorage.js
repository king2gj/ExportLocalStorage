(function () {
    let i = 0,
      key,
      value;
    let ret = [];
    for (i = 0; i < window.localStorage.length; i++) {
      key = window.localStorage.key(i);
      try {
        value = JSON.parse(window.localStorage.getItem(key));
        value = JSON.stringify(value, null, 1);
      } catch (e) {
        value = localStorage.getItem(key);
      }
      ret.push({ key, value });
    }
    return ret;
  })();