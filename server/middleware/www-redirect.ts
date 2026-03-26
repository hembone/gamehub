import { defineEventHandler, sendRedirect, getRequestURL } from "h3";

export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (url.hostname.startsWith("www.")) {
    const target = `${url.protocol}//${url.hostname.slice(4)}${url.pathname}${url.search}`;
    return sendRedirect(event, target, 301);
  }
});
