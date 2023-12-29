import CommentBox from "@/comps/CommentBox";
import Layout from "@/comps/Layout";
import SideNav from "@/comps/SideNav";
import excuteQuery from "@/utils/db";

import React from "react";

function CommentsPage({ data }) {
  const comments = JSON.parse(data);
  return (
    <Layout title="KATIB - Comments">
      <section className="flex">
        <SideNav activePage={7} />
        <div className="w-full h-screen overflow-hidden p-2 flex flex-col gap-2">
          <div className="flex justify-between border-b-2 border-gray-300 p-2 ">
            <h1 className="  font-semibold text-3xl ">Comments{`(${comments.length})`}</h1>
            
          </div>
          
          <CommentBox data={comments} />
        </div>
      </section>
    </Layout>
  );
}

export default CommentsPage;
export async function getServerSideProps() {
  const comments = await excuteQuery({
    query:
      "SELECT posts.post_title,posts.post_link,comments.* FROM posts INNER JOIN comments ON posts.post_id=comments.comment_postId",
  });

  return {
    props: {
      data: JSON.stringify(comments.reverse()),
    },
  };
}
