import medFetch from "./fetch";
export const createPost = (props) => {
  const {use="",post=""}=props;
    const res=medFetch({type:'insert',table:'post',data:{ use, post,comments:[],likers:[],dislikers:[] }})   
    console.log(res)
  }