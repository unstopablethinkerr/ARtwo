export function createButton(label, className, onClick) {
    const button = document.createElement('button');
    button.innerText = label;
    button.className = className;
    button.addEventListener('click', onClick);
    document.body.appendChild(button);
    return button;
  }
  
  export function showToastMessage(message) {
    const toast = document.createElement('div');
    toast.innerText = message;
    toast.className = 'toast-message';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  