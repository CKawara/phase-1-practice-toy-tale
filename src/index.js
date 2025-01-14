let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
  let form = document.querySelector('form')
  form.addEventListener('submit', addToy)

  function addToy(e){
    e.preventDefault()
    let newToy = {
      name:document.getElementById('toy_name').value,
      image: document.getElementById('toy_img').value, 
      likes: 0
    }
    fetch('http://localhost:3000/toys', {
      method : 'POST',
      headers : {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(newToy)
    })
    .then(resp => resp.json())
    .then(data => data)

    displayToy(newToy)
    form.reset()
  }


  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      displayToy(toy)
    })
  })


  function displayToy (toy) {
    let collection = document.querySelector('#toy-collection')
    let card = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let button = document.createElement('button')

    card.className = 'card'
    img.className = 'toy-avatar'
    button.className = "like-btn"
    button.id = toy['id']

    h2.innerText = toy['name']
    img.src = toy['image']
    p.innerText = toy['likes']
    button.innerText = 'like'

    card.appendChild(h2)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(button)
    collection.appendChild(card)

    button.addEventListener('click', ()=> {
      toy['likes']+= 1
      p.innerText = toy['likes']
      fetch(`http://localhost:3000/toys/${toy['id']}`, {
      method : 'PATCH',
      headers : {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(data => data)
    })
  }



});
