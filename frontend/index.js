const filmList = document.querySelector('#film-list')

fetch('../http/router.js', {
    headers: { 'index': 'script' },
    method: 'GET'
  })
  .then((response)=>{
      console.log("response : ", response)
      return response
  })
