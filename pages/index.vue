<script setup lang="ts">
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
// const tags = await useAsyncData<any>("tags", () => $fetch("/api/tags"));
// const tagStrings = tags.data.value.map((tag: any) => tag.name).join(", ");

// console.log(tagStrings);
var isMenuOpen = ref(false);
var isContactOpen = ref(false);
var heroRef = ref();

const contactUsForm = ref({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
});
onMounted(() => {
    AOS.init();
    AOS.refresh();

    gsap.to(heroRef.value, {
        objectPosition: "0% 0%",
        duration: 120,
        repeat: -1, // set repeat to -1 to loop indefinitely
        yoyo: true,
        ease: "none",
    });
});

function onContactUsClicked() {
    // post contact api
    // send email
    sendEmail();
}

async function sendEmail() {
    if (contactUsForm.value.name == "" || contactUsForm.value.email == "" || contactUsForm.value.message == "") {
        Swal.fire({
            icon: "error",
            title: "錯誤",
            text: "請填寫必填欄位",
        });
        return;
    }
    let res = await useFetch("/api/contact", {
        method: "POST",
        body: contactUsForm.value,
    });

    // console.log(res.data.value);
    // console.log(res.error.value);

    Swal.fire({
        icon: "success",
        title: "成功",
        text: "我們已收到您的訊息，將盡快與您聯繫",
    });

    contactUsForm.value = {
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
    };
}
</script>

<template>
    <Head>
        <Title>捷勝設計 - 專業的水電設計團隊</Title>
        <Meta name="description" content="捷勝設計，專業的水電設計團隊" />
        <Meta name="og:title" content="捷勝設計，專業的水電設計團隊" />
        <Meta name="og:description" content="捷勝設計，專業的水電設計團隊" />
        <Meta name="keywords" content="捷勝設計,MEP,水電設計,機電設計,五大管線,建築師,營造,自地自建,電氣,弱電,消防,電信" />
    </Head>
    <div>
        <!-- Hero Section -->
        <div class="bg-white">
            <header class="absolute inset-x-0 top-0 z-50">
                <div class="mx-auto max-w-7xl">
                    <div class="px-6 pt-6 lg:max-w-2xl lg:pl-8 lg:pr-0">
                        <nav class="flex items-center justify-between lg:justify-start" aria-label="Global">
                            <a href="#" class="-m-1.5 p-1.5">
                                <span class="sr-only">Your Company</span>
                                <!-- <img alt="Your Company" class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600" /> -->
                            </a>
                            <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden fixed right-6 top-6" @click="isMenuOpen = !isMenuOpen">
                                <span class="sr-only">Open main menu</span>
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <div class="hidden lg:ml-12 lg:flex lg:gap-x-14">
                                <a href="#service-section" class="text-sm font-semibold leading-6 text-gray-900">服務介紹</a>
                                <a href="#feature-section" class="text-sm font-semibold leading-6 text-gray-900">特色</a>

                                <a href="#team-section" class="text-sm font-semibold leading-6 text-gray-900">團隊介紹</a>
                                <a href="#contact-section" class="text-sm font-semibold leading-6 text-gray-900">聯絡資訊</a>
                                <a href="https://blog.jiesdesign.com/" class="text-sm font-semibold leading-6 text-gray-900">Blog</a>
                            </div>
                        </nav>
                        <!-- Mobile menu, show/hide based on menu open state. -->
                        <div role="dialog" aria-modal="true" v-show="isMenuOpen">
                            <!-- Background backdrop, show/hide based on slide-over state. -->
                            <div class="fixed inset-0 z-50"></div>
                            <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div class="flex items-center justify-between">
                                    <a href="#" class="-m-1.5 p-1.5">
                                        <span class="sr-only">Your Company</span>
                                        <img class="h-8 w-auto" src="@/assets/logo.png" alt="" />
                                    </a>
                                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="isMenuOpen = !isMenuOpen">
                                        <span class="sr-only">Close menu</span>
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="mt-6 flow-root">
                                    <div class="-my-6 divide-y divide-gray-500/10">
                                        <div class="space-y-2 py-6">
                                            <a href="#service-section" @click="isMenuOpen = false" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">服務介紹</a>

                                            <a href="#feature-section" @click="isMenuOpen = false" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">特色</a>

                                            <a href="#team-section" @click="isMenuOpen = false" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">關於我們</a>

                                            <a href="#contact-section" @click="isMenuOpen = false" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">聯絡資訊</a>
                                            <a href="https://blog.jiesdesign.com/" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Blog</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile menu, show/hide based on menu open state. -->
            </header>

            <div class="relative">
                <div class="mx-auto max-w-7xl">
                    <div class="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
                        <svg class="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="0,0 90,0 50,100 0,100" />
                        </svg>

                        <div class="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
                            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl" data-aos="fade-up" data-aos-duration="1000">
                                <div class="hidden sm:mb-10 sm:flex">
                                    <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                                        想深入了解水電設計嗎? <a href="https://blog.jiesdesign.com/" class="whitespace-nowrap font-semibold text-blue-500"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                                    </div>
                                </div>
                                <!-- <h1 class="text-4xl font-bold tracking-tight text-blue-800 sm:text-6xl">捷勝設計</h1> -->
                                <div>
                                    <img src="@/assets/logo.png" alt="logo" class="" />
                                </div>
                                <p class="mt-6 text-lg leading-8 text-gray-600">由專業團隊為建築師們和營造廠商提供電氣、弱電、給排水設計</p>
                                <div class="mt-10 flex items-center gap-x-6">
                                    <a href="#contact-section" class="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">聯繫我們</a>
                                    <a href="#service-section" class="text-sm font-semibold leading-6 text-gray-900">了解服務 <span aria-hidden="true">→</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img ref="heroRef" class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full" src="@/assets/hero.jpg" alt="" />
                </div>
            </div>
        </div>
        <!-- About us Section -->
        <!-- Service Section -->
        <div class="bg-white py-24 sm:py-32" id="service-section">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:text-center">
                    <h2 class="text-base font-semibold leading-7 text-amber-600" data-aos="fade-up">專業、快速、透明</h2>
                    <p class="mt-2 text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up">找不到水電設計技師嗎?</p>
                    <p class="mt-6 text-lg leading-8 text-gray-600" data-aos="fade-up">您找到了！無論何種水電設計需求，我們都能提供最佳解決方案！</p>
                </div>
                <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="50">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                </div>
                                電氣設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">包含建築物的電力、照明系統等。設計師依據建築的用途、大小和安全法規等因素，計算並設計出符合需求的電氣系統，同時也考慮節能和環保等因素。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="100">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                    </svg>
                                </div>
                                弱電設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">包含通訊、監控、門禁保全、多媒體系統等。根據建築物的用途和法規設計和配置，並選擇合適的設備。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="150">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 115.44 122.88" class="w-6 h-6 text-white" fill="#ffffff" xml:space="preserve">
                                        <g>
                                            <path
                                                d="M15.78,85.7c2.67,12.4,10.69,18.59,10.69,24.79c0,6.2-2.67,12.4-10.69,12.4c-8.02,0-10.69-6.2-10.69-12.4 C5.09,104.29,13.11,98.09,15.78,85.7L15.78,85.7z M98.41,39.73H76.4l5.49,20.46h16.48l0.05,0V39.73L98.41,39.73z M75.57,36.65 h22.84V32.1c0-0.75,0.31-1.44,0.8-1.93c0.04-0.04,0.08-0.08,0.13-0.11c0.48-0.43,1.12-0.69,1.81-0.69h11.56 c0.75,0,1.43,0.31,1.93,0.8l0,0l0,0c0.49,0.49,0.8,1.18,0.8,1.93v36.47c0,0.75-0.31,1.44-0.8,1.93c-0.04,0.04-0.08,0.08-0.13,0.11 c-0.48,0.43-1.12,0.69-1.81,0.69h-11.56c-0.75,0-1.43-0.31-1.93-0.8l0,0l0,0c-0.49-0.49-0.8-1.18-0.8-1.93v-5.31l-0.05,0h-16.2 c-1.42,6.38-5.49,10.85-10.69,13.46c-3.72,1.87-8.02,2.79-12.33,2.78c-4.3,0-8.62-0.93-12.4-2.74c-5.52-2.65-9.89-7.18-11.4-13.51 h-0.85v0c-2.54,0.1-4.42,0.7-5.71,1.76c-1.21,1-1.92,2.48-2.17,4.41v7.76c0,0.85-0.69,1.54-1.54,1.54H1.54 C0.69,78.73,0,78.04,0,77.19V60.38h0c0-0.09,0.01-0.17,0.02-0.26c1.13-6.6,3.62-11.99,7.64-15.98c4-3.97,9.48-6.51,16.62-7.46 c0.11-0.02,0.22-0.04,0.34-0.04h17.93l3.11-10.59c0.2-0.67,0.81-1.1,1.47-1.1v0h5.14V13.34H39.71c-1.84,0-3.5-0.75-4.71-1.96 c-1.21-1.21-1.96-2.88-1.96-4.71c0-1.84,0.75-3.5,1.96-4.71C36.21,0.75,37.88,0,39.71,0h37.27c1.84,0,3.5,0.75,4.71,1.96 c1.21,1.21,1.96,2.88,1.96,4.71c0,1.84-0.75,3.5-1.96,4.71c-1.21,1.21-2.88,1.96-4.71,1.96H65.12v11.61h6.14 c0.74,0,1.36,0.52,1.51,1.22L75.57,36.65L75.57,36.65z M62.04,24.95V13.34h-6.69v11.61H62.04L62.04,24.95z M35.66,60.19l6-20.46 H24.68c-6.43,0.86-11.33,3.1-14.85,6.59c-3.52,3.49-5.72,8.27-6.75,14.18v15.15h20.46v-6.31c0-0.09,0.01-0.17,0.02-0.26 c0.34-2.74,1.41-4.9,3.27-6.43c1.81-1.5,4.33-2.34,7.61-2.46l0.05,0v-0.01H35.66L35.66,60.19z M38.26,62.24 c1.2,5.51,4.98,9.46,9.8,11.77c3.37,1.61,7.23,2.43,11.08,2.44c3.84,0,7.66-0.81,10.95-2.46c4.53-2.28,8.04-6.17,9.16-11.75 l-9.17-34.2H48.29l-3.11,10.59l-6.87,23.43C38.3,62.11,38.28,62.18,38.26,62.24L38.26,62.24z M76.99,3.08H39.71 c-0.99,0-1.88,0.4-2.54,1.06c-0.65,0.65-1.06,1.55-1.06,2.54c0,0.99,0.41,1.88,1.06,2.54c0.65,0.65,1.55,1.06,2.54,1.06h37.27 c0.99,0,1.88-0.41,2.54-1.06c0.65-0.65,1.06-1.55,1.06-2.54c0-0.99-0.41-1.88-1.06-2.54C78.87,3.48,77.97,3.08,76.99,3.08 L76.99,3.08z M112.36,32.44h-10.87v35.79h10.87V32.44L112.36,32.44z"
                                            />
                                        </g>
                                    </svg>
                                </div>
                                給排水設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">包含自來水、排水系統等。根據建築物的用途、法規和用水量等因素，計算和設計出符合需求的給排水管道，同時也需要考慮節能和環保等因素。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="150">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                    </svg>
                                </div>
                                消防設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">根據消防法規，設計出建築物需要的消防系統。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="200">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                        />
                                    </svg>
                                </div>
                                送審服務
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">我們提供電氣、電信、自來水、汙水套繪申請、汙水開工申請、消防等五大管線送審服務，讓您的建築項目快速且順利的通過審查程序！</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <!-- CTA Section -->
        <div class="bg-blue-500">
            <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl" data-aos="fade-up" data-aos-duration="750">提供專業的水電設計與高品質服務</h2>
                    <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-amber-300" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">無論您是小型建築師事務所或大型建設公司，我們都能夠提供高品質、專業的水電設計服務。立即聯繫我們，讓我們一同打造卓越的建築項目！</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#contact-section" class="rounded-md bg-amber-300 p-8 py-4 text-4xl font-semibold text-blue-800 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-aos="fade-up" data-aos-duration="750">開始合作</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feature Section -->
        <div class="bg-white overflow-x-hidden" id="feature-section">
            <div class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                <div class="mx-auto max-w-3xl sm:text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up" data-aos-duration="750">我們的特色</h2>
                    <p class="mt-4 text-gray-500" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">我們的專業團隊由資深設計師與技師組成，從透天厝到體育場，從小工廠到系統廠都駕輕就熟</p>
                </div>

                <div class="mt-16 space-y-16">
                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-left" data-aos-duration="750">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-1">
                            <h3 class="text-2xl font-bold text-gray-900">資深技師</h3>
                            <p class="mt-2 text-gray-500">我們團隊的水電技師有十多年相關經驗，善於與建築師、工程師和營造團隊密切合作了解客戶的需求和要求，並為他們提供高品質的設計方案。</p>
                        </div>
                        <div class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 lg:col-start-6 xl:col-start-5">
                            <div class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                                <img src="@/assets/engineer-01.svg" alt="White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull." class="object-cover object-center" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-right">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-8 xl:col-start-9">
                            <h3 class="text-2xl font-bold text-gray-900">從透天厝到大工廠</h3>
                            <p class="mt-2 text-gray-500">從透天厝到集合住宅，從小工廠到系統廠，我們的團隊對於各種類型和規模的項目都有處理經驗；您無需顧慮規模，放心交由我們處理吧！</p>
                        </div>
                        <div class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 lg:col-start-1">
                            <div class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                                <img src="@/assets/Bungalow-01.svg" alt="Detail of zipper pull with tan leather and silver rivet." class="object-cover object-center" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-left" data-aos-duration="750">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-1">
                            <h3 class="text-2xl font-bold text-gray-900">送審服務</h3>
                            <p class="mt-2 text-gray-500">我們還提供文件送審服務，除了了解各種文件送審程序和要求，也會確保所有的文件都符合政府單位的要求和標準，同時跟進審批進度。</p>
                        </div>
                        <div class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 lg:col-start-6 xl:col-start-5">
                            <div class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                                <img src="@/assets/government-01.svg" alt="White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull." class="object-cover object-center" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-right">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-8 xl:col-start-9">
                            <h3 class="text-2xl font-bold text-gray-900">作業順暢</h3>
                            <p class="mt-2 text-gray-500">我們以優質的服務和專業的技術贏得客戶的高度評價和信任。致力於提供最好的水電設計服務，建築師都非常滿意！</p>
                        </div>
                        <div class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 lg:col-start-1">
                            <div class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                                <img src="@/assets/architect-01.svg" alt="Detail of zipper pull with tan leather and silver rivet." class="object-cover object-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Flow Section -->
        <div class="bg-white py-6 sm:placeholder-gray-600" id="team-section">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl sm:text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up" data-aos-duration="750">設計流程</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-500" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">透明、標準的流程，讓您更準確的規劃專案。</p>
                </div>
                <br />
                <img data-aos="fade-up" data-aos-duration="750" data-aos-delay="50" src="@/assets/processFlow.png" />
            </div>
        </div>

        <!-- Service Range Section -->
        <div class="bg-white py-6 sm:py-6" id="team-section">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl sm:text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up" data-aos-duration="750">服務範圍</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-500" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">從台中出發，捷勝設計處理的案件遍及全台，無論您的案件或事務所位於何處，我們都樂於為您服務，立刻<a href="#contact-section" class="underline text-2xl">聯絡我們</a>吧！</p>
                </div>
                <br />
                <div class="w-full flex justify-center">
                    <img class="max-w-xl" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50" src="@/assets/range.png" />
                </div>
            </div>
        </div>

        <!-- Team Section -->
        <div class="bg-white py-24 sm:py-32" id="team-section">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl sm:text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up" data-aos-duration="750">團隊介紹</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">我們是一個充滿年輕活力的團隊，致力於讓水電設計擺脫傳統產業的刻板印象，成為現代化的新興設計。</p>
                </div>
                <br />
                <div class="mx-auto max-w-2xl sm:text-center" data-aos="fade-up" data-aos-duration="750">
                    <iframe class="mx-auto w-full" width="594" height="334" src="https://www.youtube.com/embed/tEk5MMotRN8" title="捷勝設計 - 五大管道設計服務" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <ul role="list" class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none">
                    <li class="flex flex-col gap-6 xl:flex-row" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">
                        <img class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src="@/assets/jj.png" alt="" />
                        <div class="flex-auto">
                            <h3 class="text-lg font-semibold leading-8 tracking-tight text-blue-800">Jeremy 黃</h3>
                            <p class="text-base leading-7 text-gray-600">主要負責人</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">十年以上的水電技師，擁有豐富的水電設計專業知識和豐富的行業經驗，從小型透天厝到大型廠房、大樓住宅都有多年經驗。他負責團隊整體的規劃、指導和項目管理，確保每個項目都能夠按時交付、高品質地完成。</p>
                        </div>
                    </li>
                    <li class="flex flex-col gap-6 xl:flex-row" data-aos="fade-up" data-aos-duration="750" data-aos-delay="100">
                        <img class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src="@/assets/k.png" alt="" />
                        <div class="flex-auto">
                            <h3 class="text-lg font-semibold leading-8 tracking-tight text-blue-800">Kevin 黃</h3>
                            <p class="text-base leading-7 text-gray-600">系統主管</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">十年以上的程式全端工程師，他擁有先進的技術背景和豐富的專業經驗，負責專案管理與CRM系統。他能夠從技術角度對項目進行全面的規劃和設計，為客戶提供最佳服務。</p>
                        </div>
                    </li>
                    <li class="flex flex-col gap-6 xl:flex-row" data-aos="fade-up" data-aos-duration="750" data-aos-delay="150">
                        <img class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src="@/assets/q.png" alt="" />
                        <div class="flex-auto">
                            <h3 class="text-lg font-semibold leading-8 tracking-tight text-blue-800">Audrey 黃</h3>
                            <p class="text-base leading-7 text-gray-600">資深設計師</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">十年以上的水電設計經驗，負責提供高質量的設計方案，根據項目要求和客戶需求進行水電系統的設計和製圖，確保設計方案符合標準和要求。</p>
                        </div>
                    </li>
                    <li class="flex flex-col gap-6 xl:flex-row" data-aos="fade-up" data-aos-duration="750" data-aos-delay="150">
                        <img class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src="@/assets/Milton.png" alt="" />
                        <div class="flex-auto">
                            <h3 class="text-lg font-semibold leading-8 tracking-tight text-blue-800">Milton 鄒</h3>
                            <p class="text-base leading-7 text-gray-600">機電技師</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">擁有國家專技人員電機技師證照的專業人士，具備豐富的電機相關知識和技能，且非常注重細節和精度，對於工作的質量始終保持高標準。能夠提供專業的建議和解決方案。</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Contact Section -->
        <div class="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 overflow-x-hidden" id="contact-section">
            <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true"></div>
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl">聯絡我們</h2>
                <p class="mt-2 text-lg leading-8 text-gray-600">請留下您的基本資訊和需求，我們會由專人跟您聯繫！</p>
            </div>
            <form action="#" method="POST" class="mx-auto max-w-xl mt-8">
                <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">如何稱呼</label>
                        <div class="mt-2.5">
                            <input type="text" v-model="contactUsForm.name" name="first-name" id="first-name" placeholder="王先生 / 小姐" autocomplete="given-name" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="company" class="block text-sm font-semibold leading-6 text-gray-900">公司/事務所名稱</label>
                        <div class="mt-2.5">
                            <input type="text" name="company" id="company" v-model="contactUsForm.company" placeholder="XX建築師事務所 / OO營造" autocomplete="organization" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                        <div class="mt-2.5">
                            <input type="email" name="email" id="email" autocomplete="email" v-model="contactUsForm.email" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="phone-number" class="block text-sm font-semibold leading-6 text-gray-900">連絡電話</label>
                        <div class="relative mt-2.5">
                            <input type="tel" name="phone-number" id="phone-number" v-model="contactUsForm.phone" autocomplete="tel" class="block w-full rounded-md border-0 px-3.5 py-2 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message" class="block text-sm font-semibold leading-6 text-gray-900">您的需求</label>
                        <div class="mt-2.5">
                            <textarea name="message" id="message" v-model="contactUsForm.message" rows="4" class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"></textarea>
                        </div>
                    </div>
                    <div class="flex gap-x-4 sm:col-span-2">
                        <label class="text-sm leading-6 text-gray-600" id="switch-1-label"> *上述訊息僅供聯絡用途，不會用於其他用途。 </label>
                    </div>
                </div>
                <div class="mt-10">
                    <button type="button" @click="onContactUsClicked" class="block w-full rounded-md bg-blue-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">立刻聯絡</button>
                </div>
            </form>
        </div>
    </div>
    <br />
    <div class="fixed bottom-4 right-4 z-10">
        <div class="max-w-xs rounded shadow-lg bg-white relative pt-8" :class="isContactOpen ? '' : 'hidden'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 absolute right-2 top-2" @click="isContactOpen = false">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <a href="https://lin.ee/14N72sU">
                <img class="w-40 h-40 mx-auto" src="https://qr-official.line.me/gs/M_761lwoyv_GW.png" />
            </a>

            <div class="px-6 py-4">
                <a href="https://lin.ee/14N72sU">
                    <div class="font-bold text-xl mb-2 text-center">捷勝設計</div>
                </a>
                <p class="text-gray-700 text-base">點擊QRCode直接與我們聯繫！</p>
            </div>
        </div>
    </div>
    <img src="@/assets/line-logo.png" class="fixed bottom-4 right-4 w-12 h-12 lg:w-16 lg:h-16" @click="isContactOpen = true" />
</template>
