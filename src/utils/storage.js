function get (key) {
  try {
    const value = localStorage.getItem(key) ?? ''
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

function set (key, value) {
  const setValue = JSON.stringify(value)
  localStorage.setItem(key, setValue)
}

function remove (key) {
  localStorage.removeItem(key)
}

export {
  get,
  set,
  remove
}
