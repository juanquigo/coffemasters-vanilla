const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((a) => {
            a.addEventListener("click", (event) => {
                event.preventDefault();
                console.log("Link clicked");
                // const url1 = a.href;
                // console.log(url1);
                const url2 = a.getAttribute("href");
                // console.log(url2);
                // const url3 = event.target.href;
                // console.log(url3);

                Router.go(url2);
            });
        });
        // Event Handler for URL changes
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false);
        });
        // Check the initial URL
        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        console.log(`Going to ${route}`)
        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                break;
            default:
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    const paramId = route.substring(route.lastIndexOf("-") + 1);
                    pageElement.dataset.productId = paramId;
                }
        }

        if (pageElement) {
            const cache = document.querySelector("main");
            // document.querySelector("main").children[0].remove();
            cache.innerHTML = "";
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        }
    },
};

export default Router;
