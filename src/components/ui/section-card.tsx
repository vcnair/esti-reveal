import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SectionCardProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <Card className={cn(className)}>
      {(title || description || actions) && (
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div className="min-w-0">
            {title ? <CardTitle className="text-base">{title}</CardTitle> : null}
            {description ? <CardDescription className="mt-1">{description}</CardDescription> : null}
          </div>
          {actions ? <div className="ml-4 shrink-0">{actions}</div> : null}
        </CardHeader>
      )}
      <CardContent className={cn(title || description || actions ? undefined : "pt-6", contentClassName)}>
        {children}
      </CardContent>
    </Card>
  );
}


