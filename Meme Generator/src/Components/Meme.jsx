import noCaption from "./noCaption.jpg";
import {  useEffect, useState } from 'react';


const Meme = ({ meme, setMeme }) => {
    const [form, setForm] = useState({
        template_id: meme.id,
        username: "ridzz",
        password: "Meme-0326",
        boxes: []
    });
    
    const [noCaption, setNoCaption] = useState(false)
    const generateMeme = () => {
        let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
        form.boxes.map((box, index) => {
            url += `&boxes[${index}][text]=${box.text}`;
        });
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    // console.log(...meme)
                    setMeme({ ...meme, url: data.data.url })
                } else {
                    setNoCaption(true)
                    setMeme({url: "https://i.imgflip.com/5i45q3.jpg", box_count: 0})
                }
                    
            })
    };
    return (
        <div className="meme">
            <img src={meme.url} />
            <div>
                {[...Array(meme.box_count)].map((el, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Meme Caption ${index + 1}`}
                        onChange={(e) => {
                            const newBoxes = form.boxes;
                            newBoxes[index] = { text: e.target.value };
                            setForm({ ...form, boxes: newBoxes })
                        }}
                    />
                ))}
                <div>
                    {noCaption ? 
                    <>
                    <button className="btn" style={{display:"none"}}>Create Meme</button>                     
                    <a style={{display:"none"}} id="download" href={meme.url} download target="_blank"><button id="download_btn" className="btn">Open Meme</button></a>
                    </>
                    : 
                    <>
                    <button className="btn" onClick={generateMeme}>Create Meme</button>
                    <a id="download" href={meme.url} download target="_blank"><button id="download_btn" className="btn">Open Meme</button></a>
                    </>
                }    
                    <button
                        className="btn"
                        onClick={() => { setMeme(null) }}>Choose Template</button>
                </div>
            </div>
        </div>
    )}

export default Meme;