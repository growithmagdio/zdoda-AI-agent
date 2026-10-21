/**
 * ZDODA - AI AGENT LANDING PAGE SCRIPT
 * Production-quality interactions, demo simulators, video controls, and accessible modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* -------------------------------------------------------------------------
   * 1. HEADER & NAVIGATION
   * ------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const currentYearSpan = document.getElementById('current-year');

  // Dynamic Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Header Scroll Effect & Scrollspy
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy for active nav link
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile Menu Toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isOpen);
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', isOpen);
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  /* -------------------------------------------------------------------------
   * 2. HERO MEDIA & VIDEO CONTROLS
   * ------------------------------------------------------------------------- */
  const heroVideo = document.getElementById('hero-video');
  const heroPlayToggle = document.getElementById('hero-play-toggle');
  const heroSoundToggle = document.getElementById('hero-sound-toggle');

  if (heroVideo) {
    // Attempt autoplay muted safely
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Hero video autoplay was prevented or failed:', error);
      });
    }

    if (heroPlayToggle) {
      const toggleHeroPlay = () => {
        const pauseIcon = heroPlayToggle.querySelector('.pause-icon');
        const playIcon = heroPlayToggle.querySelector('.play-icon');

        if (heroVideo.paused) {
          heroVideo.play();
          pauseIcon.classList.remove('d-none');
          playIcon.classList.add('d-none');
        } else {
          heroVideo.pause();
          pauseIcon.classList.add('d-none');
          playIcon.classList.remove('d-none');
        }
      };

      heroPlayToggle.addEventListener('click', toggleHeroPlay);
      heroVideo.addEventListener('click', toggleHeroPlay);
    }

    if (heroSoundToggle) {
      heroSoundToggle.addEventListener('click', () => {
        const mutedIcon = heroSoundToggle.querySelector('.sound-muted-icon');
        const activeIcon = heroSoundToggle.querySelector('.sound-active-icon');
        const label = heroSoundToggle.querySelector('.ctrl-label');

        heroVideo.muted = !heroVideo.muted;
        if (heroVideo.muted) {
          mutedIcon.classList.remove('d-none');
          activeIcon.classList.add('d-none');
          if (label) label.textContent = 'Muted';
        } else {
          mutedIcon.classList.add('d-none');
          activeIcon.classList.remove('d-none');
          if (label) label.textContent = 'Sound On';
        }
      });
    }
  }

  /* -------------------------------------------------------------------------
   * 3. AI AGENT PRODUCT SHOWCASE TABS
   * ------------------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update Tab Buttons
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update Tab Panels
      tabPanels.forEach(panel => {
        if (panel.id === `panel-${targetId}`) {
          panel.classList.add('active');
          panel.removeAttribute('hidden');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('hidden', 'true');
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 4. INTERACTIVE CHATBOT SIMULATOR: TAB A (AI WEBSITE AGENT - MAGDIO)
   * ------------------------------------------------------------------------- */
  const websiteMessagesContainer = document.getElementById('website-chat-messages');
  const websiteChatForm = document.getElementById('website-chat-form');
  const websiteUserInput = document.getElementById('website-user-input');
  const websiteTyping = document.getElementById('website-typing');
  const resetWebsiteBtn = document.getElementById('reset-website-chat');
  const websiteChips = document.getElementById('website-chips');

  // Predefined Knowledge Base Responses
  const websiteKnowledgeBase = {
    'chat with us': `Great, I'm here to help! ZDODA designs intelligent AI agents tailored for your business. Would you like to see how we assist e-commerce stores, streamline customer support, or book appointments?`,
    'get a free consultation': `We'd love to learn about your business! You can click any "Book a Free Consultation" button or leave your details here, and our solutions architects will prepare an interactive agent prototype for your website.`,
    'what results did you get for haber living?': `Here is what we achieved for Haber Living, a premium luxury home essentials brand from India:
      <ul>
        <li><strong>503K+ Google Search Impressions</strong> generated</li>
        <li><strong>Top 1 position rankings</strong> for target keywords like "organic cotton towels"</li>
        <li>Full website revamp with optimized speed and mobile performance</li>
        <li>Complete GA4 and Google Search Console integration</li>
      </ul>
      The real win? They now possess a sustainable organic engine driving daily sales without relying solely on paid ads.`,
    'haber living': `For Haber Living, we delivered 503K+ search impressions, top ranking positions, and automated customer qualification that transformed their inbound traffic into measurable store revenue!`,
    'how does zdoda build agents?': `We follow a 4-step framework:
      <ol>
        <li><strong>Understand:</strong> We audit your existing workflows, FAQs, and drop-off points.</li>
        <li><strong>Build:</strong> We ground the agent in your verified documentation and product catalog.</li>
        <li><strong>Integrate:</strong> Connect to Shopify, Webflow, your CRM, and calendar.</li>
        <li><strong>Improve:</strong> Ongoing refinement based on real conversation telemetry.</li>
      </ol>`,
    'pricing': `Our agent solutions are custom-tailored based on your website's traffic scale, integration complexity, and custom tool requirements. Book a consultation for a transparent scope and quote!`,
    'default': `Thank you for asking! In a live deployment, this agent is connected to your full company documentation, inventory catalog, and ticketing system. Would you like to schedule a call to see how it can be tailored for your brand?`
  };

  const appendMessage = (container, text, isUser = false) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'agent-msg'}`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;

    const meta = document.createElement('span');
    meta.className = 'msg-meta';
    meta.textContent = 'Just now';

    msgDiv.appendChild(bubble);
    msgDiv.appendChild(meta);
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
  };

  const handleWebsiteQuery = (queryText) => {
    if (!queryText.trim()) return;

    // Append User Message
    appendMessage(websiteMessagesContainer, queryText, true);

    // Show Typing Indicator
    if (websiteTyping) {
      websiteTyping.classList.remove('d-none');
      websiteMessagesContainer.scrollTop = websiteMessagesContainer.scrollHeight;
    }

    // Determine Response
    const lowerQuery = queryText.toLowerCase().trim();
    let reply = websiteKnowledgeBase['default'];

    for (const key in websiteKnowledgeBase) {
      if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
        reply = websiteKnowledgeBase[key];
        break;
      }
    }

    setTimeout(() => {
      if (websiteTyping) websiteTyping.classList.add('d-none');
      appendMessage(websiteMessagesContainer, reply, false);
    }, 750);
  };

  if (websiteChatForm && websiteUserInput) {
    websiteChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = websiteUserInput.value;
      websiteUserInput.value = '';
      handleWebsiteQuery(val);
    });
  }

  if (websiteChips) {
    websiteChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.prompt-chip');
      if (chip) {
        const query = chip.getAttribute('data-query');
        handleWebsiteQuery(query);
      }
    });
  }

  if (resetWebsiteBtn && websiteMessagesContainer) {
    resetWebsiteBtn.addEventListener('click', () => {
      websiteMessagesContainer.innerHTML = `
        <div class="chat-msg agent-msg">
          <div class="msg-bubble">
            Hi there, this is Laura from MAGDIO. How can I help you today?
          </div>
          <span class="msg-meta">0.3s ago</span>
        </div>
        <div class="chat-prompt-chips" id="website-chips">
          <button type="button" class="prompt-chip" data-query="Chat with us">Chat with us</button>
          <button type="button" class="prompt-chip" data-query="Get a free consultation">Get a free consultation</button>
          <button type="button" class="prompt-chip" data-query="What results did you get for Haber Living?">What results did you get for Haber Living?</button>
          <button type="button" class="prompt-chip" data-query="How does ZDODA build agents?">How does ZDODA build agents?</button>
        </div>
      `;
      // Re-bind chips inside
      const newChips = document.getElementById('website-chips');
      if (newChips) {
        newChips.addEventListener('click', (e) => {
          const chip = e.target.closest('.prompt-chip');
          if (chip) {
            handleWebsiteQuery(chip.getAttribute('data-query'));
          }
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
   * 5. INTERACTIVE CHATBOT SIMULATOR: TAB B (AI CUSTOMER SUPPORT)
   * ------------------------------------------------------------------------- */
  const supportMessages = document.getElementById('support-chat-messages');
  const supportForm = document.getElementById('support-chat-form');
  const supportInput = document.getElementById('support-user-input');
  const supportTyping = document.getElementById('support-typing');
  const resetSupportBtn = document.getElementById('reset-support-chat');
  const supportChips = document.getElementById('support-chips');

  const supportKnowledgeBase = {
    'shopify': `Yes! We provide certified API connectors for Shopify, Shopify Plus, Webflow, and custom headless storefronts. The agent can check real-time inventory, order statuses, and shipping rates directly.`,
    'timeline': `Standard deployment takes 2 to 3 weeks: Week 1 for knowledge ingestion and guardrail design; Week 2 for tool integration and staging simulation; Week 3 for quality assurance and live rollout.`,
    'crm': `Yes, we integrate with HubSpot, Salesforce, Zoho, and webhook-enabled internal backends. Inbound leads and qualified conversation summaries sync automatically.`,
    'call': `I can help arrange that right away! You can click "Book a Free Consultation" to choose a time that fits your calendar, or share your contact email here and our engineering lead will follow up.`,
    'default': `Our enterprise support agent queries internal docs, knowledge bases, and API endpoints to answer technical questions with 100% adherence to company guidelines. Would you like to schedule a custom demonstration?`
  };

  const handleSupportQuery = (queryText) => {
    if (!queryText.trim()) return;

    appendMessage(supportMessages, queryText, true);

    if (supportTyping) {
      supportTyping.classList.remove('d-none');
      supportMessages.scrollTop = supportMessages.scrollHeight;
    }

    const lower = queryText.toLowerCase().trim();
    let reply = supportKnowledgeBase['default'];

    if (lower.includes('shopify') || lower.includes('webflow') || lower.includes('integration')) {
      reply = supportKnowledgeBase['shopify'];
    } else if (lower.includes('timeline') || lower.includes('how long') || lower.includes('setup')) {
      reply = supportKnowledgeBase['timeline'];
    } else if (lower.includes('crm') || lower.includes('hubspot') || lower.includes('salesforce')) {
      reply = supportKnowledgeBase['crm'];
    } else if (lower.includes('call') || lower.includes('schedule') || lower.includes('meeting')) {
      reply = supportKnowledgeBase['call'];
    }

    setTimeout(() => {
      if (supportTyping) supportTyping.classList.add('d-none');
      appendMessage(supportMessages, reply, false);
    }, 700);
  };

  if (supportForm && supportInput) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = supportInput.value;
      supportInput.value = '';
      handleSupportQuery(val);
    });
  }

  if (supportChips) {
    supportChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.prompt-chip');
      if (chip) {
        handleSupportQuery(chip.getAttribute('data-query'));
      }
    });
  }

  if (resetSupportBtn && supportMessages) {
    resetSupportBtn.addEventListener('click', () => {
      supportMessages.innerHTML = `
        <div class="chat-msg agent-msg">
          <div class="msg-bubble">
            Hello! I am your automated technical and customer support specialist. I can assist with integration specs, SLA policies, and onboarding requirements. What can I look up for you?
          </div>
          <span class="msg-meta">Just now</span>
        </div>
        <div class="chat-prompt-chips" id="support-chips">
          <button type="button" class="prompt-chip" data-query="How do integrations work with Shopify & Webflow?">How do integrations work with Shopify & Webflow?</button>
          <button type="button" class="prompt-chip" data-query="What is the setup timeline?">What is the setup timeline?</button>
          <button type="button" class="prompt-chip" data-query="Can I connect to our custom CRM?">Can I connect to our custom CRM?</button>
          <button type="button" class="prompt-chip" data-query="Schedule an engineering call">Schedule an engineering call</button>
        </div>
      `;
      const newSupportChips = document.getElementById('support-chips');
      if (newSupportChips) {
        newSupportChips.addEventListener('click', (e) => {
          const chip = e.target.closest('.prompt-chip');
          if (chip) handleSupportQuery(chip.getAttribute('data-query'));
        });
      }
    });
  }

  /* -------------------------------------------------------------------------
   * 6. TAB C: AI E-COMMERCE ASSISTANT (STOREFRONT SIMULATION)
   * ------------------------------------------------------------------------- */
  const cartPill = document.getElementById('cart-pill');
  const cartCountSpan = document.getElementById('cart-count');
  const cartTotalSpan = document.getElementById('cart-total');
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  const ecomFilterChips = document.querySelectorAll('.ecom-chip-btn');
  const productCards = document.querySelectorAll('.ecom-product-card');

  let cartItemsCount = 0;
  let cartSubtotal = 0;

  addToCartButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseFloat(btn.getAttribute('data-price') || '0');
      const name = btn.getAttribute('data-name') || 'Item';

      cartItemsCount += 1;
      cartSubtotal += price;

      if (cartCountSpan) cartCountSpan.textContent = `${cartItemsCount} item${cartItemsCount === 1 ? '' : 's'}`;
      if (cartTotalSpan) cartTotalSpan.textContent = `$${cartSubtotal}`;

      const origText = btn.textContent;
      btn.textContent = '✓ Added!';
      btn.style.background = '#10B981';
      btn.style.color = '#FFFFFF';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);
    });
  });

  ecomFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');
      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'running') {
          card.style.display = 'flex';
        } else if (filter === 'budget') {
          if (cat === 'budget') card.style.display = 'flex';
          else card.style.display = 'none';
        } else {
          card.style.display = 'flex';
        }
      });
    });
  });

  /* -------------------------------------------------------------------------
   * 7. BEFORE / AFTER COMPARISON TOGGLE
   * ------------------------------------------------------------------------- */
  const btnShowAfter = document.getElementById('btn-show-after');
  const btnShowBefore = document.getElementById('btn-show-before');
  const cardBefore = document.getElementById('card-before');
  const cardAfter = document.getElementById('card-after');

  if (btnShowAfter && btnShowBefore && cardBefore && cardAfter) {
    btnShowAfter.addEventListener('click', () => {
      btnShowAfter.classList.add('active');
      btnShowBefore.classList.remove('active');
      cardAfter.classList.add('highlighted');
      cardBefore.classList.remove('highlighted');
    });

    btnShowBefore.addEventListener('click', () => {
      btnShowBefore.classList.add('active');
      btnShowAfter.classList.remove('active');
      cardBefore.classList.add('highlighted');
      cardAfter.classList.remove('highlighted');
    });
  }

  /* -------------------------------------------------------------------------
   * 8. CINEMATIC VIDEO SHOWCASE CONTROLS
   * ------------------------------------------------------------------------- */
  const mainVideo = document.getElementById('main-video-player');
  const theaterBigPlay = document.getElementById('theater-big-play');
  const theaterPlayBtn = document.getElementById('theater-play-btn');
  const theaterMuteBtn = document.getElementById('theater-mute-btn');
  const theaterFullscreenBtn = document.getElementById('theater-fullscreen-btn');
  const videoProgressContainer = document.getElementById('video-progress-container');
  const videoProgressFill = document.getElementById('video-progress-fill');
  const videoCurrTime = document.getElementById('video-curr-time');
  const videoTotalTime = document.getElementById('video-total-time');

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (mainVideo) {
    const toggleMainPlay = () => {
      const playSym = theaterPlayBtn.querySelector('.play-symbol');
      const pauseSym = theaterPlayBtn.querySelector('.pause-symbol');

      if (mainVideo.paused) {
        mainVideo.play();
        if (theaterBigPlay) theaterBigPlay.classList.add('d-none');
        if (playSym) playSym.classList.add('d-none');
        if (pauseSym) pauseSym.classList.remove('d-none');
      } else {
        mainVideo.pause();
        if (theaterBigPlay) theaterBigPlay.classList.remove('d-none');
        if (playSym) playSym.classList.remove('d-none');
        if (pauseSym) pauseSym.classList.add('d-none');
      }
    };

    if (theaterBigPlay) theaterBigPlay.addEventListener('click', toggleMainPlay);
    if (theaterPlayBtn) theaterPlayBtn.addEventListener('click', toggleMainPlay);

    // Update Progress
    mainVideo.addEventListener('timeupdate', () => {
      if (mainVideo.duration) {
        const percent = (mainVideo.currentTime / mainVideo.duration) * 100;
        if (videoProgressFill) videoProgressFill.style.width = `${percent}%`;
        if (videoCurrTime) videoCurrTime.textContent = formatTime(mainVideo.currentTime);
      }
    });

    mainVideo.addEventListener('loadedmetadata', () => {
      if (videoTotalTime) videoTotalTime.textContent = formatTime(mainVideo.duration);
    });

    // Scrubber click
    if (videoProgressContainer) {
      videoProgressContainer.addEventListener('click', (e) => {
        const rect = videoProgressContainer.getBoundingClientRect();
        const clickPos = (e.clientX - rect.left) / rect.width;
        mainVideo.currentTime = clickPos * mainVideo.duration;
      });
    }

    // Mute/Unmute
    if (theaterMuteBtn) {
      theaterMuteBtn.addEventListener('click', () => {
        const unmutedIcon = theaterMuteBtn.querySelector('.unmuted-icon');
        const mutedIcon = theaterMuteBtn.querySelector('.muted-icon');

        mainVideo.muted = !mainVideo.muted;
        if (mainVideo.muted) {
          unmutedIcon.classList.add('d-none');
          mutedIcon.classList.remove('d-none');
        } else {
          unmutedIcon.classList.remove('d-none');
          mutedIcon.classList.add('d-none');
        }
      });
    }

    // Fullscreen
    if (theaterFullscreenBtn) {
      theaterFullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          mainVideo.requestFullscreen().catch(err => {
            console.warn('Fullscreen request failed:', err);
          });
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  /* -------------------------------------------------------------------------
   * 9. FAQ ACCORDION (Accessible)
   * ------------------------------------------------------------------------- */
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const targetId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(targetId);

      // Close all other FAQ items for a clean accordion experience
      faqTriggers.forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          const otherContent = document.getElementById(other.getAttribute('aria-controls'));
          if (otherContent) otherContent.setAttribute('hidden', 'true');
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (content) content.setAttribute('hidden', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.removeAttribute('hidden');
      }
    });
  });

  /* -------------------------------------------------------------------------
   * 10. CONSULTATION MODAL & BOOKING FORM
   * ------------------------------------------------------------------------- */
  const consultationModal = document.getElementById('consultation-modal');
  const openConsultationBtns = document.querySelectorAll('.open-consultation-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const consultationForm = document.getElementById('consultation-form');
  const formSuccessCard = document.getElementById('form-success');
  const resetModalFormBtn = document.getElementById('reset-modal-form-btn');
  const doneModalBtn = document.getElementById('done-modal-btn');

  const openModal = () => {
    if (consultationModal) {
      consultationModal.classList.remove('d-none');
      consultationModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstInput = document.getElementById('form-name');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    }
  };

  const closeModal = () => {
    if (consultationModal) {
      consultationModal.classList.add('d-none');
      consultationModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  openConsultationBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (doneModalBtn) doneModalBtn.addEventListener('click', closeModal);

  if (consultationModal) {
    consultationModal.addEventListener('click', (e) => {
      if (e.target === consultationModal) closeModal();
    });
  }

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  // Form Validation & Submission
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const companyInput = document.getElementById('form-company');
      const websiteInput = document.getElementById('form-website');
      const agentType = document.getElementById('form-agent-type');
      const messageInput = document.getElementById('form-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.classList.remove('d-none');
        isValid = false;
      } else {
        nameError.classList.add('d-none');
      }

      // Validate Email (Basic Regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.classList.remove('d-none');
        isValid = false;
      } else {
        emailError.classList.add('d-none');
      }

      if (!isValid) return;

      // Submission payload
      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        company: companyInput.value.trim() || 'Your Company',
        website: websiteInput.value.trim(),
        objective: agentType.value,
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString()
      };

      // Store inquiry locally in browser storage
      try {
        const stored = JSON.parse(localStorage.getItem('zdoda_consultation_inquiries') || '[]');
        stored.push(payload);
        localStorage.setItem('zdoda_consultation_inquiries', JSON.stringify(stored));
      } catch (err) {
        console.warn('Local storage write skipped:', err);
      }

      // Show Success State
      consultationForm.classList.add('d-none');
      if (formSuccessCard) {
        formSuccessCard.classList.remove('d-none');
        const successClientName = document.getElementById('success-client-name');
        const successCompanyName = document.getElementById('success-company-name');
        const successClientEmail = document.getElementById('success-client-email');

        if (successClientName) successClientName.textContent = payload.name;
        if (successCompanyName) successCompanyName.textContent = payload.company;
        if (successClientEmail) successClientEmail.textContent = payload.email;
      }
    });
  }

  if (resetModalFormBtn && consultationForm && formSuccessCard) {
    resetModalFormBtn.addEventListener('click', () => {
      consultationForm.reset();
      consultationForm.classList.remove('d-none');
      formSuccessCard.classList.add('d-none');
    });
  }

  /* -------------------------------------------------------------------------
   * 11. ASSET LIGHTBOX MODAL (Inspecting Supplied Images)
   * ------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const assetPreviewBtns = document.querySelectorAll('.asset-preview-btn');

  const openLightbox = (imagePath, captionText) => {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = imagePath;
      if (lightboxCaption) lightboxCaption.textContent = captionText || 'Supplied Reference Asset';
      lightboxModal.classList.remove('d-none');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.add('d-none');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  assetPreviewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgPath = btn.getAttribute('data-img');
      const caption = btn.getAttribute('data-caption');
      if (imgPath) openLightbox(imgPath, caption);
    });
  });

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  /* -------------------------------------------------------------------------
   * 12. FLOATING CONCIERGE LAUNCHER WIDGET
   * ------------------------------------------------------------------------- */
  const launcherTrigger = document.getElementById('launcher-trigger');
  const floatingWindow = document.getElementById('floating-window');
  const floatCloseBtn = document.getElementById('float-close-btn');
  const floatForm = document.getElementById('float-form');
  const floatInput = document.getElementById('float-input');
  const floatMessages = document.getElementById('float-messages');
  const floatTyping = document.getElementById('float-typing');

  if (launcherTrigger && floatingWindow) {
    const toggleFloating = () => {
      const isHidden = floatingWindow.classList.contains('d-none');
      const openIcon = launcherTrigger.querySelector('.launcher-open-icon');
      const closeIcon = launcherTrigger.querySelector('.launcher-close-icon');

      if (isHidden) {
        floatingWindow.classList.remove('d-none');
        floatingWindow.setAttribute('aria-hidden', 'false');
        launcherTrigger.setAttribute('aria-expanded', 'true');
        if (openIcon) openIcon.classList.add('d-none');
        if (closeIcon) closeIcon.classList.remove('d-none');
        if (floatInput) setTimeout(() => floatInput.focus(), 150);
      } else {
        floatingWindow.classList.add('d-none');
        floatingWindow.setAttribute('aria-hidden', 'true');
        launcherTrigger.setAttribute('aria-expanded', 'false');
        if (openIcon) openIcon.classList.remove('d-none');
        if (closeIcon) closeIcon.classList.add('d-none');
      }
    };

    launcherTrigger.addEventListener('click', toggleFloating);
    if (floatCloseBtn) floatCloseBtn.addEventListener('click', toggleFloating);

    // Floating Chat Handlers
    const handleFloatQuery = (text) => {
      if (!text.trim()) return;

      const userDiv = document.createElement('div');
      userDiv.className = 'float-msg user';
      userDiv.innerHTML = `<p>${text}</p>`;
      floatMessages.appendChild(userDiv);
      floatMessages.scrollTop = floatMessages.scrollHeight;

      if (floatTyping) {
        floatTyping.classList.remove('d-none');
        floatMessages.scrollTop = floatMessages.scrollHeight;
      }

      setTimeout(() => {
        if (floatTyping) floatTyping.classList.add('d-none');
        const botDiv = document.createElement('div');
        botDiv.className = 'float-msg bot';

        let answer = `Thanks for your interest in ZDODA! Our autonomous agents can be integrated into your website in 2-3 weeks to automate customer support, guide shoppers, and capture leads. Would you like to schedule a consultation with our team?`;

        const lower = text.toLowerCase();
        if (lower.includes('consultation') || lower.includes('book') || lower.includes('demo')) {
          answer = `You can book a free consultation right away using our booking form, or click the "Book a Free Consultation" button above!`;
        } else if (lower.includes('e-commerce') || lower.includes('store') || lower.includes('results')) {
          answer = `In e-commerce deployments, our shopping assistants guide buyers to relevant products, increase average order value by +50%, and reduce cart abandonment!`;
        }

        botDiv.innerHTML = `<p>${answer}</p>`;
        floatMessages.appendChild(botDiv);
        floatMessages.scrollTop = floatMessages.scrollHeight;
      }, 700);
    };

    if (floatForm && floatInput) {
      floatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = floatInput.value;
        floatInput.value = '';
        handleFloatQuery(q);
      });
    }

    // Chip triggers in floating window
    floatingWindow.addEventListener('click', (e) => {
      const chip = e.target.closest('.float-chip');
      if (chip) {
        handleFloatQuery(chip.getAttribute('data-text'));
      }
    });
  }

});
