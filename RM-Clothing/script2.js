    // Select the toggle button and menu
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Add click event to toggle menu visibility
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });


    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
      
        const form = event.target;
        const formData = new FormData(form);
        const loadingBar = document.getElementById('loadingBar');
        const alertSuccess = document.getElementById('alertSuccess');
        const alertFailure = document.getElementById('alertFailure');
      
        // Reset alerts and show loading bar
        alertSuccess.style.display = 'none';
        alertFailure.style.display = 'none';
        loadingBar.style.display = 'block';
        loadingBar.style.width = '0';
      
        // Gradually increase loading bar width to 70%
        let loadingProgress = 0;
        const loadingInterval = setInterval(() => {
          loadingProgress += 1;
          if (loadingProgress <= 70) {
            loadingBar.style.width = `${loadingProgress}%`;
          } else {
            clearInterval(loadingInterval);
          }
        }, 50);
      
        // Submit the form using fetch
        fetch(form.action, {
          method: form.method,
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              alertSuccess.style.display = 'block';
              alertFailure.style.display = 'none';
              form.reset();
            } else {
              throw new Error('Form submission failed');
            }
          })
          .catch((error) => {
            alertFailure.style.display = 'block';
            alertSuccess.style.display = 'none';
            console.error(error);
          })
          .finally(() => {
            // Complete loading bar animation
            loadingBar.style.width = '100%';
      
            // Hide the loading bar after a short delay
            setTimeout(() => {
              loadingBar.style.display = 'none';
              loadingBar.style.width = '0';
            }, 500);
          });
      });
      