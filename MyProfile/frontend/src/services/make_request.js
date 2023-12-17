import axios from "axios";

async function make_request(url, data, responseType) {
  try {
    let response = await axios({
      url,
      method: "post",
      data: data,
      responseType: responseType
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}


export default make_request;
