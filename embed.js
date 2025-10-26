(function() {
    'use strict';

    const inlineCSS = `
        .bhw-container {
            font-family: var(--bhw-font, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
            max-width: var(--bhw-max-width, 1200px);
            margin: var(--bhw-margin, 20px auto);
            width: 100%;
            padding: 0 16px;
        }
        .bhw-widget {
            background: var(--bhw-bg, #ffffff);
            border-radius: var(--bhw-widget-radius, 24px);
            padding: var(--bhw-padding, 32px);
            color: var(--bhw-text-color, #1a1a1a);
            box-shadow: var(--bhw-shadow, 0 8px 32px rgba(0,0,0,0.08));
            position: relative;
            overflow: hidden;
        }
        
        .bhw-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: var(--bhw-header-margin, 32px);
        }
        .bhw-logo-icon {
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bhw-logo-bg, linear-gradient(135deg, #1877F2 0%, #42A5F5 100%));
            border-radius: 16px;
            font-size: 24px;
            color: white;
            box-shadow: 0 4px 12px rgba(24,119,242,0.3);
        }
        .bhw-branding-text h2 {
            font-size: var(--bhw-main-title-size, 1.75em);
            font-weight: 700;
            margin: 0 0 6px 0;
            color: var(--bhw-main-title-color, #1a202c);
        }
        .bhw-branding-text p {
            font-size: var(--bhw-main-description-size, 0.95em);
            color: var(--bhw-main-description-color, #4a5568);
            margin: 0;
        }
        
        /* Нативные встроенные посты */
        .bhw-native-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: var(--bhw-gap, 20px);
        }
        .bhw-native-grid .fb-post {
            min-width: 300px;
        }
        
        /* Кастомные карточки */
        .bhw-grid {
            display: flex;
            gap: var(--bhw-gap, 20px);
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 16px;
            -webkit-overflow-scrolling: touch;
        }
        .bhw-grid::-webkit-scrollbar {
            height: 6px;
        }
        .bhw-grid::-webkit-scrollbar-thumb {
            background: #1877F2;
            border-radius: 3px;
        }
        
        .bhw-card {
            flex: 0 0 var(--bhw-card-width, 340px);
            scroll-snap-align: start;
            background: var(--bhw-card-bg, #ffffff);
            border: var(--bhw-card-border, 1px solid #e5e7eb);
            border-radius: var(--bhw-block-radius, 16px);
            padding: 0;
            transition: all 0.2s ease;
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: var(--bhw-card-min-height, 320px);
            box-shadow: var(--bhw-card-shadow, 0 4px 12px rgba(0,0,0,0.05));
            overflow: hidden;
        }
        .bhw-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--bhw-card-hover-shadow, 0 12px 24px rgba(24,119,242,0.15));
        }
        .bhw-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: #1877F2;
            z-index: 1;
        }
        
        .bhw-card-content {
            padding: var(--bhw-block-padding, 20px);
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .bhw-card-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .bhw-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid var(--bhw-avatar-border, #f3f4f6);
        }
        .bhw-user-info {
            flex: 1;
        }
        .bhw-author {
            font-weight: 600;
            font-size: 15px;
            color: var(--bhw-author-color, #111827);
            margin: 0 0 2px 0;
        }
        .bhw-time {
            font-size: 13px;
            color: var(--bhw-time-color, #6b7280);
            margin: 0;
        }
        .bhw-platform-badge {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #1877F2;
            font-size: 12px;
            color: white;
            font-weight: 600;
        }
        .bhw-content {
            font-size: 15px;
            line-height: 1.6;
            color: var(--bhw-content-color, #374151);
            margin-bottom: 16px;
            flex: 1;
        }
        .bhw-media {
            width: 100%;
            height: 200px;
            margin: 16px 0;
            border-radius: 12px;
            overflow: hidden;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
        }
        .bhw-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .bhw-actions {
            display: flex;
            gap: 16px;
            align-items: center;
            padding-top: 16px;
            border-top: 1px solid var(--bhw-actions-border, #f3f4f6);
            margin-top: auto;
        }
        .bhw-action {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--bhw-action-color, #6b7280);
            font-size: 14px;
            font-weight: 500;
        }
        
        .bhw-loading {
            text-align: center;
            padding: 60px 20px;
            color: var(--bhw-loading-color, #6b7280);
        }
        .bhw-spinner {
            width: 32px;
            height: 32px;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #1877F2;
            border-radius: 50%;
            animation: bhw-spin 1s linear infinite;
            margin: 0 auto 16px;
        }
        @keyframes bhw-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .bhw-container { padding: 0 12px; }
            .bhw-widget { padding: var(--bhw-padding-mobile, 24px); }
            .bhw-branding-text h2 { font-size: var(--bhw-title-size-mobile, 1.4em); }
            .bhw-card { flex: 0 0 85%; min-height: 280px; }
            .bhw-native-grid { grid-template-columns: 1fr; }
        }
    `;

    window.BusinessHoursWidgets = window.BusinessHoursWidgets || {};
    window.BusinessHoursWidgets.facebook = window.BusinessHoursWidgets.facebook || {};

    try {
        const currentScript = document.currentScript || (function() {
            const scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();

        let clientId = currentScript.dataset.id;
        if (!clientId) {
            console.error('[FacebookWidget] data-id обязателен');
            return;
        }

        clientId = normalizeId(clientId);

        if (currentScript.dataset.bhwMounted === '1') return;
        currentScript.dataset.bhwMounted = '1';

        console.log(`[FacebookWidget] 🚀 Инициализация Facebook виджета "${clientId}"`);

        if (!document.querySelector('#facebook-widget-styles')) {
            const style = document.createElement('style');
            style.id = 'facebook-widget-styles';
            style.textContent = inlineCSS;
            document.head.appendChild(style);
        }

        const baseUrl = getBasePath(currentScript.src);
        const uniqueClass = `bhw-facebook-${clientId}-${Date.now()}`;
        const container = createContainer(currentScript, clientId, uniqueClass);
        
        showLoading(container);

        loadConfig(clientId, baseUrl)
            .then(fetchedConfig => {
                const finalConfig = mergeDeep(getDefaultConfig(), fetchedConfig);
                applyCustomStyles(uniqueClass, finalConfig.style || {});
                createWidget(container, finalConfig);
                window.BusinessHoursWidgets.facebook[clientId] = { container, config: finalConfig };
                console.log(`[FacebookWidget] ✅ Facebook виджет "${clientId}" успешно создан`);
            })
            .catch(error => {
                console.warn(`[FacebookWidget] ⚠️ Ошибка загрузки "${clientId}":`, error.message);
                const defaultConfig = getDefaultConfig();
                applyCustomStyles(uniqueClass, defaultConfig.style);
                createWidget(container, defaultConfig);
                window.BusinessHoursWidgets.facebook[clientId] = { container, config: defaultConfig };
            });

    } catch (error) {
        console.error('[FacebookWidget] 💥 Критическая ошибка:', error);
    }

    // Вспомогательные функции
    function normalizeId(id) {
        return (id || 'demo').replace(/\.(json|js)$/i, '');
    }

    function getBasePath(src) {
        if (!src) return './';
        try {
            const url = new URL(src, location.href);
            return url.origin + url.pathname.replace(/\/[^\/]*$/, '/');
        } catch (error) {
            console.warn('[FacebookWidget] Ошибка basePath:', error);
            return './';
        }
    }

    function createContainer(scriptElement, clientId, uniqueClass) {
        const container = document.createElement('div');
        container.id = `facebook-widget-${clientId}`;
        container.className = `bhw-container ${uniqueClass}`;
        scriptElement.parentNode.insertBefore(container, scriptElement.nextSibling);
        return container;
    }

    function showLoading(container) {
        container.innerHTML = `
            <div class="bhw-widget">
                <div class="bhw-loading">
                    <div class="bhw-spinner"></div>
                    <div>Loading Facebook posts...</div>
                </div>
            </div>
        `;
    }

    function getDefaultConfig() {
        return {
            widgetTitle: "Facebook Feed",
            widgetDescription: "Latest updates from our Facebook page",
            maxPosts: 6,
            showAvatars: true,
            showTimestamp: true,
            showMedia: true,
            mode: "native", // "native" = официальные встроенные посты, "cards" = наши карточки
            postUrls: [], // Массив URL постов для режима native
            style: {
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                colors: {
                    background: "#ffffff",
                    text: "#1a1a1a",
                    title: "#1a202c",
                    description: "#4a5568",
                    author: "#111827",
                    time: "#6b7280",
                    content: "#374151",
                    action: "#6b7280",
                    cardBg: "#ffffff",
                    cardBorder: "#e5e7eb",
                    borderHover: "#d1d5db",
                    avatarBorder: "#f3f4f6",
                    actionsBorder: "#f3f4f6",
                    logoBg: "linear-gradient(135deg, #1877F2 0%, #42A5F5 100%)"
                },
                borderRadius: { widget: 24, blocks: 16 },
                sizes: { 
                    fontSize: 1.0, 
                    padding: 32, 
                    blockPadding: 20, 
                    gap: 20,
                    cardWidth: 340,
                    cardMinHeight: 320
                },
                shadow: { 
                    widget: "0 8px 32px rgba(0,0,0,0.08)",
                    card: "0 4px 12px rgba(0,0,0,0.05)",
                    cardHover: "0 12px 24px rgba(24,119,242,0.15)"
                }
            }
        };
    }

    function mergeDeep(base, override) {
        const result = { ...base, ...override };
        
        for (const key of ['style']) {
            if (base[key] && typeof base[key] === 'object' && !Array.isArray(base[key])) {
                result[key] = { ...(base[key] || {}), ...(override[key] || {}) };
            }
        }

        if (result.style) {
            for (const subKey of ['colors', 'borderRadius', 'sizes', 'shadow']) {
                if (base.style[subKey] && typeof base.style[subKey] === 'object' && !Array.isArray(base.style[subKey])) {
                    result.style[subKey] = { ...(base.style[subKey] || {}), ...(override.style?.[subKey] || {}) };
                }
            }
        }
        
        return result;
    }

    async function loadConfig(clientId, baseUrl) {
        if (clientId === 'local') {
            const localScript = document.querySelector('#facebook-local-config');
            if (!localScript) {
                throw new Error('Локальный Facebook конфиг не найден (#facebook-local-config)');
            }
            try {
                const config = JSON.parse(localScript.textContent);
                console.log(`[FacebookWidget] 📄 Локальный конфиг загружен`);
                return config;
            } catch (err) {
                throw new Error('Ошибка JSON: ' + err.message);
            }
        }

        const configUrl = `${baseUrl}configs/${encodeURIComponent(clientId)}.json?v=${Date.now()}`;
        console.log(`[FacebookWidget] 🌐 Загружаем конфиг: ${configUrl}`);
        
        const response = await fetch(configUrl, { 
            cache: 'no-store',
            headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const config = await response.json();
        console.log(`[FacebookWidget] ✅ Серверный конфиг загружен`);
        return config;
    }

    function applyCustomStyles(uniqueClass, style) {
        const s = style || {};
        const colors = s.colors || {};
        const sizes = s.sizes || {};
        const borderRadius = s.borderRadius || {};
        const shadow = s.shadow || {};
        const fs = sizes.fontSize || 1;

        const styleElement = document.createElement('style');
        styleElement.id = `facebook-style-${uniqueClass}`;
        styleElement.textContent = `
            .${uniqueClass} {
                --bhw-font: ${s.fontFamily || "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"};
                --bhw-max-width: ${Math.round(1200 * fs)}px;
                --bhw-bg: ${colors.background || "#ffffff"};
                --bhw-widget-radius: ${borderRadius.widget || 24}px;
                --bhw-padding: ${sizes.padding || 32}px;
                --bhw-padding-mobile: ${Math.round((sizes.padding || 32) * 0.75)}px;
                --bhw-text-color: ${colors.text || "#1a1a1a"};
                --bhw-main-title-color: ${colors.title || "#1a202c"};
                --bhw-main-description-color: ${colors.description || "#4a5568"};
                --bhw-author-color: ${colors.author || "#111827"};
                --bhw-time-color: ${colors.time || "#6b7280"};
                --bhw-content-color: ${colors.content || "#374151"};
                --bhw-action-color: ${colors.action || "#6b7280"};
                --bhw-shadow: ${shadow.widget || "0 8px 32px rgba(0,0,0,0.08)"};
                --bhw-main-title-size: ${1.75 * fs}em;
                --bhw-title-size-mobile: ${1.4 * fs}em;
                --bhw-main-description-size: ${0.95 * fs}em;
                --bhw-header-margin: ${32 * fs}px;
                --bhw-gap: ${sizes.gap || 20}px;
                --bhw-card-width: ${sizes.cardWidth || 340}px;
                --bhw-card-min-height: ${sizes.cardMinHeight || 320}px;
                --bhw-card-bg: ${colors.cardBg || "#ffffff"};
                --bhw-card-border: 1px solid ${colors.cardBorder || "#e5e7eb"};
                --bhw-block-radius: ${borderRadius.blocks || 16}px;
                --bhw-block-padding: ${sizes.blockPadding || 20}px;
                --bhw-card-shadow: ${shadow.card || "0 4px 12px rgba(0,0,0,0.05)"};
                --bhw-card-hover-shadow: ${shadow.cardHover || "0 12px 24px rgba(24,119,242,0.15)"};
                --bhw-avatar-border: ${colors.avatarBorder || "#f3f4f6"};
                --bhw-actions-border: ${colors.actionsBorder || "#f3f4f6"};
                --bhw-logo-bg: ${colors.logoBg || "linear-gradient(135deg, #1877F2 0%, #42A5F5 100%)"};
                --bhw-loading-color: #6b7280;
            }
        `;
        document.head.appendChild(styleElement);
    }

    function createWidget(container, config) {
        // Режим 1: Нативные встроенные посты Facebook
        if (config.mode === 'native' && config.postUrls && config.postUrls.length > 0) {
            const embeds = config.postUrls.slice(0, config.maxPosts || 6).map(url => {
                return `<div class="fb-post" data-href="${escapeAttr(url)}" data-show-text="true" data-width="auto"></div>`;
            }).join('');

            container.innerHTML = `
                <div class="bhw-widget">
                    <div class="bhw-header">
                        <div class="bhw-logo-icon">📘</div>
                        <div class="bhw-branding-text">
                            <h2>${escapeHtml(config.widgetTitle || 'Facebook Feed')}</h2>
                            <p>${escapeHtml(config.widgetDescription || 'Latest updates from our Facebook page')}</p>
                        </div>
                    </div>
                    <div class="bhw-native-grid">
                        ${embeds}
                    </div>
                </div>
            `;

            // Загружаем Facebook SDK
            ensureFacebookSDK().then(() => {
                if (window.FB && window.FB.XFBML && window.FB.XFBML.parse) {
                    window.FB.XFBML.parse(container);
                }
            });
            return;
        }

        // Режим 2: Наши кастомные карточки
        const feeds = generateFacebookFeeds(config);
        const cards = feeds.slice(0, config.maxPosts || 6).map(feed => createCard(feed, config)).join('');

        container.innerHTML = `
            <div class="bhw-widget">
                <div class="bhw-header">
                    <div class="bhw-logo-icon">📘</div>
                    <div class="bhw-branding-text">
                        <h2>${escapeHtml(config.widgetTitle || "Facebook Feed")}</h2>
                        <p>${escapeHtml(config.widgetDescription || "Latest updates from our Facebook page")}</p>
                    </div>
                </div>
                <div class="bhw-grid">
                    ${cards}
                </div>
            </div>
        `;
    }

    // Загрузка Facebook SDK
    function ensureFacebookSDK() {
        return new Promise(resolve => {
            if (window.FB && window.FB.XFBML) {
                return resolve();
            }
            
            if (document.getElementById('facebook-jssdk')) {
                const checkInterval = setInterval(() => {
                    if (window.FB && window.FB.XFBML) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
                return;
            }
            
            window.fbAsyncInit = function() {
                FB.init({
                    xfbml: true,
                    version: 'v19.0'
                });
                resolve();
            };
            
            const js = document.createElement('script');
            js.id = 'facebook-jssdk';
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0';
            document.body.appendChild(js);
        });
    }

    function createCard(feed, config) {
        const cardClickableProps = feed.url ? `onclick="window.open('${escapeAttr(feed.url)}', '_blank')" style="cursor: pointer;"` : '';

        return `
            <div class="bhw-card" ${cardClickableProps}>
                <div class="bhw-card-content">
                    ${config.showAvatars !== false ? `
                        <div class="bhw-card-header">
                            <img class="bhw-avatar" src="${escapeAttr(feed.avatar)}" alt="${escapeAttr(feed.author)}" loading="lazy"/>
                            <div class="bhw-user-info">
                                <div class="bhw-author">${escapeHtml(feed.author)}</div>
                                ${config.showTimestamp !== false ? `<div class="bhw-time">${timeAgo(feed.timestamp)}</div>` : ''}
                            </div>
                            <div class="bhw-platform-badge">📘</div>
                        </div>
                    ` : ''}
                    <div class="bhw-content">${escapeHtml(feed.content)}</div>
                    ${config.showMedia !== false && feed.imageUrl ? `
                        <div class="bhw-media">
                            <img src="${escapeAttr(feed.imageUrl)}" alt="Facebook post" loading="lazy"/>
                        </div>
                    ` : ''}
                    <div class="bhw-actions">
                        ${feed.likes ? `<div class="bhw-action">👍 ${formatNumber(feed.likes)}</div>` : ''}
                        ${feed.comments ? `<div class="bhw-action">💬 ${formatNumber(feed.comments)}</div>` : ''}
                        ${feed.shares ? `<div class="bhw-action">🔄 ${formatNumber(feed.shares)}</div>` : ''}
                        ${feed.url ? `<div class="bhw-action">👁️ View Post</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function generateFacebookFeeds(config) {
        let feeds = [];
        
        if (config.customPosts && Array.isArray(config.customPosts) && config.customPosts.length > 0) {
            feeds = config.customPosts.map(post => ({
                id: post.id || `facebook_custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                platform: 'facebook',
                author: post.author,
                avatar: post.avatar,
                content: post.content,
                imageUrl: post.imageUrl,
                timestamp: post.timestamp,
                likes: post.likes,
                comments: post.comments,
                shares: post.shares,
                url: post.url
            }));
            
            const mockCount = Math.max(0, (config.maxPosts || 6) - feeds.length);
            for (let i = 0; i < mockCount; i++) {
                feeds.push(createMockFacebookFeed());
            }
        } else {
            const maxPosts = config.maxPosts || 6;
            for (let i = 0; i < maxPosts; i++) {
                feeds.push(createMockFacebookFeed());
            }
        }
        
        return feeds.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    function createMockFacebookFeed() {
        const now = Date.now();
        const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const timestamp = new Date(now - rand(10, 60 * 60 * 24 * 3) * 60 * 1000).toISOString();

        const facebookPosts = [
            {
                author: 'Business News',
                avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=face',
                content: 'Exciting company update! 🎉 We\'re expanding our services and opening new locations. Thank you for your continued support! #Business #Growth #Expansion',
                imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
                likes: rand(89, 567),
                comments: rand(23, 89),
                shares: rand(12, 45)
            },
            {
                author: 'Community Page',
                avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
                content: 'Join us this weekend for our community event! 🌟 Food, fun, and great company awaits. Bring your family and friends! #Community #Event #Weekend',
                imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop',
                likes: rand(234, 789),
                comments: rand(45, 123),
                shares: rand(23, 67)
            },
            {
                author: 'Tech Company',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                content: 'Innovation never stops! 💡 Our development team has been working on something amazing. Stay tuned for the big reveal next week! #Innovation #Technology #ComingSoon',
                imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
                likes: rand(156, 890),
                comments: rand(34, 156),
                shares: rand(45, 234)
            }
        ];

        const post = facebookPosts[rand(0, facebookPosts.length - 1)];
        
        return {
            id: `facebook_${rand(1, 9999)}`,
            platform: 'facebook',
            timestamp: timestamp,
            ...post
        };
    }

    function timeAgo(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        const weeks = Math.floor(days / 7);
        
        if (weeks > 35) return `${Math.floor(weeks * 7 / 7)}w`;
        if (days > 0) return `${days}d`;
        if (hours > 0) return `${hours}h`;
        if (minutes > 0) return `${minutes}m`;
        return 'now';
    }

    function formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text || '';
        return div.innerHTML;
    }

    function escapeAttr(text) {
        return String(text || '').replace(/"/g, '&quot;');
    }
})();
