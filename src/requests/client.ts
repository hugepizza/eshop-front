import ky, { Options } from "ky";

export const api = ky.extend({
  prefixUrl: "https://eshop-api-dev.ketianjiyi.com/",
  hooks: {
    afterResponse: [
      (_request, _options, response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      },
      async (_request, _options, response) => {
        const jsonbody = await response.json();
        if (!("code" in jsonbody || "data" in jsonbody)) {
          throw new Error("unknow response");
        }
        if ("code" in jsonbody && jsonbody.code !== 200) {
          throw new Error(jsonbody.message ?? "unknow response");
        }
      },
    ],
  },
});
