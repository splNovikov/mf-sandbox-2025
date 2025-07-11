import React, { Suspense } from "react";
import { importRemote } from "../utils/import-remote";

type RemoteAppProps = {
  scope: string;
  path: string;
  module: string;
};
export const System = ({ scope, module, path }: RemoteAppProps) => {
  const Component = React.lazy(() =>
    importRemote({
      url: path,
      scope,
      module,
    }),
  );

  return (
    <Suspense fallback="Loading Module">
      <Component scope={scope} module={module} url={path} />
    </Suspense>
  );
};
