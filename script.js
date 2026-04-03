document.addEventListener("DOMContentLoaded", () => {
    const ORDERS_KEY = "samchodam-orders";
    const ADMIN_SESSION_KEY = "samchodam-admin-session";
    const ADMIN_PASSWORD = "samchodam-admin";
    const SHIPPING_ENDPOINT = "https://formspree.io/f/mnjobelb";

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const orderForm = document.querySelector("#order-form");
    const formFeedback = document.querySelector("#form-feedback");
    const shippingForm = document.querySelector("#shipping-form");
    const shippingFeedback = document.querySelector("#shipping-feedback");
    const fadeTargets = document.querySelectorAll(".fade-up, .fade-in");
    const adminModal = document.querySelector("#admin-modal");
    const adminOpenButtons = document.querySelectorAll("[data-admin-open]");
    const adminCloseButtons = document.querySelectorAll("[data-admin-close]");
    const adminLoginView = document.querySelector("#admin-login-view");
    const adminDashboardView = document.querySelector("#admin-dashboard-view");
    const adminLoginForm = document.querySelector("#admin-login-form");
    const adminLoginError = document.querySelector("#admin-login-error");
    const adminStats = document.querySelector("#admin-stats");
    const adminOrders = document.querySelector("#admin-orders");
    const adminRefresh = document.querySelector("#admin-refresh");
    const adminLogout = document.querySelector("#admin-logout");

    const statusLabels = {
        pending: "접수 대기",
        confirmed: "상담 완료",
        shipped: "배송 진행",
        delivered: "배송 완료"
    };

    const syncHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    const closeMenu = () => {
        if (!menuToggle || !nav) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
        if (!menuToggle || !nav) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "true");
        nav.classList.add("is-open");
        document.body.classList.add("menu-open");
    };

    const getOrders = () => {
        try {
            return JSON.parse(window.localStorage.getItem(ORDERS_KEY) || "[]");
        } catch (error) {
            return [];
        }
    };

    const saveOrders = (orders) => {
        window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    };

    const formatDate = (value) => {
        return new Date(value).toLocaleString(document.documentElement.lang === "en" ? "en-US" : "ko-KR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const renderAdminStats = (orders) => {
        if (!adminStats) {
            return;
        }

        const pendingCount = orders.filter((order) => order.status === "pending").length;
        const confirmedCount = orders.filter((order) => order.status === "confirmed").length;
        const shippedCount = orders.filter((order) => order.status === "shipped").length;
        const deliveredCount = orders.filter((order) => order.status === "delivered").length;

        adminStats.innerHTML = [
            { label: "전체 주문", value: orders.length },
            { label: "접수 대기", value: pendingCount },
            { label: "상담 완료", value: confirmedCount },
            { label: "배송 진행", value: shippedCount },
            { label: "배송 완료", value: deliveredCount }
        ].map((item) => `
            <article class="admin-stat-card">
                <span>${item.label}</span>
                <strong>${item.value}</strong>
            </article>
        `).join("");
    };

    const renderOrders = () => {
        if (!adminOrders) {
            return;
        }

        const orders = getOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        renderAdminStats(orders);

        if (!orders.length) {
            adminOrders.innerHTML = `
                <div class="admin-empty">
                    <p>아직 저장된 주문이 없습니다.</p>
                    <span>주문 폼을 제출하면 이 브라우저의 관리자 모드에서 바로 확인할 수 있습니다.</span>
                </div>
            `;
            return;
        }

        adminOrders.innerHTML = orders.map((order) => `
            <article class="admin-order-card" data-order-id="${order.id}">
                <div class="admin-order-card__head">
                    <div>
                        <p class="admin-order-card__title">${order.name} <span>${order.contact}</span></p>
                        <p class="admin-order-card__meta">주문번호 ${order.id} · ${formatDate(order.createdAt)}</p>
                    </div>
                    <label class="status-select">
                        <span class="sr-only">주문 상태</span>
                        <select data-order-status>
                            <option value="pending" ${order.status === "pending" ? "selected" : ""}>${statusLabels.pending}</option>
                            <option value="confirmed" ${order.status === "confirmed" ? "selected" : ""}>${statusLabels.confirmed}</option>
                            <option value="shipped" ${order.status === "shipped" ? "selected" : ""}>${statusLabels.shipped}</option>
                            <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>${statusLabels.delivered}</option>
                        </select>
                    </label>
                </div>
                <dl class="admin-order-grid">
                    <div>
                        <dt>제품</dt>
                        <dd>${order.product}</dd>
                    </div>
                    <div>
                        <dt>수량</dt>
                        <dd>${order.quantity}박스</dd>
                    </div>
                    <div>
                        <dt>메모</dt>
                        <dd>${order.message ? order.message.replace(/</g, "&lt;") : "요청 사항 없음"}</dd>
                    </div>
                </dl>
            </article>
        `).join("");
    };

    const showAdminLogin = () => {
        if (!adminLoginView || !adminDashboardView || !adminLoginError) {
            return;
        }

        adminLoginView.classList.remove("hidden");
        adminDashboardView.classList.add("hidden");
        adminLoginError.textContent = "";
    };

    const showAdminDashboard = () => {
        if (!adminLoginView || !adminDashboardView) {
            return;
        }

        adminLoginView.classList.add("hidden");
        adminDashboardView.classList.remove("hidden");
        renderOrders();
    };

    const openAdminModal = () => {
        if (!adminModal) {
            return;
        }

        adminModal.classList.add("is-open");
        adminModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "active") {
            showAdminDashboard();
        } else {
            showAdminLogin();
        }
    };

    const closeAdminModal = () => {
        if (!adminModal) {
            return;
        }

        adminModal.classList.remove("is-open");
        adminModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader);

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.querySelectorAll("a, button").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 960) {
                    closeMenu();
                }
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 960) {
                closeMenu();
            }
        });
    }

    if (fadeTargets.length) {
        const observer = new IntersectionObserver((entries, revealObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.18
        });

        fadeTargets.forEach((target) => observer.observe(target));
    }

    if (orderForm && formFeedback) {
        orderForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(orderForm);
            const order = {
                id: `SC-${Date.now().toString().slice(-6)}`,
                name: String(formData.get("name") || "").trim(),
                contact: String(formData.get("contact") || "").trim(),
                product: String(formData.get("product") || "").trim(),
                quantity: Number(formData.get("quantity") || 1),
                message: String(formData.get("message") || "").trim(),
                status: "pending",
                createdAt: new Date().toISOString()
            };

            const orders = getOrders();
            orders.push(order);
            saveOrders(orders);
            orderForm.reset();
            orderForm.querySelector('input[name="quantity"]').value = 1;
            formFeedback.textContent = `${order.name}님의 주문이 접수되었습니다. 주문번호는 ${order.id} 입니다.`;
            renderOrders();
        });
    }

    if (shippingForm && shippingFeedback) {
        shippingForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            shippingFeedback.textContent = "배송 문의를 전송 중입니다.";

            try {
                const response = await fetch(SHIPPING_ENDPOINT, {
                    method: "POST",
                    body: new FormData(shippingForm),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("failed");
                }

                shippingForm.reset();
                shippingFeedback.textContent = "배송 문의가 접수되었습니다. 메일함에서 Formspree 수신 내역을 확인해 주세요.";
            } catch (error) {
                shippingFeedback.textContent = "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
            }
        });
    }

    adminOpenButtons.forEach((button) => {
        button.addEventListener("click", openAdminModal);
    });

    adminCloseButtons.forEach((button) => {
        button.addEventListener("click", closeAdminModal);
    });

    if (adminLoginForm && adminLoginError) {
        adminLoginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const password = new FormData(adminLoginForm).get("password");

            if (password !== ADMIN_PASSWORD) {
                adminLoginError.textContent = "비밀번호가 올바르지 않습니다.";
                return;
            }

            window.sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
            adminLoginForm.reset();
            showAdminDashboard();
        });
    }

    if (adminOrders) {
        adminOrders.addEventListener("change", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLSelectElement) || !target.matches("[data-order-status]")) {
                return;
            }

            const card = target.closest("[data-order-id]");
            if (!card) {
                return;
            }

            const orderId = card.getAttribute("data-order-id");
            const orders = getOrders();
            const nextOrders = orders.map((order) => {
                if (order.id !== orderId) {
                    return order;
                }

                return {
                    ...order,
                    status: target.value
                };
            });

            saveOrders(nextOrders);
            renderOrders();
        });
    }

    if (adminRefresh) {
        adminRefresh.addEventListener("click", renderOrders);
    }

    if (adminLogout) {
        adminLogout.addEventListener("click", () => {
            window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
            showAdminLogin();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAdminModal();
        }
    });
});
