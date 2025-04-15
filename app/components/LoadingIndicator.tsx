import { useEffect } from "react";
import { useNavigation } from "@remix-run/react";
import NProgress from "nprogress";

export default function LoadingIndicator() {
  const navigation = useNavigation();
  const isTransitioning = navigation.state !== "idle";

  useEffect(() => {
    if (isTransitioning) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isTransitioning]);

  return null;
}
