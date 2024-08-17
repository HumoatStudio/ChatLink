document.getElementById('chat-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const message = document.getElementById('message-input').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'chat.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        if (xhr.status === 200) {
            loadMessages();
            document.getElementById('message-input').value = '';
        }
    };
    xhr.send('message=' + message);
});

function loadMessages() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'messages.json', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const messages = JSON.parse(xhr.responseText);
            const messagesContainer = document.getElementById('messages');
            messagesContainer.innerHTML = '';
            messages.forEach(function(msg) {
                const div = document.createElement('div');
                div.className = 'message';
                div.textContent = msg;
                messagesContainer.appendChild(div);
            });
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    };
    xhr.send();
}

// Загружаем сообщения при загрузке страницы
window.onload = loadMessages;