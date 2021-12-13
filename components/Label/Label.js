const Label = ({children, ...rest}) => (
  <label className="block mb-2 text-black font-semibold" {...rest}>
    {children}
  </label>
);

export default Label;
