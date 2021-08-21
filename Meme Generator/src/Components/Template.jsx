import React from "react"

const Templates = ({ templates, setMeme }) => {
    return (
        <div className="templates">
            {templates.map(template => (
                <div key={template.id} className="template" onClick={() => {
                    setMeme(template)
                }}>
                    <img
                        src={template.url}
                        className="image">
                    </img>
                </div>
            ))}
        </div>
    );
};

export default Templates;
