import axios from "axios";

async function make_request(url, data) {
  try {
    let response = await axios({
      url,
      method: "post",
      data: data,
    });

    return response;
  } catch (err) {
    console.log(err);
  }
}

export default make_request;