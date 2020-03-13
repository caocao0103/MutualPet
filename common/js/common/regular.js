class Regular {
  // 手机号验证
  phoneFormat(phone) {
    const myregPhone = /^1[345678]\d{9}$/
    return !myregPhone.test(phone) ? false : true
  }
  // 身份证验证
  identityCard(card) {
    const myregCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return !myregCard.test(card) ? false : true
  }
  // 银行卡号验证
  bankCard(bank) {
    const myregBank = /^(\d{16}|\d{19})$/
    return !myregBank.test(bank) ? false : true
  }
}
export { Regular }