<script setup lang="ts">
import { DateTime } from "luxon";
const route = useRoute();
const currentPage = Number(route.query.page) || 1;
const postResponse = await fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/posts?_embed&per_page=10&page=" + currentPage);
const categories = await useAsyncData<any>("categories", () => $fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/categories"));
const tags = await useAsyncData<any>("categories", () => $fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/tags"));
const tagStrings = tags.data.value.map((tag: any) => tag.name).join(", ");

const postTotalPage = postResponse.headers.get("X-WP-TotalPages") != null ? Number(postResponse.headers.get("X-WP-TotalPages")) : 1;
const posts = await postResponse.json();
// console.log(tagStrings);

const getCategoryName = (id: number) => {
    const category = categories.data.value.find((category: any) => category.id === id);
    if (category == null || category == undefined) return "";
    // console.log(category.id);
    return category.name;
};
</script>

<template>
    <Head>
        <Title>捷勝設計Blog</Title>
        <Meta name="description" content="捷勝設計Blog，專業的水電設計團隊" />
        <Meta name="og:title" content="捷勝設計Blog，專業的水電設計團隊" />
        <Meta name="og:description" content="捷勝設計Blog，專業的水電設計團隊" />
        <Meta name="keywords" :content="tagStrings" />
    </Head>
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl lg:mx-0">
                <img src="@/assets/logo.png" alt="logo" class="" />

                <p class="mt-2 text-lg leading-8 text-gray-600">歡迎來到我們的捷勝設計Blog，跟著我們一起探索水電設計吧！</p>
                <a href="/" class="underline text-blue-500">返回首頁</a>
            </div>
            <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 items-start">
                <article class="flex max-w-xl flex-col items-start justify-between" v-for="post in posts" :key="post.id">
                    <div class="flex items-center gap-x-4 text-xs">
                        <time :datetime="DateTime.fromISO(post.date).toFormat('yyyy-MM-dd')" class="text-gray-500">{{ DateTime.fromISO(post.date).toFormat("yyyy-MM-dd") }}</time>
                        <div class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100" v-for="category in post.categories" :key="category">
                            {{ getCategoryName(category) }}
                        </div>
                    </div>
                    <div class="group relative">
                        <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                            <a :href="'/blog/' + post.id">
                                <span class="absolute inset-0"></span>
                                {{ post.title.rendered }}
                            </a>
                        </h3>
                        <div v-if="post._embedded['wp:featuredmedia'] != undefined">
                            <img :src="post._embedded['wp:featuredmedia'][0].source_url" class="w-full h-64 object-cover" />
                        </div>

                        <div v-html="post.excerpt.rendered"></div>
                    </div>
                </article>
            </div>
        </div>

        <nav class="flex items-center justify-center border-t border-gray-200 px-4 mt-8">
            <div class="-mt-px flex w-0 flex-1 lg:justify-end">
                <a href="#" class="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" v-if="currentPage > 1">
                    <svg class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd" />
                    </svg>
                    Previous
                </a>
            </div>
            <div class="hidden md:-mt-px md:flex">
                <a
                    :href="'/blog?page=' + pageIndex"
                    :class="pageIndex == currentPage ? 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium border-indigo-500 text-blue-800' : 'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'"
                    v-for="pageIndex in postTotalPage"
                    :key="pageIndex"
                >
                    {{ pageIndex }}</a
                >
                <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
            </div>
            <div class="-mt-px flex w-0 flex-1 justify-end lg:justify-start">
                <a href="#" class="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700" v-if="currentPage < postTotalPage">
                    Next
                    <svg class="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </nav>
    </div>
</template>
