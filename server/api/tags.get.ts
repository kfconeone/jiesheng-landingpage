export default defineEventHandler(async () => {
    // const body = await readBody(event);
    let tags = await fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/tags?per_page=40");
    return await tags.json();
});
