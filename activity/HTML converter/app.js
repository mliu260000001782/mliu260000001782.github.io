const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
    let markdown = markdownInput.value;

    // Images
    markdown = markdown.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img alt="$1" src="$2">'
    );

    // Links
    markdown = markdown.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2">$1</a>'
    );

    // Nested bold and italic
    markdown = markdown.replace(
        /\*\*(.*?)\*(.*?)\*\*\*/g,
        "<strong>$1<em>$2</em></strong>"
    );

    // Bold
    markdown = markdown.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    markdown = markdown.replace(
        /__(.*?)__/g,
        "<strong>$1</strong>"
    );

    // Italic
    markdown = markdown.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
    );

    markdown = markdown.replace(
        /_(.*?)_/g,
        "<em>$1</em>"
    );

    // Headings
    markdown = markdown.replace(
        /^[ \t]*### (.+)$/gm,
        "<h3>$1</h3>"
    );

    markdown = markdown.replace(
        /^[ \t]*## (.+)$/gm,
        "<h2>$1</h2>"
    );

    markdown = markdown.replace(
        /^[ \t]*# (.+)$/gm,
        "<h1>$1</h1>"
    );

    // Blockquotes
    markdown = markdown.replace(
        /^[ \t]*> (.+)$/gm,
        "<blockquote>$1</blockquote>"
    );

    // Remove line breaks
    markdown = markdown.replace(/\r?\n/g, "");

    return markdown;
}

function updateOutput() {
    const result = convertMarkdown();

    // Show the generated HTML as text
    htmlOutput.textContent = result;

    // Show the generated HTML as an actual webpage
    preview.innerHTML = result;
}

markdownInput.addEventListener("input", updateOutput);