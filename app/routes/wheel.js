module.exports = {
  controllers: __dirname +'/../controllers',
  routes: {
    '/test': 'test#test',
    '/api': 'api#api',
    '/template': 'template#template',
    '/hello_world': 'hello_world#myaction',
    '/say_to_world': {
      action: 'hello_world#myotheraction',
      method: 'post'
    }
  }
}