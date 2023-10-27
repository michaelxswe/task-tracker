const getQueryParamsUrl = (queryParams: { [key: string]: string }) => {
  let str = '?'
  for (let key in queryParams) {
    if (queryParams.hasOwnProperty(key)) {
      str += key + '=' + queryParams[key] + '&'
    }
  }
  return str.slice(0, -1)
}

export {getQueryParamsUrl}