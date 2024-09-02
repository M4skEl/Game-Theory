const obj = {
  name: 'bar',
  createAnonFunc: function () {
    return function () {
      console.log(this.name, arguments)
    }
  }
}


const anon = obj.createAnonFunc('hello', 'world')
anon()