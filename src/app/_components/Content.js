const Content = ({ zawartosc }) => {
  return (
    <div className="content mt-4">
      {zawartosc && zawartosc.map((section, index) => {
        if (section.type === "heading") {
          return (
            <h1 key={index} className="text-2xl font-bold mt-4">
              {section.children[0].text}
            </h1>
          );
        }
        if (section.type === "paragraph") {
          return (
            <p key={index} className="mt-2">
              {section.children[0].text}
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Content;
