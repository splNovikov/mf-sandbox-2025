import React from "react";
import { System } from "./System";

type Props = {
  template: LayoutTemplate;
  zonesContent: Record<string, ModuleParameters[]>;
  modules: Record<string, Module>;
};
export default function Layout({ template, zonesContent, modules }: Props) {
  console.log(template);
  console.log(zonesContent);

  return (
    <>
      {template.rows.map((row) => (
        <div
          key={row.id}
          className={`grid grid-cols-${row.zones.length} gap-4`}
        >
          {row.zones.map((zoneId) => (
            <div key={zoneId} className="border-2 border-amber-500">
              <div>Row: {row.id}</div>
              <div>Zone_Id: {zoneId}</div>

              {zonesContent[zoneId]?.map((moduleParameters) => (
                <System
                  key={moduleParameters.moduleUniqueName}
                  scope={modules[moduleParameters.moduleUniqueName].scope}
                  path={modules[moduleParameters.moduleUniqueName].bundlePath}
                  module={modules[moduleParameters.moduleUniqueName].module}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
