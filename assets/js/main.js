/* ================================================
   POBLANO KL - Interactive JavaScript
   All Features: Scroll, Modals, Carousel, WhatsApp
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  
  // ============================================
  // SCROLL PROGRESS BAR (Mexico Tri-Color)
  // ============================================
  const scrollProgress = document.querySelector('.scroll-progress');
  
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  };
  
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  
  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ============================================
  // MOBILE HAMBURGER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
  
  const toggleMobileMenu = () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  };
  
  hamburger?.addEventListener('click', toggleMobileMenu);
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // FADE-IN ON SCROLL (Intersection Observer)
  // ============================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(el => fadeObserver.observe(el));

  // ============================================
  // CYCLING SOCIAL PROOF QUOTES
  // ============================================
  const cyclingQuote = document.getElementById('cyclingQuote');
  const testimonialQuotes = [
    '"Must Visit" – Local Food Blogger',
    '"Best Mexican food I\'ve had in KL!" – Sarah L.',
    '"The vibe is immaculate." – Ahmad R.',
    '"Finally, authentic Mexican that\'s pork-free!" – Priya M.',
    '"The Seafood Board is a must-try!" – Jason T.'
  ];
  let quoteIndex = 0;

  if (cyclingQuote) {
    setInterval(() => {
      cyclingQuote.classList.add('fade-out');
      
      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % testimonialQuotes.length;
        cyclingQuote.textContent = testimonialQuotes[quoteIndex];
        cyclingQuote.classList.remove('fade-out');
      }, 400);
    }, 4000);
  }

  // ============================================
  // LIVE STATUS (Time-Based Open/Closed)
  // ============================================
  const liveStatus = document.getElementById('liveStatus');
  const statusDot = liveStatus?.querySelector('.status-dot');
  const statusText = liveStatus?.querySelector('.status-text');
  
  const updateLiveStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + (minute / 60);
    
    // Restaurant hours: Tue-Sun 12pm-11pm, Closed Monday
    const isMonday = day === 1;
    const isOpen = !isMonday && currentTime >= 12 && currentTime < 23;
    
    if (statusDot && statusText) {
      if (isMonday) {
        statusDot.classList.add('closed');
        statusText.textContent = 'Closed Today • Opens Tuesday 12pm';
      } else if (isOpen) {
        statusDot.classList.remove('closed');
        if (day === 5 || day === 6) { // Friday or Saturday
          statusText.textContent = hour >= 20 
            ? 'Open Now • Live Music Tonight!' 
            : 'Open Now • Live Music at 8pm';
        } else {
          statusText.textContent = 'Open Now • Kitchen serving until 10pm';
        }
      } else if (currentTime < 12) {
        statusDot.classList.add('closed');
        statusText.textContent = 'Opens at 12pm Today';
      } else {
        statusDot.classList.add('closed');
        statusText.textContent = 'Closed • Opens Tomorrow 12pm';
      }
    }
  };
  
  updateLiveStatus();
  setInterval(updateLiveStatus, 60000); // Update every minute

  // ============================================
  // MENU MODAL
  // ============================================
  const menuModal = document.getElementById('menuModal');
  const menuImage = document.getElementById('menuImage');
  const menuTriggers = document.querySelectorAll('#menuLink, #menuLinkMobile, #menuLinkFooter, #viewMenuBtn, #seeFullMenu');
  const closeMenu = document.getElementById('closeMenu');
  
  const openMenuModal = (e) => {
    e.preventDefault();
    menuModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Close mobile menu if open
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('open');
  };
  
  const closeMenuModal = () => {
    menuModal?.classList.remove('open');
    menuImage?.classList.remove('zoomed');
    document.body.style.overflow = '';
  };
  
  menuTriggers.forEach(trigger => trigger?.addEventListener('click', openMenuModal));
  closeMenu?.addEventListener('click', closeMenuModal);
  
  // Close on overlay click
  menuModal?.addEventListener('click', (e) => {
    if (e.target === menuModal) closeMenuModal();
  });
  
  // Zoom menu image on click
  menuImage?.addEventListener('click', () => {
    menuImage.classList.toggle('zoomed');
  });

  // ============================================
  // RESERVATION MODAL
  // ============================================
  const reservationModal = document.getElementById('reservationModal');
  const reservationTriggers = document.querySelectorAll('#openReservation, #openReservationMobile, #floatingCta');
  const closeReservation = document.getElementById('closeReservation');
  const reservationForm = document.getElementById('reservationForm');
  
  // Party size buttons
  const partyButtons = document.querySelectorAll('.party-btn');
  let selectedPartySize = '3';
  
  partyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      partyButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPartySize = btn.dataset.size;
    });
  });
  
  const openReservationModal = () => {
    reservationModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Set default date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.min = today;
    }
    
    // Set default time to 7pm
    const timeInput = document.getElementById('resTime');
    if (timeInput) {
      timeInput.value = '19:00';
    }
  };
  
  const closeReservationModal = () => {
    reservationModal?.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  reservationTriggers.forEach(trigger => trigger?.addEventListener('click', openReservationModal));
  closeReservation?.addEventListener('click', closeReservationModal);
  
  // Close on overlay click
  reservationModal?.addEventListener('click', (e) => {
    if (e.target === reservationModal) closeReservationModal();
  });

  // ============================================
  // WHATSAPP BOOKING INTEGRATION
  // ============================================
  reservationForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('resName')?.value || '';
    const phone = document.getElementById('resPhone')?.value || '';
    const date = document.getElementById('resDate')?.value || '';
    const time = document.getElementById('resTime')?.value || '';
    const notes = document.getElementById('resNotes')?.value || '';
    
    // Format date nicely
    const formattedDate = new Date(date).toLocaleDateString('en-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Format time nicely
    const [hours, minutes] = time.split(':');
    const hour12 = hours % 12 || 12;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour12}:${minutes} ${ampm}`;
    
    // Build WhatsApp message
    const message = ` *New Reservation Request*

*Name:* ${name}
*Phone:* ${phone}
*Party Size:* ${selectedPartySize} ${selectedPartySize === '5+' ? 'or more' : selectedPartySize === '1' ? 'person' : 'people'}
*Date:* ${formattedDate}
*Time:* ${formattedTime}
${notes ? `\n *Special Requests:* ${notes}` : ''}

_Sent via Poblano KL Website_`;
    
    // WhatsApp URL
    const whatsappNumber = '60163170924'; // Restaurant WhatsApp - change back to 60127317336 for production
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Play success sound
    playSuccessSound();
    
    // Trigger confetti before redirecting
    triggerConfetti();
    
    // Small delay for confetti effect, then redirect
    // Using window.location.href for better mobile compatibility (window.open can be blocked)
    setTimeout(() => {
      closeReservationModal();
      reservationForm.reset();
      partyButtons.forEach(b => b.classList.remove('active'));
      partyButtons[2].classList.add('active'); // Reset to 3
      selectedPartySize = '3';
      
      // Use location.href for mobile - more reliable than window.open
      window.location.href = whatsappURL;
    }, 1500);
  });

  // ============================================
  // SUCCESS SOUND EFFECT
  // ============================================
  const playSuccessSound = () => {
    // Create a cheerful success sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = (frequency, startTime, duration) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    // Play a cheerful ascending arpeggio (like a mariachi flourish!)
    const now = audioContext.currentTime;
    playTone(523.25, now, 0.15);        // C5
    playTone(659.25, now + 0.1, 0.15);  // E5
    playTone(783.99, now + 0.2, 0.15);  // G5
    playTone(1046.50, now + 0.3, 0.3);  // C6 (held longer)
  };

  // ============================================
  // CONFETTI CELEBRATION
  // ============================================
  const triggerConfetti = () => {
    if (typeof confetti === 'function') {
      // Mexican flag colors confetti
      const colors = ['#006847', '#FFFFFF', '#CE1126'];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
      
      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
      }, 200);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
      }, 400);
    }
  };

  // ============================================
  // TESTIMONIAL CAROUSEL
  // ============================================
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('carouselDots');
  
  if (testimonialTrack) {
    const cards = testimonialTrack.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = 1;
    
    // Determine cards per view based on screen size
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        cardsPerView = 3;
      } else if (window.innerWidth >= 768) {
        cardsPerView = 2;
      } else {
        cardsPerView = 1;
      }
      updateCarousel();
      createDots();
    };
    
    // Create dots
    const createDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const totalSlides = Math.ceil(cards.length / cardsPerView);
      
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    };
    
    // Update carousel position
    const updateCarousel = () => {
      const cardWidth = cards[0]?.offsetWidth || 0;
      const gap = parseInt(getComputedStyle(testimonialTrack).gap) || 0;
      const offset = currentIndex * (cardWidth + gap) * cardsPerView;
      testimonialTrack.style.transform = `translateX(-${offset}px)`;
      
      // Update dots
      const dots = dotsContainer?.querySelectorAll('.dot');
      dots?.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };
    
    const goToSlide = (index) => {
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    };
    
    const nextSlide = () => {
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    };
    
    const prevSlide = () => {
      const maxIndex = Math.ceil(cards.length / cardsPerView) - 1;
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    };
    
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
    
    // Auto-advance carousel
    let autoAdvance = setInterval(nextSlide, 5000);
    
    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', () => clearInterval(autoAdvance));
    testimonialTrack.addEventListener('mouseleave', () => {
      autoAdvance = setInterval(nextSlide, 5000);
    });
    
    // Handle resize
    window.addEventListener('resize', updateCardsPerView);
    updateCardsPerView();
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#menu') return; // Menu modal handles this
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navHeight = navbar?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // KEYBOARD ACCESSIBILITY
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Close modals on Escape
    if (e.key === 'Escape') {
      closeMenuModal();
      closeReservationModal();
      
      if (mobileMenu?.classList.contains('open')) {
        hamburger?.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // ============================================
  // PARALLAX EFFECT (Desktop Only)
  // ============================================
  const parallaxBg = document.querySelector('.parallax-bg');
  
  if (parallaxBg && window.innerWidth >= 1024) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const vibeSection = document.getElementById('story');
      if (vibeSection) {
        const sectionTop = vibeSection.offsetTop;
        const sectionHeight = vibeSection.offsetHeight;
        
        if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
          const yPos = (scrolled - sectionTop) * 0.3;
          parallaxBg.style.transform = `translateY(${yPos}px)`;
        }
      }
    }, { passive: true });
  }

  // ============================================
  // FLOATING CTA VISIBILITY
  // ============================================
  const floatingCta = document.getElementById('floatingCta');
  
  if (floatingCta) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Hide when scrolling down past hero, show when scrolling up
      if (currentScrollY > window.innerHeight * 0.8) {
        if (currentScrollY > lastScrollY) {
          floatingCta.style.transform = 'translateY(100px)';
        } else {
          floatingCta.style.transform = 'translateY(0)';
        }
      } else {
        floatingCta.style.transform = 'translateY(100px)';
      }
      
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // ============================================
  // GUEST REVIEW SUBMISSION (Local Storage)
  // ============================================
  const reviewForm = document.getElementById('reviewForm');
  const starRating = document.getElementById('starRating');
  // testimonialTrack already declared above in carousel section
  let selectedRating = 0;

  // Star rating interaction
  if (starRating) {
    const stars = starRating.querySelectorAll('.star');
    
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const rating = parseInt(star.dataset.rating);
        stars.forEach(s => {
          s.classList.toggle('hover', parseInt(s.dataset.rating) <= rating);
        });
      });
      
      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hover'));
      });
      
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.rating);
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.rating) <= selectedRating);
        });
      });
    });
  }

  // Load saved reviews from localStorage
  const loadSavedReviews = () => {
    const savedReviews = JSON.parse(localStorage.getItem('poblanoReviews') || '[]');
    savedReviews.forEach(review => addReviewToCarousel(review, false));
  };

  // Add review to carousel
  const addReviewToCarousel = (review, save = true) => {
    if (!testimonialTrack) return;
    
    const card = document.createElement('div');
    card.className = 'testimonial-card user-review';
    card.innerHTML = `
      <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p>"${review.text}"</p>
      <span class="author">— ${review.name}</span>
    `;
    
    testimonialTrack.appendChild(card);
    
    if (save) {
      const savedReviews = JSON.parse(localStorage.getItem('poblanoReviews') || '[]');
      savedReviews.push(review);
      localStorage.setItem('poblanoReviews', JSON.stringify(savedReviews));
    }
  };

  // Handle review form submission
  reviewForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reviewName')?.value.trim();
    const text = document.getElementById('reviewText')?.value.trim();
    
    if (!name || !text || selectedRating === 0) {
      alert('Please fill in all fields and select a star rating.');
      return;
    }
    
    const review = { name, text, rating: selectedRating, date: new Date().toISOString() };
    addReviewToCarousel(review);
    
    // Reset form
    reviewForm.reset();
    selectedRating = 0;
    starRating?.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    
    // Show thank you message
    const wrapper = document.querySelector('.review-form-wrapper');
    if (wrapper) {
      const originalContent = wrapper.innerHTML;
      wrapper.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
          <span style="font-size: 3rem;">🌮</span>
          <h3 style="margin: 1rem 0;">¡Gracias!</h3>
          <p>Thank you for sharing your experience!</p>
        </div>
      `;
      
      setTimeout(() => {
        wrapper.innerHTML = originalContent;
        // Re-attach event listeners
        location.reload(); // Simple reload to reinitialize
      }, 3000);
    }
  });

  // Load saved reviews on page load
  loadSavedReviews();

  // ============================================
  // INITIALIZE
  // ============================================
  console.log('🌮 Poblano KL website loaded successfully!');
});
