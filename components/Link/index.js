import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ href, as, children, activeClassName }) => {
  const router = useRouter();

  let className = children.props.className || "";

  if (router.asPath.split('?')[0] === as) {
    className = `${className} ${activeClassName}`;
  }
  console.log({ fffff: router.asPath, as});
  
  return (
    <Link href={href} as={as}>
      {React.cloneElement(children, { className })}
    </Link>
  );
};
