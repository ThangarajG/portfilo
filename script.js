// Interactive Scripts for Thangaraj Portfolio

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /* 1. Ambient Dynamic Canvas Particles Background                             */
    /* -------------------------------------------------------------------------- */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = Array.from({ length: 45 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(99, 102, 241, ',
            alpha: Math.random() * 0.5 + 0.1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4
        }));

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color + p.alpha + ')';
                ctx.fill();
            });

            // Connect nearby particles with subtle lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateCanvas);
        }
        animateCanvas();
    }

    /* -------------------------------------------------------------------------- */
    /* 2. Skill Category Filter Switching                                         */
    /* -------------------------------------------------------------------------- */
    const skillBtns = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 3. Project Category Filter Switching                                       */
    /* -------------------------------------------------------------------------- */
    const projectBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 4. Interactive Code Inspector Snippets                                     */
    /* -------------------------------------------------------------------------- */
    const codeDisplay = document.getElementById('code-snippet-display');
    const activeFilename = document.getElementById('active-filename');
    const codeTabs = document.querySelectorAll('.code-tab-btn');

    const snippets = {
        webrtc: {
            filename: 'useWebRTCStream.ts',
            code: `<span class="text-indigo-400">import</span> { useEffect, useRef, useState, useCallback } <span class="text-indigo-400">from</span> <span class="text-emerald-400">'react'</span>;

<span class="text-slate-500">// Custom WebRTC Stream hook engineered for Daruk Video Conferencing</span>
<span class="text-indigo-400">export interface</span> <span class="text-yellow-300">PeerConnectionConfig</span> {
  roomId: <span class="text-cyan-400">string</span>;
  iceServers: RTCIceServer[];
  onTrackAdded: (stream: MediaStream, peerId: <span class="text-cyan-400">string</span>) => <span class="text-cyan-400">void</span>;
}

<span class="text-indigo-400">export const</span> <span class="text-blue-400">useWebRTCStream</span> = ({ roomId, iceServers, onTrackAdded }: <span class="text-yellow-300">PeerConnectionConfig</span>) => {
  <span class="text-indigo-400">const</span> peerConnections = useRef&lt;Map&lt;<span class="text-cyan-400">string</span>, RTCPeerConnection&gt;&gt;(<span class="text-indigo-400">new</span> Map());
  <span class="text-indigo-400">const</span> [isConnecting, setIsConnecting] = useState(<span class="text-indigo-400">true</span>);

  <span class="text-indigo-400">const</span> createPeerConnection = useCallback((peerId: <span class="text-cyan-400">string</span>) => {
    <span class="text-indigo-400">const</span> pc = <span class="text-indigo-400">new</span> RTCPeerConnection({ iceServers });

    pc.ontrack = (event) => {
      onTrackAdded(event.streams[0], peerId);
    };

    peerConnections.current.set(peerId, pc);
    <span class="text-indigo-400">return</span> pc;
  }, [iceServers, onTrackAdded]);

  <span class="text-indigo-400">return</span> { createPeerConnection, peerConnections: peerConnections.current, isConnecting };
};`
        },
        zustand: {
            filename: 'useAnalyticsStore.ts',
            code: `<span class="text-indigo-400">import</span> { create } <span class="text-indigo-400">from</span> <span class="text-emerald-400">'zustand'</span>;
<span class="text-indigo-400">import</span> { devtools, persist } <span class="text-indigo-400">from</span> <span class="text-emerald-400">'zustand/middleware'</span>;

<span class="text-slate-500">// EProTex Multi-tenant Zustand State Store</span>
<span class="text-indigo-400">interface</span> <span class="text-yellow-300">AnalyticsState</span> {
  activeTenantId: <span class="text-cyan-400">string</span> | <span class="text-indigo-400">null</span>;
  dateRange: [Date, Date];
  metricFilter: <span class="text-cyan-400">'revenue'</span> | <span class="text-cyan-400">'usage'</span> | <span class="text-cyan-400">'retention'</span>;
  setTenant: (tenantId: <span class="text-cyan-400">string</span>) => <span class="text-cyan-400">void</span>;
  setFilter: (filter: <span class="text-yellow-300">AnalyticsState</span>[<span class="text-emerald-400">'metricFilter'</span>]) => <span class="text-cyan-400">void</span>;
}

<span class="text-indigo-400">export const</span> <span class="text-blue-400">useAnalyticsStore</span> = create&lt;<span class="text-yellow-300">AnalyticsState</span>&gt;()(
  devtools(
    persist(
      (set) => ({
        activeTenantId: <span class="text-emerald-400">'tenant-default'</span>,
        dateRange: [<span class="text-indigo-400">new</span> Date(), <span class="text-indigo-400">new</span> Date()],
        metricFilter: <span class="text-emerald-400">'revenue'</span>,
        setTenant: (tenantId) => set({ activeTenantId: tenantId }),
        setFilter: (metricFilter) => set({ metricFilter }),
      }),
      { name: <span class="text-emerald-400">'eprotex-analytics-storage'</span> }
    )
  )
);`
        },
        storybook: {
            filename: 'Button.stories.tsx',
            code: `<span class="text-indigo-400">import type</span> { Meta, StoryObj } <span class="text-indigo-400">from</span> <span class="text-emerald-400">'@storybook/react'</span>;
<span class="text-indigo-400">import</span> { Button } <span class="text-indigo-400">from</span> <span class="text-emerald-400">'./Button'</span>;

<span class="text-slate-500">// Storybook UI System Component Definition (Reduced release cycles by 80%)</span>
<span class="text-indigo-400">const</span> meta: Meta&lt;<span class="text-indigo-400">typeof</span> Button&gt; = {
  title: <span class="text-emerald-400">'Design System/Atoms/Button'</span>,
  component: Button,
  tags: [<span class="text-emerald-400">'autodocs'</span>],
  argTypes: {
    variant: { control: <span class="text-emerald-400">'select'</span>, options: [<span class="text-emerald-400">'primary'</span>, <span class="text-emerald-400">'secondary'</span>, <span class="text-emerald-400">'glow'</span>] },
    size: { control: <span class="text-emerald-400">'radio'</span>, options: [<span class="text-emerald-400">'sm'</span>, <span class="text-emerald-400">'md'</span>, <span class="text-emerald-400">'lg'</span>] },
  },
};

<span class="text-indigo-400">export default</span> meta;
<span class="text-indigo-400">type</span> <span class="text-yellow-300">Story</span> = StoryObj&lt;<span class="text-indigo-400">typeof</span> Button&gt;;

<span class="text-indigo-400">export const</span> <span class="text-blue-400">PrimaryGlow</span>: <span class="text-yellow-300">Story</span> = {
  args: {
    variant: <span class="text-emerald-400">'glow'</span>,
    children: <span class="text-emerald-400">'Deploy Enterprise App'</span>,
  },
};`
        }
    };

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.getAttribute('data-tab');
            if (snippets[key]) {
                activeFilename.textContent = snippets[key].filename;
                codeDisplay.innerHTML = `<code>${snippets[key].code}</code>`;
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /* 5. Project Details Modal                                                   */
    /* -------------------------------------------------------------------------- */
    const projectModal = document.getElementById('project-modal');
    const closeProjectModal = document.getElementById('close-project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalTitle = document.getElementById('modal-title');
    const viewProjectBtns = document.querySelectorAll('.view-project-btn');

    const projectData = {
        eprotex: {
            title: 'EProTex SaaS Suite',
            subtitle: 'Multi-Tenant Enterprise SaaS Platform across 10+ Deployments',
            image: 'images/eprotex.jpg',
            metrics: [
                { label: 'Feature Cycle Speed', val: '-80% Time' },
                { label: 'Lighthouse Score', val: '+40% Boost' },
                { label: 'Deployments', val: '10+ Enterprise Clients' }
            ],
            description: `Designed and engineered a modular UI component library with Storybook at TechAmour Pvt Ltd. Architected high-throughput client dashboards and data grids, optimizing rendering pipelines for smooth real-time data visualization. Established strict TypeScript definitions and Node.js microservice contracts.`,
            highlights: [
                'Engineered Storybook Design Tokens & WCAG accessible components.',
                'Optimized Core Web Vitals using code-splitting, asset compression, and memoization.',
                'Implemented multi-tenant permission matrices and role-based views.'
            ],
            tech: ['React.js', 'TypeScript', 'Storybook', 'Zustand', 'Node.js', 'PostgreSQL', 'Prisma']
        },
        tamilmart: {
            title: 'Tamil Mini Mart',
            subtitle: 'Omnichannel Next.js PWA & React Native Expo Mobile App',
            image: 'images/tamil_mini_mart.jpg',
            metrics: [
                { label: 'Shared Mobile Logic', val: '~75%' },
                { label: 'Platforms', val: 'Web PWA, iOS, Android' },
                { label: 'Gateway', val: 'Checkout.com Integrated' }
            ],
            description: `Built an omnichannel Next.js PWA with dynamic product listings, server-side caching, and Checkout.com gateway integration for HOD Digital. Developed a cross-platform mobile application using Expo (React Native), sharing ~75% of business logic across iOS and Android builds.`,
            highlights: [
                'Unified state architecture between React Native mobile app and Next.js Web PWA.',
                'Server-side caching for fast product catalog rendering.',
                'Integrated checkout pipelines and webhooks.'
            ],
            tech: ['Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Checkout.com']
        },
        daruk: {
            title: 'Daruk Video Conferencing',
            subtitle: 'Real-Time Multi-Party WebRTC Video Conferencing',
            image: 'images/daruk.jpg',
            metrics: [
                { label: 'Onboarding Velocity', val: '+30% Speed' },
                { label: 'Protocols', val: 'WebRTC, WebSockets' },
                { label: 'Layouts', val: 'Dynamic Grid Viewports' }
            ],
            description: `Developed the UI for Daruk video conferencing at Skematix Technologies featuring dynamic participant viewports and WebRTC integration. Engineered extensible stateful draft and dynamic form engines, cutting developer onboarding time by 30%.`,
            highlights: [
                'Dynamic WebRTC connection management and media stream handling.',
                'Responsive video participant grid balancing bandwidth and resolution.',
                'Standardized reusable component architecture.'
            ],
            tech: ['React.js', 'WebRTC', 'Redux Toolkit', 'Context API', 'WebSockets', 'Jest']
        },
        veppy: {
            title: 'Veppy Marketplace',
            subtitle: 'ScandiPWA / Magento Digital Storefront Overhaul',
            image: 'images/veppy.jpg',
            metrics: [
                { label: 'Storefront', val: 'ScandiPWA / React' },
                { label: 'API Layer', val: 'Custom GraphQL' },
                { label: 'Payments', val: 'Stripe Pipelines' }
            ],
            description: `Overhauled the Veppy e-commerce marketplace using ScandiPWA/React, overriding default components and integrating Stripe payment pipelines. Authored custom GraphQL queries and backend serverless endpoints for real-time cart synchronization.`,
            highlights: [
                'Custom GraphQL query resolution and serverless cart sync.',
                'Stripe payment gateway integration with webhooks validation.',
                'Comprehensive E2E test suites validating critical checkout flows.'
            ],
            tech: ['GraphQL', 'ScandiPWA', 'React.js', 'Stripe', 'Node.js', 'E2E Testing']
        }
    };

    viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project');
            const data = projectData[key];

            if (data && projectModal && modalBody) {
                modalTitle.textContent = data.title;
                document.getElementById('modal-subtitle').textContent = data.subtitle;

                modalBody.innerHTML = `
                    <div class="rounded-xl overflow-hidden h-56 bg-slate-950 border border-slate-800">
                        <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover">
                    </div>

                    <div class="grid grid-cols-3 gap-4">
                        ${data.metrics.map(m => `
                            <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                                <div class="text-cyan-400 font-extrabold font-mono text-base">${m.val}</div>
                                <div class="text-slate-400 text-xs mt-1">${m.label}</div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-sm font-bold text-white uppercase font-mono tracking-wider">Overview</h4>
                        <p class="text-slate-300 text-sm leading-relaxed">${data.description}</p>
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-sm font-bold text-white uppercase font-mono tracking-wider">Key Highlights</h4>
                        <ul class="space-y-1.5 text-sm text-slate-300 list-disc list-inside">
                            ${data.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="space-y-3">
                        <h4 class="text-sm font-bold text-white uppercase font-mono tracking-wider">Tech Stack</h4>
                        <div class="flex flex-wrap gap-2">
                            ${data.tech.map(t => `<span class="px-3 py-1 rounded-lg bg-slate-800 text-cyan-400 text-xs font-mono border border-slate-700">${t}</span>`).join('')}
                        </div>
                    </div>
                `;

                projectModal.classList.remove('hidden');
                setTimeout(() => projectModal.classList.remove('opacity-0'), 10);
            }
        });
    });

    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', () => {
            projectModal.classList.add('opacity-0');
            setTimeout(() => projectModal.classList.add('hidden'), 300);
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 6. Resume PDF Modal                                                        */
    /* -------------------------------------------------------------------------- */
    const resumeModal = document.getElementById('resume-modal');
    const resumeBtn = document.getElementById('resume-modal-btn');
    const mobileResumeBtn = document.getElementById('mobile-resume-btn');
    const closeResumeModal = document.getElementById('close-resume-modal');

    const openResume = () => {
        if (resumeModal) {
            resumeModal.classList.remove('hidden');
            setTimeout(() => resumeModal.classList.remove('opacity-0'), 10);
        }
    };

    if (resumeBtn) resumeBtn.addEventListener('click', openResume);
    if (mobileResumeBtn) mobileResumeBtn.addEventListener('click', openResume);

    if (closeResumeModal) {
        closeResumeModal.addEventListener('click', () => {
            resumeModal.classList.add('opacity-0');
            setTimeout(() => resumeModal.classList.add('hidden'), 300);
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 7. Mobile Navigation Menu Toggle                                           */
    /* -------------------------------------------------------------------------- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    /* -------------------------------------------------------------------------- */
    /* 8. Contact Form Handler with Web3Forms & Toast Notification                */
    /* -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const submitText = document.getElementById('contact-submit-text');
    const submitIcon = document.getElementById('contact-submit-icon');

    function showToast(message, isSuccess = true) {
        if (!toast || !toastMessage) return;

        toastMessage.textContent = message;
        const icon = toast.querySelector('i');
        if (icon) {
            icon.className = isSuccess 
                ? 'fa-solid fa-circle-check text-cyan-400 text-lg' 
                : 'fa-solid fa-circle-exclamation text-rose-400 text-lg';
        }

        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.remove('translate-y-10'), 10);

        setTimeout(() => {
            toast.classList.add('translate-y-10');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 4500);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const formData = new FormData(contactForm);

            // Set loading button state
            if (submitBtn && submitText && submitIcon) {
                submitBtn.disabled = true;
                submitText.textContent = 'Sending...';
                submitIcon.className = 'fa-solid fa-spinner fa-spin';
            }

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    showToast(`Thank you, ${name}! Your message has been delivered to Thangaraj.`, true);
                    contactForm.reset();
                } else {
                    showToast(result.message || 'Something went wrong. Please try again or email directly.', false);
                }
            } catch (err) {
                showToast('Unable to send message. Please check your network connection.', false);
            } finally {
                // Restore button state
                if (submitBtn && submitText && submitIcon) {
                    submitBtn.disabled = false;
                    submitText.textContent = 'Send Message';
                    submitIcon.className = 'fa-solid fa-paper-plane';
                }
            }
        });
    }

});
