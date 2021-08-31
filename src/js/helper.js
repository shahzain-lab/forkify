import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };  

export const getJson = async (url) => {
    try{
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if(!res.ok) throw new Error(`${res.status}, ${data.message}`);
        return data;
    }catch(err) {
        throw err;
    }
}