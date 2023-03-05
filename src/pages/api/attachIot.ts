// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { IoT } from "@aws-sdk/client-iot";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const identityId = req.body.identityId;
  const iot = new IoT({
    
    credentials: {
      accessKeyId: process.env.MY_AWS_KEY_ID as string,
      secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
    },
    region: "us-east-1",
    endpoint: "https://iot.us-east-1.amazonaws.com",
    
  });
//   const resp = await iot.listPolicies({

//   })
//   console.log(resp)

  await new Promise((resolve, reject) => {
    iot.attachPolicy(
      { policyName: "Iot-Policy", target: identityId },
      (err, data) => {
        if (err) {
          console.log(err);
          resolve(res.status(400).json({ message: err.message }));
          return;
        }
        resolve(res.status(200).json({ message: "OK" }));
      }
    );
  });
}
