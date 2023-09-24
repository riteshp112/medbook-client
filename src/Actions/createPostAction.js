import medFetch from "./medFetchAction";
export const createPost = (props) => {
  const res = medFetch({
    type: "insert",
    table: "post",
    data: { ...props, comments: [], likers: [], dislikers: [] },
  });
};
