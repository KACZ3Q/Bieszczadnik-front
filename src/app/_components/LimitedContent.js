import Content from './Content';

const LimitedContent = ({ zawartosc }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.slice(0, limit) + ' ...';
    }
    return text;
  };

  const getLimitedContent = (zawartosc, limit) => {
    let truncated = [];
    let charCount = 0;

    for (let section of zawartosc) {
      if (section.type === "heading" || section.type === "paragraph") {
        const text = section.children[0].text;
        if (charCount + text.length > limit) {
          truncated.push({
            ...section,
            children: [{ text: truncateText(text, limit - charCount) }]
          });
          break;
        } else {
          truncated.push(section);
          charCount += text.length;
        }
      }
    }

    return truncated;
  };

  const limitedZawartosc = Array.isArray(zawartosc) ? getLimitedContent(zawartosc, 80) : [];

  return <Content zawartosc={limitedZawartosc} />;
};

export default LimitedContent;
