const nativePage = Page
const nativeComponent = Component
Page = (options, key = 'onLoad') => {
  const native = options[key]
  options[key] = function () {
    this.ctx = proxy.call(this)
    return native && native.call(this)
  }
  key === 'onLoad' ? nativePage(options) : nativeComponent(options)
}
Component = options => Page(options, 'created')

function proxy() {
  let pending = false
  const setData = () => {
    pending = true
    setTimeout(() => {
      this.setData(this.data, () => pending = false)
    })
  }

  const handler = {
    get(target, key, receiver) {
      try {
        if (typeof target[key] === 'function') return Reflect.get(target, key, receiver)
        return new Proxy(target[key], handler)
      } catch (err) {
        return Reflect.get(target, key, receiver)
      }
    },
    set(target, key, value, receiver) {
      if (!(Array.isArray(target) && key !== 'length')) !pending && setData()
      return Reflect.set(target, key, value, receiver)
    },
    deleteProperty(target, key) {
      !pending && setData()
      return Reflect.deleteProperty(target, key)
    }
  }
  return new Proxy(this.data, handler)
}