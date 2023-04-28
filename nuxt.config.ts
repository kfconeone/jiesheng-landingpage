// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            script: [
                { src: "https://www.googletagmanager.com/gtag/js?id=AW-623112803" },
                {
                    children: `
                        console.log('Hello, world!');


                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'AW-623112803');

                        gtag('event', 'conversion', {'send_to': 'AW-623112803/sc6oCP7U65oYEOPkj6kC'});
            
            `,
                },
            ],
        },
    },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});
