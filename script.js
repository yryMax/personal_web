document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const terminal = document.querySelector('.terminal');
    const skillsOutput = document.getElementById('skills-output');

    // Skills are now directly in HTML, no need to load from external file

    // Terminal minimize/maximize functionality
    let isMinimized = false;

    function toggleTerminal() {
        isMinimized = !isMinimized;
        if (isMinimized) {
            terminal.classList.add('minimized');
        } else {
            terminal.classList.remove('minimized');
        }
    }

    // Add click handler to terminal controls
    const redControl = document.querySelector('.control.red');
    const yellowControl = document.querySelector('.control.yellow');
    const greenControl = document.querySelector('.control.green');

    // Red button - close/minimize
    if (redControl) {
        redControl.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleTerminal();
        });
    }

    // Yellow button - minimize
    if (yellowControl) {
        yellowControl.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isMinimized) {
                toggleTerminal();
            }
        });
    }

    // Green button - maximize/restore
    if (greenControl) {
        greenControl.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isMinimized) {
                toggleTerminal();
            }
        });
    }

    // Click on terminal to restore if minimized
    terminal.addEventListener('click', function() {
        if (isMinimized) {
            toggleTerminal();
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                sidebar.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    // Prevent sidebar scrolling when open on mobile
    sidebar.addEventListener('transitionend', function() {
        if (window.innerWidth <= 768) {
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.classList.remove('active');
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + ` to toggle terminal
        if ((e.ctrlKey || e.metaKey) && e.key === '`') {
            e.preventDefault();
            toggleTerminal();
        }
    });

    // Add some visual feedback for terminal interactions
    const terminalLines = document.querySelectorAll('.terminal-line');
    terminalLines.forEach(line => {
        line.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });

        line.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });


    console.log('🚀 Terminal loaded successfully! Use Ctrl+` to toggle terminal visibility.');

    // Friend Links Component
    const friendLinksContainer = document.getElementById('friendLinksContainer');
    const cornerFold = document.getElementById('cornerFold');
    const friendInfo = document.getElementById('friendInfo');

    // Friend data
    const friends = [
        {
            name: 'My Goat',
            handle: 'LtHero',
            quote: '哥哥下雨我就不打伞',
            url: 'https://tools.lthero.cn/resume/'
        }
    ];

    let currentIndex = 0;
    let isExpanded = false;
    let leaveTimeout;

    // Click to expand
    cornerFold.addEventListener('click', function() {
        if (!isExpanded) {
            expandCorner();
        }
    });

    // Mouse leave to collapse
    friendLinksContainer.addEventListener('mouseleave', function() {
        leaveTimeout = setTimeout(() => {
            if (isExpanded) {
                collapseCorner();
            }
        }, 500);
    });

    // Mouse enter to cancel collapse
    friendLinksContainer.addEventListener('mouseenter', function() {
        clearTimeout(leaveTimeout);
    });

    // Scroll to switch friends
    cornerFold.addEventListener('wheel', function(e) {
        e.preventDefault();
        if (isExpanded) {
            if (e.deltaY > 0) {
                currentIndex = (currentIndex + 1) % friends.length;
            } else {
                currentIndex = (currentIndex - 1 + friends.length) % friends.length;
            }
            updateFriend();
        }
    });

    function expandCorner() {
        isExpanded = true;
        cornerFold.classList.add('expanded');
    }

    function collapseCorner() {
        isExpanded = false;

        // 先让文字消失，但不手动设置样式，让CSS transition处理
        cornerFold.classList.remove('expanded');
    }

    function updateFriend() {
        const friend = friends[currentIndex];

        const friendLink = friendInfo.querySelector('.friend-link');
        const friendQuote = friendInfo.querySelector('.friend-quote');

        // Smooth transition
        friendInfo.style.opacity = '0.7';

        setTimeout(() => {
            friendLink.href = friend.url;
            friendLink.innerHTML = `${friend.name} <span class="at-symbol">@</span> ${friend.handle}`;
            friendQuote.textContent = friend.quote;
            friendInfo.style.opacity = '1';
        }, 150);
    }

    // Initialize
    updateFriend();
});