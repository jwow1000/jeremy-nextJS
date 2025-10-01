import parse from "html-react-parser";

export default function HTMLParse({ html }: { html: string }) {
  return <div>{parse(html)}</div>;
}