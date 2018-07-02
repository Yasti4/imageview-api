function handleAsyncExceptions() {
  if (handleAsyncExceptions.hooked === false) {
    process.on('unhandledRejection', (err) => {
      throw err;
    });

    handleAsyncExceptions.hooked = true;
  }
}

handleAsyncExceptions.hooked = false;

function randomItem(array = []) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array = []) {
  for (let i = array.length - 1; i > 0; i = i - 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function unixTimestamp(date = new Date()) {
  return Math.floor(date.getTime() / 1000);
}

module.exports = {
  handleAsyncExceptions,
  randomItem,
  unixTimestamp,
  shuffle
};
