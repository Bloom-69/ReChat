import { Button } from "@suid/material";
import { JSX } from "solid-js";
import { styled } from "solid-styled-components";

/**
 * Base codeblock styles
 */
const Base = styled.pre`
  color: inherit;
  padding: 1em;
  overflow-x: scroll;
  border-radius: 4px;
`;

/**
 * Render a codeblock with copy text button
 */
export function RenderCodeblock(props: {
  children: JSX.Element;
  class?: string;
}) {
  let lang = "text";
  if (props.class) {
    lang = props.class.split("-")[1];
  }

  let ref: HTMLPreElement | undefined;

  return (
    <>
      <Button
        sx={{
          display: "inline-block",
          userSelect: "none",
          width: "fit-content",
          marginLeft: 2,
        }}
        onClick={() => {
          const text = ref?.querySelector("code")?.innerText;
          //text && modalController.writeText(text);
          alert(text);
        }}
        variant="outlined"
        size="small"
      >
        {lang}
      </Button>
      <Base class="bg-base-200 text-neutral" ref={ref}>
        {props.children}
      </Base>
    </>
  );
}

/* export const RenderCodeblock: React.FC<{ class: string }> = ({
    children,
    ...props
}) => {
    const ref = useRef<HTMLPreElement>(null);
    let text = "text";
    if (props.class) {
        text = props.class.split("-")[1];
    }
    const onCopy = useCallback(() => {
        const text = ref.current?.querySelector("code")?.innerText;
        text && modalController.writeText(text);
    }, [ref]);
    return (
        <Base ref={ref}>
            <Lang>
                <Tooltip content="Copy to Clipboard" placement="top">

                    // @ts-expect-error Preact-React
                    <a onClick={onCopy}>{text}</a>
                </Tooltip>
            </Lang>
            {children}
        </Base>
    );
}; */
