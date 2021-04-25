import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'

export default ({ href, as, children, onClick, activeClassName, onActive, onBlur, slug, ...props }) => {
  const router = useRouter();

  const [className, setClassName] = useState(children.props ? children.props.className || "" : '');
  
  useEffect(() => {
    if (router.asPath.split("?")[0] === as || (router.query.category  && router.query.category === slug)) {
      setClassName(`${children.props.className} ${activeClassName}`);
    } else {
      setClassName(children.props.className);
    }
  }, [router.asPath]);

  return (
    <Link href={href} as={as} {...props}>
      {React.cloneElement(children, { className, onClick })}
    </Link>
  );
};
