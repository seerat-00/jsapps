import React, { useState } from 'react';
import Image from './Image_Storage';
import './Articles.css';
import { addDoc, collection } from 'firebase/firestore';
import exportfirebase from './firebase';

const Question = () => {
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [tag, setTag] = useState('');
    const [error, setError] = useState('');
    const [code, setCode] = useState('');

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        try {
            const postID = {
                title,
                question,
                code,
                tag: tag.split(',').map((tag) => tag.trim()),
                timestamp: new Date(),
            };
            
            await addDoc(collection(exportfirebase.postUpload, 'posts'), postID);
            alert('Question posted successfully');

            setTitle('');
            setQuestion('');
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
                        placeholder="Enter the title of your question"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required 
                    />
                    <label>Describe your problem</label>
                    <textarea
                        placeholder="Write your article here" 
                        rows={7}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />

                    <div className="form-group">
                        <label>Code (if any):</label>
                        <CodeMirror
                        value={code}
                        options={codemirrorOptions}
                        onBeforeChange={(editor, data, value) => {
                            setCode(value);
                        }}
                        />
                    </div>

                    <div >
                        <ReactMarkdown>{code}</ReactMarkdown>
                    </div>

                    <label>Tags</label>
                    <input
                        type='text'
                        placeholder="Please add upto 3 tags" 
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        required
                    />

                    <Image />
                    <button type="submit">Post</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                </form>
            </div>
        </section>
    );
};

export default Question;
