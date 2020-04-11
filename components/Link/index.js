import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ href, as, children, onClick, activeClassName, ...props }) => {
  const router = useRouter();

  let className = children.props.className || "";
  
  if ('/'+ router.asPath.split('?')[0].split('/')[1] === as) {
    className = `${className} ${activeClassName}`;
  }
  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(children, { className, onClick })}
    </Link>
  );
};
