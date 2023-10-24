const timeOut = (time: number) => {
  return new Promise((res) => setTimeout(res, time))
}

export {timeOut}

// await tiemOut(6000) 6 sec
