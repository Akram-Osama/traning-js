// Sign Up Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Update header based on login status
    function updateHeader() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userInfo = document.getElementById('user-info');
        const authButtons = document.getElementById('auth-buttons');
        const userNameDisplay = document.getElementById('user-name');

        if (currentUser && userInfo && authButtons) {
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            if (userNameDisplay) {
                userNameDisplay.textContent = currentUser.email.split('@')[0];
            }
        } else if (userInfo && authButtons) {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }

    // Call on page load
    updateHeader();

    // Header button handlers (new header buttons)
    const loginBtnHeader = document.getElementById('login-btn-header');
    const signupBtnHeader = document.getElementById('signup-btn-header');
    
    if (loginBtnHeader) {
        loginBtnHeader.addEventListener('click', function (e) {
            e.preventDefault();
            const loginModal = document.getElementById('login-modal');
            if (loginModal) {
                loginModal.style.display = 'flex';
                setTimeout(() => loginModal.classList.add('show'), 10);
            }
        });
    }

    if (signupBtnHeader) {
        signupBtnHeader.addEventListener('click', function (e) {
            e.preventDefault();
            const signupModal = document.getElementById('signup-modal');
            if (signupModal) {
                signupModal.style.display = 'flex';
                setTimeout(() => signupModal.classList.add('show'), 10);
            }
        });
    }

    // Logout handler
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            localStorage.removeItem('currentUser');
            location.reload();
        });
    }

    // Close signup modal when close button is clicked
    if (signupCloseBtn) {
        signupCloseBtn.addEventListener('click', function () {
            signupModal.classList.remove('show');
            // Hide after animation
            setTimeout(() => signupModal.style.display = 'none', 300);
        });
    }

    // Close signup modal when clicking outside the modal content
    if (signupModal) {
        signupModal.addEventListener('click', function (e) {
            if (e.target === signupModal) {
                signupModal.classList.remove('show');
                setTimeout(() => signupModal.style.display = 'none', 300);
            }
        });
    }

    // Sign In Modal
    const loginModal = document.getElementById('login-modal');
    const loginBtnForModal = document.getElementById('login-btn');
    const loginCloseBtn = document.getElementById('login-close');

    // Open login modal when login button is clicked
    if (loginBtnForModal) {
        loginBtnForModal.addEventListener('click', function (e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            // Trigger animation
            setTimeout(() => loginModal.classList.add('show'), 10);
        });
    }

    // Close login modal when close button is clicked
    if (loginCloseBtn) {
        loginCloseBtn.addEventListener('click', function () {
            loginModal.classList.remove('show');
            // Hide after animation
            setTimeout(() => loginModal.style.display = 'none', 300);
        });
    }

    // Close login modal when clicking outside the modal content
    if (loginModal) {
        loginModal.addEventListener('click', function (e) {
            if (e.target === loginModal) {
                loginModal.classList.remove('show');
                setTimeout(() => loginModal.style.display = 'none', 300);
            }
        });
    }

    // Signup functionality
    const signupSubmit = document.getElementById('signup-submit');
    if (signupSubmit) {
        signupSubmit.addEventListener('click', function (e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const stage = document.getElementById('signup-stage').value;

            if (!email || !password || !confirmPassword || !stage) {
                alert('يرجى ملء جميع الحقول');
                return;
            }

            if (password !== confirmPassword) {
                alert('كلمة السر غير متطابقة');
                return;
            }

            // Get existing users
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user already exists
            if (users.find(user => user.email === email)) {
                alert('البريد الإلكتروني موجود بالفعل');
                return;
            }

            // Add new user
            users.push({ email, password, stage });
            localStorage.setItem('users', JSON.stringify(users));

            alert('تم إنشاء الحساب بنجاح');
            if (signupModal) {
                signupModal.classList.remove('show');
                setTimeout(() => signupModal.style.display = 'none', 300);
                // Update header
                updateHeader({ email: email });
            } else {
                window.location.href = './login.html';
            }
        });
    }

    // Login functionality
    const loginSubmit = document.getElementById('login-submit');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', function (e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (!email || !password) {
                alert('يرجى ملء جميع الحقول');
                return;
            }

            // Get existing users
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Find user
            const user = users.find(user => user.email === email && user.password === password);

            if (!user) {
                alert('بيانات الدخول غير صحيحة');
                return;
            }

            // Store current user
            localStorage.setItem('currentUser', JSON.stringify(user));

            alert('تم تسجيل الدخول بنجاح');
            if (loginModal) {
                loginModal.classList.remove('show');
                setTimeout(() => loginModal.style.display = 'none', 300);
                // Update header
                updateHeader();
                // Redirect to courses if not already there
                if (!window.location.pathname.includes('courses.html')) {
                    window.location.href = './pages/courses.html';
                }
            } else {
                window.location.href = './courses.html';
            }
        });
    }
});