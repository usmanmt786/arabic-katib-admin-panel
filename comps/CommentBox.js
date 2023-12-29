import formatDate from "@/utils/formatDate";
import axios from "axios";
import React, { useState } from "react";

function CommentBox({ data }) {
  const [loading, setLoading] = useState();
  const [comments, setComments] = useState(data || []);
  async function clickHandle(commentId, approve, index) {
    console.log(approve);
    setLoading(
      approve == 1
        ? { msg: "approving", index }
        : approve == 0
        ? { msg: "disapproving", index }
        : { msg: "deleting", index }
    );
    try {
      const response = await axios.post("/api/comments/update", {
        commentId,
        approve,
      });
      if (response.data.status) {
        alert(
          approve != null
            ? `${approve==1 ? 'Comment approved successfully' :'Comment disapproved successfully'}`
            : "Comment deleted successfully"
        );
      }
    } catch (error) {
      alert(error.message);
    } finally {
     await axios.post("/api/comments").then((res) => {
        setComments(res.data.reverse() || comments);
      });
      setLoading();
    }
  }
  return (
    <div
      className="overflow-scroll flex flex-col gap-3 bg-zinc-300 rounded h-full p-2"
      dir="rtl"
    >
      {comments &&
        !comments.error &&
        comments.length !== 0 &&
        comments.map((item, index) => (
          <div
            key={item.comment_id}
            className="md:w-2/3 lg:w-1/2 w-full mx-auto bg-slate-400 rounded-md shadow-md post-card px-5 py-3 flex flex-col gap-2"
          >
            <p className="text-zinc-100 text-sm">{formatDate(new Date(item.comment_addedOn))}</p>
            <div className="flex gap-2 text-sm  alex text-slate-600 bg-zinc-100 px-3 py-1 rounded items-center">
              <h3 className="font-semibold text-xs">المشاركة: </h3>
              <h3>{item.post_title}</h3>
            </div>
            <div className="flex gap-2 text-sm  alex text-slate-600 bg-zinc-100 px-3 py-1 rounded items-center">
              <h3 className="font-semibold text-xs">المعلق: </h3>
              <h3>{item.comment_postedBy}</h3>
            </div>
            <div className="flex flex-col gap-1 text-sm  alex text-slate-600 bg-zinc-100 px-3 py-1 rounded">
              <h3 className="font-semibold text-xs border-b-2 pb-1">
                التعليق :{" "}
              </h3>
              <h3 className="pr-4">{item.comment_body}</h3>
            </div>
            <div className="flex justify-between text-white font-semibold noto">
              <button
                className="active:scale-90 bg-red-800 hover:bg-opacity-90 w-max text-xs md:text-sm text-white px-3 rounded shadow py-2 disabled:bg-gray-500"
                onClick={() => clickHandle(item.comment_id, null, index)}
                disabled={loading ? true : false}
              >
                {loading && loading.msg == "deleting" && loading.index==index ? "Deleting" : "Delete"}
              </button>
              {item.comment_isApproved == 1 && (
                <button
                  className="active:scale-90 bg-blue-500 hover:bg-opacity-90 w-max text-xs md:text-sm text-white px-3 rounded shadow py-2 disabled:bg-gray-500"
                  disabled={loading ? true : false}
                  onClick={() =>
                    window.open(`https://ar.katib.in/${item.post_link}/#comment${item.comment_id}`,'_blank')
                  }
                >
                  View
                </button>
              )}
              <button
                className={`active:scale-90 hover:bg-opacity-90 w-max text-xs md:text-sm text-white px-3 rounded shadow py-2 disabled:bg-gray-500 ${
                  item.comment_isApproved == 0 ? "bg-green-500" : "bg-red-500"
                }`}
                onClick={() =>
                  clickHandle(
                    item.comment_id,
                    item.comment_isApproved == 1 ? 0 : 1,
                    index
                  )
                }
                disabled={loading ? true : false}
              >
                {loading && loading.msg == "approving" && loading.index == index
                  ? "Approving"
                  : loading &&
                    loading.msg == "disapproving" &&
                    loading.index == index
                  ? "Disapproving"
                  : item.comment_isApproved == 1
                  ? "Disapprove"
                  : "Approve"}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CommentBox;
