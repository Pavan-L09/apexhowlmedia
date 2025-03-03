// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Subscription form handling
  const subscribeForm = document.getElementById('subscribe-form');
  
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (validateEmail(email)) {
        // In a real implementation, you would send this to a service
        // For now, we'll just simulate success
        
        // Store email in localStorage (just for demo purposes)
        const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        subscribers.push({
          email: email,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('subscribers', JSON.stringify(subscribers));
        
        // Show success message
        emailInput.value = '';
        showMessage('Thanks for subscribing! We\'ll keep you updated with our latest reviews.', 'success');
      } else {
        showMessage('Please enter a valid email address.', 'error');
      }
    });
  }
  
  // Track affiliate link clicks (for analytics)
  const affiliateLinks = document.querySelectorAll('a[href^="https://affiliate"]');
  
  affiliateLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // In a real implementation, you might use Google Analytics or similar
      // For demo purposes, just log to localStorage
      const clickData = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
      clickData.push({
        link: this.href,
        timestamp: new Date().toISOString(),
        product: this.closest('.product-card')?.querySelector('h3')?.textContent || 'Unknown'
      });
      localStorage.setItem('affiliate_clicks', JSON.stringify(clickData));
      
      // Note: we're not preventing default, so the link still works
    });
  });
  
  // Helper functions
  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function showMessage(message, type) {
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Find where to insert it (after the form)
    const container = subscribeForm.parentNode;
    
    // Remove any existing messages
    const existingMessages = container.querySelectorAll('.message');
    existingMessages.forEach(el => el.remove());
    
    // Add the new message
    container.appendChild(messageEl);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }
  
  // Simple smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Adjust for header
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add placeholder data for demonstration (remove in production)
function initDemoData() {
  // Only run if we're in demo mode
  if (window.location.search.includes('demo=true')) {
    // Set some sample data
    console.log('Demo mode active - populating sample data');
  }
}

// Optional: Initialize demo data
// initDemoData();
