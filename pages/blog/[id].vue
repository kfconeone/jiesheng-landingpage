<script setup lang="ts">
import { DateTime } from "luxon";
const route = useRoute();
const currentPostId = Number(route.params.id);
const post = await useAsyncData<any>("post", () => $fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/posts/" + currentPostId));
const categories = await useAsyncData<any>("categories", () => $fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/categories"));
const tags = await useAsyncData<any>("categories", () => $fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/tags"));
const tagStrings = post.data.value.tags.map((tag: any) => tags.data.value.find((t: any) => t.id === tag).name).join(", ");
// console.log(tagStrings);

const getCategoryName = (id: number) => {
    const category = categories.data.value.find((category: any) => category.id === id);
    if (category == null || category == undefined) return "";
    return category.name;
};
</script>

<template>
    <Head>
        <Title>捷勝設計Blog - {{ post.data.value.title.rendered }}</Title>

        <Meta name="description" :content="post.data.value.title.rendered" />
        <Meta name="og:title" :content="post.data.value.title.rendered" />
        <Meta name="og:description" :content="post.data.value.title.rendered" />
        <Meta name="keywords" :content="tagStrings" />
    </Head>
    <a href="/" class="block w-1/5 ml-auto mr-8 py-4">
        <img src="@/assets/logo.png" alt="logo" class="w-full" />
    </a>
    <hr />
    <div class="max-w-2xl px-6 py-16 mx-auto space-y-12">
        <article class="space-y-8">
            <div class="space-y-6">
                <h1 class="text-4xl font-bold md:tracking-tight md:text-5xl text-gray-700">{{ post.data.value.title.rendered }}</h1>
                <div class="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                    <div class="flex items-center md:space-x-2">
                        <!-- <img src="https://source.unsplash.com/75x75/?portrait" alt="" class="w-4 h-4 border rounded-full" /> -->
                        <p class="text-sm">{{ DateTime.fromISO(post.data.value.date).toFormat("yyyy-MM-dd") }}</p>
                    </div>
                </div>
            </div>
            <div class="text-gray-700" v-html="post.data.value.content.rendered"></div>
        </article>
        <div>
            <div class="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-gray-400">
                <!-- categories -->
                <span v-for="category in post.data.value.categories" :key="category" class="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded">
                    {{ getCategoryName(category) }}
                </span>
            </div>
        </div>
        <div class="flex justify-end gap-4">
            <div>
                <!-- 返回上一頁 -->
                <a @click="$router.back()" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">返回</a>
            </div>
            <div>
                <!-- 返回首頁的聯絡我們 -->
                <a href="/#contact-section" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200">聯絡我們</a>
            </div>
        </div>
    </div>
</template>
