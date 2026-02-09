export default function Button({
  type = "button",
  className,
  children,
  ...rest
}) {
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}
