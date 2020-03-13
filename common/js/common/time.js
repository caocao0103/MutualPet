class Time {
  // 倒计时天时分秒  
  // 组件卸载时关闭计时器，避免造成内存泄漏
  setStartTimer(_this, currentstartTimer) {
    let timestamp = Date.parse(new Date()) / 1000;//当前时间戳
    let slef = _this
    //注意点3: 清除定时器 为了保证每次只有一个定时器，和下拉刷新 配合，否则会导致 计时数据跳动，因为创建了多个定时器。
    clearInterval(interval);
    let interval = slef.data.interval
    interval = setInterval(function () {
      // 秒数
      var second = currentstartTimer - timestamp;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      slef.setData({
        Day: dayStr,
        Hour: hrStr,
        Minute: minStr,
        Second: secStr,
      });
      timestamp--;
      // 倒计时结束时候 初始化天数，关闭计时器
      if (timestamp <= 0) {
        clearInterval(interval);
        slef.setData({
          Day: '00',
          Hour: '00',
          Minute: '00',
          Second: '00',
        });
      }
    }.bind(slef), 1000);
    slef.setData({
      interval
    })
  }
  // 时间戳转换为日期格式
  // 参数1 number：时间戳  
  //参数2 format：格式，参入 'Y/M/D h:m:s'
  formatTime(number, format) {
    var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
    var returnArr = [];
    if (number % 1 === 0) {
      var date = new Date(number * 1000);
      returnArr.push(date.getFullYear());
      returnArr.push(this.formatNumber(date.getMonth() + 1));
      returnArr.push(this.formatNumber(date.getDate()));
      returnArr.push(this.formatNumber(date.getHours()));
      returnArr.push(this.formatNumber(date.getMinutes()));
      returnArr.push(this.formatNumber(date.getSeconds()));
      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    }
  }
  //数据转化  
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

}
export { Time }