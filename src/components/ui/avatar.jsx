import React from "react";
import {
  Root as AvatarRoot,
  Image as AvatarImagePrimitive,
  Fallback as AvatarFallbackPrimitive,
} from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

// Avatar
const Avatar = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AvatarRoot
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...rest}
    />
  );
});
Avatar.displayName = "Avatar";

// Avatar Image
const AvatarImage = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AvatarImagePrimitive
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...rest}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

// Avatar Fallback
const AvatarFallback = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <AvatarFallbackPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...rest}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
