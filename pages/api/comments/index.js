import excuteQuery from "@/utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const comments = await excuteQuery({
    query:
      "SELECT posts.post_title,posts.post_link,comments.* FROM posts INNER JOIN comments ON posts.post_id=comments.comment_postId",
  });

  res.send(comments);
};
export default handler;
