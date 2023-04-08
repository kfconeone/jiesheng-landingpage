export default defineEventHandler(async () => {
    // const body = await readBody(event);
    const categories = await fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/categories");
    return await categories.json();
});
