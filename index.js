const form = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const toggleLink = document.getElementById('toggleLink');
const toggleText = document.getElementById('toggleText');
const message = document.getElementById('message');

let isSignUp = true;

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isSignUp = !isSignUp;
  formTitle.textContent = isSignUp ? 'Sign Up' : 'Login';
  toggleText.textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
  toggleLink.textContent = isSignUp ? 'Login' : 'Sign Up';
  message.textContent = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value;

  if (isSignUp) {
    // Save to localStorage
    if (localStorage.getItem(user)) {
      message.textContent = 'Username already exists!';
      return;
    }
    localStorage.setItem(user, pass);
    message.style.color = 'green';
    message.textContent = 'Sign Up successful! Please login.';
  } else {
    // Login check
    const storedPass = localStorage.getItem(user);
    if (storedPass && storedPass === pass) {
      message.style.color = 'green';
      message.textContent = 'Login successful!';
      // redirect to your grading page
      window.location.href = 'nan6.html'; 
    } else {
      message.style.color = '#d9534f';
      message.textContent = 'Invalid username or password!';
    }
  }
});
