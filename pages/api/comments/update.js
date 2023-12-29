import excuteQuery from "@/utils/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }
  const { commentId,approve } = req.body;
  const query=approve!=null ? `UPDATE comments SET comment_isApproved=${approve} WHERE comment_id=${commentId}`:`DELETE FROM comments WHERE comment_id=${commentId}`
  try {
    const result = await excuteQuery({
      query: query
      
    });

    if (result) {
      res.send({ status: true });
      return;
    }
    res.send({ status: false });
  } catch (error) {
    console.log(error);
    res.send({ status: false });
  }
};
export default handler;
