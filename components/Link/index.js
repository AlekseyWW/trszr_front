import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ href, as, children, activeClassName }) => {
  const router = useRouter();

  let className = children.props.className || "";

  if (router.asPath.substring(1).split('?')[0] === as) {
    className = `${className} ${activeClassName}`;
  }

  return (
    <Link href={href} as={as}>
      {React.cloneElement(children, { className })}
    </Link>
  );
};
