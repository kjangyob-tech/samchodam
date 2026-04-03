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
    const adminOrders = document.querySelector("#admin-orders");
    const adminRefresh = document.querySelector("#admin-refresh");
    const adminLogout = document.querySelector("#admin-logout");

    const statusLabels = {
        pending: "접수 대기",
        confirmed: "상담 완료",
        shipped: "배송 진행",
        delivered: "배송 완료"
    };

    const productDetails =     {
            "red-ginseng": {
                    "tag": "자연에서 자란 원료를 정직하게 담았습니다",
                    "title": "프리미엄 홍삼즙",
                    "image": "assets/images/red-ginseng.png",
                    "highlight": "비교불가의 대용량 110ml × 50포",
                    "desc1": "1포에 \"비교불가의 용량(약 110ml)\"을 담았습니다. 시중 용량(90ml)보다 약 20% 이상의 넉넉한 용량입니다.",
                    "desc2": "또한 시중의 홍삼달임액은 30포가 보통이지만, 과감하게 50포를 드립니다!",
                    "subtitle": "가족이 먹기 위해 시작된 건강한 이야기",
                    "story": "금산의 비옥한 토양에서 직접 땀 흘려 재배한 인삼으로 제조한 홍삼만을 엄선하여 정성껏 달였습니다. 첨가물 한 방울 없이 자연 그대로 응축시킨 깊은 풍미가 매일 한 잔, 몸을 생각하는 작은 습관으로 이어지길 바랍니다.",
                    "points": [
                            {
                                    "tag": "철학1",
                                    "content": "자연에서 자란 원료를 정직하게 담았습니다"
                            },
                            {
                                    "tag": "철학2",
                                    "content": "매일 한 잔, 몸을 생각하는 작은 습관"
                            },
                            {
                                    "tag": "철학3",
                                    "content": "가족이 먹기 위해 시작된 건강한 이야기"
                            },
                            {
                                    "tag": "철학4",
                                    "content": "바쁜 일상 속, 균형을 위한 따뜻한 선택"
                            }
                    ],
                    "instructions": [
                            {
                                    "title": "1. 기본 음용 방법",
                                    "text": [
                                            "1일 1~2회, 1포 섭취",
                                            "그대로 마시거나, 기호에 따라 물에 희석 가능",
                                            "파우치를 가볍게 흔든 후 섭취"
                                    ]
                            },
                            {
                                    "title": "2. 시간대별 추천 음용",
                                    "text": [
                                            "아침: 공복/식후 모두 가능. 하루 컨디션을 끌어올리는 효과",
                                            "오후: 점심 이후 나른할 때 1포, 업무 집중력 유지",
                                            "운동 전후: 운동 전 체력 보강, 운동 후 회복 보조"
                                    ]
                            },
                            {
                                    "title": "3. 음용 팁",
                                    "text": [
                                            "쓴맛이 강할 경우 꿀이나 따뜻한 물에 희석",
                                            "너무 뜨거운 물은 피하는 것이 좋습니다.",
                                            "카페인 음료와 동시 섭취는 줄이는 것이 좋습니다."
                                    ]
                            },
                            {
                                    "title": "4. 주의사항",
                                    "text": [
                                            "과다 섭취 시 두통·불면 가능성이 있으며, 늦은 밤 섭취는 피하는 것이 좋습니다.",
                                            "고혈압, 특정 질환, 약 복용 중일 경우 섭취에 주의 및 상담을 권장합니다."
                                    ]
                            }
                    ]
            },
            "marsh-orchid": {
                    "tag": "어머니의 지혜, 자연의 편안함",
                    "title": "자연 구절초즙",
                    "image": "assets/images/marsh-orchid.png",
                    "highlight": "비교불가의 대용량 115~120ml × 50포",
                    "desc1": "1포에 \"비교불가의 용량(약 115~120ml)\"을 담았습니다. 시중 용량(90ml)보다 약 20~25% 이상의 넉넉한 용량입니다.",
                    "desc2": "또한 시중의 액기스는 30포가 보통이지만, 과감하게 50포를 드립니다!",
                    "subtitle": "딸이 시집갈 때 꼭 챙겨간 이유",
                    "story": "음력 9월 9일이 되면 아홉 개의 마디가 생긴다 하여 구절초라 불립니다. 예로부터 딸이 시집갈 때 혼수 품목으로 꼭 챙겨 보내 상비약으로 달여 마시게 했던 약재이기도 합니다. 현대에도 구절초 베이비라는 말이 있을 정도로 여성에게 특효로 알려져 있습니다.",
                    "points": [
                            {
                                    "tag": "효능1",
                                    "content": "강장, 항균, 항염, 면역증진 효과"
                            },
                            {
                                    "tag": "효능2",
                                    "content": "소염, 진통, 스트레스 완화"
                            },
                            {
                                    "tag": "효능3",
                                    "content": "수족냉증 등 냉증 개선"
                            },
                            {
                                    "tag": "효능4",
                                    "content": "생리불순, 난임 등 여성 건강 관리"
                            },
                            {
                                    "tag": "효능5",
                                    "content": "심혈관 질환 예방 및 혈관 보호"
                            }
                    ],
                    "source": {
                            "url": "https://www.hidoc.co.kr/healthstory/news/C0000493617",
                            "text": "참고 자료 | 하이닥"
                    },
                    "instructions": [
                            {
                                    "title": "1. 기본 섭취량",
                                    "text": "1일 1~2회, 1회 1포 섭취를 권장하며 파우치를 잘 흔든 후 그대로 드시면 됩니다."
                            },
                            {
                                    "title": "2. 처음 드실 때",
                                    "text": "구절초액을 컵에 따르고 뜨거운 물을 섞어서 드세요. 하루 1포 섭취를 추천합니다."
                            },
                            {
                                    "title": "3. 섭취 팁",
                                    "text": "한두 달 정도 드신 후에 점점 양을 늘리셔도 되지만 하루 두 포를 넘기지 않는 것을 추천합니다."
                            },
                            {
                                    "title": "4. 주의사항",
                                    "text": "식전·식후 모두 무관하나, 위가 약하시거나 공복에 속이 불편하면 식후 섭취를 권장합니다. 카페인 음료와 동시 섭취는 피하시고, 특정 질환이나 임신 중인 경우 전문 상담 후 드세요."
                            }
                    ]
            }
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

    const syncModalLock = () => {
        const hasOpenModal = (productModal && productModal.classList.contains("is-open")) || (adminModal && adminModal.classList.contains("is-open"));
        document.body.classList.toggle("modal-open", hasOpenModal);
    };

    const renderProductModal = (productId) => {
        const data = productDetails[productId];
        if (!data || !productModalImage || !productModalTitle) {
            return;
        }

        productModalImage.src = data.image;
        productModalImage.alt = data.title;
        productModalTag.textContent = data.tag;
        productModalTitle.textContent = data.title;
        productModalHighlight.textContent = data.highlight;
        productModalDesc1.textContent = data.desc1;
        productModalDesc2.textContent = data.desc2;
        productModalSubtitle.textContent = data.subtitle;
        productModalStory.textContent = data.story;

        productModalPoints.innerHTML = "";
        data.points.forEach((point) => {
            const article = document.createElement("article");
            article.className = "product-modal__point";
            const strong = document.createElement("strong");
            strong.textContent = point.tag;
            const span = document.createElement("span");
            span.textContent = point.content;
            article.append(strong, span);
            productModalPoints.appendChild(article);
        });

        productModalInstructions.innerHTML = "";
        data.instructions.forEach((item) => {
            const article = document.createElement("article");
            article.className = "product-modal__instruction";
            const title = document.createElement("h3");
            title.textContent = item.title;
            const desc = document.createElement("p");
            desc.textContent = Array.isArray(item.text) ? item.text.map((line) => `• ${line}`).join("\n") : item.text;
            article.append(title, desc);
            productModalInstructions.appendChild(article);
        });

        if (data.source) {
            productModalSource.classList.remove("hidden");
            productModalSource.innerHTML = "";
            const link = document.createElement("a");
            link.href = data.source.url;
            link.target = "_blank";
            link.rel = "noreferrer";
            link.textContent = data.source.text;
            productModalSource.appendChild(link);
        } else {
            productModalSource.classList.add("hidden");
            productModalSource.innerHTML = "";
        }
    };

    const openProductModal = (productId) => {
        if (!productModal) {
            return;
        }
        renderProductModal(productId);
        productModal.classList.add("is-open");
        productModal.setAttribute("aria-hidden", "false");
        syncModalLock();
    };

    const closeProductModal = () => {
        if (!productModal) {
            return;
        }
        productModal.classList.remove("is-open");
        productModal.setAttribute("aria-hidden", "true");
        syncModalLock();
    };
    const openAdminModal = () => {
        if (!adminModal) {
            return;
        }

        adminModal.classList.add("is-open");
        adminModal.setAttribute("aria-hidden", "false");
        syncModalLock();

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
        syncModalLock();
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

    productOpenButtons.forEach((button) => {
        button.addEventListener("click", () => {
            openProductModal(button.getAttribute("data-product-open"));
        });
    });

    productCloseButtons.forEach((button) => {
        button.addEventListener("click", closeProductModal);
    });

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
            closeProductModal();
            closeAdminModal();
        }
    });
});
