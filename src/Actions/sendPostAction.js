import medFetch from "./fetch";
export const createPost = (props) => {
  const {use="",post=""}=props;
    const res=medFetch({type:'insert',table:'post',data:{ use, post,likes:0,dislikes:0,comments:[] }})   
    console.log(res)
  }