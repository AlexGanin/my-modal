const $ = {}

function _arButtons(buttons) {

    let arButtons = buttons.map(function(btn) {
        const $btn = document.createElement('button')
        $btn.classList.add(btn.class)
        $btn.innerText = btn.name
        $btn.onclick = btn.handler
        return $btn
    })

    return arButtons

}

function _render(data) {
    $modal = document.createElement('div')
    $modal.classList.add('gmodal')
    $modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">${data.title}</span>
                ${data.closable ? '<span class="modal-x" data-close="true">&#10006;</span>' : ''}
                
            </div>
            <div class="modal-body" data-content>
                ${data.body}
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
    `)


    const arrButtons = _arButtons(data.buttons)
    arrButtons.forEach(button => {
        $modal.querySelector('.modal-footer').appendChild(button)
    })

    document.body.appendChild($modal)

    return $modal
}

$.modal = function(data) {

    const $modal = _render(data)
    let closing = false

    const modal = {
        open: function() {
            !closing && $modal.classList.add('open')
        },
        close: function() {
            closing = true
            $modal.classList.add('hide')
            $modal.classList.remove('open')
            setTimeout(function() {
                $modal.classList.remove('hide')
                closing = false
            }, 300)
        }
    }

    function listener(event) {
        event.preventDefault
        if(event.target.dataset.close) {
            modal.close()
        }
    }

    document.addEventListener('click', listener)

    modal.destroy = () => {
        $modal.parentNode.removeChild($modal)
        removeEventListener('click', listener)
    }

    modal.setContent = (data) => {
        $modal.querySelector('[data-content]').innerHTML = data
    }

    return modal
}

$.confirm = function(data) {

    return new Promise((resolve, reject) => {

        const cmodal = $.modal({
            title: data.title,
            body: data.body,
            closable: true,
            buttons: [
                {
                    name: 'Удалить',
                    class: 'btn-close',
                    handler: function() {
                        cmodal.close()
                        setTimeout(() => {cmodal.destroy()}, 100)
                        
                        resolve()
                    } 
                },
                {
                    name: 'Отмена',
                    class: 'btn-close',
                    handler: function() {
                        cmodal.close()
                        setTimeout(() => {cmodal.destroy()}, 100)
                        reject()
                    } 
                }
            ]
        })

        setTimeout(() => {cmodal.open()}, 100)
        

    })

}