import medFetch from "./medFetchAction";
export const createPost = (props) => {
  const { use = "", post = "" } = props;
  const res = medFetch("/createPost", {
    table: "post",
    data: { use, post, comments: [], likers: [], dislikers: [] },
  });
};
