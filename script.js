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
  $action = d.querySelector('.action'),
  $template = d.querySelector('template').content;

async function getShorterLink() {
  if (!$input.value) {
    $input.classList.add('error')    
    $span.classList.add('error')    
    return    
  }

  let link = $input.value,
    linkFetch = `https://api.shrtco.de/v2/shorten?url=${link}`

  try {
    let res = await fetch(linkFetch),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText }
    
    let shortedLink = json.result.short_link;
    $template.querySelector('.long-link').innerText = link;
    $template.querySelector('.short-link').innerText = shortedLink;
    $template.querySelector('.copy-link').dataset.link = shortedLink;
    
    let $clone = d.importNode($template, true)
    $action.appendChild($clone)

    $input.classList.remove('error')
    $span.classList.remove('error')

    let $templateBtn = [...d.querySelectorAll('.copy-link')]
    $templateBtn.forEach(el => el.addEventListener('click', e => {
      e.preventDefault()
      navigator.clipboard.writeText(shortedLink)
      e.target.innerText = 'Copied'
      e.target.style.backgroundColor = 'var(--Neutral-Very-Dark-Blue)'
    }))

  } catch (err) {
    let message = err.statusText || 'Ups... something went wrong!'
    $input.classList.add('error')
    $span.classList.add('error')
    $span.innerText = message;
  }
}

d.addEventListener('click', e => {
  if (e.target === $submit) {
    e.preventDefault()
    getShorterLink()
  }
})