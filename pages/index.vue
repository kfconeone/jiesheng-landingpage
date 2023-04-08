<script setup lang="ts">
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
const tags = await useAsyncData<any>("categories", () => $fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/tags"));
const tagStrings = tags.data.value.map((tag: any) => tag.name).join(", ");

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
        duration: 50,
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
    await useFetch("/api/contact", {
        method: "POST",
        body: contactUsForm.value,
    });

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
        <Meta name="keywords" :content="tagStrings" />
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
                                <a href="/blog?page=1" class="text-sm font-semibold leading-6 text-gray-900">Blog</a>
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
                                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
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
                                            <a href="/blog?page=1" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Blog</a>
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
                                        想深入了解水電設計嗎? <a href="/blog?page=1" class="whitespace-nowrap font-semibold text-blue-500"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                                    </div>
                                </div>
                                <!-- <h1 class="text-4xl font-bold tracking-tight text-blue-800 sm:text-6xl">捷勝設計</h1> -->
                                <div>
                                    <img src="@/assets/logo.png" alt="logo" class="" />
                                </div>
                                <p class="mt-6 text-lg leading-8 text-gray-600">由專業團隊為建築師們和營造廠商提供電氣、弱電、給排水與管道設計</p>
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
                                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                    </svg>
                                </div>
                                電氣設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">包含建築物的電力系統、照明系統、通訊系統、監控系統等。電氣設計師需依據建築的用途、大小和安全要求等因素，計算和設計出符合需求的電氣系統，同時也需要考慮節能和環保等因素。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="100">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                </div>
                                弱電設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">弱電設計是指建築物的低電壓電氣系統設計，主要包括通訊系統、監控系統、安全系統、多媒體系統等。弱電設計師需要了解各種系統的原理和規格，根據建築物的用途和要求進行系統設計和配置，並選擇合適的設備和材料。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="150">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                                給排水設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">給排水設計是指建築物的水、氣管道系統設計，包括給水系統、排水系統和天然氣管道系統等。給排水設計師需要根據建築物的用途、大小和用水量等因素，計算和設計出符合需求的水、氣管道系統，同時也需要考慮節能和環保等因素。</dd>
                        </div>

                        <div class="relative pl-16" data-aos="fade-up" data-aos-delay="200">
                            <dt class="text-base font-semibold leading-7 text-gray-900">
                                <div class="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                                    <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
                                    </svg>
                                </div>
                                管道設計
                            </dt>
                            <dd class="mt-2 text-base leading-7 text-gray-600">管道系統是指建築物的各種管道系統，包括給水管道、排水管道、天然氣管道、暖通空調管道、消防管道等。管道系統設計師需要根據建築物的用途、大小、功能和相關法律法規等要求，計算和設計出符合需求的管道系統，同時還需考慮節能、環保、安全等因素。</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
        <!-- CTA Section -->
        <div class="bg-blue-500">
            <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl" data-aos="fade-up" data-aos-duration="750">無論規模大小<br />專業的水電設計與高品質服務</h2>
                    <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-amber-300" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">無論您是小型建築師團隊或大型事務所公司，我們都能夠提供高品質、專業的水電設計服務。立即聯繫我們，讓我們一同打造卓越的建築項目！</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6">
                        <a href="#contact-section" class="rounded-md bg-amber-300 p-8 py-4 text-4xl font-semibold text-blue-800 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" data-aos="fade-up" data-aos-duration="750">開始合作</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Feature Section -->
        <div class="bg-white overflow-x-hidden" id="feature-section">
            <div class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                <div class="mx-auto max-w-3xl text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up" data-aos-duration="750">我們的特色</h2>
                    <p class="mt-4 text-gray-500" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">我們的專業團隊由二十年以上水電設計公司資深專家與技師組成，從透天厝到體育場，從小工廠到系統廠都駕輕就熟</p>
                </div>

                <div class="mt-16 space-y-16">
                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-left" data-aos-duration="750">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-1">
                            <h3 class="text-3xl font-bold text-gray-900">資深技師</h3>
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
                            <h3 class="text-3xl font-bold text-gray-900">從透天厝到大工廠</h3>
                            <p class="mt-2 text-gray-500">從透天厝到大型住宅，從工廠到公共設施，我們的團隊對於各種類型和規模的項目都有處理經驗；您無需顧慮規模，放心交由我們處理吧！</p>
                        </div>
                        <div class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 lg:col-start-1">
                            <div class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                                <img src="@/assets/Bungalow-01.svg" alt="Detail of zipper pull with tan leather and silver rivet." class="object-cover object-center" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-left" data-aos-duration="750">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-1">
                            <h3 class="text-3xl font-bold text-gray-900">送審服務</h3>
                            <p class="mt-2 text-gray-500">我們還提供文件送審服務，除了了解各種文件送審程序和要求，也會確保所有的文件都符合政府單位的要求和標準，同時跟進審批進度，確保在最短的時間內得到批准。</p>
                        </div>
                        <div class="flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8 lg:col-start-6 xl:col-start-5">
                            <div class="aspect-h-2 aspect-w-5 overflow-hidden rounded-lg">
                                <img src="@/assets/government-01.svg" alt="White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull." class="object-cover object-center" />
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8" data-aos="fade-right">
                        <div class="mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4 lg:col-start-8 xl:col-start-9">
                            <h3 class="text-3xl font-bold text-gray-900">作業順暢</h3>
                            <p class="mt-2 text-gray-500">以優質的服務和專業的技術贏得了客戶的高度評價和信任。我們致力於為客戶提供最好的水電設計服務，我們的客戶都非常滿意！</p>
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

        <!-- Team Section -->
        <div class="bg-white py-24 sm:py-32" id="team-section">
            <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl sm:text-center">
                    <h2 class="text-3xl font-bold tracking-tight text-blue-800 sm:text-4xl" data-aos="fade-up" data-aos-duration="750">團隊介紹</h2>
                    <p class="mt-6 text-lg leading-8 text-gray-600" data-aos="fade-up" data-aos-duration="750" data-aos-delay="50">我們是一個充滿年輕活力的團隊，致力於讓水電設計擺脫傳統產業的刻板印象，成為現代化的新興設計。</p>
                </div>
                <br />
                <div class="mx-auto max-w-2xl sm:text-center" data-aos="fade-up" data-aos-duration="750">
                    <iframe class="w-full h-96" src="https://www.youtube.com/embed/KPAl35s7Jow" title="捷勝設計" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
                        <img class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src="@/assets/k.jpg" alt="" />
                        <div class="flex-auto">
                            <h3 class="text-lg font-semibold leading-8 tracking-tight text-blue-800">Kevin 黃</h3>
                            <p class="text-base leading-7 text-gray-600">系統主管</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">十年以上的程式全端工程師，他擁有先進的技術背景和豐富的專業經驗，負責專案管理與CRM系統。他能夠從技術角度對項目進行全面的規劃和設計，為客戶提供最佳服務。</p>
                        </div>
                    </li>
                    <li class="flex flex-col gap-6 xl:flex-row" data-aos="fade-up" data-aos-duration="750" data-aos-delay="150">
                        <img class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src="@/assets/q.png" alt="" />
                        <div class="flex-auto">
                            <h3 class="text-lg font-semibold leading-8 tracking-tight text-blue-800">Q Ni Dan</h3>
                            <p class="text-base leading-7 text-gray-600">資深設計師</p>
                            <p class="mt-6 text-base leading-7 text-gray-600">十年以上的MEP設計經驗，負責提供高質量的設計方案，根據項目要求和客戶需求進行水電系統的設計和製圖，確保設計方案符合標準和要求。</p>
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
    <div class="fixed bottom-4 right-4">
        <div class="max-w-xs rounded shadow-lg bg-white relative z-10 pt-8" :class="isContactOpen ? '' : 'invisible'">
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
        <img src="@/assets/line-logo.png" class="absolute right-0 bottom-0 w-12 h-12 lg:w-16 lg:h-16" @click="isContactOpen = true" />
    </div>
</template>
