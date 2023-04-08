export default defineEventHandler(async (event) => {
    const query = await getQuery(event);
    // console.log(body);
    const posts = await fetch(`http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/posts?_embed&per_page=${query.per_page}&page=${query.page}`);
    const postTotalPage = posts.headers.get("X-WP-TotalPages") != null ? Number(posts.headers.get("X-WP-TotalPages")) : 1;
    // console.log(await posts.json());
    // console.log(postTotalPage);
    // const tags = await fetch("http://jiesheng.3.36.56.224.nip.io/wp-json/wp/v2/tags");
    return {
        posts: await posts.json(),
        totalPage: postTotalPage,
    };
});
