import { pascal } from "case";

function removeSpecialCharsAndPascalCase(str: string) {
  return pascal(str).replace(/[^a-zA-Z0-9]/g, "");
}

figma.showUI(__html__, { width: 480, height: 480 });
function getSelectionStyle() {
  const selection = figma.currentPage.selection;
  const textStyleId = ((selection[0] as TextNode).textStyleId as string) ?? "";
  const fillStyleId = ((selection[0] as TextNode).fillStyleId as string) ?? "";
  const textStyle = textStyleId ? figma.getStyleById(textStyleId) : "";
  const fillStyle = fillStyleId ? figma.getStyleById(fillStyleId) : "";
  const textStyleCode = textStyle
    ? `...vars.typography.${removeSpecialCharsAndPascalCase(textStyle.name)}`
    : "";
  const colorStyleCode = fillStyle
    ? `color: vars.colors.${removeSpecialCharsAndPascalCase(fillStyle.name)}`
    : "";

  return {
    textStyle,
    fillStyle,
    code: `${colorStyleCode},\n${textStyleCode}`,
  };
}
figma.ui.postMessage({
  type: "styles",
  text: getSelectionStyle().code,
});

figma.ui.onmessage = (msg) => {
  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};
