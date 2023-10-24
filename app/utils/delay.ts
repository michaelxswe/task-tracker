const delay = (time: number) => {
  return new Promise((res) => setTimeout(res, time))
}

// await timeout(6000); 6 sec
