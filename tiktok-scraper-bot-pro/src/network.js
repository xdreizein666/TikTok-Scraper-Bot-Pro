async function waitForUserDetail(page, {
    timeout = 20000,
    retries = 2
} = {}) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    page.removeListener("response", onResponse);
                    reject(new Error("timeout user-detail XHR"));
                }, timeout);

                const onResponse = async (res) => {
                    try {
                        const url = res.url();
                        if (!url.includes("user/detail")) return;

                        const json = await res.json();
                        if (!json?.userInfo?.user) return;

                        clearTimeout(timer);
                        page.removeListener("response", onResponse);
                        resolve(json);
                    } catch (_) { }
                };

                page.on("response", onResponse);
            });
        } catch (err) {
            if (attempt === retries) throw err;
            await page.waitForTimeout(2000);
        }
    }
}

module.exports = { waitForUserDetail };
