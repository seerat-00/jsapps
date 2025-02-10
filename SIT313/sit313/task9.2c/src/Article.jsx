import React, { useState } from 'react';
import Image from './Image_Storage';
import './Articles.css';
import { addDoc, collection } from 'firebase/firestore';
import exportfirebase from './firebase';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/material.css';

const Article = () => {
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [article, setArticle] = useState('');
    const [code, setCode] = useState('');  
    const [tag, setTag] = useState('');
    const [error, setError] = useState('');

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const postID = {
                title,
                abstract,
                article,
                code,
                tag: tag.split(',').map(tag => tag.trim()),
                timestamp: new Date(),
            };

            await addDoc(collection(exportfirebase, 'posts'), postID);
            alert('Article posted successfully');

            setTitle('');
            setAbstract('');
            setArticle('');
            setCode('');  
            setTag('');
            setError('');
        } catch (error) {
            setError('Error adding the document: ' + error.message);
        }
    };

    const codemirrorOptions = {
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
    };

    return (
        <section className='main-container'>
            <div className='form__area'>
                <form onSubmit={handlePostSubmit}>
                    <div className='ask__area'>
                        <h3 id='ask'>What do you want to ask or share?</h3>
                    </div>
                    <label>Title</label>
                    <input 
                        type='text'
                        placeholder="Enter the title of your article"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label>Abstract</label>
                    <textarea 
                        placeholder="Enter a 1-paragraph abstract" 
                        rows={3}
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        required
                    />
                    <label>Article</label>
                    <textarea
                        placeholder="Write your article here" 
                        rows={7}
                        value={article}
                        onChange={(e) => setArticle(e.target.value)}
                        required
                    />
                    <label>Code</label>
                    <CodeMirror
                        value={code}
                        options={codemirrorOptions}
                        onBeforeChange={(editor, data, value) => {
                            setCode(value);
                        }}
                    />
                    <div >
                        <ReactMarkdown>{code}</ReactMarkdown>
                    </div>

                    <label>Tags</label>
                    <input
                        type='text'
                        placeholder="Please add up to 3 tags" 
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        required
                    />
                        
                    <Image />
                    <button className="submit__area" type="submit">Post</button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            </div>
        </section>
    );
};

export default Article;
