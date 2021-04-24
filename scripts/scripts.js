let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://images.pexels.com/photos/211352/pexels-photo-211352.png?cs=srgb&dl=apple-fruits-apples-211352.jpg&fm=jpg'},
    {id: 2, title: 'Oranges', price: 20, img: 'https://wallsdesk.com/wp-content/uploads/2017/01/Orange-Background-.jpg'},
    {id: 3, title: 'Mango', price: 20, img: 'https://www.heilpraxisnet.de/wp-content/uploads/2015/09/Mango.jpg'}
]

const renderDocument = () => {
    let opa = [];
    fruitsHTML = fruits.map(fruit => {
       return `
            <div class="item">
                <img src="${fruit.img}">
                <div class="item-title">${fruit.title}</div>
                <button data-id="${fruit.id}" data-btn="price">Watch price</button>
                <button data-id="${fruit.id}" data-btn="remove">Delete item</button>
            </div>
        `
    }).join('')
    document.querySelector('#fruits').innerHTML = fruitsHTML
}
renderDocument()

const modal = $.modal({
    title: 'Заголовок',
    body: '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus fuga molestias animi veniam at fugiat aliquam praesentium omnis assumenda. Nesciunt!</p>',
    closable: true,
    buttons: [
        {
            name: 'Закрыть',
            class: 'btn-close',
            handler: function() {
                modal.close()
            } 
        }
    ]
})

document.addEventListener('click', function(event) {

    const id = event.target.dataset.id
    const fruit = fruits.find(f => f.id == id)
    
    if(event.target.dataset.btn == 'price') {
        modal.open()
        modal.setContent(`
            <img src="${fruit.img}" alt="${fruit.title}" style="width: 100%">
            <p>Cost of fruit ${fruit.title}: ${fruit.price}$</p>
        `)
    } else if(event.target.dataset.btn == 'remove') {

        $.confirm({
            title: 'Удаление объекта',
            body: `<p>Do you really want to delete ${fruit.title}?</p>`,
            closable: true
        }).then(function() {
            //console.log(fruits)
            fruits = fruits.filter(f => {
                console.log(1)
                if(f.id != id) {
                    return f
                }
            })
            
            renderDocument()
            console.log("Удалить")
        }).catch(function() {
            console.log("Отмена")
        })

    }

})