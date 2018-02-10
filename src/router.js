const routers = [{
  path: '/',
  meta: {
      title: 'My scarf',
      by: 'xldai'
  },
  component: (resolve) => {
      require.ensure([], () => {
          return resolve(require('./components/a.vue'))
      }, 'menu')
  }
}]
export default routers