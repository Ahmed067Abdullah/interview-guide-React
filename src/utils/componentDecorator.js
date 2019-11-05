import React from "react";

const componentDecorator = (href, text, key) => (
  <a href={href} rel="noopener noreferrer" key={key} target="_blank">
    {text}
  </a>
);

export default componentDecorator;
