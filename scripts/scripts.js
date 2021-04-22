const $ = {}

let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://images.pexels.com/photos/211352/pexels-photo-211352.png?cs=srgb&dl=apple-fruits-apples-211352.jpg&fm=jpg'},
    {id: 2, title: 'Апельсины', price: 20, img: 'https://wallsdesk.com/wp-content/uploads/2017/01/Orange-Background-.jpg'},
    {id: 3, title: 'Манго', price: 20, img: 'https://www.heilpraxisnet.de/wp-content/uploads/2015/09/Mango.jpg'}
]

function render(data) {
    $modal = document.createElement('div')
    $modal.classList.add('gmodal')
    $modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">${data.title}</span>
                ${data.closable ? '<span class="modal-x" data-close="true">&#10006;</span>' : ''}
                
            </div>
            <div class="modal-body">
                ${data.body}
            </div>
            <div class="modal-footer">
                <button data-close="true">Закрыть</button>
            </div>
        </div>
    </div>
    `)
    document.body.appendChild($modal)

    return $modal
}

$.modal = function(data) {

    const $modal = render(data)


    return {
        open: function() {
            $modal.classList.add('open')
        },
        close: function() {
            $modal.classList.add('hide')
            $modal.classList.remove('open')
            setTimeout(function() {
                $modal.classList.remove('hide')
            }, 1000)
        }
    }

}

document.addEventListener('click', function(event) {
    event.preventDefault
    if(event.target.dataset.close) {
        modal.close()
    }

    if(event.target.id == 'fruits') {
        modal.open()
    }
})








const modal = $.modal({
    title: 'Заголовок',
    body: '<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus fuga molestias animi veniam at fugiat aliquam praesentium omnis assumenda. Nesciunt!</p>',
    closable: true,
})