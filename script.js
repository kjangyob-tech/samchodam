document.addEventListener("DOMContentLoaded", () => {
    const ORDERS_KEY = "samchodam-orders";
    const USER_STORAGE_KEY = "samchodam_users";
    const CURRENT_USER_KEY = "samchodam_currentUser";
    const ADMIN_SESSION_KEY = "samchodam-admin-session";
    const ADMIN_PASSWORD = "samchodam-admin";

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const fadeTargets = document.querySelectorAll(".fade-up, .fade-in");

    const authModal = document.querySelector("#auth-modal");
    const authOpenButtons = document.querySelectorAll("[data-auth-open]");
    const authCloseButtons = document.querySelectorAll("[data-auth-close]");
    const authForm = document.querySelector("#auth-form");
    const authTitle = document.querySelector("#auth-title");
    const authDesc = document.querySelector("#auth-desc");
    const authNameGroup = document.querySelector("#auth-name-group");
    const authNameInput = document.querySelector("#auth-name");
    const authEmailInput = document.querySelector("#auth-email");
    const authPasswordInput = document.querySelector("#auth-password");
    const authSubmit = document.querySelector("#auth-submit");
    const authSwitch = document.querySelector("#auth-switch");
    const authError = document.querySelector("#auth-error");
    const authGuest = document.querySelector("#auth-guest");
    const authUser = document.querySelector("#auth-user");
    const authUserName = document.querySelector("#auth-user-name");
    const authLogoutButtons = document.querySelectorAll("[data-auth-logout]");
    const adminNavButtons = document.querySelectorAll("[data-admin-open]");

    const tabButtons = document.querySelectorAll("[data-contact-tab]");
    const tabPanels = document.querySelectorAll("[data-contact-panel]");
    const orderForm = document.querySelector("#order-form");
    const formFeedback = document.querySelector("#form-feedback");
    const lookupForm = document.querySelector("#lookup-form");
    const lookupPhone = document.querySelector("#lookup-phone");
    const lookupResults = document.querySelector("#lookup-results");

    const productModal = document.querySelector("#product-modal");
    const productOpenButtons = document.querySelectorAll("[data-product-open]");
    const productCloseButtons = document.querySelectorAll("[data-product-close]");
    const productModalImage = document.querySelector("#product-modal-image");
    const productModalTag = document.querySelector("#product-modal-tag");
    const productModalTitle = document.querySelector("#product-modal-title");
    const productModalHighlight = document.querySelector("#product-modal-highlight");
    const productModalDesc1 = document.querySelector("#product-modal-desc1");
    const productModalDesc2 = document.querySelector("#product-modal-desc2");
    const productModalSubtitle = document.querySelector("#product-modal-subtitle");
    const productModalStory = document.querySelector("#product-modal-story");
    const productModalPoints = document.querySelector("#product-modal-points");
    const productModalInstructions = document.querySelector("#product-modal-instructions");
    const productModalSource = document.querySelector("#product-modal-source");

    const adminModal = document.querySelector("#admin-modal");
    const adminOpenButtons = document.querySelectorAll("[data-admin-open]");
    const adminCloseButtons = document.querySelectorAll("[data-admin-close]");
    const adminLoginView = document.querySelector("#admin-login-view");
    const adminDashboardView = document.querySelector("#admin-dashboard-view");
    const adminLoginForm = document.querySelector("#admin-login-form");
    const adminLoginError = document.querySelector("#admin-login-error");
    const adminStats = document.querySelector("#admin-stats");
    const adminRefresh = document.querySelector("#admin-refresh");
    const adminLogout = document.querySelector("#admin-logout");
    const adminTabButtons = document.querySelectorAll("[data-admin-tab]");
    const adminPanels = document.querySelectorAll("[data-admin-panel]");
    const adminUsersTable = document.querySelector("#admin-users-table");
    const adminOrdersTable = document.querySelector("#admin-orders-table");

    const statusLabels = {
        pending: "배송 준비중",
        confirmed: "배송 준비중",
        preparing: "배송 준비중",
        shipped: "배송중",
        delivered: "배송완료",
        canceled: "주문 취소"
    };

    const productDetails = {
        "red-ginseng": {
            tag: "자연에서 자란 원료를 정직하게 담았습니다",
            title: "프리미엄 홍삼즙",
            image: "assets/images/red-ginseng.png",
            highlight: "금산 청정 토양에서 자란 프리미엄 최고급 인삼으로 정성껏 달였습니다.",
            desc1: "첨가물 없이 홍삼 고유의 진한 풍미를 그대로 담아낸 넉넉한 용량의 건강즙입니다.",
            desc2: "바쁜 일상 속 부모님과 가족에게 전하는 따뜻하고 믿음직한 선물이 되도록 준비했습니다.",
            subtitle: "가족이 먹기 위해 시작된 건강한 이야기",
            story: "금산의 비옥한 토양에서 직접 땀 흘려 재배한 인삼으로 제조한 홍삼만을 엄선하여 정성껏 달였습니다. 자연 그대로 응축시킨 깊은 풍미가 매일 한 잔, 몸을 생각하는 작은 습관으로 이어지길 바랍니다.",
            points: [
                { tag: "주원료", content: "금산 청정 토양에서 자란 프리미엄 최고급 인삼" },
                { tag: "용량", content: "1박스 50포 구성으로 가족과 함께 꾸준히 드시기 좋습니다." },
                { tag: "추천", content: "부모님 선물, 체력 관리, 매일의 루틴으로 권합니다." }
            ],
            instructions: [
                { title: "섭취 방법", text: ["하루 1~2포를 가볍게 흔들어 섭취해 주세요.", "기호에 따라 차갑게 또는 데워서 드실 수 있습니다."] },
                { title: "보관 안내", text: ["직사광선을 피해 서늘한 곳에 보관해 주세요.", "개봉 후에는 빠른 섭취를 권장드립니다."] }
            ]
        },
        "marsh-orchid": {
            tag: "어머니의 지혜, 자연의 편안함",
            title: "자연 구절초즙",
            image: "assets/images/marsh-orchid.png",
            highlight: "직접 재배한 구절초와 당귀, 대추를 듬뿍 넣고 달인 깊은 맛의 건강즙입니다.",
            desc1: "여성의 건강과 몸의 따뜻함을 돕는 전통적인 지혜를 부드럽고 쌉싸름한 자연의 맛으로 담았습니다.",
            desc2: "자극적이지 않은 편안한 풍미로 하루를 정리하는 시간에도 잘 어울립니다.",
            subtitle: "자연이 들려주는 편안한 하루의 리듬",
            story: "가을 산기슭을 수놓는 구절초를 중심으로 당귀와 대추를 함께 달여 부드러운 풍미와 은은한 향을 살렸습니다. 자연에서 온 재료를 정직하게 달여낸 한 포가 몸과 마음을 편안하게 채워주길 바랍니다.",
            points: [
                { tag: "주원료", content: "직접 재배한 구절초 + 당귀 + 대추를 듬뿍 넣고 달인 즙" },
                { tag: "풍미", content: "부드럽고 은은한 쌉싸름함이 특징입니다." },
                { tag: "추천", content: "몸을 따뜻하게 돌보고 싶은 분께 권합니다." }
            ],
            instructions: [
                { title: "섭취 방법", text: ["하루 1~2포를 따뜻하게 데워 드시면 더욱 부드럽습니다.", "식후 또는 오후 휴식 시간에 섭취하시면 좋습니다."] },
                { title: "보관 안내", text: ["직사광선을 피해 서늘한 곳에 보관해 주세요.", "파우치 손상 시 섭취하지 마시고 교환 문의를 남겨주세요."] }
            ]
        }
    };

    let authMode = "login";
    let adminTab = "users";

    const safeParse = (value, fallback) => {
        try {
            return JSON.parse(value || "");
        } catch (error) {
            return fallback;
        }
    };

    const escapeHtml = (value) => String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const formatDate = (value) => {
        if (!value) return "-";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "-";
        return new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        }).format(date);
    };

    const getUsers = () => safeParse(window.localStorage.getItem(USER_STORAGE_KEY), []);
    const saveUsers = (users) => window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
    const getOrders = () => safeParse(window.localStorage.getItem(ORDERS_KEY), []);
    const saveOrders = (orders) => window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    const getCurrentUser = () => safeParse(window.localStorage.getItem(CURRENT_USER_KEY), null);
    const setCurrentUser = (user) => window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    const clearCurrentUser = () => window.localStorage.removeItem(CURRENT_USER_KEY);

    const ensureAdminSeed = () => {
        const users = getUsers();
        const hasAdmin = users.some((user) => user.role === "admin");
        if (hasAdmin) return;

        users.push({
            name: "운영자",
            email: "admin",
            password: ADMIN_PASSWORD,
            role: "admin",
            date: new Date().toISOString()
        });
        saveUsers(users);
    };

    const refreshCurrentUser = () => {
        const currentUser = getCurrentUser();
        if (!currentUser) return null;

        const latest = getUsers().find((user) => user.email === currentUser.email);
        if (!latest) {
            clearCurrentUser();
            return null;
        }

        setCurrentUser(latest);
        return latest;
    };

    const isAdminAuthenticated = () => {
        const currentUser = refreshCurrentUser();
        return Boolean((currentUser && currentUser.role === "admin") || window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "active");
    };

    const registerUser = ({ name, email, password }) => {
        const users = getUsers();
        const normalizedEmail = String(email || "").trim();
        if (users.find((user) => user.email === normalizedEmail)) {
            return { error: "이미 가입된 이메일입니다." };
        }

        const newUser = {
            name: String(name || "").trim(),
            email: normalizedEmail,
            password: String(password || "").trim(),
            role: "user",
            date: new Date().toISOString()
        };
        users.push(newUser);
        saveUsers(users);
        return { success: true, user: newUser };
    };

    const loginUser = ({ email, password }) => {
        const users = getUsers();
        const user = users.find((item) => item.email === String(email || "").trim() && item.password === String(password || "").trim());
        if (!user) {
            return { error: "이메일 또는 비밀번호가 일치하지 않습니다." };
        }

        setCurrentUser(user);
        return { success: true, user };
    };

    const closeMenu = () => {
        if (!menuToggle || !nav) return;
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
    };

    const openMenu = () => {
        if (!menuToggle || !nav) return;
        menuToggle.setAttribute("aria-expanded", "true");
        nav.classList.add("is-open");
    };

    const syncHeader = () => {
        if (!header) return;
        header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    const syncModalLock = () => {
        const hasOpenModal = [authModal, productModal, adminModal].some((modal) => modal && modal.classList.contains("is-open"));
        document.body.classList.toggle("modal-open", hasOpenModal);
    };

    const setAuthMode = (mode) => {
        authMode = mode === "signup" ? "signup" : "login";
        if (!authTitle || !authDesc || !authNameGroup || !authSubmit || !authSwitch || !authNameInput || !authError) return;

        const isSignup = authMode === "signup";
        authTitle.textContent = isSignup ? "회원가입" : "로그인";
        authDesc.textContent = isSignup ? "정직한 자연의 가치를 함께 할 가족이 되어주세요." : "삼초담의 회원이 되어주세요.";
        authSubmit.textContent = isSignup ? "가입 완료하기" : "로그인하기";
        authSwitch.textContent = isSignup ? "로그인" : "회원가입";
        authNameGroup.classList.toggle("hidden", !isSignup);
        authNameInput.required = isSignup;
        authError.textContent = "";
    };

    const openAuthModal = (mode = "login") => {
        if (!authModal || !authForm) return;
        setAuthMode(mode);
        authForm.reset();
        authModal.classList.add("is-open");
        authModal.setAttribute("aria-hidden", "false");
        syncModalLock();
        window.setTimeout(() => {
            (authMode === "signup" ? authNameInput : authEmailInput)?.focus();
        }, 30);
    };

    const closeAuthModal = () => {
        if (!authModal) return;
        authModal.classList.remove("is-open");
        authModal.setAttribute("aria-hidden", "true");
        syncModalLock();
    };

    const syncAuthUI = () => {
        const currentUser = refreshCurrentUser();
        const isLoggedIn = Boolean(currentUser);
        const isAdminUser = Boolean(currentUser && currentUser.role === "admin");

        authGuest?.classList.toggle("hidden", isLoggedIn);
        authUser?.classList.toggle("hidden", !isLoggedIn);
        adminNavButtons.forEach((button) => {
            button.classList.toggle("hidden", !isAdminUser);
        });
        if (authUserName) {
            authUserName.textContent = currentUser ? `${currentUser.name}님` : "회원님";
        }

        const applicantName = orderForm?.querySelector('input[name="applicant_name"]');
        const applicantPhone = orderForm?.querySelector('input[name="applicant_phone"]');
        if (currentUser && applicantName && !applicantName.value.trim()) {
            applicantName.value = currentUser.name || "";
        }
        if (currentUser && applicantPhone && currentUser.phone && !applicantPhone.value.trim()) {
            applicantPhone.value = currentUser.phone;
        }
    };

    const normalizeOrder = (order) => ({
        id: order.id,
        product: order.product,
        quantity: Number(order.quantity || 1),
        applicantName: order.applicantName,
        applicantPhone: order.applicantPhone,
        recipientName: order.recipientName || order.applicantName,
        recipientPhone: order.recipientPhone,
        address: order.address,
        message: order.message || "",
        createdAt: order.createdAt || new Date().toISOString(),
        status: order.status || "preparing",
        trackingNumber: order.trackingNumber || "",
        memberEmail: order.memberEmail || ""
    });

    const getOrdersByPhone = (phone) => {
        const normalized = String(phone || "").replace(/\D/g, "");
        if (!normalized) return [];
        return getOrders()
            .filter((order) => String(order.applicantPhone || order.recipientPhone || "").replace(/\D/g, "") === normalized || String(order.recipientPhone || "").replace(/\D/g, "") === normalized)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    };

    const getLookupStatusClass = (status) => {
        switch (statusLabels[status] || status) {
        case "배송 준비중":
            return "lookup-status lookup-status--preparing";
        case "배송중":
            return "lookup-status lookup-status--shipped";
        case "배송완료":
            return "lookup-status lookup-status--delivered";
        case "주문 취소":
            return "lookup-status lookup-status--canceled";
        default:
            return "lookup-status";
        }
    };

    const renderLookupResults = (orders) => {
        if (!lookupResults) return;

        if (!orders.length) {
            lookupResults.innerHTML = `
                <div class="lookup-empty">
                    <div class="lookup-empty__icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <p>조회된 신청 내역이 없습니다</p>
                    <span>연락처를 다시 확인해주시거나 새롭게 구입 신청을 진행해주세요.</span>
                </div>
            `;
            return;
        }

        lookupResults.innerHTML = orders.map((order) => `
            <article class="lookup-card">
                <div class="lookup-card__main">
                    <div class="lookup-card__meta">
                        <span>${escapeHtml(order.id)}</span>
                        <i></i>
                        <strong>${escapeHtml(formatDate(order.createdAt))} 신청</strong>
                    </div>
                    <h3>${escapeHtml(order.product)} <strong>${escapeHtml(String(order.quantity))}박스</strong></h3>
                    <div class="lookup-card__info">
                        <p><span>수령인 (연락처)</span><strong>${escapeHtml(order.recipientName || order.applicantName)} <em>(${escapeHtml(order.recipientPhone)})</em></strong></p>
                        <p class="lookup-card__info--wide"><span>배송지 도착 주소</span><strong>${escapeHtml(order.address)}</strong></p>
                    </div>
                </div>
                <div class="lookup-card__status-area">
                    <p>현재 배송 상태</p>
                    <span class="${getLookupStatusClass(order.status)}">${escapeHtml(statusLabels[order.status] || order.status)}</span>
                    ${order.status === "shipped" && order.trackingNumber ? `<div class="lookup-card__tracking"><span>운송장 번호</span><strong>${escapeHtml(order.trackingNumber)}</strong></div>` : order.status === "delivered" && order.trackingNumber ? `<div class="lookup-card__tracking"><span>배송완료 운송장</span><strong>${escapeHtml(order.trackingNumber)}</strong></div>` : `<small>출고 작업이 완료되고 택배사로 인계되면<br>운송장 번호가 표시됩니다.</small>`}
                </div>
            </article>
        `).join("");
    };

    const setActiveContactTab = (tabName) => {
        tabButtons.forEach((button) => {
            const active = button.getAttribute("data-contact-tab") === tabName;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
        });

        tabPanels.forEach((panel) => {
            const active = panel.getAttribute("data-contact-panel") === tabName;
            panel.classList.toggle("is-active", active);
            panel.hidden = !active;
        });
    };

    const syncContactTabWithHash = () => {
        if (window.location.hash === "#payment-info") {
            setActiveContactTab("deposit");
        } else if (window.location.hash === "#contact-panel-lookup") {
            setActiveContactTab("lookup");
        } else if (window.location.hash === "#contact-panel-info") {
            setActiveContactTab("info");
        } else {
            setActiveContactTab("order");
        }
    };

    const renderProductModal = (productId) => {
        const data = productDetails[productId];
        if (!data) return;

        productModalImage.src = data.image;
        productModalImage.alt = data.title;
        productModalTag.textContent = data.tag;
        productModalTitle.textContent = data.title;
        productModalHighlight.textContent = data.highlight;
        productModalDesc1.textContent = data.desc1;
        productModalDesc2.textContent = data.desc2;
        productModalSubtitle.textContent = data.subtitle;
        productModalStory.textContent = data.story;

        productModalPoints.innerHTML = data.points.map((point) => `
            <article class="product-modal__point">
                <strong>${escapeHtml(point.tag)}</strong>
                <span>${escapeHtml(point.content)}</span>
            </article>
        `).join("");

        productModalInstructions.innerHTML = data.instructions.map((item) => `
            <article class="product-modal__instruction">
                <h3>${escapeHtml(item.title)}</h3>
                <p>${item.text.map((line) => `• ${escapeHtml(line)}`).join("<br>")}</p>
            </article>
        `).join("");

        productModalSource.classList.add("hidden");
        productModalSource.innerHTML = "";
    };

    const openProductModal = (productId) => {
        if (!productModal) return;
        renderProductModal(productId);
        productModal.classList.add("is-open");
        productModal.setAttribute("aria-hidden", "false");
        syncModalLock();
    };

    const closeProductModal = () => {
        if (!productModal) return;
        productModal.classList.remove("is-open");
        productModal.setAttribute("aria-hidden", "true");
        syncModalLock();
    };

    const renderAdminStats = () => {
        if (!adminStats) return;
        const users = getUsers();
        const orders = getOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const preparing = orders.filter((order) => ["pending", "confirmed", "preparing"].includes(order.status)).length;
        const shipped = orders.filter((order) => order.status === "shipped").length;
        const delivered = orders.filter((order) => order.status === "delivered").length;

        adminStats.innerHTML = [
            { label: "전체 회원", value: users.length },
            { label: "전체 주문", value: orders.length },
            { label: "배송 준비중", value: preparing },
            { label: "배송중 / 완료", value: `${shipped} / ${delivered}` }
        ].map((item) => `
            <article class="admin-stat-card">
                <span>${escapeHtml(item.label)}</span>
                <strong>${escapeHtml(String(item.value))}</strong>
            </article>
        `).join("");
    };

    const setAdminTab = (tabName) => {
        adminTab = tabName === "orders" ? "orders" : "users";
        adminTabButtons.forEach((button) => {
            const active = button.getAttribute("data-admin-tab") === adminTab;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
        });
        adminPanels.forEach((panel) => {
            const active = panel.getAttribute("data-admin-panel") === adminTab;
            panel.classList.toggle("is-active", active);
            panel.hidden = !active;
        });
    };

    const renderUsersTable = () => {
        if (!adminUsersTable) return;

        const users = getUsers().sort((a, b) => new Date(b.date) - new Date(a.date));
        const currentUser = refreshCurrentUser();
        if (!users.length) {
            adminUsersTable.innerHTML = '<tr><td colspan="5" class="admin-table__empty">아직 가입된 회원이 없습니다.</td></tr>';
            return;
        }

        adminUsersTable.innerHTML = users.map((user) => {
            const isCurrent = currentUser && currentUser.email === user.email;
            return `
                <tr>
                    <td>${escapeHtml(formatDate(user.date))}</td>
                    <td class="admin-table__name">${escapeHtml(user.name)}</td>
                    <td>${escapeHtml(user.email)}</td>
                    <td><span class="admin-badge admin-badge--${escapeHtml(user.role)}">${user.role === "admin" ? "관리자" : "일반회원"}</span></td>
                    <td>
                        ${isCurrent ? '<span class="admin-inline-note">현재 로그인</span>' : `<button class="admin-action-button" type="button" data-role-toggle="${escapeHtml(user.email)}">${user.role === "admin" ? "관리자 해임" : "관리자 임명"}</button>`}
                    </td>
                </tr>
            `;
        }).join("");
    };

    const renderOrdersTable = () => {
        if (!adminOrdersTable) return;

        const orders = getOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (!orders.length) {
            adminOrdersTable.innerHTML = '<tr><td colspan="6" class="admin-table__empty">아직 저장된 주문이 없습니다.</td></tr>';
            return;
        }

        adminOrdersTable.innerHTML = orders.map((order) => `
            <tr data-order-id="${escapeHtml(order.id)}">
                <td>
                    <strong class="admin-order-id">${escapeHtml(order.id)}</strong>
                    <span class="admin-order-date">${escapeHtml(formatDate(order.createdAt))}</span>
                </td>
                <td>
                    <div class="admin-order-stack">
                        <strong>${escapeHtml(order.memberEmail || "비회원 주문")}</strong>
                        <span>${escapeHtml(order.applicantName)} / ${escapeHtml(order.applicantPhone)}</span>
                    </div>
                </td>
                <td>
                    <div class="admin-order-stack">
                        <strong>${escapeHtml(order.product)}</strong>
                        <span>${escapeHtml(String(order.quantity))}박스</span>
                    </div>
                </td>
                <td>
                    <div class="admin-order-stack">
                        <strong>${escapeHtml(order.recipientName || order.applicantName)} / ${escapeHtml(order.recipientPhone)}</strong>
                        <span>${escapeHtml(order.address)}</span>
                    </div>
                </td>
                <td>
                    <select class="admin-status-select" data-order-status>
                        <option value="preparing" ${["pending", "confirmed", "preparing"].includes(order.status) ? "selected" : ""}>배송 준비중</option>
                        <option value="shipped" ${order.status === "shipped" ? "selected" : ""}>배송중</option>
                        <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>배송완료</option>
                        <option value="canceled" ${order.status === "canceled" ? "selected" : ""}>주문 취소</option>
                    </select>
                </td>
                <td>
                    <div class="admin-order-controls">
                        <input class="admin-track-input" type="text" value="${escapeHtml(order.trackingNumber)}" placeholder="운송장 번호" data-order-tracking>
                        <button class="admin-action-button admin-action-button--solid" type="button" data-order-save>저장</button>
                    </div>
                </td>
            </tr>
        `).join("");
    };

    const renderAdminDashboard = () => {
        renderAdminStats();
        renderUsersTable();
        renderOrdersTable();
        setAdminTab(adminTab);
    };

    const showAdminLogin = () => {
        adminLoginError.textContent = "";
        adminLoginView.classList.remove("hidden");
        adminDashboardView.classList.add("hidden");
    };

    const showAdminDashboard = () => {
        adminLoginView.classList.add("hidden");
        adminDashboardView.classList.remove("hidden");
        renderAdminDashboard();
    };

    const openAdminModal = () => {
        if (!adminModal) return;
        adminModal.classList.add("is-open");
        adminModal.setAttribute("aria-hidden", "false");
        if (isAdminAuthenticated()) {
            showAdminDashboard();
        } else {
            showAdminLogin();
        }
        syncModalLock();
    };

    const closeAdminModal = () => {
        if (!adminModal) return;
        adminModal.classList.remove("is-open");
        adminModal.setAttribute("aria-hidden", "true");
        syncModalLock();
    };

    const updateOrderFromRow = (row) => {
        const orderId = row.getAttribute("data-order-id");
        const statusInput = row.querySelector("[data-order-status]");
        const trackingInput = row.querySelector("[data-order-tracking]");
        const orders = getOrders().map((order) => order.id === orderId ? {
            ...order,
            status: statusInput.value,
            trackingNumber: trackingInput.value.trim()
        } : order);
        saveOrders(orders);
        renderAdminDashboard();
        if (lookupPhone && lookupPhone.value.trim()) {
            renderLookupResults(getOrdersByPhone(lookupPhone.value));
        }
    };

    ensureAdminSeed();
    syncHeader();
    syncAuthUI();
    renderLookupResults([]);
    window.addEventListener("scroll", syncHeader);

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            if (expanded) closeMenu();
            else openMenu();
        });

        nav.querySelectorAll("a, button").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 960) closeMenu();
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 960) closeMenu();
        });
    }

    if (fadeTargets.length) {
        const observer = new IntersectionObserver((entries, revealObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.18 });
        fadeTargets.forEach((target) => observer.observe(target));
    }

    tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setActiveContactTab(button.getAttribute("data-contact-tab"));
        });
    });

    document.querySelectorAll('a[href="#payment-info"]').forEach((link) => {
        link.addEventListener("click", () => setActiveContactTab("deposit"));
    });
    document.querySelectorAll('a[href="#contact-panel-order"]').forEach((link) => {
        link.addEventListener("click", () => setActiveContactTab("order"));
    });
    document.querySelectorAll('a[href="#contact-panel-lookup"]').forEach((link) => {
        link.addEventListener("click", () => setActiveContactTab("lookup"));
    });
    document.querySelectorAll('a[href="#contact-panel-info"]').forEach((link) => {
        link.addEventListener("click", () => setActiveContactTab("info"));
    });

    window.addEventListener("hashchange", syncContactTabWithHash);
    syncContactTabWithHash();

    if (orderForm && formFeedback) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const data = new FormData(orderForm);
            const currentUser = refreshCurrentUser();
            const applicantPhone = String(data.get("applicant_phone") || "").trim();
            const order = normalizeOrder({
                id: `ORD-${Date.now().toString().slice(-6)}`,
                product: String(data.get("product") || "").trim(),
                quantity: Number(data.get("quantity") || 1),
                applicantName: String(data.get("applicant_name") || "").trim(),
                applicantPhone,
                recipientName: String(data.get("recipient_name") || "").trim() || String(data.get("applicant_name") || "").trim(),
                recipientPhone: String(data.get("recipient_phone") || "").trim(),
                address: String(data.get("address") || "").trim(),
                createdAt: new Date().toISOString(),
                status: "preparing",
                message: "",
                memberEmail: currentUser ? currentUser.email : ""
            });
            const orders = getOrders();
            orders.push(order);
            saveOrders(orders);
            formFeedback.textContent = `신청이 완료되었습니다. 주문번호는 ${order.id} 입니다.`;
            orderForm.reset();
            syncAuthUI();
            if (lookupPhone) lookupPhone.value = applicantPhone;
            renderLookupResults(getOrdersByPhone(applicantPhone));
            setActiveContactTab("lookup");
            renderAdminDashboard();
        });
    }

    if (lookupForm && lookupPhone) {
        lookupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            renderLookupResults(getOrdersByPhone(lookupPhone.value));
        });
    }

    productOpenButtons.forEach((button) => {
        button.addEventListener("click", () => openProductModal(button.getAttribute("data-product-open")));
    });
    productCloseButtons.forEach((button) => button.addEventListener("click", closeProductModal));

    authOpenButtons.forEach((button) => {
        button.addEventListener("click", () => openAuthModal(button.getAttribute("data-auth-open")));
    });
    authCloseButtons.forEach((button) => button.addEventListener("click", closeAuthModal));

    authSwitch?.addEventListener("click", () => {
        setAuthMode(authMode === "login" ? "signup" : "login");
    });

    authForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        authError.textContent = "";
        const payload = {
            name: authNameInput.value,
            email: authEmailInput.value,
            password: authPasswordInput.value
        };

        if (authMode === "signup") {
            const result = registerUser(payload);
            if (result.error) {
                authError.textContent = result.error;
                return;
            }
            setAuthMode("login");
            authForm.reset();
            authEmailInput.value = payload.email;
            authError.textContent = "회원가입이 완료되었습니다. 로그인해 주세요.";
            return;
        }

        const result = loginUser(payload);
        if (result.error) {
            authError.textContent = result.error;
            return;
        }

        syncAuthUI();
        closeAuthModal();
        if (result.user.role === "admin") {
            window.sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
        }
    });

    authLogoutButtons.forEach((button) => {
        button.addEventListener("click", () => {
            clearCurrentUser();
            window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
            syncAuthUI();
            closeAdminModal();
        });
    });

    adminOpenButtons.forEach((button) => button.addEventListener("click", openAdminModal));
    adminCloseButtons.forEach((button) => button.addEventListener("click", closeAdminModal));

    adminLoginForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        const password = new FormData(adminLoginForm).get("password");
        if (String(password || "") !== ADMIN_PASSWORD) {
            adminLoginError.textContent = "비밀번호가 올바르지 않습니다.";
            return;
        }
        window.sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
        adminLoginForm.reset();
        showAdminDashboard();
    });

    adminRefresh?.addEventListener("click", renderAdminDashboard);

    adminLogout?.addEventListener("click", () => {
        window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
        const currentUser = refreshCurrentUser();
        if (currentUser && currentUser.role === "admin") {
            clearCurrentUser();
            syncAuthUI();
        }
        showAdminLogin();
    });

    adminTabButtons.forEach((button) => {
        button.addEventListener("click", () => setAdminTab(button.getAttribute("data-admin-tab")));
    });

    adminUsersTable?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.matches("[data-role-toggle]")) return;
        const email = target.getAttribute("data-role-toggle");
        const users = getUsers();
        const nextUsers = users.map((user) => user.email === email ? { ...user, role: user.role === "admin" ? "user" : "admin" } : user);
        saveUsers(nextUsers);
        syncAuthUI();
        renderAdminDashboard();
    });

    adminOrdersTable?.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.matches("[data-order-save]")) return;
        const row = target.closest("tr[data-order-id]");
        if (!row) return;
        updateOrderFromRow(row);
    });

    adminOrdersTable?.addEventListener("change", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement) || !target.matches("[data-order-status]")) return;
        const row = target.closest("tr[data-order-id]");
        if (!row) return;
        updateOrderFromRow(row);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeAuthModal();
        closeProductModal();
        closeAdminModal();
    });
});
