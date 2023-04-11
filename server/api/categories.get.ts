export default defineEventHandler(async () => {
    // const body = await readBody(event);
    let categories = await fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/categories");
    let content = await categories.json();
    console.log(content);
    return content;
});
