  // HAMBURGER BUTTON
const d = document,
  $btn = d.querySelector('.hamburger-btn'),
  $menu = d.querySelector('.menu')

$btn.addEventListener('click', e => $menu.classList.toggle('active'));


  // SHORT LINK
const $form = d.querySelector('form'),
  $input = d.querySelector('form > input'),
  $submit = d.querySelector('form > button'),
  $span = d.querySelector('span'),
  $template = d.querySelector('template').content;

async function getShorterLink() {
  if (!$input.value) {
    $input.classList.add('error')    
    return    
  }

  let link = $input.value,
    linkFetch = `https://api.shrtco.de/v2/shorten?url=${link}`

  try {
    let res = await fetch(linkFetch),
      json = await res.json();

    console.log(res)
    console.log(res.ok)
    console.log(json)

    if (!res.ok) {
      console.log('meh')
      throw { status: res.status, statusText: res.statusText }
    }

    
    let shortedLink = json.result.short_link;
    $template.querySelector('.long-link').innerText = link;
    $template.querySelector('.short-link').innerText = shortedLink;
    
    // console.log($template)

    let $clone = d.importNode($template, true)
    $form.insertAdjacentHTML('afterend', $clone)    
    
    console.log('vamos bien')

  } catch (err) {
    console.log('vamos mal')
    let message = err.statusText || 'Ups... something went wrong!'
    $input.classList.add('error')
    $span.innerText = message;
  }
}

d.addEventListener('click', e => {
  if (e.target === $submit) {
    e.preventDefault()
    getShorterLink()
  }
})