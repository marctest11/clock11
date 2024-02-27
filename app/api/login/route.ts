import axios from "axios";

let postData: string | null = null;

export function GET() {
  console.log("GET Data:", postData);

  return new Response(postData, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST(req: Request, res: Response) {
  try {
    const { head, code, ak, Data, footer, lati, long } = await req.json();
    const responseData = {
      data: {
        head,
        footer,
        Data,
        code,
        ak,
      },
    };
    const jsonData = JSON.stringify(Data);

    const splitdata = JSON.parse(jsonData);

    const id = splitdata.user;
    const pass = splitdata.pass;

    const format = `${head};${code};K${ak};U${id};P${pass};${footer}`;
    console.log("ApData", responseData);
    console.log("fomat:", format);

    const resp = await axios.post("https://as001.s11.group:10101", format);

    console.log("ResponTest:", resp.data, resp.status);

    if (resp.data.includes("Ok")) {
      const codetime = "E0002";

      const datares = {
        datatimein: {
          head,
          codetime,
          ak,
          id,
          pass,
          footer,
          lati,
          long,
          //b64,
        },
      };

      const timepush = `${head};${codetime};K${ak};U${id};P${pass};LA${lati};LO${long};${footer}`;
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
function retrieveStoredData() {
  throw new Error("Function not implemented.");
}

function storeData(chkid: string) {
  throw new Error("Function not implemented.");
}
