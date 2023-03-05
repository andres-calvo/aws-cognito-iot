import type { AppProps } from "next/app";
import "../../styles.css";
import { Amplify,PubSub } from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub";

Amplify.configure({
  Auth: {
    authenticationFlowType: "USER_SRP_AUTH",
    mandatorySignIn: true,
    region: "us-east-1",
    userPoolId: process.env.NEXT_PUBLIC_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL,
  },
});

Amplify.addPluggable(
  new AWSIoTProvider({
    aws_pubsub_region: "us-east-1",
    aws_pubsub_endpoint: process.env.NEXT_PUBLIC_IOT,
  })
);

PubSub.subscribe('myTopic').subscribe({
  next: data => console.log('Message received', data),
  error: error => console.error(error),
  complete: () => console.log('Done'),
});
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
