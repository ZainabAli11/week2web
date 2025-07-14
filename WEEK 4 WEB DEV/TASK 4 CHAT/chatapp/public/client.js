const username = localStorage.getItem('chat_username');
const avatar = localStorage.getItem('chat_avatar');
if (!username || !avatar) {
  alert('Please login first!');
  window.location.href = '/';
}
document.body.classList.add(localStorage.getItem('theme') || 'light');

const socket = new WebSocket('ws://' + location.host);
const chatBox = document.getElementById('chat-box');
const msgInput = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');
const userSelect = document.getElementById('user-select');
const fileInput = document.getElementById('file-input');
const themeBtn = document.getElementById('theme-toggle');

themeBtn.onclick = () => {
  const current = document.body.classList.contains('light') ? 'light' : 'dark';
  const newTheme = current === 'light' ? 'dark' : 'light';
  document.body.classList.replace(current, newTheme);
  localStorage.setItem('theme', newTheme);
};

function logout() {
  localStorage.clear();
  window.location.href = '/';
}

socket.onopen = () => {
  socket.send(JSON.stringify({ type: 'init', user: username, avatar }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'users') {
    userSelect.innerHTML = '<option value="all">Everyone</option>';
    data.users.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.id;
      opt.textContent = `${u.avatar} ${u.user}`;
      userSelect.appendChild(opt);
    });
  }

  if (data.type === 'message') {
    renderMessage(data);
  }
};

function renderMessage(data) {
  const div = document.createElement('div');
  const side = data.user === username ? 'right' : 'left';
  div.className = `message ${side}`;
  const isImage = data.msg.startsWith('data:image/');
  const content = isImage
    ? `<img src="${data.msg}" class="chat-img">`
    : data.msg;
  div.innerHTML = `<strong>${data.avatar} ${data.user}</strong><br>${content}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const msg = msgInput.value.trim();
  const file = fileInput.files[0];
  const to = userSelect.value;

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      socket.send(JSON.stringify({ type: 'message', msg: reader.result, to, user: username, avatar }));
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  } else if (msg) {
    socket.send(JSON.stringify({ type: 'message', msg, to, user: username, avatar }));
    msgInput.value = '';
  }
}

sendBtn.onclick = sendMessage;
msgInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});

document.addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG' && e.target.closest('.message')) {
    const zoomImg = document.getElementById('zoom-img');
    const zoomModal = document.getElementById('zoom-modal');
    zoomImg.src = e.target.src;
    zoomModal.style.display = 'flex';
  }
});

document.querySelector('#zoom-modal .close-btn').onclick = () => {
  document.getElementById('zoom-modal').style.display = 'none';
  document.getElementById('zoom-img').src = '';
};
