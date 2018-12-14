class Red {
  aaa = ''
  //构造函数
  constructor() {

  }

  test (str, callback) {
    console.log(str)
    callback(str + '2222')
  }
}

export {
  Red
}