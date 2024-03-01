import axios from "axios";

let postData: string | null = null;

export function GET() {
  console.log("GET Data:", postData);

  return new Response(postData, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST(req: Request) {
  try {
    const crypto = require("crypto");
    const { head, code, ak, Data, footer, lati, long, iv, key } =
      await req.json();

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      Buffer.from(iv, "hex")
    );

    let decr = decipher.update(ak, "hex", "utf-8");
    decr += decipher.final("utf-8");

    console.log("Decrypted Data:", decr);

    const responseData = {
      data: {
        head,
        footer,
        Data,
        code,
        decr,
      },
    };
    const jsonData = JSON.stringify(Data);

    const splitdata = JSON.parse(jsonData);

    const id = splitdata.user;
    const pass = splitdata.pass;

    const format = `${head};${code};K${decr};U${id};P${pass};${footer}`;
    console.log("ApData", responseData);
    console.log("fomat:", format);

    const resp = await axios.post("https://as001.s11.group:10101", format);

    console.log("ResponTest:", resp.data, resp.status);

    if (resp.data.includes("Ok")) {
      const codetime = process.env.NEXT_PUBLIC_TIME;

      const datares = {
        datatimein: {
          head,
          codetime,
          decr,
          id,
          pass,
          footer,
          lati,
          long,
          //b64,
        },
      };

      const timepush = `${head};${codetime};K${decr};U${id};P${pass};LA${lati};LO${long};${footer}`;
      console.log("DataTimepush", datares);
      console.log("timepush:", timepush);

      const responsetime = await axios.post(
        "https://as001.s11.group:10101",
        timepush
      );

      const text = JSON.stringify(responsetime.data);

      console.log("DataTime:", text);

      postData = responsetime.data;
      console.log("postData", postData);

      return new Response(text, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }
    const chkid = JSON.stringify(resp.data);

    console.log("chkid", chkid);

    postData = resp.data;
    console.log("postData", postData);
    return new Response(chkid, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
