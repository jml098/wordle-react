async function start() {
  const request = await fetch("https://gist.github.com/sinanatra/23cc714cb98b2568d664eb6b4b46f6d6/raw/5d4e89d8dfb0e037307a77c07365f50c88d79a93/words.json")

  console.log( JSON.parse(await request.text()))
}

start()